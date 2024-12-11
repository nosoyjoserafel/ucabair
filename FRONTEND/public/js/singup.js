document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('usuario-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = 'cliente';

        fetch('/register')
            .then(response => response.json())
            .then(usuarios => {
                const usuarioExistente = usuarios.find(u => u.username === username || u.email === email);
                if (usuarioExistente) {
                    alert('El nombre de usuario o correo ya existe');
                } else {
                    registrarUsuario({ username, email, password, role });
                }
            })
            .catch(error => console.error('Error al verificar el usuario:', error));
    });

    function registrarUsuario(usuario) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('token', data.token);
                const payload = JSON.parse(atob(data.token.split('.')[1]));
                document.getElementById('usuario-form').reset();
                alert(`Se ha registrado con éxito\nBienvenido, ${payload.username}`);
                window.location.href = data.redirectUrl;         
            } else {
                alert('Nombre de usuario o contraseña incorrectos');
            }
        })
        .catch(error => console.error('Error al registrar el usuario:', error));
    }
});