const verficarUserLog = () => {
    const user = JSON.parse(localStorage.getItem("usuarioLog"));

    // Obtener la URL completa del documento actual
    let currentHTML = document.URL;

    // Obtener el nombre del archivo HTML actual
    let fileName = currentHTML.substring(currentHTML.lastIndexOf('/') + 1);
    
    
    if(fileName == "index.html" || fileName == ""){
        console.log(fileName)
        if(user == null){
            console.log("Redirigir a log")
            window.location.href = "./Frontend/assets/pages/loginRegistro.html";
        }else{
            console.log(user);
            window.location.href = "./Frontend/assets/pages/carrito.html";
        }
    }else{
        console.log(fileName)
        if(user == null){
            console.log("Redirigir a log")
            window.location.href = "./loginRegistro.html";
        }else{
            console.log(user);
            window.location.href = "./carrito.html";
        }
    }
    
}


document.addEventListener('DOMContentLoaded', function () {
    const listaElementosNavbar = document.querySelector(".listaElementosNavbar");
    const botonFavoritoNavbar = document.querySelector(".botonFavoritoNavbar");

    // Crear el contenedor de favoritos una sola vez al cargar la página
    cargarContenedorFavoritos("oculto");

    console.log("===== cargando navbar ======")

    // Verificar si usuario logeado es el admin
    const isAdmin = true;

    if (isAdmin) {
        const adminSection = document.createElement('li');
        adminSection.innerHTML = `
            <a id="navbarAdmin" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Admin" class="icon" href="./Frontend/assets/pages/admin.html" style="color: black;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-person-gear" viewBox="0 0 16 16"> 
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/> 
                </svg>
            </a>
        `;

        adminSection.classList.add("adminSection");

        if(!document.querySelector(".banner")) {
            // acceder a la etiqueta a de adminSection
            const enlaceAdminSection = adminSection.querySelector("#navbarAdmin");
            enlaceAdminSection.href = "../pages/admin.html"; 
        }

        
        listaElementosNavbar.appendChild(adminSection);
    
        // Inicializa el tooltip
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Evento click boton favorito
    botonFavoritoNavbar.addEventListener("click", function (event) {
        // Prevenir la propagación del evento de clic para evitar que se active el menú hamburguesa
        event.stopPropagation();
        console.log("click navbar favoritos");
        cargarContenedorFavoritos("visible");
    });

    // Event listener para el evento 'resize' de la ventana
    window.addEventListener('resize', function() {
        // Verifica el ancho de la ventana
        if (window.innerWidth > 350) { 
            eliminarContenedorFavoritos();
        }
    });

    const btnHamburguesa = document.querySelector('.btnHamburguesa');

    // Función para eliminar el contenedor de favoritos
    function eliminarContenedorFavoritos() {
        const contenedorFavoritos = document.querySelector('.contenedorFavoritos')
        if (contenedorFavoritos) {
            console.log("click navbar favoritos --- Eliminar contenedor de favoritos");
            contenedorFavoritos.remove();
        }
    }

    // Event listener para el evento de clic del botón del menú hamburguesa
    btnHamburguesa.addEventListener('click', eliminarContenedorFavoritos);
});

function cargarContenedorFavoritos(valor) {
    const contenedorFavoritosExistente = document.querySelector(".contenedorFavoritos");

    if (!contenedorFavoritosExistente) {
        // Crear el contenedor de favoritos si no existe
        const contenedorFavoritos = document.createElement("div");
        contenedorFavoritos.className = "contenedorFavoritos";

        contenedorFavoritos.innerHTML = `

            <div class="row">
                
                <div class="col-10">
                    <h3>Favoritos</h3>
                </div>

                <!-- icono de cerrar el contenedor de favoritos -->
                <div class="col-2 text-end">
                    <div class="cerrarContenedorFavoritos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                            <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 contenedorZapatosFavoritos">
                </div>
            </div>

        `;
        // Añadir el contenedor al DOM
        document.body.appendChild(contenedorFavoritos);
        contenidoFavoritos();


        const cerrarContenedorFavoritos = document.querySelector(".cerrarContenedorFavoritos");
        cerrarContenedorFavoritos.addEventListener("click", function () {
            const contenedorFavoritos = document.querySelector(".contenedorFavoritos");
            contenedorFavoritos.remove();
        });

        // Cierra el menú hamburguesa si está abierto
        const navbar = document.getElementById("navbarSupportedContent");
        if (navbar.classList.contains("show")) {
            navbar.classList.remove("show");
        }



    }

    // Mostrar u ocultar el contenedor según el valor
    const contenedorFavoritos = document.querySelector(".contenedorFavoritos");
    if (valor === "visible") {
        contenedorFavoritos.style.visibility = "visible";
    } else {
        contenedorFavoritos.style.visibility = "hidden";
    }

    // cerrar la navbar al 
        // const zapatosFavoritos = document.querySelectorAll(".zapatoFavorito");
        // zapatosFavoritos.forEach(function (zapato) {
        //     zapato.addEventListener("click", function () {
        //         const contenedorFavoritos = document.querySelector(".contenedorFavoritos");
        //         contenedorFavoritos.remove();
        //     });
        // });


}


function contenidoFavoritos() {
    console.log("====== cargando contenido favoritos ========");
    const zapatosFavoritos = JSON.parse(localStorage.getItem("zapatosFavoritos") || "[]");

    console.log("=========== zapatos existentes  ================");
    console.log("Zapatos existentes: ", zapatosFavoritos);

    const contenedorZapatosFavoritos = document.querySelector(".contenedorZapatosFavoritos");

    zapatosFavoritos.forEach(function (zapato) { // Cambio aquí
        const zapatoCard = document.createElement("div");
        zapatoCard.className = "zapatoFavorito mt-3";
        zapatoCard.innerHTML = `
        <div class="row zapatoFavorito mt-3">
            <div class="col-6 card-img-zapato">
                <img src="${zapato.productImg}" alt="Zapato"> 
            </div>
            <div class="col-6 card-description-zapato">
                <h3>${zapato.title}</h3> 
                <p>${zapato.price}</p> 
            </div>
        <div class="col-12">
            <button class="col-12 btn btn-success btnAgregar" onclick="addCarritoFav(${zapato.id})" data-id="${zapato.id}">Agregar</button>
            <div class="contenedorBotonQuitarFavorito mt-2">
                <button class="btnQuitarFavorito" onclick="removeCarritoFav(${zapato.id})" data-id="${zapato.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    
    
        `;
        contenedorZapatosFavoritos.appendChild(zapatoCard);
    });

}

function cerrarContenedorFavoritos() {

}

const carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
const addCarritoFav = async (id) => {
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    data.map(dat => {
        if(id == dat.id){
            carritoLocalStorage.push({
                "id": dat.id,
                "modelo": dat.modelo,
                "color": dat.color,
                "genero": dat.genero,
                "talla": 7,
                "precio": dat.precio,
                "marca": dat.marca,
                "imgMuestra": dat.imgMuestra,
                "imgLateral": dat.imgLateral,
                "imgFrontal": dat.imgFrontal,
                "imgSuperior": dat.imgSuperior
            })
        }
    });
    localStorage.setItem("carrito", JSON.stringify(carritoLocalStorage));
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Agregado al carrito"
      });
      removeCarritoFav(id)
}

const favoritosLocalStorage = JSON.parse(localStorage.getItem("zapatosFavoritos"));
const removeCarritoFav = (id) => {
    let index = 0;
    console.log(favoritosLocalStorage)
    favoritosLocalStorage.map(cart => {
        if(id != cart.id) index++;
        else if(id == cart.id){
            // console.log(cart);
            console.log(index);
            console.log(favoritosLocalStorage[index])
            favoritosLocalStorage.splice(index, 1);
            localStorage.setItem("zapatosFavoritos", JSON.stringify(favoritosLocalStorage));
            document.querySelector(".contenedorZapatosFavoritos").innerHTML="";
            contenidoFavoritos();
        }
    })
}