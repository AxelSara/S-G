//===============JSON==========//

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector('.formulario-iniciar-sesion');
    const usuariosParse  = JSON.parse(localStorage.getItem("usuarios"));
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

function iniciarSesionUsuario(formulario, usuarios){

    const formData = new FormData(formulario);

    // Obtener los valores del formulario
    const correo = formData.get('nameCorreo');
    const contrasena = formData.get('namePasswordLogin');

    console.log("Correo: ", correo);
    console.log("Contraseña: ", contrasena);

    // Crear el objeto de usuario
    const usuario = {
        correo: correo,
        password: contrasena
    };

    console.log(usuario);
    
    const verificacion = verificarUsuario(correo, contrasena);
    console.log(verificacion);

    if(verificacion){
        console.log("Usuario verificado");
        console.log("USuario: ", verificacion);
        if(verificacion.email==="correoadmin@gmail.com" && verificacion.contraseña==="contraseñaAdmin"){
            console.log("Administrador");
            // guardar el usuario en el localStorage para poder usarlo en direcciones
            localStorage.setItem(verificacion,"usuarioAdmin"); // saber cual es usuario actual
            // falta reedirigir a la pagina index
            window.location.href = "../../../index.html";
        }
        //usuario normal 
        else{
            // guardar el usuario en el localStorage para poder usarlo en direcciones
            localStorage.setItem("usuarioActual", JSON.stringify(verificacion)); // saber cual es usuario actual
           // reedirigir
           const usuarioGuardado = localStorage.getItem
           window.location.href = "../../../index.html";
        }
    } 
    
    else {
        console.log("Usuario no verificado");
        // Falta mostrar un popup
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
