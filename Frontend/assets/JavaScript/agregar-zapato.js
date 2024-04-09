document.addEventListener("DOMContentLoaded", async function () {

    const contenedor_principal_agregarZapato = document.querySelector(".contenedor_principal_agregarZapato");
    //== Campos de entrada ==
    const inputImgAgregarPrincipal = document.querySelector("#img_captada_principal");
    const inputImgAgregarFrontal = document.querySelector("#img_captada_frontal");
    const inputImgAgregarLateral = document.querySelector("#img_captada_lateral");
    const inputImgAgregarSuperior = document.querySelector("#img_captada_superior");

    //== Imagenes de salida ==
    const imagenSeleccionadaPrincipal = document.getElementById("imagenPrincipal");
    const imagenSeleccionadaFrontal = document.getElementById("imagenFrontal");
    const imagenSeleccionadaLateral = document.getElementById("imagenLateral");
    const imagenSeleccionadaSuperior = document.getElementById("imagenSuperior");

    const btnSubmit = document.querySelector(".btnSubmit");

    //cargar el contenido del archivo JSON existente
    const zapatos = await cargarZapatos();

    console.log("Tipo de zapatos:", typeof zapatos);
    console.log("Total de zapatos:", zapatos.length);

    // remueve los elementos del localStorage
    localStorage.removeItem("zapatos");
    let tallasSeleccionadas = [];

    btnSubmit.addEventListener("click", function (ev) {
        ev.preventDefault();

        // Obtener los valores de los inputs y las imágenes
        const nombre = document.getElementById("nombre_zapato_agregar").value;
        const talla = document.querySelectorAll("input[name='talla']:checked");
        const precio = document.getElementById("precio_zapato_agregar").value;
        const imagenPrincipal = document.getElementById("imagenPrincipal").src;
        const imagenFrontal = document.getElementById("imagenFrontal").src;
        const imagenLateral = document.getElementById("imagenLateral").src;
        const imagenSuperior = document.getElementById("imagenSuperior").src;

        const validacion = validarInputs(nombre, talla, precio, imagenPrincipal, imagenFrontal, imagenLateral, imagenSuperior);
        // validar que todos los campos estén completos 
        if (validacion) {
            // crear un objeto con los datos del formulario
            const zapato = {
                id: zapatos.length + 1,
                nombre: nombreZapato.value,
                color: colorZapato.value,
                precio: precioZapato.value,
                marca: marcaZapato.value,
                genero: generoZapato.value,
                tallas: tallasSeleccionadas,
                stock: 1,
                imagen_muestra: img_principal.src,
                img_frontal: img_frontal.src,
                img_lateral: img_lateral.src,
                img_superior: img_superior.src
            };

            console.log(zapato);

            // agregar el zapato al localStorage
            agregarZapatoLocalStorage(zapato);
            // mostrar notificación de éxito
            mostrarTaskZapato("Zapato agregado correctamente:", 3000);
        }
    });

    // Eventos para los campos de imagen 
    inputImgAgregarPrincipal.addEventListener("change", function () {
        cambiarImagen(this, imagenSeleccionadaPrincipal, "carouselAddZapato");
    });

    inputImgAgregarFrontal.addEventListener("change", function () {
        cambiarImagen(this, imagenSeleccionadaFrontal, "carouselAddZapato");
    });

    inputImgAgregarLateral.addEventListener("change", function () {
        cambiarImagen(this, imagenSeleccionadaLateral, "carouselAddZapato");
    });

    inputImgAgregarSuperior.addEventListener("change", function () {
        cambiarImagen(this, imagenSeleccionadaSuperior, "carouselAddZapato");
    });

    // evento para seleccionar talla
    const checkboxes = document.querySelectorAll('input[name="talla"]');
    const tallaMostradas = document.getElementById('tallas-mostradas');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            tallasSeleccionadas = [];
            checkboxes.forEach(function (cb) {
                if (cb.checked) {
                    tallasSeleccionadas.push(cb.value);
                }
            });
            tallaMostradas.textContent = tallasSeleccionadas.join(', ') || 'Ninguna';

            console.log("total seleccionados", tallasSeleccionadas);

        });

    });

});


async function cargarZapatos() {
    try {
        //cargar el json preveniente del github
        const archivoJsonExistente = await fetch("https://raw.githubusercontent.com/JoceJeronimo/Tamal404/main/Frontend/json/productos.json");
        const archivoJsonExistenteParseado = await archivoJsonExistente.json();
        
        //Imprimir los zapatos
        archivoJsonExistenteParseado.forEach((zapato, index) => {
            console.log(`Zapato ${index + 1}`, zapato);
        });

        return archivoJsonExistenteParseado;
    } 
    catch (error) {
        console.error("Ocurrió un error al cargar los zapatos:", error);
        return null;
    }
}



function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function cambiarImagen(inputImgZapato, imagenSeleccionada, idCarousel) {
    // Verifica si se ha seleccionado un archivo en el input de tipo "file".
    if (inputImgZapato.files && inputImgZapato.files[0]) {
        // Si se seleccionó un archivo, crea un objeto FileReader.
        const reader = new FileReader();

        // Cuando se complete la carga del archivo, esta función se ejecutará.
        reader.onload = function (e) {
            // Cambia la fuente (src) de la imagen "imagenSeleccionada" por la URL del archivo seleccionado.
            imagenSeleccionada.src = e.target.result;
        };

        // Inicia la lectura del archivo como una URL de datos.
        reader.readAsDataURL(inputImgZapato.files[0]);
    } else {
        console.log("No se seleccionó ningún archivo");
        // Si no se selecciona ningún archivo, aquí puedes restablecer la imagen por defecto.
        imagenSeleccionada.src = "../img/admin/subir.png";
    }
}

// ====== validar los campos del formulario ========
function validarInputs(nombre, talla, precio, imagenPrincipal, imagenFrontal, imagenLateral, imagenSuperior) {
    console.log("img principal: " + imagenPrincipal);

    let validacion = true;
    if (nombre == "" || talla.length === 0 || precio == "") {
        alert("Todos los campos son obligatorios");
        validacion = false;
    }
    // Verificar si se han seleccionado las cuatro imágenes
    if (imagenPrincipal === "../img/admin/subir.png" || imagenFrontal === "../img/admin/subir.png" ||
        imagenLateral === "../img/admin/subir.png" || imagenSuperior === "../img/admin/subir.png") {
        console.log("Entro al if de las imagenes");    
        alert("Debe seleccionar las cuatro imágenes");
        validacion = false;
    }

    return validacion;
}

function agregarZapatoLocalStorage(zapato) {
    try {
        // cargar los zapatos existentes del localStorage
        let zapatosExistentes = JSON.parse(localStorage.getItem('zapatos')) || [];
        console.log("tipo de datos de zapatos en agregar: " + typeof zapatosExistentes);
        console.log("=== Zapatos existentes ===");
        zapatosExistentes.push(zapato);
        localStorage.setItem('zapatos', JSON.stringify(zapatosExistentes));
        console.log("zapatos existentes: " + zapatosExistentes);
    } catch (error) {
        console.error("Error al agregar el zapato al localStorage:", error);
    }
}

function mostrarTaskZapato(mensaje, tiempoVisible = 3000) {
    console.log("Entro a mostrar el error");
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: tiempoVisible,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return toast.fire({
        title: mensaje,
        icon: 'success',
        customClass: {
            popup: 'rounded'
        }
    });
}
