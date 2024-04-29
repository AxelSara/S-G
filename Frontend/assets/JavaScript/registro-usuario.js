//===============JSON==========//
    let dataUsuarios = [];
document.addEventListener("DOMContentLoaded", function() {
    
    const formulario = document.querySelector('.formularioRegistro');

    formulario.addEventListener('submit',function(ev){
        ev.preventDefault();

        const nombre = document.getElementById("inputNombreRegistro");
        const email = document.getElementById("inputEmailRegistro");
        const telefono = document.getElementById("inputTelefonoRegistro");
        const contraseña = document.getElementById("inputContraseña");
        const contraseñaConfirm = document.getElementById("inputConfirmarContraseña");
        const parrafo = document.getElementById("warnings");

        const validarCamposDeEntrada = validarCamposRegistro(nombre, email, telefono, contraseña, contraseñaConfirm);

        console.log("Nombre: ", nombre.value);
        console.log("Email: ", email.value);
        console.log("telefono: ", telefono.value);
        console.log("contraseña: ", contraseña.value);
        console.log("contraseñaConfirm: ", contraseñaConfirm.value);


        if(validarCamposDeEntrada == false){
            return;
        }
        else{
            procesaTodo(ev, dataUsuarios);
            mostrarTaskSession("Usuario registrado con exito", "success");
            setTimeout(function() {
                window.location.href = "../../../index.html";
            }, 3300);
        }
    });
})


const procesaTodo = (event) =>{
    event.preventDefault();
    dataUsuarios.push({
        "nombre": document.getElementById("inputNombreRegistro").value,
        "telefono": document.getElementById("inputTelefonoRegistro").value,
        "email": document.getElementById("inputEmailRegistro").value,
        "contraseña": document.getElementById("inputContraseña").value
    });
    console.log(dataUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(dataUsuarios));
    const usuariosLocalStorage = localStorage.getItem("usuarios");
    // mostrar una alerta de usuario registrado
}

function validarCamposRegistro(nombre, email, telefono, contraseña, contraseñaConfirm){   
    let validacion = true;
    const contenedorErrores = document.querySelector('.contenedor_errores_registro');


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
            contenedorErrores.innerHTML = "";
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

    if (contraseña.value.length < 9 ) {

        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            La contraseña no es valida, debe contener por lo menos 9 caracteres;
        </div>
        `;

        validacion = false; 

        setTimeout(() => {
            contenedorErrores.innerHTML = "";
        }, 5500);
    }

    if (contraseñaConfirm.value.length < 9) {
        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            La contraseña no es valida, debe contener por lo menos 9 caracteres;
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

    return validacion;
}


function mostrarTaskSession(mensaje, iconoTask, position = "top-end", tiempoVisible = 3000) {
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
            popup: 'rounded'
        }
    });
}


