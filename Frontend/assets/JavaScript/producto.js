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
        boton.addEventListener('click', function() {
          // Resaltar el botón seleccionado
          botonesColor.forEach(function(boton) {
            boton.classList.remove('seleccionado');
          });
          this.classList.add('seleccionado');
    
          // Mostrar la talla seleccionada
          const color = this.getAttribute('data-color');
          colorSeleccionado.textContent = color;
        });
      });
    });      

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
