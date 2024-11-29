document.addEventListener('DOMContentLoaded', () => {
    cargarEmpleados();
});

let empleados = [
    { codigo: generarCodigoAleatorio(), nombre: 'Empleado 1', apellido: 'Apellido 1', experiencia: '5 años' },
    { codigo: generarCodigoAleatorio(), nombre: 'Empleado 2', apellido: 'Apellido 2', experiencia: '3 años' }
];

function cargarEmpleados(empleadosFiltrados = null) {
    // Aquí deberías hacer una solicitud al servidor para obtener los empleados desde la base de datos

    const tbody = document.querySelector('#tabla-empleados tbody');
    tbody.innerHTML = '';

    const empleadosAMostrar = empleadosFiltrados || empleados;

    empleadosAMostrar.forEach(empleado => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${empleado.codigo}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellido}</td>
            <td>${empleado.experiencia}</td>
            <td>
                <button onclick="modificarEmpleado('${empleado.codigo}')">Modificar</button>
                <button onclick="eliminarEmpleado('${empleado.codigo}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function mostrarFormulario(codigo = '', nombre = '', apellido = '', experiencia = '') {
    document.getElementById('codigo').value = codigo || generarCodigoAleatorio();
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('experiencia').value = experiencia;
    document.getElementById('form-container-registrar').style.display = 'block';
}

function cerrarFormulario() {
    document.getElementById('form-container-registrar').style.display = 'none';
}

function buscarEmpleado() {
    const codigo = document.getElementById('buscar-codigo-empleado').value;
    if (codigo === '') {
        cargarEmpleados();
        return;
    }

    // Aquí deberías hacer una solicitud al servidor para buscar el empleado por código

    const empleadosFiltrados = empleados.filter(empleado => empleado.codigo.includes(codigo));
    cargarEmpleados(empleadosFiltrados);
}

function modificarEmpleado(codigo) {
    // Aquí deberías hacer una solicitud al servidor para obtener los datos del empleado por código

    const empleado = empleados.find(empleado => empleado.codigo === codigo);

    if (empleado && empleado.codigo === codigo) {
        document.getElementById('codigo').value = empleado.codigo;
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('apellido').value = empleado.apellido;
        document.getElementById('experiencia').value = empleado.experiencia;
        document.getElementById('form-container-registrar').style.display = 'block';
    } else {
        alert('Empleado no encontrado');
    }
}

function eliminarEmpleado(codigo) {
    // Aquí deberías hacer una solicitud al servidor para eliminar el empleado por código
    alert(`Empleado con código ${codigo} eliminado`);
    cargarEmpleados();
}

document.getElementById('empleado-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('e-mail').value;
    const user = document.getElementById('user').value;
    const fNac = document.getElementById('f-nac').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const estCivil = document.getElementById('est-civil').value;
    const direccion = document.getElementById('direccion').value;
    const experiencia = document.getElementById('experiencia').value;

    // Aquí deberías hacer una solicitud al servidor para agregar el empleado
    empleados.map(empleado => empleado.codigo === codigo ? { codigo, nombre, apellido, experiencia } : empleado); //no modifica
    alert(`Empleado con código ${codigo}, nombre ${nombre}, apellido ${apellido}, y experiencia ${experiencia} guardado`);
    document.getElementById('form-container-registrar').style.display = 'none';
    cargarEmpleados(empleados);
});

function generarCodigoAleatorio() {
    // Genera un número entero aleatorio entre 100000 y 999999
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
}