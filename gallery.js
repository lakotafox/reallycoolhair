let galleryData = [];

async function loadGalleryData() {
    try {
        const response = await fetch('gallery-data.json');
        const data = await response.json();
        galleryData = data.clients || [];
    } catch (error) {
        console.error('Failed to load gallery data:', error);
        galleryData = [];
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadGalleryData();
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('gallery-modal');
    const modalGallery = document.getElementById('modal-gallery');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.querySelector('.modal-close');
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const seeMoreBtn = document.getElementById('gallery-see-more-btn');
    let allGalleryItemsShown = false;

    // Check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    galleryData.forEach((client, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        // Hide items after the first 3 on mobile
        if (isMobile() && index >= 3) {
            galleryItem.classList.add('hidden-mobile');
        }

        galleryItem.dataset.index = index;

        const img = document.createElement('img');
        img.src = client.preview;
        img.alt = `Client ${index + 1} Hair Style`;

        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);

        galleryItem.addEventListener('click', function() {
            openModal(index);
        });
    });

    // See More button functionality
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function() {
            // On mobile, navigate to full gallery page
            if (isMobile()) {
                window.location.href = 'gallery-full.html';
            } else {
                // On desktop, toggle showing all items
                if (!allGalleryItemsShown) {
                    const hiddenItems = document.querySelectorAll('.gallery-item.hidden-mobile');
                    hiddenItems.forEach(item => {
                        item.classList.remove('hidden-mobile');
                    });
                    seeMoreBtn.textContent = 'See Less';
                    allGalleryItemsShown = true;
                } else {
                    const allItems = document.querySelectorAll('.gallery-item');
                    allItems.forEach((item, index) => {
                        if (index >= 3) {
                            item.classList.add('hidden-mobile');
                        }
                    });
                    seeMoreBtn.textContent = 'See More';
                    allGalleryItemsShown = false;
                    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    let savedScrollPosition = 0;

    function openModal(index) {
        // Save current scroll position
        savedScrollPosition = window.scrollY || window.pageYOffset;

        // Create fake scrollbar for modal on mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            const modalScrollbar = document.createElement('div');
            modalScrollbar.id = 'modal-fake-scrollbar';
            modalScrollbar.innerHTML = `
                <div style="
                    position: fixed;
                    right: 0;
                    top: 0;
                    width: 17px;
                    height: 100%;
                    background: #c0c0c0;
                    border-left: 1px solid #808080;
                    z-index: 1000001;
                ">
                    <div id="modal-fake-thumb" style="
                        position: absolute;
                        width: 15px;
                        height: 60px;
                        left: 1px;
                        background: linear-gradient(to bottom, #ffffff, #c0c0c0, #808080);
                        border: 1px solid #808080;
                        box-shadow: inset 1px 1px 0 #dfdfdf;
                        top: 0;
                    "></div>
                </div>
            `;
            document.body.appendChild(modalScrollbar);

            // Update modal scrollbar on scroll
            const updateModalScrollbar = function() {
                // The modal itself is what scrolls, not modal-content
                const modalEl = document.getElementById('gallery-modal');
                if (modalEl) {
                    const scrollHeight = modalEl.scrollHeight - modalEl.clientHeight;
                    const scrollPercent = scrollHeight > 0 ? modalEl.scrollTop / scrollHeight : 0;
                    const trackHeight = window.innerHeight;
                    const thumbHeight = 60;
                    const maxTop = trackHeight - thumbHeight;
                    const thumb = document.getElementById('modal-fake-thumb');
                    if (thumb) {
                        thumb.style.top = Math.max(0, Math.min(maxTop, scrollPercent * maxTop)) + 'px';
                    }
                }
            };

            // Listen to modal scroll
            setTimeout(function() {
                const modalEl = document.getElementById('gallery-modal');
                if (modalEl) {
                    modalEl.addEventListener('scroll', updateModalScrollbar);
                    updateModalScrollbar();
                }
            }, 100);
        }

        const client = galleryData[index];
        modalTitle.textContent = `BEAUTIFUL PEOPLE WITH BEAUTIFUL HAIR`;
        modalGallery.innerHTML = '';

        client.images.forEach((image, imgIndex) => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'modal-image';

            const img = document.createElement('img');
            img.src = image;
            img.alt = `Client ${index + 1} - Photo ${imgIndex + 1}`;

            // Add click handler to expand image
            img.addEventListener('click', function() {
                openLightbox(img.src);
            });

            imgContainer.appendChild(img);
            modalGallery.appendChild(imgContainer);
        });

        modal.style.display = 'block';
        document.body.classList.add('modal-open');

        // Ensure modal starts at top
        modal.scrollTop = 0;
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');

        // Remove modal scrollbar on mobile
        const modalScrollbar = document.getElementById('modal-fake-scrollbar');
        if (modalScrollbar) {
            modalScrollbar.remove();
        }

        // Restore scroll position
        window.scrollTo(0, savedScrollPosition);
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (lightbox.style.display === 'block') {
                closeLightbox();
            } else if (modal.style.display === 'block') {
                closeModal();
            }
        }
    });

    // Lightbox functions
    function openLightbox(src) {
        lightboxImage.src = src;
        lightbox.style.display = 'block';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImage.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});