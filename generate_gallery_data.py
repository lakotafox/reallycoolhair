#!/usr/bin/env python3
import os
import json

base_dir = "rlycoolhair_pics"
folders = []

# Get all New Folder With Items directories
for i in range(1, 30):
    folder_name = f"New Folder With Items {i}"
    folder_path = os.path.join(base_dir, folder_name)
    if os.path.exists(folder_path):
        files = [f for f in os.listdir(folder_path) if f.endswith('.jpg')]
        if files:
            files.sort()  # Sort files for consistency
            folders.append({
                "folder": folder_name,
                "preview": files[0] if files else "",
                "images": files
            })

# Generate JavaScript content
js_content = "const galleryData = [\n"
for i, folder in enumerate(folders):
    js_content += f"    {json.dumps(folder, indent=8)[:-1]}"
    if i < len(folders) - 1:
        js_content += "    },\n"
    else:
        js_content += "    }\n"
js_content += "];\n\n"

# Add the rest of the JavaScript code
js_content += """document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('gallery-modal');
    const modalGallery = document.getElementById('modal-gallery');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.querySelector('.modal-close');

    galleryData.forEach((client, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;

        const img = document.createElement('img');
        img.src = `rlycoolhair_pics/${client.folder}/${client.preview}`;
        img.alt = `Client ${index + 1} Hair Style`;

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = `<span>Client ${index + 1} - Click to view all</span>`;

        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        galleryGrid.appendChild(galleryItem);

        galleryItem.addEventListener('click', function() {
            openModal(index);
        });
    });

    function openModal(index) {
        const client = galleryData[index];
        modalTitle.textContent = `Client ${index + 1} Gallery`;
        modalGallery.innerHTML = '';

        client.images.forEach((image, imgIndex) => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'modal-image';

            const img = document.createElement('img');
            img.src = `rlycoolhair_pics/${client.folder}/${image}`;
            img.alt = `Client ${index + 1} - Photo ${imgIndex + 1}`;

            imgContainer.appendChild(img);
            modalGallery.appendChild(imgContainer);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});"""

# Write the updated gallery.js file
with open("gallery.js", "w") as f:
    f.write(js_content)

print(f"Generated gallery data for {len(folders)} folders")
for folder in folders[:5]:
    print(f"  - {folder['folder']}: {len(folder['images'])} images")