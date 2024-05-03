const idProducto = 0;

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
   
    const carruselIndicadores = document.getElementById('carrusel-indicadores');
    const imagenesChicas = document.querySelectorAll('.imagen-chica img');
    const imagenPrincipal = document.getElementById('imagen-principal');
    const imagenActual = Array.from(imagenesChicas).findIndex(img => img.src === imagenPrincipal.src);

    carruselIndicadores.innerHTML = '';

    for (let i = 0; i < imagenesChicas.length; i++) {
        const indicador = document.createElement('span');
        indicador.classList.add('carrusel-indicador');
        if (i === imagenActual) {
            indicador.classList.add('activo'); // Resaltar el indicador correspondiente a la imagen actual
        }
        carruselIndicadores.appendChild(indicador);
    }
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

  // Mostrar las tallas 
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

// Función para cambiar la imagen principal
const cambiarImagenPrincipal = (nuevaImagenSrc, nuevaImagenAlt) => {
    const imagenPrincipal = document.getElementById('imagen-principal');
    const imagenActual = imagenPrincipal.src;
    const imagenesChicas = document.querySelectorAll('.imagen-chica img');
    
    // Buscar la imagen chica correspondiente a la nueva imagen principal
    const imagenChicaCorrespondiente = Array.from(imagenesChicas).find(img => img.src === nuevaImagenSrc);

    // Cambiar la imagen principal solo si la nueva imagen es diferente a la actual
    if (imagenActual !== nuevaImagenSrc) {
        imagenPrincipal.src = nuevaImagenSrc;
        imagenPrincipal.alt = nuevaImagenAlt;

        // Actualizar el indicador del carrusel si la nueva imagen es una imagen chica
        if (imagenChicaCorrespondiente) {
            const indiceImagenChica = Array.from(imagenesChicas).indexOf(imagenChicaCorrespondiente);
            actualizarIndicadorCarrusel(indiceImagenChica);
        }
    }
};

// Evento click para cambiar la imagen principal al hacer clic en una imagen chica
document.querySelectorAll('.imagen-chica img').forEach(imagen => {
    imagen.addEventListener('click', () => {
        cambiarImagenPrincipal(imagen.src, imagen.alt);
    });
});

// Función para cambiar la imagen principal a la imagen anterior
const cambiarImagenAnterior = () => {
    const imagenesChicas = document.querySelectorAll('.imagen-chica img');
    const imagenPrincipal = document.getElementById('imagen-principal');
    let indiceActual = Array.from(imagenesChicas).findIndex(img => img.src === imagenPrincipal.src);
    indiceActual = (indiceActual === 0) ? imagenesChicas.length - 1 : indiceActual - 1;
    cambiarImagenPrincipal(imagenesChicas[indiceActual].src, imagenesChicas[indiceActual].alt);
};

// Función para cambiar la imagen principal a la imagen siguiente
const cambiarImagenSiguiente = () => {
    const imagenesChicas = document.querySelectorAll('.imagen-chica img');
    const imagenPrincipal = document.getElementById('imagen-principal');
    let indiceActual = Array.from(imagenesChicas).findIndex(img => img.src === imagenPrincipal.src);
    indiceActual = (indiceActual === imagenesChicas.length - 1) ? 0 : indiceActual + 1;
    cambiarImagenPrincipal(imagenesChicas[indiceActual].src, imagenesChicas[indiceActual].alt);
};

// Agregar evento click al botón para cambiar a la imagen anterior
document.getElementById('boton-').addEventListener('click', cambiarImagenAnterior);

// Agregar evento click al botón para cambiar a la imagen siguiente
document.getElementById('botonplus').addEventListener('click', cambiarImagenSiguiente);

/*-------------boton agregar carrito------------*/
$('.btn-add-to-cart').click(function() {
  // Verificar si el usuario está autenticado
  const user = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!user) {
    // Mostrar un mensaje de alerta solicitando al usuario que inicie sesión antes de agregar productos al carrito
    Swal.fire({
      icon: "warning",
      title: "Iniciar Sesión",
      text: "Por favor, inicia sesión antes de agregar productos al carrito",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iniciar Sesión",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en "Iniciar Sesión", redirigirlo a la página de inicio de sesión
        window.location.href = "./loginRegistro.html";
      }
    });
    return; // Detener la ejecución del resto del código
  }
  
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

  // Si se ha seleccionado una talla y el usuario está autenticado, mostrar el mensaje de éxito
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Se ha agregado al carrito",
      showConfirmButton: false,
      timer: 1500
  });
});

/*-----------------productos relacionados------------------ */
const mostrarProductosRelacionados = async () => {
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
    button.classList.add("ver-mas");
    button.textContent = "Ver más";
    
    // Usar el dataset para almacenar el ID del producto
    button.dataset.productId = producto.id;
    
    info.appendChild(button);

    card.appendChild(info);
    containerProductosRelacionados.appendChild(card);
  });
};

mostrarProductosRelacionados();

// Agregar el evento clic utilizando delegación de eventos
document.querySelector(".card-list-products").addEventListener("click", (event) => {
  // Verificar si el elemento clickeado es un botón "Ver más"
  if (event.target.classList.contains("ver-mas")) {
    // Obtener el ID del producto del dataset del botón
    const productId = event.target.dataset.productId;
    window.location.href = `producto.html?id=${productId}`;
  }
});

// --------------

window.addEventListener('resize', () => {
  const containerName = document.querySelector('.container-name');
  const mostradorImagenes = document.querySelector('.mostrador-imagenes');

  // Obtener el ancho de la ventana
  const windowWidth = window.innerWidth;

  // Si el ancho de la ventana es menor a 820px y el mostrador de imágenes no está dentro del contenedor de nombre, lo movemos.
  if (windowWidth < 820 && !containerName.contains(mostradorImagenes)) {
    containerName.appendChild(mostradorImagenes);
  } else if (windowWidth >= 820 && containerName.contains(mostradorImagenes)) {
    // Si el ancho de la ventana es mayor o igual a 820px y el mostrador de imágenes está dentro del contenedor de nombre, lo sacamos.
    document.querySelector('main').appendChild(mostradorImagenes);
  }
});

// Disparamos el evento de redimensionamiento para que se ejecute al cargar la página
window.dispatchEvent(new Event('resize'));

// Variables para controlar el deslizamiento
let touchStartX = 0;
let touchEndX = 0;
const minDistanceToSwipe = 50; // Distancia mínima de desplazamiento para considerar como un deslizamiento

// Función para cambiar la imagen principal
const cambiarImagen = () => {
    // Calcular la distancia recorrida durante el deslizamiento
    const swipeDistance = touchEndX - touchStartX;

    // Determinar la dirección del deslizamiento
    const direccion = (swipeDistance > 0) ? 'derecha' : 'izquierda';

    // Obtener la imagen principal y las imágenes chicas
    const imagenPrincipal = document.getElementById('imagen-principal');
    const imagenesChicas = document.querySelectorAll('.imagen-chica img');

    // Encontrar el índice de la imagen actualmente mostrada
    let indiceActual = Array.from(imagenesChicas).findIndex(img => img.src === imagenPrincipal.src);

    // Cambiar la imagen según la dirección del deslizamiento
    if (Math.abs(swipeDistance) >= minDistanceToSwipe) {
        if (direccion === 'izquierda') {
            indiceActual = (indiceActual === imagenesChicas.length - 1) ? 0 : indiceActual + 1;
        } else {
            indiceActual = (indiceActual === 0) ? imagenesChicas.length - 1 : indiceActual - 1;
        }
        // Cambiar la imagen principal a la nueva imagen
        imagenPrincipal.src = imagenesChicas[indiceActual].src;
        imagenPrincipal.alt = imagenesChicas[indiceActual].alt;
    }
};

// Evento para detectar el inicio del deslizamiento
document.getElementById('imagen-principal').addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

// Evento para detectar el final del deslizamiento
document.getElementById('imagen-principal').addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    cambiarImagen();
});

/*------------------- */

function moveParagraph() {
  var paragraph = document.getElementById('ptalla');
  var container = document.getElementById('ctalla-s');
  var containerParent = container.parentElement;

  if (window.innerWidth <= 820) {
    container.appendChild(paragraph);
  } else {
    containerParent.insertBefore(paragraph, container.nextSibling);
  }
}

window.addEventListener('resize', moveParagraph);
moveParagraph();