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
const showData = (data,event) => {
    let banner = "";
    return data.reverse().map(dat => {
        for (let i = data.length; i >= 0; i--) {
            if(i == dat.id && i > data.length - 7){
                banner += `
                <div class="swiper-slide cardProductosRecientes">
                    <div class="card-imgProductosRecientes">
                        <img src="./Frontend/assets/img/productos/${dat.imgMuestra}" id="${dat.id}" alt="${dat.imgMuestra}">
                    </div>
                    <div class="contenedor_Botonfavorito">
                        <button class="boton_favorito">
                          <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="row">
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
                                <button class="buy button-pr" onclick="addCartCarrusel(${dat.id})" id=""> Agregar al carrito </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
        }
        document.getElementById("swiper-wrapperProductosRecientes").innerHTML = banner;
    });
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
            <div class="card-zapatoFavorito">
                <div class="card-img-zapato">
                    <img src="${zapatoFavorito.productImg}" alt="Zapato">
                </div>
                <div class="card-description-zapato">
                    </div>
                        <h3>${zapatoFavorito.title}</h3>
                        <p>$${zapatoFavorito.price}</p>
                    </div>
                </div>
            </div>
        `;

        console.log("zapato en index: ", zapatoFavorito);
        contenedorZapatos.appendChild(zapatofavorito, true);
    
        mostrarTaskFavoritos("Agregado a favoritos", "success", "top-end", 3000);
    }
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
