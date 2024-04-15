//===============JSON==========//

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector('#formulario-iniciar-sesion');

    formulario.addEventListener("submit", function(ev){
        ev.preventDefault();
        console.log(" === Evento submit =====");

        // const usuarios  = JSON.parse(localStorage.getItem("usuarios"));
        const usuariosParse  = JSON.parse(localStorage.getItem("usuarios"));
        addUsuario(formulario, usuariosParse);

    });
});

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
    
    const verificacion = verificarUsuario(usuarios, correo, contrasena);

    if(verificacion){
        console.log("Usuario verificado");
        console.log("USuario: ", verificacion);
    } else {
        console.log("Usuario no verificado");
    }
}

function verificarUsuario(correo, contrasena) {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    // Verificar si el usuario existe en el localStorage y lo devuelve
    return usuariosGuardados.find(usuario => usuario.correo === correo && usuario.contrasena === contrasena);
}




/* //===============JSON==========//

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector('#formulario-iniciar-sesion');

    formulario.addEventListener("submit", function(ev){
        ev.preventDefault();
        console.log(" === Evento submit =====");

        // const usuarios  = JSON.parse(localStorage.getItem("usuarios"));
        const usuariosParse  = JSON.parse(localStorage.getItem("usuarios"));
        addUsuario(formulario, usuariosParse);

    });
});

function addUsuario(formulario, usuarios){
    console.log(formulario);
    console.log(usuarios);
    const formData = new FormData(formulario);
    // obtener los valores del formulario 
    const correo = formData.get('correo');
    const contrasena = formData.get('passwordLogin');
    
    const usuario = {
        correo: correo,
        contrasena: contrasena,
    }
    console.log(usuarios);
    usuarios.push(usuario); */
    // localStorage.setItem("usuarios", JSON.stringify(usuarios));
    // alert("Usuario registrado con exito");
    // window.location.href = "index.html";

//}




// const nombre = document.getElementById("inputNombreRegistro");
// const email = document.getElementById("inputEmailRegistro")
// const telefono = document.getElementById("inputTelefonoRegistro");
// const contraseña = document.getElementById("inputContraseña");
// const contraseñaConfirm = document.getElementById("inputConfirmarContraseña");
// const parrafo = document.getElementById("warnings");

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

