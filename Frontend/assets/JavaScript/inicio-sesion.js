//===============JSON==========//

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector('.formulario-iniciar-sesion');
    const usuariosParse  = JSON.parse(localStorage.getItem("usuarios"));
    // eliminar el local storage de usuarios
    localStorage.removeItem("usuarios");
    console.log(usuariosParse);

    formulario.addEventListener("submit", function(ev){
        ev.preventDefault();
        console.log(" === Evento submit =====");

        // const usuarios  = JSON.parse(localStorage.getItem("usuarios"));
        
        const resValidarDatos = validarDatos();

        if( resValidarDatos == false ) {
            return;
        }
        else{
            iniciarSesionUsuario(formulario, usuariosParse);
        }
        

    });
});

/* Validación de imputs */
function validarDatos() {
    let validacion = true;
    const contenedorErrores = document.querySelector('.contenedor_errores_login');
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    console.log(email, password);


    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // crear un contenedor de error
        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            El correo contiene caracteres no válidos.
        </div>
        `;

        // Limpiar el contenedor de errores

        setTimeout(() => {
            contenedorErrores.innerHTML = '';
        }, 5500)

        validacion = false;
    }

    // Validar longitud de la contraseña
    if (password.length < 9) {
        contenedorErrores.innerHTML += `
        <div class="alert alert-danger" role="alert">
            La contraseña debe tener al menos 8 caracteres.
        </div>
        `;
        validacion = false;

        // Limpiar el contenedor de errore
        setTimeout(() => {
            contenedorErrores.innerHTML = '';
        }, 5500)
    }

    return validacion;
}

async function iniciarSesionUsuario(formulario, usuarios){

    const formData = new FormData(formulario);

    // Obtener los valores del formulario
    const correo = formData.get('nameCorreo');
    const contrasena = formData.get('namePasswordLogin');

    // Crear el objeto de usuario
    const usuario = {
        email: correo,
        password: contrasena
    };

    const url = "http://localhost:8080/login";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        console.log("Response: ",response);

        if (response.ok) {
            const data = await response.json();
            const token = data.token; // Extraer el token de la respuesta JSON
            // Almacenar el token en el almacenamiento local del navegador
            localStorage.setItem('token', token);
            console.log('Inicio de sesión exitoso. Token JWT:', token);

            // Mostrar alerta de inicio de sesión exitoso
            mostrarTaskSession("¡Inicio de sesión exitoso!", "success", "top-end", 3000);
            // reedirir al index
            setTimeout(() => {
                window.location.href = "../../../index.html";    
            }, 5000);
            

        } else {
            console.log('Error al iniciar sesión:', response.statusText);
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
    }
}



function verificarUsuario(correo, contraseña) {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || []; // registro
    // Verificar si el usuario existe en el localStorage y lo devuelve
    console.log(usuariosGuardados.length);
    return usuariosGuardados.find(usuario => usuario.email === correo && usuario.contraseña === contraseña);
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


async function verificarExpiracionToken() {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    if (!token) {
        // No hay token almacenado
        return null;
    }

    try {
        // Decodificar el token
        const payload = jwtDecode(token);

        // Obtener la fecha de expiración del token
        const fechaExpiracion = new Date(payload.exp * 1000);

        // Comparar la fecha de expiración con la hora actual
        if (fechaExpiracion < new Date()) {
            // El token ha expirado
            return false;
        } 
        else {
            // El token aún es válido
            return true;
        }
    } 
    catch (error) {
        // Error al decodificar el token
        console.error('Error al verificar el token:', error);
        return false;
    }
}
