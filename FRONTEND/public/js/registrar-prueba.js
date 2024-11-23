function generarCodigo() {
    return (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
}

let pruebas = [ //borrar esto cuando se implemente la bd
    { codigo: generarCodigo(), nombre: 'Prueba 1' },
    { codigo: generarCodigo(), nombre: 'Prueba 2' }
];

document.addEventListener('DOMContentLoaded', () => {
    cargarPruebas(pruebas);
});

function cargarPruebas(pruebas) {
    // Aquí deberías se hace la solicitud al servidor para obtener las pruebas desde la base de datos

    //Ejemplo de pruebas

    const tbody = document.querySelector('#tabla-pruebas tbody');
    tbody.innerHTML = '';

    pruebas.forEach(prueba => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${prueba.codigo}</td>
            <td>${prueba.nombre}</td>
            <td>
                <button onclick="modificarPrueba('${prueba.codigo}')">Modificar</button>
                <button onclick="eliminarPrueba('${prueba.codigo}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function agregarPrueba(codigo, nombre) {
    const nuevaPrueba = { codigo: codigo, nombre: nombre };
    pruebas.push(nuevaPrueba); //esto cambia cuando se conecte la bd
}

function mostrarFormulario(codigo = '', nombre = '') {
    document.getElementById('codigo').value = codigo;
    document.getElementById('nombre').value = nombre;
    document.getElementById('form-container').style.display = 'block';
}

function buscarPrueba() {
    const codigo = document.getElementById('buscar-codigo').value;
    if (codigo === '') {
        cargarPruebas(pruebas);
        return;
    }

    // Aquí deberías hacer una solicitud al servidor para buscar la prueba por código

    const pruebasFiltradas = pruebas.filter(prueba => prueba.codigo.includes(codigo));
    cargarPruebas(pruebasFiltradas);
}

function modificarPrueba(codigo) {
    // Aquí deberías hacer una solicitud al servidor para obtener los datos de la prueba por código
    
    //Ejemplo
    const prueba = { codigo: '001', nombre: 'Prueba 1' }; // Ejemplo de datos de prueba

    if (prueba && prueba.codigo === codigo) {
        mostrarFormulario(prueba.codigo, prueba.nombre);
    } else {
        alert('Prueba no encontrada');
    }
}

function eliminarPrueba(codigo) {
    // Aquí deberías hacer una solicitud al servidor para eliminar la prueba por código

    alert(`Prueba con código ${codigo} eliminada`);
    cargarPruebas();
}

document.getElementById('prueba-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const codigo = generarCodigo();
    const nombre = document.getElementById('nombre').value;

    // Aquí deberías hacer una solicitud al servidor para agregar o modificar la prueba
    agregarPrueba(codigo, nombre);
    alert(`Prueba con código ${codigo} y nombre ${nombre} guardada`);
    document.getElementById('form-container').style.display = 'none';
    cargarPruebas(pruebas);
});