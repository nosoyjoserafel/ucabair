document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('form-container');
    const lugarForm = document.getElementById('lugar-form');
    const modificarFormContainer = document.getElementById('form-modificar-container');
    const modificarLugarForm = document.getElementById('modificar-lugar-form');
    const tablaLugares = document.getElementById('tabla-lugares').getElementsByTagName('tbody')[0];

    lugarForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const tipo = document.getElementById('tipo').value;
        const codigo = document.getElementById('codigo').value || Date.now().toString();

        const lugar = { codigo, nombre, tipo };
        agregarFila(lugar);
        lugarForm.reset();
        formContainer.style.display = 'none';
    });

    modificarLugarForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('modificar-nombre').value;
        const tipo = document.getElementById('modificar-tipo').value;
        const codigo = document.getElementById('modificar-codigo').value;

        const fila = document.querySelector(`tr[data-codigo="${codigo}"]`);
        fila.cells[1].textContent = nombre;
        fila.cells[2].textContent = tipo;

        modificarLugarForm.reset();
        modificarFormContainer.style.display = 'none';
    });

    window.mostrarFormulario = function() {
        formContainer.style.display = 'block';
    };

    window.buscarLugar = function() {
        const buscarCodigo = document.getElementById('buscar-codigo').value.toLowerCase();
        const filas = tablaLugares.getElementsByTagName('tr');
        for (let i = 0; i < filas.length; i++) {
            const codigo = filas[i].getElementsByTagName('td')[0].textContent.toLowerCase();
            if (codigo.includes(buscarCodigo)) {
                filas[i].style.display = '';
            } else {
                filas[i].style.display = 'none';
            }
        }
    };

    function agregarFila(lugar) {
        const fila = tablaLugares.insertRow();
        fila.setAttribute('data-codigo', lugar.codigo);
        fila.insertCell(0).textContent = lugar.codigo;
        fila.insertCell(1).textContent = lugar.nombre;
        fila.insertCell(2).textContent = lugar.tipo;
        const acciones = fila.insertCell(3);

        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Modificar';
        botonModificar.addEventListener('click', function() {
            document.getElementById('modificar-nombre').value = lugar.nombre;
            document.getElementById('modificar-tipo').value = lugar.tipo;
            document.getElementById('modificar-codigo').value = lugar.codigo;
            modificarFormContainer.style.display = 'block';
        });
        acciones.appendChild(botonModificar);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            tablaLugares.deleteRow(fila.rowIndex - 1);
        });
        acciones.appendChild(botonEliminar);
    }
});