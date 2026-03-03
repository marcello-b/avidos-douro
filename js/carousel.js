// Hero Carousel
// (function() {
//   const carousel = document.querySelector('.carousel-container');
//   if (!carousel) return;
  
//   const slides = carousel.querySelectorAll('.carousel-slide');
//   const dots = carousel.querySelectorAll('.carousel-dot');
//   let currentSlide = 0;
//   let autoplayInterval;
  
//   function showSlide(index) {
//     slides.forEach((slide, i) => {
//       slide.classList.remove('active');
//       dots[i].classList.remove('active');
//     });
    
//     slides[index].classList.add('active');
//     dots[index].classList.add('active');
//     currentSlide = index;
//   }
  
//   function nextSlide() {
//     const next = (currentSlide + 1) % slides.length;
//     showSlide(next);
//   }
  
//   function startAutoplay() {
//     autoplayInterval = setInterval(nextSlide, 5000);
//   }
  
//   function stopAutoplay() {
//     clearInterval(autoplayInterval);
//   }
  
//   // Dot navigation
//   dots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//       stopAutoplay();
//       showSlide(index);
//       startAutoplay();
//     });
//   });
  
//   // Initialize
//   showSlide(0);
//   startAutoplay();
  
//   // Pause on hover
//   carousel.addEventListener('mouseenter', stopAutoplay);
//   carousel.addEventListener('mouseleave', startAutoplay);

//   window.addEventListener("load", function () {
//     document.querySelectorAll(".hero-background").forEach(el => {
//         el.style.display = "none";
//         el.offsetHeight; // força reflow
//         el.style.display = "block";
//     });
// });

// })();


// Hero Carousel - iOS Safe Version
(function () {
  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));

  let currentSlide = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000;

  function showSlide(index) {
    if (index === currentSlide) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoplay() {
    stopAutoplay(); // garante que não cria múltiplos timers
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayInterval !== null) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // Navegação pelos dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      showSlide(index);
      startAutoplay();
    }, { passive: true });
  });

  // Compatibilidade iOS (pause quando aba não está visível)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Touch support real (iPhone)
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance < 0) {
      nextSlide();
    } else {
      const prevIndex =
        (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    }

    startAutoplay();
  }

  // Inicialização segura
  function init() {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
    });

    slides[0].classList.add('active');
    dots[0].classList.add('active');
    currentSlide = 0;

    startAutoplay();
  }

  // Aguarda DOM pronto (mais seguro que window.load no iOS)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();