const showData = (data) => {
    let banner = "";
      return data.reverse().map(dat => {
        for (let i = data.length; i >= 0; i--) {
            if(i == dat.id && i > data.length - 7){
                banner += `
                <div class="swiper-slide cardProductosRecientes">
                    <div class="card-imgProductosRecientes">
                        <img src="./Frontend/assets/img/productos/${dat.imgMuestra}" alt="${dat.imgMuestra}">
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
  
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  console.log(carrito);

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
    console.log(carrito);
  }

  const carrusel = async () => {
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    showData(data);
  }
  
  carrusel();