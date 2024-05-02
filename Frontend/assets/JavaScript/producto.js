const rutaIMG = "../img/productos/";

const findID = () => {
  const id = JSON.parse(localStorage.getItem("id-producto"));
  return id
}

const idp = findID();
const idProducto = idp; 

const dataProductos = async (id) => {
  const response = await fetch("../../json/productos.json");
  const data = await response.json();
  const modeloDom = document.getElementById("namezap");
  const precioDom = document.getElementById("priceDom");
  const descripcionDom = document.getElementById("pdescripcion");
  const colorDom = document.getElementById("color-container");
  const tallaDom = document.getElementById("talla-container");
  const imagenesDom = document.querySelector(".mostrador-imagenes");
  const colorSeleccionadaDom = document.getElementById("color-seleccionada");
  const tallaSeleccionadaDom = document.getElementById("talla-seleccionada");
  
  let coloresUnicos = [];
  let productoSeleccionado; // Variable para almacenar el producto actualmente seleccionado

  // Filtrar los datos para obtener solo los relacionados con el modelo específico
  const productosModelo = data.filter(item => item.modelo === data.find(item => item.id === id).modelo);

  // Inicializar el producto seleccionado con el producto que coincide con el ID especificado
  productoSeleccionado = productosModelo.find(item => item.id === id);

  // Función para actualizar todas las imágenes con las del producto seleccionado
  const actualizarImagenes = () => {
    imagenesDom.querySelector("#imagen-principal").src = `../img/productos/${productoSeleccionado.imgMuestra}`;
    imagenesDom.querySelectorAll(".imagen-chica img").forEach((imagen, index) => {
      const imgKey = index === 0 ? "imgLateral" : index === 1 ? "imgMuestra" : index === 2 ? "imgSuperior" : "imgFrontal";
      imagen.src = `../img/productos/${productoSeleccionado[imgKey]}`;
    });
  };

  // Llamar a la función actualizarImagenes al cargar la página para mostrar las imágenes del producto seleccionado
  actualizarImagenes();

  // Recorrer los productos del mismo modelo para obtener los colores únicos
  productosModelo.forEach(producto => {
    if (!coloresUnicos.includes(producto.color)) {
      coloresUnicos.push(producto.color);
    }
  });

  modeloDom.innerHTML = productosModelo[0].modelo; // Asignar el modelo del primer producto
  precioDom.innerHTML = `$${productosModelo[0].precio}.00`; // Asignar el precio del primer producto
  descripcionDom.innerHTML = ` ${productosModelo[0].descripcion}    -   ${productosModelo[0].marca} - ${productosModelo[0].genero}`; // Asignar la descripción del primer producto

  // Limpiar y mostrar los botones de colores únicos
  colorDom.innerHTML = "";
  coloresUnicos.forEach(color => {
    const colorButton = document.createElement("button");
    colorButton.style.backgroundColor = color; 
    colorButton.classList.add("color-btn");
    colorButton.setAttribute("data-color", color);
    if (color === productoSeleccionado.color) {
      colorButton.classList.add('seleccionado');
    }
    colorButton.addEventListener("click", () => {
      // Al hacer clic en el botón de color, se busca el producto correspondiente a ese color
      productoSeleccionado = productosModelo.find(item => item.color === color);
      // Se actualizan todas las imágenes con las del producto seleccionado
      actualizarImagenes();
      // Remover la clase 'seleccionado' de todos los botones de color
      colorDom.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('seleccionado');
      });
      // Agregar la clase 'seleccionado' al botón actual
      colorButton.classList.add('seleccionado');
    });
    colorDom.appendChild(colorButton);
  });

  // Mostrar las tallas (supongo que para todos los productos del mismo modelo son las mismas tallas)
  tallaDom.innerHTML = "";
  if (typeof productosModelo[0].talla === "object") {
    Object.keys(productosModelo[0].talla).forEach(talla => {
      const tallaButton = document.createElement("button");
      tallaButton.textContent = talla;
      tallaButton.classList.add("talla-btn");
      tallaButton.setAttribute("data-talla", talla);
      tallaButton.addEventListener("click", function() {
        // Resaltar el botón seleccionado
        tallaDom.querySelectorAll('.talla-btn').forEach(btn => {
          btn.classList.remove('seleccionado');
        });
        this.classList.add('seleccionado');
        
        // Mostrar la talla seleccionada
        const tallaSeleccionada = this.getAttribute('data-talla');
        tallaSeleccionadaDom.textContent = tallaSeleccionada;

        // Resaltar el botón de color seleccionado
        colorDom.querySelectorAll('.color-btn').forEach(btn => {
          btn.classList.remove('seleccionado');
          if (btn.getAttribute('data-color') === productoSeleccionado.color) {
            btn.classList.add('seleccionado');
          }
        });
      });
      tallaDom.appendChild(tallaButton);
    });
  }

};

dataProductos(idProducto);

/*-------------------------prueba zapatos principal y chicas------------------*/

const imagenesChicas = document.querySelectorAll('.imagen-chica img');

// Agregar evento click a cada imagen chica
imagenesChicas.forEach(imagen => {
    imagen.addEventListener('click', () => {
        const imagenPrincipal = document.getElementById('imagen-principal');
        imagenPrincipal.src = imagen.src;
        imagenPrincipal.alt = imagen.alt;
    });
});

/*-------------boton agregar carrito------------*/

$('.btn-add-to-cart').click(function() {
  // Verificar si se ha seleccionado una talla
  const tallaSeleccionada = document.querySelector('.talla-btn.seleccionado');
  if (!tallaSeleccionada) {
    // Si no se ha seleccionado una talla, mostrar un alert y salir de la función
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Por favor, selecciona una talla antes de agregar al carrito",
      showConfirmButton: false,
      timer: 2000
    });
    return;
  }

  // Si se ha seleccionado una talla, mostrar el mensaje de éxito
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Se ha agregado al carrito",
      showConfirmButton: false,
      timer: 1500
  });
});

/*-----------------productos relacionados------------------ */
const mostrarProductosRelacionados1 = async () => {
  const response = await fetch("../../json/productos.json");
  const data = await response.json();
  const containerProductosRelacionados = document.querySelector(".card-list-products");

  // Generar cuatro números aleatorios únicos entre 0 y la longitud del array de productos
  const indicesAleatorios = [];
  while (indicesAleatorios.length < 4) {
    const indice = Math.floor(Math.random() * data.length);
    if (!indicesAleatorios.includes(indice)) {
      indicesAleatorios.push(indice);
    }
  }

  // Construir el HTML para cada producto aleatorio
  indicesAleatorios.forEach((indice, i) => {
    const producto = data[indice];
    const card = document.createElement("div");
    card.classList.add("card");

    const imagen = document.createElement("div");
    imagen.classList.add("card-img");
    const img = document.createElement("img");
    img.src = `../img/productos/${producto.imgMuestra}`;
    img.alt = `producto-${i + 1}`;
    imagen.appendChild(img);
    card.appendChild(imagen);

    const info = document.createElement("div");
    info.classList.add("info-card");

    const textProduct = document.createElement("div");
    textProduct.classList.add("text-product");
    const h3 = document.createElement("h3");
    h3.textContent = producto.modelo;
    const pCategory = document.createElement("p");
    pCategory.classList.add("category");
    pCategory.textContent = `${producto.marca} - ${producto.genero}`;
    const pPrice = document.createElement("p");
    pPrice.classList.add("price");
    pPrice.textContent = `$${producto.precio}.00`;
    textProduct.appendChild(h3);
    textProduct.appendChild(pCategory);
    textProduct.appendChild(pPrice);
    info.appendChild(textProduct);

    const button = document.createElement("button");
    button.classList.add("btn-add-to-cart");
    button.textContent = "Ver más";

    //Agregar esto en un solo innerHTML
    button.onclick = productoID(producto.id);
    
    // Usar el dataset para almacenar el ID del producto
    button.dataset.productId = producto.id;
    
    info.appendChild(button);

    card.appendChild(info);
    containerProductosRelacionados.appendChild(card);
  });
};

const mostrarProductosRelacionados = async () => {
  const response = await fetch("../../json/productos.json");
  const data = await response.json();
  let cards = "";
  let i = 0;
  while( i < 4 ){
    const random = Math.floor(Math.random()*30);
      cards += `
      <div class="card__lista__productos">
        <div class="col">
            <div class="iconHeart-lista">
                <a onclick="alert(${data[random].id})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg></a>
            </div>
            <div class="imagen-lista">
                <img src="${rutaIMG+data[random].imgMuestra}" class="card-img-top">
            </div>
            <div class="row card-body">
                <div class="list-card-info col-5">
                    <h5 class="list-card-title">${data[random].modelo}</h5>
                    <p class="list-card-text">${data[random].color}</p>
                    <p class="list-card-precio">$${data[random].precio}.00</p>
                </div>
                <div class="list-card-button col-7">
                    <a href="./producto.html" onclick="producto(${data[random].id})">Ver más</a>
                </div>
            </div>
        </div>
      </div>
    `;
    i++;
  }
  document.getElementById("card-list-products").innerHTML = cards;
}

mostrarProductosRelacionados();

// Agregar el evento clic utilizando delegación de eventos
document.querySelector(".card-list-products").addEventListener("click", (event) => {
  // Verificar si el elemento clickeado es un botón "Ver más"
  if (event.target.classList.contains("btn-add-to-cart")) {
    // Obtener el ID del producto del dataset del botón
    const productId = event.target.dataset.productId;
    window.location.href = `producto.html?id=${productId}`;
  }
});

const producto = (id) => {
  //console.log(id)
  const idProducto = id;
  localStorage.setItem("id-producto", JSON.stringify(idProducto));
}