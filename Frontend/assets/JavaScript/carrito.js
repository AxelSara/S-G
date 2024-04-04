// Ruta al archivo JSON
const rutaArchivoJSON = 'productos.json';

// Función para cargar y mostrar los datos del JSON
async function cargarDatos() {
    try {
        const response = await fetch(rutaArchivoJSON);
        const datos = await response.json();

        const tabla = document.getElementById('tablaProductos');
        const tbody = tabla.getElementsByTagName('tbody')[0];

        let totalCarrito = 0; // Inicializamos el total

        // Iterar sobre los elementos del JSON y agregarlos a la tabla
        datos.forEach(elemento => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>
                   ${elemento.name}<br>
                   ${elemento.genero}
                   </td>
                
                <td>${elemento.color}</td>     
                <td>${elemento.price}</td>
                <td>${elemento.talla}</td>
                <td>
                    <button onclick="restarCantidad(this)">-</button>
                    <span>1</span>
                    <button onclick="sumarCantidad(this)">+</button>
                </td>
                <td><button onclick="eliminarProducto(${elemento.id}, this)">Eliminar</button></td>
            `;
            tbody.appendChild(fila);

            totalCarrito += parseFloat(elemento.price); // Sumamos el precio al total
        });

        // Actualizamos el total en el footer
        const totalCarritoCell = document.getElementById('totalCarrito');
        totalCarritoCell.textContent = `$${totalCarrito.toFixed(2)}`;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Llamar a la función para cargar los datos cuando se cargue la página
window.onload = cargarDatos;

//----------------------

// Función para restar cantidad
function restarCantidad(button) {
    var spanCantidad = button.parentNode.querySelector('span');
    var cantidad = parseInt(spanCantidad.textContent);
    if (cantidad > 1) {
        spanCantidad.textContent = cantidad - 1;
        actualizarTotal(); // Llamamos a la función para actualizar el total
    }
}

// Función para sumar cantidad
function sumarCantidad(button) {
    var spanCantidad = button.parentNode.querySelector('span');
    var cantidad = parseInt(spanCantidad.textContent);
    spanCantidad.textContent = cantidad + 1;
    actualizarTotal(); // Llamamos a la función para actualizar el total
}

// funcion para eliminar un producto de json segun su id 
function eliminarProducto(id, botonEliminar) {
    // Eliminamos la fila correspondiente al botón eliminar
    const filaAEliminar = botonEliminar.closest('tr');
    filaAEliminar.remove();
    // Actualizamos el total después de eliminar el producto
    actualizarTotal();
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    let totalCarrito = 0;

    const filasProductos = document.querySelectorAll('#tablaProductos tbody tr');
    filasProductos.forEach(fila => {
        const precio = parseFloat(fila.cells[2].textContent); // Obtener el precio de la celda correspondiente
        const cantidad = parseInt(fila.querySelector('span').textContent); // Obtener la cantidad del producto
        totalCarrito += precio * cantidad;
    });

    const totalCarritoCell = document.getElementById('totalCarrito');
    totalCarritoCell.textContent = `$${totalCarrito.toFixed(2)}`;
}

// Función para simular el proceso de pago
function realizarPago() {
    // Aquí podríamos agregar la lógica para procesar el pago
    console.log("Eso es todo, se está realizando el pago...");
}

// Asociamos la función realizarPago al botón de pago
document.getElementById('checkoutBtn').addEventListener('click', realizarPago);