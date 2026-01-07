
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const caption = document.querySelector('.carousel-caption');

    const captions = [
        'Vinhedos de Excelência',
        'Tradição e Qualidade',
        'Experiência Premium'
    ];

    let currentSlide = 0;
    let lastCaptionIndex = -1;

    // ---- Atualiza Slide ----
    function showSlide(index) {
        // Corrige loop
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // Remove active anterior
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Ativa slide e dot atual
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Atualiza caption com animação
        updateCaption(index);

        currentSlide = index;
    }

    // ---- Atualiza Caption com fade-up ----
    function updateCaption(index) {
        if (index === lastCaptionIndex) return; // evita piscar
        lastCaptionIndex = index;

        caption.classList.remove('animate-fade-up');
        void caption.offsetWidth; // reseta animação
        caption.textContent = captions[index];
        caption.classList.add('animate-fade-up');
    }

    // ---- Auto Slide ----
    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000); // troca a cada 5s (recomendado)

    // ---- Clique nos Dots ----
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // evita conflito
            showSlide(index);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    });

    // Inicia estado
    showSlide(0);
