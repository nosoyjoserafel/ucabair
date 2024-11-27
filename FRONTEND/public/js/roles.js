let usuarios = [
    { codigo: generarCodigoAleatorio(), nombre: 'Usuario 1', email: 'usuario1@example.com', roles: 'Admin' },
    { codigo: generarCodigoAleatorio(), nombre: 'Usuario 2', email: 'usuario2@example.com', roles: 'User' }
];

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios(usuarios);
});

function cargarUsuarios(usuariosFiltrados = null) {

    const tbody = document.querySelector('#tabla-usuarios tbody');
    tbody.innerHTML = '';

    const usuariosAMostrar = usuariosFiltrados || usuarios;

    usuariosAMostrar.forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.codigo}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.roles}</td>
            <td>
                <button onclick="modificarUsuario('${usuario.codigo}')">Modificar</button>
                <button onclick="eliminarUsuario('${usuario.codigo}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function mostrarFormulario(codigo = '', nombre = '', email = '', roles = '') {
    document.getElementById('codigo-usuario').value = codigo;
    document.getElementById('nombre-usuario').value = nombre;
    document.getElementById('email').value = email;
    document.getElementById('roles').value = roles;
    document.getElementById('form-container-registrar').style.display = 'block';
}

function buscarUsuario() {
    const codigo = document.getElementById('buscar-codigo-usuario').value;
    if (codigo === '') {
        cargarUsuarios();
        return;
    }

    const usuariosFiltrados = usuarios.filter(usuario => usuario.codigo.includes(codigo));
    cargarUsuarios(usuariosFiltrados);
}

function modificarUsuario(codigo) {
    
    const usuario = usuarios.find(usuario => usuario.codigo === codigo);

    if (usuario && usuario.codigo === codigo) {
        document.getElementById('modificar-codigo-usuario').value = usuario.codigo;
        document.getElementById('modificar-nombre-usuario').value = usuario.nombre;
        document.getElementById('modificar-email').value = usuario.email;
        document.getElementById('modificar-roles').value = usuario.roles;
        document.getElementById('form-container-modificar').style.display = 'block';
    } else {
        alert('Usuario no encontrado');
    }
}

function eliminarUsuario(codigo) {
    // Aquí deberías hacer una solicitud al servidor para eliminar el usuario por código
    usuarios.splice(usuarios.findIndex(usuario => usuario.codigo === codigo), 1);
    alert(`Usuario con código ${codigo} eliminado`);
    cargarUsuarios();
}

document.getElementById('usuario-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = document.getElementById('codigo-usuario').value || generarCodigoAleatorio();
    const nombre = document.getElementById('nombre-usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const roles = document.getElementById('roles').value;

    // Aquí deberías hacer una solicitud al servidor para agregar el usuario
    alert(`Usuario con código ${codigo}, nombre ${nombre}, email ${email}, y roles ${roles} guardado`);
    document.getElementById('form-container-registrar').style.display = 'none';
    cargarUsuarios();
});

document.getElementById('modificar-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = document.getElementById('modificar-codigo-usuario').value;
    const nombre = document.getElementById('modificar-nombre-usuario').value;
    const email = document.getElementById('modificar-email').value;
    const password = document.getElementById('modificar-password').value;
    const roles = document.getElementById('modificar-roles').value;

    // Aquí deberías hacer una solicitud al servidor para modificar el usuario
    usuarios = usuarios.map(usuario => usuario.codigo === codigo ? { codigo, nombre, email, roles } : usuario);
    alert(`Usuario con código ${codigo} modificado a nombre ${nombre}, email ${email}, y roles ${roles}`);
    document.getElementById('form-container-modificar').style.display = 'none';
    cargarUsuarios(usuarios);
});

function generarCodigoAleatorio() {
    // Genera un número entero aleatorio entre 100000 y 999999
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
}