document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form-login').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es 2xx, lanza un error
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json(); // Si es 2xx, convierte a JSON
        })
        .then(data => {
            if (data.success) {
                localStorage.setItem('token', data.token);
                const payload = JSON.parse(atob(data.token.split('.')[1]));
                alert(`Inicio de sesión exitoso. \nBienvenido, ${payload.username}`);  
                window.location.href = data.redirectUrl;         
            } else {
                alert('Nombre de usuario o contraseña incorrectos');
            }
        })
        .catch(error => console.error('Error al iniciar sesión:', error));
    });
});