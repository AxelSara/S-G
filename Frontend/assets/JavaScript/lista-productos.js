const rutaJSON = "../../json/productos.json";
const rutaIMG = "../img/productos/";

const datLS = async () => {
    const responseJson = await fetch(rutaJSON);
    const dataLS = await responseJson.json();
    localStorage.setItem("database", JSON.stringify(dataLS));
    const dataLocalStorage = JSON.parse(localStorage.getItem("database"));
    console.log(dataLocalStorage)
}

datLS();

const findData = (data) => {
    let cards = "";
    data.map(dat => {
        cards += `
        <div class="card__lista__productos">
            <div class="col">
                <div class="iconHeart-lista">
                    <a onclick="alert(${dat.id})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg></a>
                </div>
                <div class="imagen-lista">
                    <img src="${rutaIMG+dat.imgMuestra}" class="card-img-top">
                </div>
                <div class="row card-body">
                    <div class="list-card-info col-5">
                        <h5 class="list-card-title">${dat.modelo}</h5>
                        <p class="list-card-text">${dat.color}</p>
                        <p class="list-card-precio">$${dat.precio}.00</p>
                    </div>
                    <div class="list-card-button col-7">
                        <a href="./producto.html" onclick="producto(${dat.id})">Comprar</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById("lista").innerHTML = cards;
}

const producto = () => {
    const idProducto = id;
    localStorage.setItem("id-producto", JSON.stringify(idProducto));
}

const filterData = (fildata, data) => {
    let cards = "";
    for (const id of fildata) {
        data.map(dat => {
            if(id == dat.id){
                cards += `
                    <div class="card__lista__productos">
                        <div class="col">
                            <div class="iconHeart-lista">
                                <a onclick="alert(${dat.id})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg></a>
                            </div>
                            <div class="imagen-lista">
                                <img src="${rutaIMG+dat.imgMuestra}" class="card-img-top">
                            </div>
                            <div class="row card-body">
                                <div class="list-card-info col-5">
                                    <h5 class="list-card-title">${dat.modelo}</h5>
                                    <p class="list-card-text">${dat.color}</p>
                                    <p class="list-card-precio">$${dat.precio}.00</p>
                                </div>
                                <div class="list-card-button col-7">
                                    <button>Comprar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            }
        });
    }
    document.getElementById("lista").innerHTML = cards;
}

const init = async () => {
    const responseJson = await fetch(rutaJSON);
    const dataLS = await responseJson.json();
    const dataLocalStorage = JSON.parse(localStorage.getItem("database"));
    findData(dataLS)
}

init();

const filtros = `
    <ul class="nav flex-column" id="sidebar-menu-filter-text">
        <div>
            <!--<li class="nav-item">
                <a class="filters-sidebar" data-bs-toggle="collapse" href="#collapseTalla" role="button" aria-expanded="false" aria-controls="collapseTalla">
                    Talla
                </a><hr>
                <div class="collapse" id="collapseTalla">
                    <label>
                        <input class="filter-talla" type="checkbox" id="24" value="24" />  24
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="24.5" value="24.5" />  24.5
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="25" value="25" />  25
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="25.5" value="25.5" />  25.5
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="26" value="26" />  26
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="26.5" value="26.5" />  26.5
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="27" value="27" />  27
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="27.5" value="27.5" />  27.5
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="28" value="28" />  28
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="28.5" value="28.5" />  28.5
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="29" value="29" />  29
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="29.5" value="29.5" />  29.5
                    </label><br>
                    <label>
                        <input class="filter-talla" type="checkbox" id="30" value="30" />  30
                    </label><br>
                </div>
            </li>-->
            <li class="nav-item">
                <a class="filters-sidebar" data-bs-toggle="collapse" href="#collapseColor" role="button" aria-expanded="false" aria-controls="collapseColor">
                    Color
                </a><hr>
                <div class="collapse" id="collapseColor">
                    <label>
                        <input class="filter-color" type="checkbox" id="Azul" value="Azul" />  Azul
                    </label><br>
                    <label>
                        <input class="filter-color" type="checkbox" id="Café" value="Café" />  Café
                    </label><br>
                    <label>
                        <input class="filter-color" type="checkbox" id="Gris" value="Gris" />  Gris
                    </label><br>
                    <label>
                        <input class="filter-color" type="checkbox" id="Marino" value="Marino" />  Marino
                    </label><br>
                    <label>
                        <input class="filter-color" type="checkbox" id="Miel" value="Miel" />  Miel
                    </label><br>
                    <label>
                        <input class="filter-color" type="checkbox" id="Negro" value="Negro" />  Negro
                    </label><br>
                    <label>
                        <input class="filter-color" type="checkbox" id="Shedron" value="Shedron" />  Shedron
                    </label><br>
                    <label>
                        <input class="filter-color" type="checkbox" id="Verde" value="Verde" />  Verde
                    </label><br>
                    <label>
                        <input class="filter-color" type="checkbox" id="Vino" value="Vino" />  Vino
                    </label><br>
                </div>
            </li>
            <li class="nav-item">
                <a class="filters-sidebar" data-bs-toggle="collapse" href="#collapseCategoria" role="button" aria-expanded="false" aria-controls="collapseCategoria">
                    Categoría
                </a><hr>
                <div class="collapse" id="collapseCategoria">
                    <label>
                        <input class="filter-categoria" type="checkbox" id="Mujer" value="Mujer" />  Mujer
                    </label><br>
                    <label>
                        <input class="filter-categoria" type="checkbox" id="Hombre" value="Hombre" />  Hombre
                    </label><br>
                </div>
            </li>
            <!--<li class="nav-item">
                <a class="filters-sidebar" data-bs-toggle="collapse" href="#collapseMaterial" role="button" aria-expanded="false" aria-controls="collapseMaterial">
                    Material
                </a><hr>
                <div class="collapse" id="collapseMaterial">
                    <label>
                        <input class="filter-Material" type="checkbox" id="Piel natural" value="Piel natural" />  Piel natural
                    </label><br>
                    <label>
                        <input class="filter-Material" type="checkbox" id="Piel sintética" value="Piel sintética" />  Piel sintética
                    </label><br>
                </div>
            </li>-->
            <!--<li class="nav-item">
                <a class="filters-sidebar" data-bs-toggle="collapse" href="#collapseMarca" role="button" aria-expanded="false" aria-controls="collapseMarca">
                    Marca
                </a><hr>
                <div class="collapse" id="collapseMarca">
                    <label>
                        <input class="filter-Marca" type="checkbox" id="Princess" value="Princess" />  Princess
                    </label><br>
                    <label>
                        <input class="filter-Marca" type="checkbox" id="Calzado Gus" value="Calzado Gus" />  Calzado Gus
                    </label><br>
                </div>
            </li>-->
        </div>
        <div class="sidebar-menu-button" id="filter__buttons">
            <button onclick="filters()">Aplicar filtros</button>
            <button onclick="init()" id="remove-filters">Quitar filtros</button>
        </div>
    </ul>
`;

document.getElementById("sidebar-menu-list-extended").innerHTML= filtros;

document.getElementById("collapseMenu").innerHTML= filtros;

let favs = [];

const addCarrito = async (id) => {
    const response = await fetch(rutaJSON);
    const data = await response.json();
    for (const product of data) {
        if (id === product.id) {
            favs.push({
                "id": product.id,
                "modelo": product.modelo,
                "color": product.color,
                "genero": product.genero,
                "precio": product.precio,
                "marca": product.marca,
                "imgMuestra": product.imgMuestra,
                "imgLateral": product.imgLateral,
                "imgFrontal": product.imgFrontal,
                "imgSuperior": product.imgSuperior
            });
        }
    }
    localStorage.setItem("favoritos", JSON.stringify(favs));
    const favoritosLocalStorage = localStorage.getItem("favoritos");
}

function alert(id) {
    addCarrito(id)
    const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return toast.fire({
        title: "Añadido a favoritos",
        icon: "success",
        customClass: {
            popup: 'rounded'
        }
    });
}

const filters = async () => {
    let filtro = [];
    const response = await fetch(rutaJSON);
    const data = await response.json();

    const color = filtersColor(data);
    const categoria = filtersCategoria(data);

    if(categoria.length == 0){
        if(color.length == 0){
            data.map(dat => filtro.push(dat.id));
        }
        else if(color.length > 0){
            filtro = color;
        }
    }else if(categoria.length > 0){
        if(color.length == 0){
            filtro = categoria;
        }
        else if(color.length > 0){
            for (let i = 0; i < categoria.length; i++) {
                for (let j = 0; j < color.length; j++) {
                    if(categoria[i] == color[j]){
                        filtro.push(color[j]);
                    }
                }
            }
        }
    }
    filterData(filtro, data);
    // document.getElementById("filter__buttons").innerHTML=`
    //     <button onclick="filters()">Aplicar filtros</button>
    //     <button onclick="init()" id="remove-filters" disable>Quitar filtros</button>
    // `;
}

const filtersTalla = (data) => {
    const selTalla = [];
    const filtroTalla = [];
    const cbxTalla = document.querySelectorAll('input[type=checkbox].filter-talla:checked');
    cbxTalla.forEach(function(checkbox) {
        selTalla.push(checkbox.value);
    });
}

const filtersColor = (data) => {
    let filterColor = [];
    const selColor = [];
    const cbxColor = document.querySelectorAll('input[type=checkbox].filter-color:checked');
    cbxColor.forEach(function(checkbox) {
        selColor.push(checkbox.value);
    });
    if(selColor.length > 0){
        data.map( dat => {
            for (const color of selColor) {
                if(color == dat.color){
                    filterColor.push(dat.id);
                }
            }
        });
    }
    return filterColor;
}

const filtersCategoria = (data) => {
    let filter = [];
    const selCategoria = [];
    const cbxCategoria = document.querySelectorAll('input[type=checkbox].filter-categoria:checked');
    cbxCategoria.forEach(function(checkbox) {
        selCategoria.push(checkbox.value);
    });
    if(selCategoria.length > 0){
        data.map( dat => {
            for (const genero of selCategoria) {
                if(genero == dat.genero){
                    filter.push(dat.id);
                }
            }
        });
    }
    return filter;
}

const filtersMarca = (data) => {
    let filter = [];
    const selMarca = [];
    const cbxMarca = document.querySelectorAll('input[type=checkbox].filter-Marca:checked');
    cbxMarca.forEach(function(checkbox) {
        selMarca.push(checkbox.value);
    });
    if(selMarca.length > 0){
        data.map( dat => {
            for (const genero of selMarca) {
                if(genero == dat.marca){
                    filter.push(dat.id);
                }
            }
        });
    }
    return filter;
}