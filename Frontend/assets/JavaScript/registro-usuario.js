//===============JSON==========//
let dataUsuarios = [];

const formulario = document.querySelector('#formularioRegistro');


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

formulario.addEventListener('submit',procesaTodo);

const nombre = document.getElementById("inputNombreRegistro");
const email = document.getElementById("inputEmailRegistro")
const telefono = document.getElementById("inputTelefonoRegistro");
const contraseña = document.getElementById("inputContraseña");
const contraseñaConfirm = document.getElementById("inputConfirmarContraseña");
const parrafo = document.getElementById("warnings");

formularioRegistro.addEventListener("submit", e =>{
    e.preventDefault();
    let warnings = ""; 
    let entrar = false; 
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    parrafo.innerHTML = ""; 
    if(nombre.value.length < 4){
        warnings += 'El nombre no es valido <br>';  
    }
    console.log(regexEmail.test(email.value));
    if (!regexEmail.test(email.value)) {
        warnings += 'El email no es valido <br>';
        entrar = true;
    }
    if (telefono.value.length < 10) {
        warnings += 'El numero de telefono no es valido, debe contener 10 digitos <br>';
        entrar = true;
    }
    if (contraseña.value.length < 8 ) {
        warnings += 'La contraseña no es valida, debe contener por lo menos caracteres <br>';
        entrar = true;
    }
    if (contraseñaConfirm.value.length < 8) {
        warnings += 'La contraseña no es valida, debe contener por lo menos caracteres <br>';
        entrar = true;
    }
    if (contraseña.value != contraseñaConfirm.value) {
        warnings += 'La contraseña no coincide <br>';
        entrar = true;
    }

    if (entrar) {
        parrafo.innerHTML = warnings; 
        
    }

})