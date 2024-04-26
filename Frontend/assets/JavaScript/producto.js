// const inputQuantity = document.querySelector('.input-quantity')
// const btnIncrement = document.querySelector('#increment')
// const btnDecrement = document.querySelector('#decrement')

// let valueByDefault = parseInt(inputQuantity.value)

// // funciones click

// btnIncrement.addEventListener('click', () => {
// valueByDefault +=1

// inputQuantity.value = valueByDefault

// })

// btnDecrement.addEventListener('click', () => {
//     valueByDefault -=1
    
//     inputQuantity.value = valueByDefault
    
//     })

//     // togle

//      const toggleDescription = document.querySelector('.title-description')
     
//      const contentDescription = document.querySelector('.text-description')

     
    
//      toggleDescription.addEventListener('click', ()=>{
//         contentDescription.classList.toggle('hidden');
//      });


/*--------------------JSON object------------------------------- */
const idProducto = 3;

const dataProductos = async (id) => {
  const response = await fetch("./productos.json");
  const data = await response.json();
  const modeloDom = document.getElementById("namezap");
  const precioDom = document.getElementById("priceDom");
  const descDom = document.getElementById("descriptionDom");

  data.map(dat => {
    if(id == dat.id){
      console.log(dat);
      modeloDom.innerHTML = dat.modelo
      precioDom.innerHTML = `$${dat.precio}.00`;
      descDom.innerHTML = "kasjdh";
    }
  })
  console.log(modelo);
}

dataProductos(idProducto);



     /*--------------------prueba botones talla------------------------------- */

     document.addEventListener('DOMContentLoaded', function() {
        const botonesTalla = document.querySelectorAll('.talla-btn');
        const tallaSeleccionada = document.getElementById('talla-seleccionada');
      
        botonesTalla.forEach(function(boton) {
          boton.addEventListener('click', function() {
            // Resaltar el botón seleccionado
            botonesTalla.forEach(function(boton) {
              boton.classList.remove('seleccionado');
            });
            this.classList.add('seleccionado');
      
            // Mostrar la talla seleccionada
            const talla = this.getAttribute('data-talla');
            tallaSeleccionada.textContent = talla;
          });
        });
      });
      
       /*--------------------prueba botones color------------------------------- */
  
       document.addEventListener('DOMContentLoaded', function() {
        const botonesColor = document.querySelectorAll('.color-btn');
        const colorSeleccionado = document.getElementById('color-seleccionado');
      
        botonesColor.forEach(function(boton) {
          
        });
      });      
  
      function addButtonListener(event) {
        //Resaltar el botón seleccionado
        // event.preventDefault();
        button = event.target;
        // console.log(button.classList)
        button.classList.toggle('seleccionado');

        // console.log(button.classList.includes('seleccinado') !== -1)
        
        // if(button.classList.indexOf('seleccinado') !== -1) {
        // } else  {
          // button.classList.add('seleccionado');
        // }

        // Mostrar la talla seleccionada
        // const color = this.getAttribute('data-color');
        // colorSeleccionado.textContent = color;
      }

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
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Se ha agregado al carrito",
        showConfirmButton: false,
        timer: 1500
    });
  
    // Restablecer valores de los elementos
    $('#namezap').text('nombrezap'); // Restablecer el nombre del producto
    $('#scolor').text('Color'); // Restablecer el título del color
    $('#ptalla').text('Seleccionaste la talla:'); // Restablecer el texto de la talla seleccionada
    $('#talla-seleccionada').text(''); // Restablecer la talla seleccionada
    $('.imput-quantity').val(1); // Restablecer la cantidad a 1
  
    // Remover la clase 'selected' de todos los botones de color y talla
    $('.color-btn.selected').removeClass('selected');
    $('.talla-btn.selected').removeClass('selected');
  });
  


/*------------------------------------------------------------------------*/
// Obtener el ID del local storage
const idAlmacenado = localStorage.getItem('id');

// Verificar si el ID está presente en el local storage
if (idAlmacenado) {
    // Utilizar el ID obtenido para seleccionar el elemento correspondiente
    const elemento = document.getElementById(idAlmacenado);

    // Verificar si el elemento existe en el DOM
    if (elemento) {
        // Hacer algo con el elemento, por ejemplo, cambiar su contenido
        elemento.textContent = '¡Este es el elemento seleccionado!';
    } else {
        console.log('El elemento no se encuentra en el DOM.');
    }
} else {
    console.log('No se encontró ningún ID en el local storage.');
}

/*-------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
  fetch('productos.json')
      .then(response => response.json())
      .then(data => {
          // Selecciona el contenedor de colores y tallas
          const colorContainer = document.getElementById('color-container');
          const tallasContainer = document.getElementById('tallas-container');

          // Función para crear botones de colores
          const crearBotonColor = (color) => {
              const button = document.createElement('button');
              button.className = 'color-btn';
              button.dataset.color = color;
              button.addEventListener('click', addButtonListener);
              colorContainer.appendChild(button);
          };

          // Función para crear botones de talla
          const crearBotonTalla = (talla) => {
              const button = document.createElement('button');
              button.className = 'talla-btn';
              button.dataset.talla = talla;
              button.addEventListener('click', addButtonListener);
              talla-container.appendChild(button); // Adjunta al contenedor de tallas
          };


            // Itera sobre cada producto en el JSON
            data.forEach(producto => {
                // Actualiza nombre del producto
                document.getElementById('namezap').textContent = producto.modelo;
                
                // Actualiza precio
                document.querySelector('.container-price span').textContent = `$${producto.precio}.00`;
                
                // Crea botones de colores
                crearBotonColor(producto.color);
                
                // Crea botones de tallas
                Object.keys(producto.talla).forEach(talla => {
                    if (producto.talla[talla]) {
                        crearBotonTalla(talla);
                    }
                });
                
                // Actualiza descripción (producto.modelo)
                document.getElementById('descripcion').textContent = producto.marca;
                
                // Actualiza imagen principal (si es necesario)
                const img = document.createElement('img');
            img.src = "../img/productos/" + elemento.imgMuestra;
            img.alt = "Imagen del producto";
            img.classList.add('imagen-principal'); // Añadir una clase específica
                
                // Actualiza imágenes chicas (si es necesario)
                const imagenesChicasContainer = document.getElementById('imagenes-chicas');
                const imagenes = [producto.imgLateral, producto.imgFrontal, producto.imgSuperior];
                imagenes.forEach(imagen => {
                    const img = document.createElement('img');
                    img.src = imagen;
                    imagenesChicasContainer.appendChild(img);
                });
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});




