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
            procesaTodo(ev, formulario);
            mostrarTaskSession("Usuario registrado con exito", "success");
            // setTimeout(function() {
            //     window.location.href = "../../../index.html";
            // }, 3300);
        }
    });
})


const procesaTodo = async (event, formulario) => {
    event.preventDefault();
    // obtener los datos del formulario
    const formData = new FormData(formulario);
    const nombre = formData.get('inputNombreRegistro');
    const email = formData.get('emailRegistro');
    const telefono = formData.get('telefonoRegistro');
    const contraseña = formData.get('contraseñaRegistro');
    
    // Asumiendo que tienes un campo oculto en tu formulario para el ID del rol
    const idRol = formData.get('idRol'); // Asegúrate de que este campo exista en tu formulario

    const url = "http://localhost:8080/api/usuarios";

    const usuario = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        password: contraseña,
        rol: {
            idRol: 1,
            nombreRol: "cliente",
            descripcionRol: "Cliente de la ecommerce"
        }
    };

    console.log("usuario: ", usuario);

    // Solicitar al servidor la creación del usuario
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    const data = await response.json();
    console.log("data: ", data);

    if(response.ok){

        // obtener el token de la respuesta
        const urlLogin = "http://localhost:8080/login";
        const usuarioLogueado = {
            email: email,
            password: contraseña
        };

        const responseRegistro = await fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioLogueado)
        });
        const dataRegistro = await responseRegistro.json();

        if (responseRegistro.ok) {
            const token = dataRegistro.token; // Extraer el token de la respuesta JSON
            localStorage.setItem('token', token);
            console.log('Inicio de sesión exitoso. Token JWT:', token);
            setTimeout(function() {
                window.location.href = "../../../index.html";
            }, 3300);        

            
        }

    }
    else{
        mostrarTaskSession("Error al registrar usuario", "error");
    }
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


