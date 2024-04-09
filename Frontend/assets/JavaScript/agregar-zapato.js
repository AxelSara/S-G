document.addEventListener("DOMContentLoaded", async function () {
    const contenedor_principal_agregarZapato = document.querySelector(".contenedor_principal_agregarZapato");
    const inputImgAgregarPrincipal = document.querySelector("#img_captada_principal");
    const inputImgAgregarFrontal = document.querySelector("#img_captada_frontal");
    const inputImgAgregarLateral = document.querySelector("#img_captada_lateral");
    const inputImgAgregarSuperior = document.querySelector("#img_captada_superior");

    const imagenPrincipal = document.getElementById("imagenPrincipal");
    const imagenFrontal = document.getElementById("imagenFrontal");
    const imagenLateral = document.getElementById("imagenLateral");
    const imagenSuperior = document.getElementById("imagenSuperior");

    const btnSubmit = document.querySelector(".btnSubmitAddZapato");
    let tallasSeleccionadas = [];

    // cargar el contenido del archivo JSON existente
    cargarZapatos().then(zapatos => {
        mostrarTaskZapato("Zapatos cargados correctamente", "success");
        console.log("Total de zapatos:", zapatos.length);

        // borrarTodosLosZapatos().then(() => {
        //     console.log("Todos los zapatos han sido borrados.");
            
        // }).catch(error => {
        //     console.error("Error al borrar todos los zapatos:", error);
           
        // });

        // Evento  click del botón
        btnSubmit.addEventListener("click", function (ev) {
            ev.preventDefault();
    
            const nombreZapato = document.getElementById("nombre_zapato_agregar");
            const colorZapato = document.getElementById("color_zapato_agregar");
            const precioZapato = document.getElementById("precio_zapato_agregar");
            const marcaZapato = document.getElementById("marca_zapato_agregar");
            const generoZapato = document.getElementById("genero_zapato_agregar");
    
            const validacion = validarInputs(nombreZapato, colorZapato,precioZapato, marcaZapato,  generoZapato,tallasSeleccionadas, imagenPrincipal.src, imagenFrontal.src, imagenLateral.src, imagenSuperior.src);
            if (validacion) {
                const zapato = {
                    id: zapatos.length + 1,
                    nombre: nombreZapato.value,
                    color: colorZapato.value, 
                    precio: precioZapato.value,
                    marca: marcaZapato.value, 
                    genero: generoZapato.value, 
                    tallas: tallasSeleccionadas,
                    stock: 1,
                    imagen_muestra: imagenPrincipal.src,
                    img_frontal: imagenFrontal.src,
                    img_lateral: imagenLateral.src,
                    img_superior: imagenSuperior.src
                };

                // convertir el objeto zapato a una cadena JSON

                const zapatoJSON = JSON.stringify(zapato);
                console.log("Zapato JSON:", zapatoJSON);
                
                agregarZapatoIndexedDB(zapatoJSON);
                mostrarTaskZapato("Zapato agregado correctamente:", "success", 3000);
            }
        });
    })
    .catch(error => {
        console.error("Error al cargar los zapatos:", error);
    });
    
    




    inputImgAgregarPrincipal.addEventListener("change", function () {
        cambiarImagen(this, imagenPrincipal, "carouselAddZapato");
    });

    inputImgAgregarFrontal.addEventListener("change", function () {
        cambiarImagen(this, imagenFrontal, "carouselAddZapato");
    });

    inputImgAgregarLateral.addEventListener("change", function () {
        cambiarImagen(this, imagenLateral, "carouselAddZapato");
    });

    inputImgAgregarSuperior.addEventListener("change", function () {
        cambiarImagen(this, imagenSuperior, "carouselAddZapato");
    });

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
        });
    });
});




function openDatabase() {
    const dbName = "ZapatosDB";
    const dbVersion = 1;
    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(dbName, dbVersion);

        openRequest.onupgradeneeded = function(event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore("Zapatos", { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("nombre", "nombre", { unique: false });
        };

        openRequest.onsuccess = function(event) {
            db = event.target.result;
            console.log("Base de datos abierta con éxito");
            resolve(db);
        };

        openRequest.onerror = function(event) {
            console.error("Error al abrir la base de datos:", event.target.error);
            reject(event.target.error);
        };
    });
}


async function cargarZapatos() {
    try {
        let db = await openDatabase();
        const transaction = db.transaction(["Zapatos"], "readonly");
        const objectStore = transaction.objectStore("Zapatos");
        const request = objectStore.getAll();

        // TODO: Convertir la solicitud en una promesa
        return new Promise((resolve, reject) => {
            request.onsuccess = function(event) {
                console.log("Zapatos cargados desde IndexedDB:", request.result);
                resolve(request.result); // Resolver la promesa con los resultados
            };

            request.onerror = function(event) {
                console.error("Error al cargar los zapatos desde IndexedDB:", event.target.error);
                reject(event.target.error); // Rechazar la promesa si hay un error
            };
        });
    } catch (error) {
        console.error("Error al abrir la base de datos:", error);
        throw error; // Propagar el error si la base de datos no se puede abrir
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

function cambiarImagen(inputImgZapato, imagenSeleccionada) {
    if (inputImgZapato.files && inputImgZapato.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagenSeleccionada.src = e.target.result;
        };
        reader.readAsDataURL(inputImgZapato.files[0]);
    } else {
        imagenSeleccionada.src = "../img/admin/subir.png";
    }
}

function validarInputs(nombre, talla, precio, imagenPrincipal, imagenFrontal, imagenLateral, imagenSuperior) {
    const imgPredeterminada = "https://zapaterias-s-g.netlify.app/frontend/assets/img/admin/subir.png";
    let validacion = true;
    if (nombre == "" || talla.length === 0 || precio == "") {
        alert("Todos los campos son obligatorios");
        validacion = false;
    }
    if (imagenPrincipal === imgPredeterminada || imagenFrontal === imgPredeterminada ||
        imagenLateral === imgPredeterminada || imagenSuperior === imgPredeterminada) {
        alert("Debe seleccionar las cuatro imágenes");
        validacion = false;
    }
    return validacion;
}

async function agregarZapatoIndexedDB(zapatoJSON) {
    try {
        // Convertir el objeto JSON a un objeto JavaScript
        const zapato = JSON.parse(zapatoJSON);
        const db = await openDatabase();
        const transaction = db.transaction(["Zapatos"], "readwrite");
        const objectStore = transaction.objectStore("Zapatos");
        const request = objectStore.add(zapato);

        request.onsuccess = function(event) {
            console.log("Zapato agregado a IndexedDB con éxito.");
        };

        request.onerror = function(event) {
            console.error("Error al agregar el zapato a IndexedDB:", event.target.error);
        };
    } catch (error) {
        console.error("Error al abrir la base de datos:", error);
    }
}

function mostrarTaskZapato(mensaje, iconoTask, tiempoVisible = 3000) {
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
        icon: iconoTask,
        customClass: {
            popup: 'rounded'
        }
    });
}


async function borrarTodosLosZapatos() {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(["Zapatos"], "readwrite");
        const objectStore = transaction.objectStore("Zapatos");
        const request = objectStore.clear();

        request.onsuccess = function(event) {
            console.log("Todos los zapatos eliminados con éxito.");
        };

        request.onerror = function(event) {
            console.error("Error al eliminar todos los zapatos:", event.target.error);
        };
    } catch (error) {
        console.error("Error al abrir la base de datos:", error);
    }
}
