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



// // Gallery Lightbox
// (function() {
//   const galleryItems = document.querySelectorAll('.gallery-item');
//   const lightbox = document.getElementById('lightbox');
  
//   if (!lightbox || galleryItems.length === 0) return;

//   const lightboxImage = lightbox.querySelector('.lightbox-image');
//   const lightboxCaption = lightbox.querySelector('.lightbox-caption');
//   const closeBtn = lightbox.querySelector('.lightbox-close');
//   const prevBtn = lightbox.querySelector('.lightbox-prev');
//   const nextBtn = lightbox.querySelector('.lightbox-next');
  
//   let currentIndex = 0;
//   const images = Array.from(galleryItems).map(item => ({
//     src: item.querySelector('img').src,
//     alt: item.querySelector('img').alt
//   }));
  
//   function showImage(index) {
//     lightboxImage.src = images[index].src;
//     lightboxCaption.textContent = images[index].alt;
//     currentIndex = index;
    
//     // Show/hide navigation buttons
//     prevBtn.style.display = index > 0 ? 'flex' : 'none';
//     nextBtn.style.display = index < images.length - 1 ? 'flex' : 'none';
//   }
  
//   function openLightbox(index) {
//     lightbox.classList.add('active');
//     showImage(index);
//     document.body.style.overflow = 'hidden';
//   }
  
//   function closeLightbox() {
//     lightbox.classList.remove('active');
//     document.body.style.overflow = '';
//   }
  
//   // Event listeners
//   galleryItems.forEach((item, index) => {
//     item.addEventListener('click', () => openLightbox(index));
//   });
  
//   closeBtn.addEventListener('click', closeLightbox);
//   lightbox.addEventListener('click', (e) => {
//     if (e.target === lightbox) closeLightbox();
//   });
  
//   prevBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     if (currentIndex > 0) showImage(currentIndex - 1);
//   });
  
//   nextBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     if (currentIndex < images.length - 1) showImage(currentIndex + 1);
//   });
  
//   // Keyboard navigation
//   document.addEventListener('keydown', (e) => {
//     if (!lightbox.classList.contains('active')) return;
    
//     if (e.key === 'Escape') closeLightbox();
//     if (e.key === 'ArrowLeft' && currentIndex > 0) showImage(currentIndex - 1);
//     if (e.key === 'ArrowRight' && currentIndex < images.length - 1) showImage(currentIndex + 1);
//   });
// })();

// // gallery.js — versão com debug
// document.addEventListener("DOMContentLoaded", () => {
//   try {
//     console.log("[gallery.js] DOMContentLoaded — iniciando script");

//     const galleryItems = document.querySelectorAll(".gallery-item");
//     console.log("[gallery.js] galleryItems encontrados:", galleryItems.length);

//     const modal = document.getElementById("galleryModal");
//     console.log("[gallery.js] modal element:", modal);

//     if (!modal) {
//       console.error("[gallery.js] ERRO: elemento #galleryModal não encontrado");
//       return;
//     }
//     if (!galleryItems || galleryItems.length === 0) {
//       console.error("[gallery.js] ERRO: nenhum .gallery-item encontrado");
//       return;
//     }
  

//     const modalImg = document.getElementById("galleryImage");
//     const modalCaption = document.getElementById("galleryCaption");
//     const btnClose = document.querySelector(".modal-close");
//     const btnPrev = document.querySelector(".gallery-prev");
//     const btnNext = document.querySelector(".gallery-next");

//     console.log("[gallery.js] modalImg, modalCaption, btnClose, btnPrev, btnNext:",
//       !!modalImg, !!modalCaption, !!btnClose, !!btnPrev, !!btnNext);

//     if (!modalImg || !modalCaption || !btnClose || !btnPrev || !btnNext) {
//       console.error("[gallery.js] ERRO: algum elemento do modal não foi encontrado. Verifique IDs/classes no HTML.");
//       return;
//     }

//     let currentIndex = 0;
//     const items = Array.from(galleryItems);

//     function openModal(index) {
//       const item = items[index];
//       if (!item) {
//         console.warn("[gallery.js] openModal: índice inválido", index);
//         return;
//       }
//       console.log("[gallery.js] Abrindo modal com índice", index);
//       const src = item.dataset.image || item.querySelector("img")?.src;
//       const caption = item.dataset.caption || item.querySelector("img")?.alt || "";

//       console.log("[gallery.js] image src:", src, "caption:", caption);

//       modalImg.src = src;
//       modalCaption.textContent = caption;
//       modal.classList.remove("hidden");
//       currentIndex = index;
//       document.body.style.overflow = "hidden";
//     }

//     function closeModal() {
//       console.log("[gallery.js] Fechar modal");
//       modal.classList.add("hidden");
//       document.body.style.overflow = "";
//     }

//     items.forEach((item, index) => {
//       // pequena proteção caso o elemento não seja clicável por cima do overlay
//       item.addEventListener("click", (e) => {
//         console.log("[gallery.js] clique em item", index);
//         openModal(index);
//       });
//     });

//     btnClose.addEventListener("click", (e) => {
//       e.stopPropagation();
//       closeModal();
//     });

//     modal.addEventListener("click", (e) => {
//       if (e.target === modal) {
//         closeModal();
//       }
//     });

//     btnPrev.addEventListener("click", (e) => {
//       e.stopPropagation();
//       currentIndex = (currentIndex - 1 + items.length) % items.length;
//       openModal(currentIndex);
//     });

//     btnNext.addEventListener("click", (e) => {
//       e.stopPropagation();
//       currentIndex = (currentIndex + 1) % items.length;
//       openModal(currentIndex);
//     });

//     document.addEventListener("keydown", (e) => {
//       if (modal.classList.contains("hidden")) return;
//       if (e.key === "Escape") closeModal();
//       if (e.key === "ArrowLeft") btnPrev.click();
//       if (e.key === "ArrowRight") btnNext.click();
//     });

//     console.log("[gallery.js] inicializado com sucesso");
//   } catch (err) {
//     console.error("[gallery.js] Exceção capturada:", err);
//   }
// });
