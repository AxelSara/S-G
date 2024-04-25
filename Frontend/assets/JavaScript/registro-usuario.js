//===============JSON==========//
document.addEventListener("DOMContentLoaded", function() {
    
    let dataUsuarios = [];
    const formulario = document.querySelector('#formularioRegistro');

    formulario.addEventListener('submit',function(ev){
        ev.preventDefault();

        const validarCamposDeEntrada = validarCamposRegistro();

        if(validarCamposDeEntrada == false){
            return;
        }
        else{
            procesaTodo(ev, dataUsuarios);
        }
    });
})


const procesaTodo = (event) =>{
    event.preventDefault();
    dataUsuarios.push({
        "nombre": nombre.value,
        "telefono": telefono.value,
        "email": email.value,
        "contraseña": contraseña.value
    });
    console.log(dataUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(dataUsuarios));
    const usuariosLocalStorage = localStorage.getItem("usuarios");
}


function validarCamposRegistro(){   
    let validacion = true;
    const contenedorErrores = document.querySelector('.contenedor_errores_registro');


    const nombre = document.getElementById("inputNombreRegistro");
    const email = document.getElementById("inputEmailRegistro")
    const telefono = document.getElementById("inputTelefonoRegistro");
    const contraseña = document.getElementById("inputContraseña");
    const contraseñaConfirm = document.getElementById("inputConfirmarContraseña");
    const parrafo = document.getElementById("warnings");

    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(nombre.value.length < 4){
        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            El correo contiene caracteres no válidos.
        </div>
        `;
        validacion = false; 
    }
    console.log(regexEmail.test(email.value));
    if (!regexEmail.test(email.value)) {
        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            El correo contiene caracteres no válidos.
        </div>
        `;

        validacion = false; 

        setTimeout(() => {
            parrafo.innerHTML = "";
        }, 5500);
    }
    if (telefono.value.length < 10) {

        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            El numero de telefono no es valido, debe contener 10 digitos;
        </div>
        `;

        validacion = false; 

        setTimeout(() => {
            contenedorErrores.innerHTML = "";
        }, 5500);
    }

    if (contraseña.value.length < 8 ) {

        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            La contraseña no es valida, debe contener por lo menos caracteres;
        </div>
        `;

        validacion = false; 

        setTimeout(() => {
            contenedorErrores.innerHTML = "";
        }, 5500);
    }

    if (contraseñaConfirm.value.length < 8) {
        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            La contraseña no es valida, debe contener por lo menos caracteres;
        </div>
        `;
        validacion = false; 

        setTimeout(() => {
            contenedorErrores.innerHTML = "";
        }, 5500);
    }

    if (contraseña.value != contraseñaConfirm.value) {

        contenedorErrores.innerHTML += `
            <div class="alert alert-danger" role="alert">
                'La contraseña no coincide;
            </div>
        `;
        validacion = false; 
        setTimeout(() => {
            contenedorErrores.innerHTML = "";
        }, 5500);
    }
}


