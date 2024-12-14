document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.img-carousel');
    let currentIndex = 0;
    let interval;

    const showCarousel = (index) => {
        carousels.forEach((carousel, i) => {
            carousel.classList.remove('active');
            if (i === index) {
                carousel.classList.add('active');
            }
        });
    };

    const startCarousel = () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % carousels.length;
            showCarousel(currentIndex);
        }, 7000);
    };

    const stopCarousel = () => {
        clearInterval(interval);
    };

    const moveSlide = (direction) => {
        stopCarousel(); // Detener el carrusel al cambiar de slide
        if (direction === 'next') {
            console.log('next');
            currentIndex = (currentIndex + 1) % carousels.length;
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + carousels.length) % carousels.length;
        }
        showCarousel(currentIndex);
        startCarousel(); // Reiniciar el carrusel
    };

    carousels.forEach(carousel => {
        carousel.addEventListener('mouseover', stopCarousel);
        carousel.addEventListener('mouseout', startCarousel);
    });

    // Agregar eventos a los botones
    document.getElementById('prevSlide').addEventListener('click', () => moveSlide('prev'));
    document.getElementById('nextSlide').addEventListener('click', () => moveSlide('next'));

    showCarousel(currentIndex);
    startCarousel();
});