document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.form-container');
    const nextButtons = document.querySelectorAll('.btn-siguiente');
    const prevButtons = document.querySelectorAll('.btn-atras');

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {

            //No funciona como debería, no pasa al siguiente formulario si los campos
            //de entrada estan llenos, lo cual está mal

            const currentForm = this.closest('.form-container');
            const nextFormId = this.getAttribute('data-next');
            const nextForm = document.getElementById(nextFormId);

            if (nextForm) {
                currentForm.classList.remove('active');
                setTimeout(() => {
                    currentForm.style.display = 'none';
                    nextForm.style.display = 'block';
                    setTimeout(() => {
                        nextForm.classList.add('active');
                    }, 10);
                }, 500);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentForm = this.closest('.form-container');
            const prevFormId = this.getAttribute('data-prev');
            const prevForm = document.getElementById(prevFormId);

            if (prevForm) {
                currentForm.classList.remove('active');
                setTimeout(() => {
                    currentForm.style.display = 'none';
                    prevForm.style.display = 'block';
                    setTimeout(() => {
                        prevForm.classList.add('active');
                    }, 10);
                }, 500);
            }
        });
    });

    // Mostrar el primer formulario al cargar la página
    if (forms.length > 0) {
        forms[0].style.display = 'block';
        setTimeout(() => {
            forms[0].classList.add('active');
        }, 10);
    }
});