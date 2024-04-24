const rutaJSON = "../../json/productos-copy.json";
const rutaIMG = "../img/productos/";


const datLS = async () => {
    const responseJson = await fetch(rutaJSON);
    const dataLS = await responseJson.json();
    localStorage.setItem("database", JSON.stringify(dataLS));
    const dataLocalStorage = JSON.parse(localStorage.getItem("database"));
}

datLS();

const showData = (data) =>{
    let table = "";
    data.map(dat => {
        table += `
        <tr>
            <th scope="row">${dat.id}</th>
            <td><label>
                <input type="text" class="input-${dat.id}" id="modelo-${dat.id}" value="${dat.modelo}" disabled>
            </label></td>
            <td><label>
                <input type="text" class="input-${dat.id}" id="color-${dat.id}" value="${dat.color}" disabled>
            </label></td>
            <td><label>
                <input type="text" class="input-${dat.id}" id="genero-${dat.id}" value="${dat.genero}" disabled>
            </label></td>
            <td><label>
                <input type="text" class="input-${dat.id}" id="precio-${dat.id}" value="${dat.precio}" disabled>
            </label></td>
            <td><label>
                <input type="text" class="input-${dat.id}" id="marca-${dat.id}" value="${dat.marca}" disabled>
            </label></td>
            <td><label>
                <input type="text" class="input-${dat.id}" id="muestra-${dat.id}" value="${dat.imgMuestra}" disabled>
            </label></td>
            <td><label>
                <input type="text" class="input-${dat.id}" id="lateral-${dat.id}" value="${dat.imgLateral}" disabled>
            </label></td>
            <td><label>
                <input type="text" class="input-${dat.id}" id="frontal-${dat.id}" value="${dat.imgFrontal}" disabled>
            </label></td>
            <td><label>
                <input type="text" class="input-${dat.id}" id="superior-${dat.id}" value="${dat.imgSuperior}" disabled>
            </label></td>
            <!--<td><img src="${dat.imgMuestra}" alt=""></td>
            <td><img src="${dat.imgLateral}" alt=""></td>
            <td><img src="${dat.imgFrontal}" alt=""></td>
            <td><img src="${dat.imgSuperior}" alt=""></td>-->
            <td id="edit-${dat.id}">
                <button title="Editar" onclick="editTable(${dat.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/></svg>
                </button>
            </td>
            <td id="delete-${dat.id}">
                <button title="Eliminar" onclick="removeTable(${dat.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            </td>
        </tr>
        `;
    });
    document.getElementById("admin-table-data").innerHTML = table;
}

const table = () => {
    // const response = await fetch(rutaJSON);
    // const data = await response.json();
    const dataLocalStorage = JSON.parse(localStorage.getItem("database"));
    document.getElementById("admin-panel").innerHTML = `
        <div class="admin-table">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Color</th>
                    <th scope="col">Género</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Img muestra</th>
                    <th scope="col">Img lateral</th>
                    <th scope="col">Img frontal</th>
                    <th scope="col">Img superior</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Elimnar</th>
                </tr>
                </thead>
                <tbody id="admin-table-data">

                </tbody>
            </table>
        </div>
    `;
    showData(dataLocalStorage);
}

//init();

const agregarZapato = () => {
    document.getElementById("admin-panel").innerHTML = `
    <section class="admin-add">
        <div class="container-fluid contenedor_principal_agregarZapato">

        <header class="tituloAgregarZapato">
            <h1>Agregar zapato</h1>
        </header>

        <form class="form-group mt-3" id="form">

            <div class="row">
                <!-- Columna 1 de la fila 1 (campos de entrada)-->
                <div class="col-md-8 col-sm-12">
                    <div class="form-group mt-2">

                        <div>
                            <label for="nombreZapatoAgregar" class="form-label">Nombre del zapato</label>
                            <input type="text" class="form-control" id="nombre_zapato_agregar"
                                name="nombreZapatoAgregar">
                        </div>

                        <!-- campo color -->
                        <div>
                            <label for="nombreZapatoAgregar" class="form-label">Color</label>
                            <input type="text" class="form-control" id="color_zapato_agregar"
                                name="nombreZapatoAgregar">
                        </div>

                        <!-- campo precio -->
                        <div>

                            <label for="nombreZapatoAgregar" class="form-label">Precio</label>
                            <input type="text" class="form-control" id="precio_zapato_agregar"
                                name="nombreZapatoAgregar">
                        </div>

                        <!-- campo marca -->
                        <div class="mb-3">
                            <label for="nombreZapatoAgregar" class="form-label">Marca</label>
                            <input type="text" class="form-control" id="marca_zapato_agregar"
                                name="nombreZapatoAgregar">
                        </div>


                        <!-- campo talla -->
                        <label for="talla-selector">Seleccione las tallas </label>


                        <div class="talla-selector">

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-24" value="24" name="talla">
                                <label for="talla-24">24</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-24.5" value="24.5" name="talla">
                                <label for="talla-24.5">24.5</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-25" value="25" name="talla">
                                <label for="talla-25">25</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-25.5" value="25.5" name="talla">
                                <label for="talla-25.5">25.5</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-26" value="26" name="talla">
                                <label for="talla-26">26</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-26.5" value="26.5" name="talla">
                                <label for="talla-26.5">26.5</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-27" value="27" name="talla">
                                <label for="talla-27">27</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-27.5" value="27.5" name="talla">
                                <label for="talla-27.5">27.5</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-28" value="28" name="talla">
                                <label for="talla-28">28</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-28.5" value="28.5" name="talla">
                                <label for="talla-28.5">28.5</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-29" value="29" name="talla">
                                <label for="talla-29">29</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-29.5" value="29.5" name="talla">
                                <label for="talla-29.5">29.5</label>
                            </div>

                            <div class="talla-checkbox">
                                <input type="checkbox" id="talla-30" value="30" name="talla">
                                <label for="talla-30">30</label>
                            </div>

                        </div>
                        <div class="talla-mostradas">
                            <p>Tallas seleccionadas: <span id="tallas-mostradas">Ninguna</span></p>
                        </div>

                        <!-- campo  radio boton género -->
                        <div class="form-group mt-3">
                            <h6>Género</h6>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input hidden-radio" type="radio"
                                    name="inlineRadioOptions" id="inlineHombre1" value="Hombre">
                                <label class="form-check-label" for="inlineHombre1">
                                    <i class="fas fa-male"></i> Hombre
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input hidden-radio" type="radio"
                                    name="inlineRadioOptions" id="inlineMujer" value="Mujer">
                                <label class="form-check-label" for="inlineMujer">
                                    <i class="fas fa-female"></i> Mujer
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input hidden-radio" type="radio"
                                    name="inlineRadioOptions" id="inlineUnisex" value="Unisex">
                                <label class="form-check-label" for="inlineUnisex">
                                    <i class="fas fa-genderless"></i> Unisex
                                </label>
                            </div>
                        </div>



                    </div>
                </div>

                <!-- Columna 2 de la fila 1  (Campo imagen)-->
                <div class="col-md-4 col-sm-12 form-group mt-3 contenedorImagenAgregarZapato">

                    <!-- contenedor carousel -->

                    <div id="carouselAddZapato" class="carousel slide " data-ride="carousel">
                        <div class="carousel-inner">

                            <div class="carousel-item active contenedorImagenAgregar">
                                <label class="custom-file-label" for="img_captada_principal">Selecciona la
                                    imagen principal</label>
                                <img class="imagenSeleccionada" id="imagenPrincipal"
                                    src="../img/admin/subir.png" alt="Selecciona una imagen">
                                <input type="file" class="form-control-file" id="img_captada_principal"
                                    readonly>
                            </div>

                            <div class="carousel-item contenedorImagenAgregar">
                                <label class="custom-file-label" for="img_captada_frontal">Selecciona una imagen
                                    frontal</label>
                                <img class="imagenSeleccionada" id="imagenFrontal" src="../img/admin/subir.png"
                                    alt="Selecciona una imagen">
                                <input type="file" class="custom-file-input" id="img_captada_frontal">
                            </div>

                            <div class="carousel-item contenedorImagenAgregar">
                                <label class="custom-file-label" for="img_captada_lateral">Selecciona una imagen
                                    lateral</label>
                                <img class="imagenSeleccionada" id="imagenLateral" src="../img/admin/subir.png"
                                    alt="Selecciona una imagen">
                                <input type="file" class="custom-file-input" id="img_captada_lateral">
                            </div>

                            <div class="carousel-item contenedorImagenAgregar">
                                <label class="custom-file-label" for="img_captada_superior">Selecciona una
                                    imagen superior</label>
                                <img class="imagenSeleccionada" id="imagenSuperior" src="../img/admin/subir.png"
                                    alt="Selecciona una imagen">
                                <input type="file" class="custom-file-input" id="img_captada_superior">
                            </div>


                        </div>
                        <!-- Botones del carousel -->
                        <div class="carousel-control-prev" id="previaImagenAgregarZapato"
                            data-bs-target="#carouselAddZapato" data-bs-slide="prev">
                            <!-- Utiliza un div como el botón circular -->
                            <button class="carousel-control-icon" id="botonCarouselAgregarZapato" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                </svg>
                            </button>
                            <span class="visually-hidden">Previous</span>
                        </div>
                        <div class="carousel-control-next" id="siguienteImagenAgregarZapato"
                            data-bs-target="#carouselAddZapato" data-bs-slide="next">
                            <!-- Utiliza un div como el botón circular -->
                            <button class="carousel-control-icon" id="botonCarouselAgregarZapato" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                            <span class="visually-hidden">next</span>
                        </div>
                    </div>

                </div>

            </div> <!-- Fin de la fila -->

            <!-- Fila 2 -->

            <div class="row mt-3">
                <div class="col-md-12 contenedorBotonAgregarZapato">
                    <button type="submit" class="btn btn-primary btnSubmitAddZapato">Agregar Zapato</button>
                </div>
            </div>

        </form>
    </div>
    </section>
    `;
}

const blank = () => {
    document.getElementById("admin-panel").innerHTML = `
    <div id="blank-panel">
        <ul>
            <h5>Menú administrador</h5>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-cloud-plus" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                </svg>Sección para agregar productos
            </li>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>Sección para visualizar, modificar y eliminar los productos almacenados
            </li>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-bar-chart-line" viewBox="0 0 16 16">
                    <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
                </svg>Sección para resumen de ventas
            </li>
        </ul>
    </div>
    `;
}

const editTable = (id) => {
    const idInput = `.input-`+id;
    const idButton = `edit-`+id;
    const elements = document.querySelectorAll(idInput);

    elements.forEach((e)=> {
        e.disabled = false;
    });

    document.getElementById(idButton).innerHTML = `
        <button title="Guardar" onclick="saveTable(${id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
                <path d="M11 2H9v3h2z"/>
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
            </svg>
        </button>
    `;
}

const saveTable = (id) => {
    const modelo = document.getElementById(`modelo-`+id).value;
    const color = document.getElementById(`color-`+id).value;
    const genero = document.getElementById(`genero-`+id).value;
    const precio = document.getElementById(`precio-`+id).value;
    const marca = document.getElementById(`marca-`+id).value;
    const muestra = document.getElementById(`muestra-`+id).value;
    const lateral = document.getElementById(`lateral-`+id).value;
    const frontal = document.getElementById(`frontal-`+id).value;
    const superior = document.getElementById(`superior-`+id).value;
    const dataLocalStorage = JSON.parse(localStorage.getItem("database"));
    dataLocalStorage.map(dat => {
        if(id === dat.id){
            dat.modelo = modelo;
            dat.color = color;
            dat.genero = genero;
            dat.precio = precio;
            dat.marca = marca;
            dat.imgMuestra = muestra;
            dat.imgLateral = lateral;
            dat.imgFrontal = frontal;
            dat.imgSuperior = superior;
        }
    })

    localStorage.setItem("database", JSON.stringify(dataLocalStorage));
    console.log(dataLocalStorage);

    const idInput = `.input-`+id;
    const idButton = `edit-`+id;
    const elements = document.querySelectorAll(idInput);

    elements.forEach((e)=> {
        e.disabled = true;
    });

    document.getElementById(idButton).innerHTML = `
        <button title="Editar" onclick="editTable(${id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/></svg>
        </button>
    `;
}

const idk = () => {
    alert("idk");
}