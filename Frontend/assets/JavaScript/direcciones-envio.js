
// ¿Que va a hacer Don ?
/* 

Cuando el usuario se registra por primera vez, se guardan sus datos(nombre...) en el local storage
(localStorage usuarios)

usuarioActual  --> const usuario = localStorage.getItem("usuarioActual");

2. Cargar direcciones si es que hay
(localStorage direcciones) || []

3. Necesitamos guardar la información de la dirección en el localStorage de una direccion nueva

IMPORTANTE: cuando guardamos una dirección debemos guardar en esa dirección datos del usuario para identificarlo,
id o email  

pero...........................

4. verificar si un id o correo tiene 4 direcciones guardadas, mostrarle popup de error

5. En caso contrario guardarle su dirección en el localStorage

vas a guardar 

establecer la direccion fija --->

*/



document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector('#formulario-direcciones-envio');
    // const direccionesParse = JSON.parse(localStorage.getItem("direcciones"));
    // console.log(direccionesParse);
    formulario.addEventListener("submit", function(ev){
        ev.preventDefault();
        console.log(" === Evento submit =====");
        addDirecciones(formulario);
    });
});

addDirecciones = (formulario) => {
    const formData = new FormData(formulario);
    const nombre_domicilio = formData.get('nombre_domicilio');
    const calleDireccion = formData.get('calleDireccion');
    const noExterior = formData.get('noExterior');
    const noInterior = formData.get('noInterior');
    const cp = formData.get('codigo_postal');
    const telefono = formData.get('telefonoDireccion');
    const estadoDireccion =  formData.get('estadoDireccion');
    const delegacion_municipio = formData.get('delegacion_municipio');
    const coloniaDireccion = formData.get('coloniaDireccion');
    const indicaciones_especiales = formData.get('indicaciones_especiales');
    const id = formData.get('id');

    //asociar datos del usuario a la dirección

    const usuarioActual = localStorage.getItem("usuarioActual");
    const usuario = JSON.parse(usuarioActual);
    console.log("Usuario: ", usuario);
    id = usuario.id;
    const correo = usuario.email;



    const direcciones = {
        nombre_domicilio: nombre_domicilio,
        calle: calleDireccion,
        noExterior: noExterior,
        noInterior: noInterior,
        cp: cp,
        telefono: telefono,
        estado: estadoDireccion,
        delegacion_municipio: delegacion_municipio,
        colonia: coloniaDireccion,
        indicaciones_especiales: indicaciones_especiales,        
        id: id,
        correo: correo
    }
    console.log(direcciones);


    // obtener el array de direcciones existentes
    let direccionesExistentes = localStorage.getItem("direcciones");
    if (direcciones == null) 
        direcciones = [];
     else 
        direcciones = JSON.parse(direccionesExistentes);
    

    // verificar si el usuario actual con el correo registrado ya tiene 4 direcciones guardadas
    let direccionesDelUsuario = direccionesExistentes.filter(direccion => direccion.correo == correo);
    if (direccionesDelUsuario.length >= 1) {
        alert("Lo sentimos, solo puedes guardar un máximo de 4 direcciones");
        return;
    }

    else {
        // guardar la dirección en el localStorage
        localStorage.setItem("direcciones", JSON.stringify(direcciones));
        alert("Dirección guardada correctamente");
        // agregar la nueva dirección al array
        direcciones.push(direcciones);
        localStorage.setItem("direcciones", JSON.stringify(direcciones));

    }



}


