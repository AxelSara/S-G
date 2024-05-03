const showOptions = () => {
    const direcciones = JSON.parse(localStorage.getItem("direcciones"));
    if(direcciones == null){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            confirmButtonText: "Agregar direcciones",
            text: "No tienes direcciones agregadas",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.location.href = "./direcciones-envio.html";
            }
          });
    }else{
        direcciones.map( dir => {
            if(dir.fav == true){
                document.getElementById("user").innerHTML = `${dir.nombre_domicilio}`;
                document.getElementById("direccionEntrega").innerHTML = `${dir.calle}, ${dir.colonia}`;
                document.getElementById("direccionEstado").innerHTML = `${dir.estado}`;
                document.getElementById("telefonoEntrega").innerHTML = `${dir.telefono}`;
            }
        })
    }
}

const showCart = () => {
    let total;
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.map( cart => {
        total += cart.precio;
        document.getElementById("admin-table-data").innerHTML += `
        <tr>
            <td><img src="../img/productos/${cart.imgMuestra}" alt=""></td>
            <!-- <td>${cart.marca}</td> -->
            <td>${cart.modelo}</td>
            <td>${cart.color}</td>
            <td>${cart.talla}</td>
            <td>$${cart.precio}.00</td>
        </tr>
        `;
    })
}

const methPago = () => {
    const input = document.getElementById("inputName");
    const randomNumber1 = Math.floor(1000 + Math.random() * 9000);
    const randomNumber2 = Math.floor(1000 + Math.random() * 9000);
    const randomNumber3 = Math.floor(1000 + Math.random() * 9000);
    const randomNumber4 = Math.floor(10 + Math.random() * 90);
    input.value = `${randomNumber1}-${randomNumber2}-${randomNumber3}-${randomNumber4}`;
}

const pagoRealizado = () => {
    Swal.fire({
        title: "Compra realizada",
        confirmButtonText: "Regresar a Inicio",
        // icon: "success"
        imageUrl: "../img/icon/giphy.gif",
        imageHeight: 200,
        imageRounded: 10
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../../../index.html';
        }
      });
}



methPago();
showOptions();
showCart();