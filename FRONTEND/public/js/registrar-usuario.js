document.addEventListener('DOMContentLoaded', () => {
    const formContainers = document.querySelectorAll('.form-container');
    const nextButtons = document.querySelectorAll('.btn-siguiente');
    const prevButtons = document.querySelectorAll('.btn-atras');

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextForm = document.getElementById(button.getAttribute('data-next'));
            const currentForm = button.closest('.form-container');
            currentForm.style.display = 'none';
            nextForm.style.display = 'block';
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevForm = document.getElementById(button.getAttribute('data-prev'));
            const currentForm = button.closest('.form-container');
            currentForm.style.display = 'none';
            prevForm.style.display = 'block';
        });
    });

    // Mostrar el primer formulario al cargar la página
    document.getElementById('form-container-1').classList.add('active');
});