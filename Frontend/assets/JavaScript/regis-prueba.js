    const parrafo = document.getElementById("warnings");
function agregarDatos() {
    // Obtener los valores del formulario
    const nombre = document.getElementById("inputNombreContactanos").value;
    const email = document.getElementById("inputEmailRegistro").value;
    const telefono = document.getElementById("inputTelefonoRegistro").value;
    const contraseña = document.getElementById("inputContraseña").value;
    const contraseñaConfirm = document.getElementById("inputConfirmarContraseña").value;
    
    //cargar el contenido del archivo JSON existente
    //const usuarios = await cargarUsuarios();    
  
    // Crear un objeto con los datos
    const datosRegistro = {
      idUsuario: usuarios.length + 1,
      nombre: nombre,
      email: email,
      telefono: telefono,
      contraseña: contraseña,
      contraseñaConfirm: contraseñaConfirm
    };
  
    // Convertir el objeto a formato JSON
    var datosJSON = JSON.stringify(datosRegistro);
  
    // Agregar los datos al archivo JSON
    agregarAlArchivo(datosJSON);
}
  
  function agregarAlArchivo(datosJSON) {
    // Supongamos que aquí realizarías alguna operación para guardar los datos
    // en un archivo JSON, como enviarlos a un servidor o almacenarlos localmente.
    // Por ejemplo, si estás trabajando en un navegador web, podrías utilizar
    // el almacenamiento local o enviar los datos a través de una solicitud HTTP.
    // Aquí tienes un ejemplo de cómo guardar los datos en el almacenamiento local:
  
    // Obtener los datos existentes (si hay alguno)
    const datosGuardados = localStorage.getItem('datosRegistro');
  
    // Convertir los datos existentes a un array o inicializar un array vacío si no hay datos
    const arrayDatos = datosGuardados ? JSON.parse(datosGuardados) : [];
  
    // Agregar los nuevos datos al array
    arrayDatos.push(datosJSON);
  
    // Guardar el array actualizado en el almacenamiento local
    localStorage.setItem('datosRegistro', JSON.stringify(arrayDatos));
  
    alert('Datos agregados correctamente');
}

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