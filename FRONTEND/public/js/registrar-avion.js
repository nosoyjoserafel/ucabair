document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('form-container');
    const avionForm = document.getElementById('avion-form');
    const tablaAviones = document.getElementById('tabla-aviones').getElementsByTagName('tbody')[0];

    avionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const descripcion = document.getElementById('descripcion').value;
        const fechaFabricacion = document.getElementById('fecha-fabricacion').value;
        const codigo = document.getElementById('codigo').value || Date.now().toString();

        const avion = { codigo, descripcion, fechaFabricacion };
        agregarFila(avion);
        avionForm.reset();
        formContainer.style.display = 'none';
    });

    window.mostrarFormulario = function() {
        formContainer.style.display = 'block';
    };

    window.buscarAvion = function() {
        const buscarCodigo = document.getElementById('buscar-codigo').value.toLowerCase();
        const filas = tablaAviones.getElementsByTagName('tr');
        for (let i = 0; i < filas.length; i++) {
            const codigo = filas[i].getElementsByTagName('td')[0].textContent.toLowerCase();
            if (codigo.includes(buscarCodigo)) {
                filas[i].style.display = '';
            } else {
                filas[i].style.display = 'none';
            }
        }
    };

    function agregarFila(avion) {
        const fila = tablaAviones.insertRow();
        fila.insertCell(0).textContent = avion.codigo;
        fila.insertCell(1).textContent = avion.descripcion;
        fila.insertCell(2).textContent = avion.fechaFabricacion;
        const acciones = fila.insertCell(3);
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            tablaAviones.deleteRow(fila.rowIndex - 1);
        });
        acciones.appendChild(botonEliminar);
    }
});