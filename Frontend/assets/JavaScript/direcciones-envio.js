document.addEventListener("DOMContentLoaded", async function() {
    const formulario = document.querySelector('#formulario-direcciones-envio');
    const numMensajeBienvenida = localStorage.getItem("contadorCorreoBienvenida") || 0;
    verificarExpiracionToken().then(result => {
        if(result == true){
            console.log("========== Usuario activo ===========");
            const token = localStorage.getItem("token");
            console.log("result: ", result);    
            // const payload = obtenerPayload(token);
            if(numMensajeBienvenida == 0){
                // mostrarTaskSession(`Bienvenido ${payload.name}`, "success");        
                // console.log("payload: ", payload);
                localStorage.setItem("contadorCorreoBienvenida", 1);
            }

        }

        else{
            console.log("========== Usuario inactivo ===========");            

            // mostrarTaskSession("Estas como invitado", "warning");
            // quitar los token del local storage
            
        }


    }).catch((err) => {
        console.error("Error al verificar el token de inicio de sesión: ", err);
        throw err; 
    });

    formulario.addEventListener("submit", function(ev){
        ev.preventDefault();
        console.log(" === Evento submit =====");
        addDirecciones(formulario);
    });
});




function verificarExpiracionToken() {
    return new Promise((resolve, reject) => {
        // Verificar si el token existe en el localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No hay token en el localStorage.");
            resolve(false); 
            return;
        }

        try {
            // Decodificar el token sin verificar la firma
            const payload = JSON.parse(atob(token.split('.')[1]));
            const fechaExpiracion = new Date(payload.exp * 1000);

            if (fechaExpiracion < new Date()) {
                console.log("Token expirado.");
                localStorage.removeItem('token');
                resolve(false);
            } else {
                console.log("Token válido y no expirado.");
                resolve(true);
            }
        } catch (error) {
            localStorage.removeItem('token');
            console.error("Error al verificar el token:", error);
            reject(error);
        }
    });
}



// // Verifica los datos de usuario logeado
// const test = async () => {
//     // Realiza solicitud GET de usuarios
//     const url = "http://localhost:8080/api/usuarios";
//     const response = await fetch(url);
//     const data = await response.json();
//     // Toma la información del User loggeado (previamente guardarda en ls {mail, password})
//     const userLog = JSON.parse(localStorage.getItem("usuarioLog"));
//     const userNombre = userLog.nombre;
//     const userEmail = userLog.email;
//     // Guarda información del usuario
//     for (const user of data) {
//         if(userEmail == user.email){
//             userData = user;
//             console.log(user.idUsuario);
//             const name = user.idUsuario
//             return name;
//         }
//     }
    
// }

// const testName = async () => {
//     // Realiza solicitud GET de usuarios
//     const url = "http://localhost:8080/api/usuarios";
//     const response = await fetch(url);
//     const data = await response.json();
//     // Toma la información del User loggeado (previamente guardarda en ls {mail, password})
//     const userLog = JSON.parse(localStorage.getItem("usuarioLog"));
//     const userNombre = userLog.nombre;
//     const userEmail = userLog.email;
//     // Guarda información del usuario
//     for (const user of data) {
//         if(userEmail == user.email){
//             console.log(user.nombre);
//             userData = user;
//             return user.nombre;
//         }
//     }
    
// }

//test()

const verUserLog = async () => {
    const response = await fetch("http://localhost:8080/api/direcciones");
    const data = await response.json();
    console.log(data)
    for (const user of data) {
        if(mail == user.email && pw == user.password){
            console.log(user);
            console.log("Sesión iniciada");
            break;
        }else{
            console.log("Usuario no encontrado");
        }
    }
}

// verUserLog()

// Verifica si el usuario tiene direcciones guardadas
const direccionesUsersVerification = (user) => {
    let dirUser ="";
    const direccionesUser = JSON.parse(localStorage.getItem("direcciones"));
    if(direccionesUser == null){
        document.getElementById("direcciones-user").innerHTML= `
            <p><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
            </svg><br></p>
            <p>No cuenta con direcciones guardadas</p>
        `;
    }else if(direccionesUser != null){
        direccionesUser.map((dir) => {
            dirUser += `
                <div class="card-direccion">
                    <div class="direccion-nombre" id="${dir.id}${dir.noExterior}">
                        <h5>${dir.nombre_domicilio}</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" onclick="starDireccion(${dir.id}${dir.noExterior})" width="15" height="15" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                        </svg>
                    </div>
                    <p>${dir.estado}</p>
                    <p>${dir.colonia}</p>
                    <p>${dir.calle}</p>
                </div>
            `;
        })
        document.getElementById("direcciones-user").innerHTML= dirUser;
    }
}

// Verifica que usuario loggeado y muestra su nombre
// const showInfoUser = () => {
//     const user = JSON.parse(localStorage.getItem("usuarioLog"));
//     document.getElementById("titulo-direcciones").innerHTML = `
//         <h2>Directorio</h2>
//         <p>Hola ${user.nombre}</p>
//     `;
//     direccionesUsersVerification(user.nombre)
// }

// showInfoUser();


addDirecciones = async (formulario) => {
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
    

    //asociar datos del usuario a la dirección
    const usuarioActual = localStorage.getItem("usuarioLog");
    const usuario = JSON.parse(usuarioActual);

    const url = "http://localhost:8080/api/direcciones";
    const response = await fetch(url);
    const dataUsers = await response.json();
    // Toma la información del User loggeado (previamente guardarda en ls {mail, password})
    const userLog = JSON.parse(localStorage.getItem("usuarioLog"));
    const userNombre = userLog.nombre;
    const userEmail = userLog.email;
    
    // Guarda información del usuario
    for (const user of dataUsers) {
        if(userEmail == user.email){
            const userId = user.idUsuario;
            const userName = user.nombre;
            const userMail = user.email;

            const contenedorErrores = document.getElementById("contenedor_errores_registro");
            contenedorErrores.innerHTML = ``;
            let verificación = false;

            if(typeof cp != Number && cp.length < 5 && cp.length > 5){
                contenedorErrores.innerHTML += `
                <div class="alert alert-danger" role="alert">
                    El código postal debe tener 5 carácteres numéricos
                </div>
                `;
                verificación = false;
            }else verificación = true;
            if(typeof telefono != Number && telefono.length < 10 && telefono.length > 10){
                contenedorErrores.innerHTML += `
                <div class="alert alert-danger" role="alert">
                    El teléfono debe tener 10 carácteres numéricos
                </div>
                `;verificación = false;
            }else verificación = true;
            
            if(verificación == true){
                const direcciones = {
                    nombre_usuario: userName,
                    nombre_domicilio: nombre_domicilio,
                    calle: calleDireccion,
                    no_exterior: noExterior,
                    no_interior: noInterior,
                    cp: cp,
                    telefono: telefono,
                    estado: estadoDireccion,
                    delegacion_municipio: delegacion_municipio,
                    colonia: coloniaDireccion,
                    indicaciones_especiales: indicaciones_especiales,        
                    id_usuario: userId,
                    email: userMail,
                    // fav: false
                }

                const response = await fetch("http://localhost:8080/api/direcciones", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(direcciones)
                });
                const data = await response.json();
                console.log("data: ", data);
            
                if(response.ok){
                    /*mostrarTaskSession("Dirección registrada con exito", "success");
                    setTimeout(function() {
                        window.location.href = "../../../index.html";
                    }, 3300);*/
                    console.log("Dirección registrada con exito");
                }
                else{
                    //mostrarTaskSession("Error al registrar usuario", "error");
                    console.log("Error al registrar dirección")
                }

                
                
                // obtener el array de direcciones existentes
                /*
                let direccionesUser = localStorage.getItem("direcciones");
                let dirUsers = JSON.parse(direccionesUser);
                let i = 0;
                
                if(direccionesUser == null){
                    console.log("uwu = 0")
                    console.log(direcciones)
                    
                    let direccionesLocalStorage = [];
                    direccionesLocalStorage.push(direcciones);
                    localStorage.setItem("direcciones", JSON.stringify(direccionesLocalStorage));
                    direccionesUsersVerification();

                }else{
                    dirUsers.map( () => i++);
                    if(i <= 3){

                        let direccionesLocalStorage = JSON.parse(localStorage.getItem("direcciones"))
                        direccionesLocalStorage.push(direcciones);
                        localStorage.setItem("direcciones", JSON.stringify(direccionesLocalStorage));
                        direccionesUsersVerification();

                        console.log("uwu < 0")

                    }else if(i > 3) alert("Lo sentimos, solo puedes guardar un máximo de 4 direcciones");
                }

                const clearInput = document.querySelectorAll(".form-control");
                clearInput.forEach( e => {
                    e.value = ``;
                })*/
            }
        }
    }
}

// Seleccionar direccion predeterminada
// Se esta usando id(telefono)+noExterior

const starDireccion = (nameDir) => {
    const direcciones = JSON.parse(localStorage.getItem("direcciones"));
    direcciones.map( dir => {
        if(nameDir == dir.id+dir.noExterior){
            dir.fav = true;
        }else{
            dir.fav = false;
        }
    });
    localStorage.setItem("direcciones", JSON.stringify(direcciones));
    star();
}

const star = () => {
    const direcciones = JSON.parse(localStorage.getItem("direcciones"));
    if(direcciones != null){
        direcciones.map( dir => {
            if(dir.fav == true){
                document.getElementById(dir.id+dir.noExterior).innerHTML = `
                    <h5>${dir.nombre_domicilio}</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" onclick="starDireccion(${dir.id}${dir.noExterior})" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                `;
            }else if(dir.fav == false){
                document.getElementById(dir.id+dir.noExterior).innerHTML = `
                    <h5>${dir.nombre_domicilio}</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" onclick="starDireccion(${dir.id}${dir.noExterior})" width="15" height="15" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                    </svg>
                `;
            }
        });
    }
}

star();