// Ruta al archivo JSON
const rutaArchivoJSON = '../../json/productos.json';
const cartLocalStorage = JSON.parse(localStorage.getItem("carrito"));

// Función para cargar y mostrar los datos del JSON
async function cargarDatos() {
    try {
        const response = await fetch(rutaArchivoJSON);
        const datos = await response.json();

        const tabla = document.getElementById('tablaProductos');
        const tbody = tabla.getElementsByTagName('tbody')[0];

        let totalCarrito = 0; // Inicializamos el total

        // Iterar sobre los elementos del JSON y agregarlos a la tabla
        cartLocalStorage.forEach(elemento => {
            const fila = document.createElement('tr');

            // Crear el elemento img y establecer su atributo src
            const img = document.createElement('img');
            img.src = "../img/productos/" + elemento.imgMuestra;
            img.alt = "Imagen del producto";
            img.classList.add('producto-imagen'); // Añadir una clase específica

            // Insertar el elemento img en el primer td
            const tdImg = document.createElement('td');
            tdImg.appendChild(img);
            fila.appendChild(tdImg);

            // Añadir los demás td con la información
            const tdInfo = document.createElement('td');
            tdInfo.innerHTML = `
                ${elemento.modelo}<br>
                ${elemento.genero}
            `;
            fila.appendChild(tdInfo);

            const tdColor = document.createElement('td');
            tdColor.textContent = elemento.color;
            fila.appendChild(tdColor);

            const tdPrecio = document.createElement('td');
            tdPrecio.textContent = `$${elemento.precio}.00`; // Fatla agregar signo de peso y agregar centavos
            fila.appendChild(tdPrecio);

            
            
            const tdTalla = document.createElement('td');
            // tdTalla.textContent = elemento.talla;
            tdTalla.innerHTML = `
                <select name="pets" id="talla-select" class="tallas-select">
                <option value="">--Selecciona una talla--</option>
                <option value="24">24</option>
                <option value="24.5">24.5</option>
                <option value="25">25</option>
                <option value="25.5">25.5</option>
                <option value="26">26</option>
                <option value="26.5">26.5</option>
                <option value="27">27</option>
                <option value="27.5">27.5</option>
                <option value="28">28</option>
                <option value="28.5">28.5</option>
                <option value="29">29</option>
                <option value="29.5">29.5</option>
                <option value="30">30</option>
            </select>
            `;
            fila.appendChild(tdTalla);

            const tdCantidad = document.createElement('td');
            tdCantidad.innerHTML = `
                <button class="buttonsumaresta" onclick="restarCantidad(this)">-</button>
                <span>1</span>
                <button class="buttonsumaresta" onclick="sumarCantidad(this)">+</button>
            `;
            fila.appendChild(tdCantidad);

            const tdEliminar = document.createElement('td');
            tdEliminar.innerHTML = `<button onclick="eliminarProducto(${elemento.id}, this)">Eliminar</button>`;
            fila.appendChild(tdEliminar);

            tbody.appendChild(fila);

            totalCarrito += parseFloat(elemento.precio); // Sumamos el precio al total
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
        actualizarTotal(); 
    }
}

// Función para sumar cantidad
function sumarCantidad(button) {
    var spanCantidad = button.parentNode.querySelector('span');
    var cantidad = parseInt(spanCantidad.textContent);
    spanCantidad.textContent = cantidad + 1;
    actualizarTotal(); 
}

const carrito = JSON.parse(localStorage.getItem("carrito"));

// Función para eliminar un producto de JSON según su id 
function eliminarProducto(id, botonEliminar) {
    let i = 0;
    console.log(carrito)
    carrito.map( cart => {
        if(id != cart.id ) i++;
        else if(id == cart.id){
            console.log(carrito[i]);
            carrito.splice(i, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    })
    // Eliminamos la fila correspondiente al botón eliminar
    const filaAEliminar = botonEliminar.closest('tr');
    filaAEliminar.remove();
    actualizarTotal();
    
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    let totalCarrito = 0;

    const filasProductos = document.querySelectorAll('#tablaProductos tbody tr');
    filasProductos.forEach(fila => {
        const precioTexto = fila.cells[3].textContent; 
        const precio = parseFloat(precioTexto.replace('$', '')); 
        const cantidad = parseInt(fila.querySelector('span').textContent); 
        totalCarrito += precio * cantidad;
    });

    const totalCarritoCell = document.getElementById('totalCarrito');
    totalCarritoCell.textContent = `$${totalCarrito.toFixed(2)}`;
}

// Función para realizar el pago y limpiar el carrito
function realizarPago() {
    const tallaSelect = [];
    let cartOk = true;
    const tallas = document.getElementsByClassName("tallas-select");
    for (let i = 0; i < tallas.length; i++) {
        tallaSelect.push(tallas[i].value)
    }
    tallaSelect.map(talla => {
        if(talla == ""){
            Swal.fire("Asegúrese de seleccionar las tallas");
            cartOk = false;
        }
    })
    if(cartOk == true) window.location.href = "./detalles-compra.html";
    
    console.log("Eso es todo, se está realizando el pago...");

}

// Verificar si esta loggeado el usuario
const verLogin = async () => {
    const user = JSON.parse(localStorage.getItem("usuarioActual"));
    
    if(user == []){
        console.log("Redirigir a log")
    }else{
        console.log(user);
    }
    realizarPago();
}

// Agregar el evento click al botón de checkout para llamar a la función realizarPago
document.getElementById('checkoutBtn').addEventListener('click', realizarPago);

// // boton pagar reaccion alert modo alan 
// $('.checkout-btn').click(function() {
//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Tu pago se ha realizado con éxito",
//       showConfirmButton: false,
//       timer: 1500
//     });
//     // Aquí puedes agregar cualquier otra acción que necesites realizar después de que se haya hecho el pago
//   });