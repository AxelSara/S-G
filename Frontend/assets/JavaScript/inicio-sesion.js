//===============JSON==========//

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector('#formulario-iniciar-sesion');
    const usuariosParse  = JSON.parse(localStorage.getItem("usuarios"));
    console.log(usuariosParse);

    formulario.addEventListener("submit", function(ev){
        ev.preventDefault();
        console.log(" === Evento submit =====");

        // const usuarios  = JSON.parse(localStorage.getItem("usuarios"));
        
        addUsuario(formulario, usuariosParse);

    });
});

/* Validación de imputs */
function validarDatos() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwordLogin').value;

    // Verificar si los campos están vacíos
    if (email.trim() == '' || password.trim() == '') {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Ingresa un correo válido');
        return false;
    }

    // Validar longitud de la contraseña
    if (password.length < 9) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return false;
    }

    // Si todas las validaciones pasan, se puede enviar el formulario
    return true;
}

function addUsuario(formulario, usuarios){
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
        }
        //usuario normal 
        else{
            // guardar el usuario en el localStorage para poder usarlo en direcciones
            localStorage.setItem(verificacion,"usuarioActual"); // saber cual es usuario actual
           // reedirigir
           const usuarioGuardado = localStorage.getItem
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

usuario.email==="correoadmin@gmail.com" && usuario.contraseña==="contraseñaAdmin"





// formularioRegistro.addEventListener("submit", e =>{
//     e.preventDefault();
//     let warnings = ""; 
//     let entrar = false; 
//     let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     parrafo.innerHTML = ""; 
//     if(nombre.value.length < 4){
//         warnings += 'El nombre no es valido <br>';  
//     }
//     console.log(regexEmail.test(email.value));
//     if (!regexEmail.test(email.value)) {
//         warnings += 'El email no es valido <br>';
//         entrar = true;
//     }
//     if (telefono.value.length < 10) {
//         warnings += 'El numero de telefono no es valido, debe contener 10 digitos <br>';
//         entrar = true;
//     }
//     if (contraseña.value.length < 8 ) {
//         warnings += 'La contraseña no es valida, debe contener por lo menos caracteres <br>';
//         entrar = true;
//     }
//     if (contraseñaConfirm.value.length < 8) {
//         warnings += 'La contraseña no es valida, debe contener por lo menos caracteres <br>';
//         entrar = true;
//     }
//     if (contraseña.value != contraseñaConfirm.value) {
//         warnings += 'La contraseña no coincide <br>';
//         entrar = true;
//     }

//     if (entrar) {
//         parrafo.innerHTML = warnings; 
        
//     }

// })

