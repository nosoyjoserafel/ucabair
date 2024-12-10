document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debe iniciar sesión para acceder a esta página');
        window.location.href = '/';
        return;
    }

    // Decodificar el token para obtener la información del usuario
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Verificar si el token ha expirado
    const expiracion = new Date(payload.exp * 1000);
    if (expiracion < new Date()) {
        alert('El token ha expirado');
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
    }    
});