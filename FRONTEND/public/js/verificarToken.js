document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debe iniciar sesión para acceder a esta página');
        window.location.href = '/';
        return;
    }

    // Decodificar el token para obtener la información del usuario
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Usuario autenticado:', payload.username, 'Rol:', payload.role);

    // Obtener los roles permitidos desde el atributo data-roles
    const rolesPermitidos = document.body.getAttribute('data-roles').split(',');
    console.log('Roles permitidos:', rolesPermitidos);

    // Verificar si el usuario tiene el rol necesario
    if(rolesPermitidos.includes("*")){
        return;
    }
    else if (!rolesPermitidos.includes(payload.role)) {
        alert('No tiene permiso para acceder a esta página');
        window.location.href = '/';
    }
});