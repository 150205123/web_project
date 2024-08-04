    // Obtener la tabla y el cuerpo de la tabla
    const tablaBody = document.getElementById('tabla-body');

    // Función para agregar una nueva fila a la tabla
    function agregarFila() {
        const fila = document.createElement('tr');
        const cantidadCeldas = tablaBody.rows[0] ? tablaBody.rows[0].cells.length : 16;

        let html = '';
        for (let i = 0; i < cantidadCeldas; i++) {
            html += '<td contentEditable="true"></td>';
        }

        fila.innerHTML = html;
        tablaBody.appendChild(fila);
    }

    // Función para guardar datos en localStorage
    function guardarDatos() {
        const datos = [];
        const filas = tablaBody.rows;
        for (let i = 0; i < filas.length; i++) {
            const fila = filas[i];
            const celdas = fila.cells;
            const filaDatos = [];
            for (let j = 0; j < celdas.length; j++) {
                filaDatos.push(celdas[j].innerText);
            }
            datos.push(filaDatos);
        }
        localStorage.setItem('datosTabla', JSON.stringify(datos));
    }

    // Función para cargar datos desde localStorage
    function cargarDatos() {
        const datos = JSON.parse(localStorage.getItem('datosTabla'));
        if (datos) {
            for (let i = 0; i < datos.length; i++) {
                const filaDatos = datos[i];
                const fila = document.createElement('tr');
                for (let j = 0; j < filaDatos.length; j++) {
                    const celda = document.createElement('td');
                    celda.innerText = filaDatos[j];
                    celda.contentEditable = 'true';
                    fila.appendChild(celda);
                }
                tablaBody.appendChild(fila);
            }
        }
    }

    // Función para limpiar una fila específica
    function limpiarFila() {
        const filaIndex = prompt('Ingrese el número de la fila que desea eliminar (empezando desde 1):');
        const index = parseInt(filaIndex, 10);

        if (!isNaN(index) && index > 0 && index <= tablaBody.rows.length) {
            tablaBody.deleteRow(index - 1); // Resta 1 porque los índices de las filas comienzan en 0
        } else {
            alert('Número de fila inválido');
        }
    }

    // Función para imprimir la página
    function imprimirPagina() {
        window.print();
    }

    
    document.getElementById('agregar-fila').addEventListener('click', agregarFila);
    document.getElementById('guardar').addEventListener('click', guardarDatos);
    document.getElementById('limpiar').addEventListener('click', limpiarFila);
    document.getElementById('imprimir').addEventListener('click', imprimirPagina);

    // Cargar datos al iniciar
    cargarDatos();