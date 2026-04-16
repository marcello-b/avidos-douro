// Gallery Lightbox
(function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  
  if (!lightbox || galleryItems.length === 0) return;

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  let currentIndex = 0;
  const images = Array.from(galleryItems).map(item => ({
    src: item.dataset.image,
    alt: item.dataset.caption
  }));
  
  function showImage(index) {
    lightboxImage.src = images[index].src;
    lightboxCaption.textContent = images[index].alt;
    currentIndex = index;
    
    // Show/hide navigation buttons
    prevBtn.style.display = index > 0 ? 'flex' : 'none';
    nextBtn.style.display = index < images.length - 1 ? 'flex' : 'none';
  }
  
  function openLightbox(index) {
    lightbox.classList.add('active');
    lightbox.classList.remove('hidden');
    showImage(index);
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }
  
  // Event listeners
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) showImage(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) showImage(currentIndex + 1);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && currentIndex > 0) showImage(currentIndex - 1);
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) showImage(currentIndex + 1);
  });
})();


