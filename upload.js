// Cloudinary configuration (same as FOXSITE)
const CLOUDINARY_CLOUD_NAME = 'dltlrgaay';
const CLOUDINARY_UPLOAD_PRESET = 'foxbuilt-uploads';

// State
let selectedFiles = [];
let uploadedUrls = [];

// DOM elements
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const previewGrid = document.getElementById('preview-grid');
const photoCount = document.getElementById('photo-count');
const statusMessage = document.getElementById('status-message');
const publishBtn = document.getElementById('publish-btn');
const clearBtn = document.getElementById('clear-btn');

// Event listeners
uploadZone.addEventListener('click', () => fileInput.click());
uploadZone.addEventListener('dragover', handleDragOver);
uploadZone.addEventListener('dragleave', handleDragLeave);
uploadZone.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileSelect);
publishBtn.addEventListener('click', handlePublish);
clearBtn.addEventListener('click', clearAll);

function handleDragOver(e) {
    e.preventDefault();
    uploadZone.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    addFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    addFiles(files);
    fileInput.value = '';
}

function addFiles(files) {
    files.forEach(file => {
        selectedFiles.push(file);
        createPreview(file, selectedFiles.length - 1);
    });
    updateUI();
}

function createPreview(file, index) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const div = document.createElement('div');
        div.className = 'preview-item';
        div.dataset.index = index;
        div.innerHTML = `
            <img src="${e.target.result}" alt="Preview">
            <button class="remove-btn" onclick="removeFile(${index})">X</button>
        `;
        previewGrid.appendChild(div);
    };
    reader.readAsDataURL(file);
}

function removeFile(index) {
    selectedFiles[index] = null;
    const item = previewGrid.querySelector(`[data-index="${index}"]`);
    if (item) item.remove();
    updateUI();
}

function clearAll() {
    selectedFiles = [];
    uploadedUrls = [];
    previewGrid.innerHTML = '';
    updateUI();
    hideStatus();
}

function updateUI() {
    const validFiles = selectedFiles.filter(f => f !== null);
    const count = validFiles.length;

    if (count > 0) {
        photoCount.textContent = `${count} photo${count > 1 ? 's' : ''} selected`;
        clearBtn.style.display = 'inline-block';
        publishBtn.disabled = false;
    } else {
        photoCount.textContent = '';
        clearBtn.style.display = 'none';
        publishBtn.disabled = true;
    }
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message ' + type;
}

function hideStatus() {
    statusMessage.className = 'status-message';
    statusMessage.textContent = '';
}

async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    );

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
}

async function handlePublish() {
    const validFiles = selectedFiles.filter(f => f !== null);

    if (validFiles.length === 0) {
        showStatus('Please select at least one photo', 'error');
        return;
    }

    publishBtn.disabled = true;
    showStatus('Uploading photos to cloud...', 'uploading');

    try {
        // Upload all files to Cloudinary
        uploadedUrls = [];
        for (let i = 0; i < validFiles.length; i++) {
            showStatus(`Uploading photo ${i + 1} of ${validFiles.length}...`, 'uploading');
            const url = await uploadToCloudinary(validFiles[i]);
            uploadedUrls.push(url);
        }

        showStatus('Saving to gallery...', 'uploading');

        // Create new client entry
        const newClient = {
            id: Date.now(),
            preview: uploadedUrls[0],
            images: uploadedUrls,
            createdAt: new Date().toISOString()
        };

        // Call Netlify function to update GitHub
        const response = await fetch('/.netlify/functions/github-update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'add-client',
                client: newClient
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to save');
        }

        showStatus('Photos published successfully!', 'success');

        // Clear after success
        setTimeout(() => {
            clearAll();
            showStatus('Photos published! They will appear on the site shortly.', 'success');
        }, 2000);

    } catch (error) {
        console.error('Publish error:', error);
        showStatus('Error: ' + error.message, 'error');
        publishBtn.disabled = false;
    }
}
