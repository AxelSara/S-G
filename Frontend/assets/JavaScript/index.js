document.addEventListener('DOMContentLoaded', function(event){
    // Asegúrate de que el elemento exista antes de intentar interactuar con él
    const swiperWrapperProductosRecientes = document.getElementById("swiper-wrapperProductosRecientes");
    if (swiperWrapperProductosRecientes) {
        carrusel(event);
    } else {
        console.error("El elemento swiper-wrapperProductosRecientes no se encontró en el DOM.");
    }

});

// ===================== Sección carrousel ===============
const showData = (data, event) => {
    const banner = document.querySelector("#swiper-wrapperProductosRecientes");

    console.log("========== banner ===========");
    // console.log("banner: ", banner);

    data.reverse().forEach(dat => {
        for (let i = data.length; i >= 0; i--) {
            if (i == dat.id && i > data.length - 7) {
                const cardProductos = document.createElement("div");
                cardProductos.classList.add("swiper-slide");
                cardProductos.classList.add("cardProductosRecientes");

                cardProductos.innerHTML = `
                    <div class="contenedor_Botonfavorito">
                        <button class="boton_favorito">
                          <i class="fas fa-heart"></i>
                        </button>
                    </div>

                    <div class="card-imgProductosRecientes">
                        <img src="./Frontend/assets/img/productos/${dat.imgMuestra}" id="${dat.id}" alt="${dat.imgMuestra}">
                    </div>

                    <div class="row card-datosProductosRecientes">
                        <div class="card-description col-5">
                            <div class="card-title">
                                <h4>${dat.modelo} ${dat.color}</h4>
                            </div>
                            <div class="card-text">
                                <p>$${dat.precio}.00</p>
                            </div>
                        </div>
                        <div class="carrito-button col-7">   
                            <div class="card-link">
                                <!-- <button class="buy button-pr" onclick="addCartCarrusel(${dat.id})" id=""> Agregar al carrito </button> -->
                                <button class="buy button-pr" onclick="productoLS(${dat.id})" id="">
                                    <a href="./Frontend/assets/pages/producto.html">Ver más</a>
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                banner.appendChild(cardProductos);
            }
        }
    });
}

const productoLS = (id) => {
    console.log(id)
    const idProducto = id;
    localStorage.setItem("id-producto", JSON.stringify(idProducto));
}


function addZapatoFavorito(button) {

    // busca el elemento padre del DOM que contiene la información del zapato seleccionado
    let shopProducts = button.closest('.cardProductosRecientes');

    if (shopProducts) {
        let id = shopProducts.querySelector('img').id;
        let title = shopProducts.querySelector('.card-description .card-title h4').innerText;
        let price = shopProducts.querySelector('.card-description .card-text p').innerText;
        let productImg = shopProducts.querySelector('img').src;


        // Crea el objeto ZapatoFavorito
        const zapatoFavorito = {
            id: id,
            title: title,
            price: price,
            productImg: productImg
        };

        console.log(zapatoFavorito);
        guardarZapatoFavorito(zapatoFavorito);
        
    }

}

function guardarZapatoFavorito(zapatoFavorito) {

    // borrar los elementos del localStorage
    // localStorage.removeItem("zapatosFavoritos");

    let zapatosFavoritos = JSON.parse(localStorage.getItem("zapatosFavoritos") || "[]");

    console.log("zapatosFavoritos:", zapatosFavoritos);
    // verifica si el zapato ya existe en el localStorage
    const zapatoAgregado = zapatosFavoritos.some((zapato) => zapato.id === zapatoFavorito.id);
    if (zapatoAgregado) {
        mostrarTaskFavoritos("El zapato ya fue agregado", "error");
    }

    else{
        // Agregar el nuevo zapato al array existente o crear uno nuevo
        zapatosFavoritos.push(zapatoFavorito);
        // actualizar el localStorage con el nuevo array
        localStorage.setItem("zapatosFavoritos", JSON.stringify(zapatosFavoritos));
        console.log("========== zapatosFavoritos ===========");
        console.log("zapatosFavoritos:", zapatosFavoritos);
        const contenedorZapatos = document.querySelector(".contenedorFavoritos");

        if (!contenedorZapatos) {
            console.error("El contenedor de zapatos favoritos no se encontró en el DOM.");
            return; 
        }

        console.log("contenedor zapatos en index: ", contenedorZapatos);

        const zapatofavorito  = document.createElement("div");
        zapatofavorito.className = "zapatofavorito mt-3";

        zapatofavorito.innerHTML = `
            <!-- <div class="card-zapatoFavorito">
                <div class="card-img-zapato">
                    <img src="${zapatoFavorito.productImg}" alt="Zapato">
                </div>
                <div class="card-description-zapato">
                    </div>
                        <h3>${zapatoFavorito.title}</h3>
                        <p>$${zapatoFavorito.price}</p>
                    </div>
                </div>
            </div> -->
            <div class="row zapatoFavorito mt-3">
                <div class="col-6 card-img-zapato">
                    <img src="${zapatoFavorito.productImg}" alt="Zapato"> 
                </div>
                <div class="col-6 card-description-zapato">
                    <h3>${zapatoFavorito.title}</h3> 
                    <p>${zapatoFavorito.price}</p> 
                </div>
            <div class="col-12">
                <button class="col-12 btn btn-success btnAgregar" onclick="addCarritoFav(${zapatoFavorito.id})" data-id="${zapatoFavorito.id}">Agregar</button>
                <div class="contenedorBotonQuitarFavorito mt-2">
                    <button class="btnQuitarFavorito" onclick="removeCarritoFav(${zapatoFavorito.id})" data-id="${zapatoFavorito.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                            <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        console.log("zapato en index: ", zapatoFavorito);
        contenedorZapatos.appendChild(zapatofavorito, true);
    
        mostrarTaskFavoritos("Agregado a favoritos", "success", "top-end", 3000);
    }
}

function alert() {
    const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return toast.fire({
        title: "Añadido a favoritos",
        icon: "success",
        customClass: {
            popup: 'rounded'
        }
    });
}

const carrito = JSON.parse(localStorage.getItem("carrito"));

  const addCartCarrusel = async (id) =>{
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    for (const product of data) {
        if(id == product.id){
            cart.push({
                "id": product.id,
                "modelo": product.modelo,
                "color": product.color,
                "genero": product.genero,
                "talla": 7,
                "precio": product.precio,
                "marca": product.marca,
                "imgMuestra": product.imgMuestra,
                "imgLateral": product.imgLateral,
                "imgFrontal": product.imgFrontal,
                "imgSuperior": product.imgSuperior
            });
        }
    }
    localStorage.setItem("carrito", JSON.stringify(cart));
    alert()
  }

  const carrusel = async (event) => {
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    showData(data,event);
    // Evento para favoritos
    const btns = document.querySelectorAll(".boton_favorito");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        addZapatoFavorito(btn);
      });
    });
    
  }
  
  
function mostrarTaskFavoritos(mensaje, iconoTask, position = "top-end", tiempoVisible = 4000) {
    const toast = Swal.mixin({
        toast: true,
        position: position,
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
            popup: 'swiper-container'
        }
    });
}
