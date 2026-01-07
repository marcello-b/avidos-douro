// Header Scroll and Mobile Menu
(function() {
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
  
  // Set active link based on current page
  const currentPath = window.location.pathname;
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) || (currentPath === '/br/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


  // Toggle desktop language menu
  document.querySelectorAll('.lang-selector').forEach(selector => {
    const trigger = selector.querySelector('.lang-trigger');
    const menu = selector.querySelector('.lang-menu');

    const closeMenu = () => {
      selector.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = selector.classList.contains('open');
      document.querySelectorAll('.lang-selector.open').forEach(s => {
        s.classList.remove('open');
        const t = s.querySelector('.lang-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        selector.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        closeMenu();
      }
    });

    // Close on outside click or ESC
    document.addEventListener('click', (e) => {
      if (!selector.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Keyboard navigation: Enter/Space open, Tab cycles, Enter activates link
    menu.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          option.click();
        }
      });
    });
  });

  // Example mobile menu toggle (if not implemented)
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', (!expanded).toString());
      mobileMenu.classList.toggle('open');
    });
  }


