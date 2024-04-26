const banner = () => {

}
banner();
(function () {
    "use strict";

    // Vertical Slider object
    const vertical_slider = {

        // Slide class name
        slider_class: ".slider-banner",

        // Show slide
        show_slide: function (slide_id, context_item) {
            const slide_container = context_item.closest(this.slider_class).querySelector(".slides-banner");
            if (slide_container) {
                const slides = slide_container.querySelectorAll(".slide-banner");
                if (slides && slides[slide_id]) {

                    // Scroll to active slide
                    slide_container.scrollTo({
                        top: slides[slide_id].offsetTop,
                        behavior: "smooth"
                    });

                    // Set active context item
                    const active_context_item = context_item.closest(".slide_navigation").querySelector(".active");
                    if (active_context_item) {
                        active_context_item.classList.remove("active");
                    }

                    context_item.classList.add("active");
                }
            }
        },

        // Initialize slide
        init_slider: function (slider) {

            const navigation_items = slider.querySelectorAll(".slide_navigation a");

            if (navigation_items) {
                Object.keys(navigation_items).forEach(function (key) {
                    navigation_items[key].onclick = function (e) {
                        e.preventDefault();
                        vertical_slider.show_slide(key, navigation_items[key]);
                        indexBanner();
                    };
                });
            }

        },

        // Initialize sliders
        init: function () {

            // Iterate over each slider
            document.querySelectorAll(this.slider_class).forEach((slider) => this.init_slider(slider));

        }
    };

    // Initialize sliders
    vertical_slider.init();
}());

const dataProductos = async (url) => {
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    findData(data, url)
}

const showImg = (data) => {
    let banner = "";
    return data.map(dat => {
        if (5 === dat.id) {
            banner += `
            <div class="slide-banner">
                <div class="img-pdt inner_content">
                    <img class="img-banner" src="./Frontend/assets/img/productos/${data[5].imgMuestra}" alt="${data[5].imgMuestra}">
                </div>
            </div>
            `;
        } else if (7 === dat.id) {
            banner += `
            <div class="slide-banner">
                <div class="img-pdt inner_content">
                    <img class="img-banner" src="./Frontend/assets/img/productos/${data[7].imgMuestra}" alt="${data[7].imgMuestra}">
                </div>
            </div>
            `;
        } else if (11 === dat.id) {
            banner += `
            <div class="slide-banner">
                <div class="img-pdt inner_content">
                    <img class="img-banner" src="./Frontend/assets/img/productos/${data[11].imgMuestra}" alt="${data[11].imgMuestra}">
                </div>
            </div>
            `;
        }
        document.getElementById("img__banner").innerHTML = banner;
    });
}

const showImgCarrusel = (data) => {
    let banner = "";
    return data.map(dat => {
        if (5 === dat.id) {
            banner += `
            <div class="carousel-item active">
                <img src="./Frontend/assets/img/productos/${data[5].imgMuestra}" class="d-block w-100" alt="${data[5].imgMuestra}">
                <div class="carousel-caption">
                    <div class="carruselBannerText">
                        <h1 id="ModeloCarrusel1">${data[5].modelo}</h1>
                        <p id="ColorCarrusel1">${data[5].color}</p>
                    </div>
                    <div class="buttons">
                        <div class="banner-button">
                            <button class="buy banner-pdt" id="buy1"
                                onclick="AddCarritoBannerCarrusel1()">Comprar</button>
                        </div>
                        <div class="banner-button">
                            <p class="banner-pdt" id="price">$${data[5].precio}.00</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        } else if (7 === dat.id) {
            banner += `
            <div class="carousel-item">
                <img src="./Frontend/assets/img/productos/${data[7].imgMuestra}" class="d-block w-100" alt="${data[7].imgMuestra}">
                <div class="carousel-caption">
                    <div class="carruselBannerText">
                        <h1 id="ModeloCarrusel2">${data[7].modelo}</h1>
                        <p id="ColorCarrusel2">${data[7].color}</p>
                    </div>
                    <div class="buttons">
                        <div class="banner-button">
                            <button class="buy banner-pdt" id="buy2"
                                onclick="AddCarritoBannerCarrusel2()">Comprar</button>
                        </div>
                        <div class="banner-button">
                            <p class="banner-pdt" id="price">$${data[7].precio}.00</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        } else if (11 === dat.id) {
            banner += `
            <div class="carousel-item">
                <img src="./Frontend/assets/img/productos/${data[11].imgMuestra}" class="d-block w-100" alt="${data[11].imgMuestra}">
                <div class="carousel-caption">
                    <div class="carruselBannerText">
                        <h1 id="ModeloCarrusel3">${data[11].modelo}</h1>
                        <p id="ColorCarrusel3">${data[11].color}</p>
                    </div>
                    <div class="buttons">
                        <div class="banner-button">
                            <button class="buy banner-pdt" id="buy3"
                                onclick="AddCarritoBannerCarrusel3()">Comprar</button>
                        </div>
                        <div class="banner-button">
                            <p class="banner-pdt" id="price">$${data[11].precio}.00</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById("carrusel__banner").innerHTML = banner;
    });
}

const findData = (data, url) => {
    return data.map(dat => {
        if (url === dat.imgMuestra) {
            document.getElementById("Modelo").innerHTML = dat.modelo;
            document.getElementById("Color").innerHTML = dat.color;
            document.getElementById("price").innerHTML = `$${dat.precio}.00`;
            document.getElementById("marca").innerHTML = dat.marca;
            document.getElementById("descripcionProducto").innerHTML = dat.descripcion;
        }
    });
};

// Initialize a img for each slide

const imgInit = async () => {
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    showImg(data);
    showImgCarrusel(data);
    const imgElements = document.querySelectorAll(".img-pdt img");
    findData(data, imgElements[0].alt);
}

const indexBanner = () => {

    const imgElements = document.querySelectorAll(".img-pdt img");

    const enlaces = document.querySelectorAll('li');
    enlaces.forEach(function (enlace) {
        enlace.addEventListener('click', function (event) {
            event.preventDefault();
            let id = this.id;
            if (id == "li1") {
                dataProductos(imgElements[0].alt);
            } else if (id == "li2") {
                dataProductos(imgElements[1].alt);
            } else if (id == "li3") {
                dataProductos(imgElements[2].alt);
            }
        });
    });
}

function alert() {
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

let cart = [];
const AddCarritoBanner = async () => {
    const modelo = document.getElementById("Modelo").innerHTML;
    const color = document.getElementById("Color").innerHTML;
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    for (const product of data) {
        if (modelo === product.modelo && color === product.color) {
            cart.push({
                "id": product.id,
                "modelo": product.modelo,
                "color": product.color,
                "genero": product.genero,
                "talla": 7,
                "precio": product.precio,
                "marca": product.marca,
                "imgMuestra": product.imgMuestra,
                "imgLateral": product.imgLateral,
                "imgFrontal": product.imgFrontal,
                "imgSuperior": product.imgSuperior
            });
        }
    }
    localStorage.setItem("carrito", JSON.stringify(cart));
    const carritoLocalStorage = localStorage.getItem("carrito");
    alert();
}

const AddCarritoBannerCarrusel1 = async () => {
    const modelo = document.getElementById("ModeloCarrusel1").innerHTML;
    const color = document.getElementById("ColorCarrusel1").innerHTML;
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    for (const product of data) {
        if (modelo === product.modelo && color === product.color) {
            cart.push({
                "id": product.id,
                "modelo": product.modelo,
                "color": product.color,
                "genero": product.genero,
                "talla": 7,
                "precio": product.precio,
                "marca": product.marca,
                "imgMuestra": product.imgMuestra,
                "imgLateral": product.imgLateral,
                "imgFrontal": product.imgFrontal,
                "imgSuperior": product.imgSuperior
            });
        }
    }
    localStorage.setItem("carrito", JSON.stringify(cart));
    const carritoLocalStorage = localStorage.getItem("carrito");
    alert();
}

const AddCarritoBannerCarrusel2 = async () => {
    const modelo = document.getElementById("ModeloCarrusel2").innerHTML;
    const color = document.getElementById("ColorCarrusel2").innerHTML;
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    for (const product of data) {
        if (modelo === product.modelo && color === product.color) {
            cart.push({
                "id": product.id,
                "modelo": product.modelo,
                "color": product.color,
                "genero": product.genero,
                "talla": 7,
                "precio": product.precio,
                "marca": product.marca,
                "imgMuestra": product.imgMuestra,
                "imgLateral": product.imgLateral,
                "imgFrontal": product.imgFrontal,
                "imgSuperior": product.imgSuperior
            });
        }
    }
    localStorage.setItem("carrito", JSON.stringify(cart));
    const carritoLocalStorage = localStorage.getItem("carrito");
    alert();
}

const AddCarritoBannerCarrusel3 = async () => {
    const modelo = document.getElementById("ModeloCarrusel3").innerHTML;
    const color = document.getElementById("ColorCarrusel3").innerHTML;
    const response = await fetch("./Frontend/json/productos.json");
    const data = await response.json();
    for (const product of data) {
        if (modelo === product.modelo && color === product.color) {
            cart.push({
                "id": product.id,
                "modelo": product.modelo,
                "color": product.color,
                "genero": product.genero,
                "talla": 7,
                "precio": product.precio,
                "marca": product.marca,
                "imgMuestra": product.imgMuestra,
                "imgLateral": product.imgLateral,
                "imgFrontal": product.imgFrontal,
                "imgSuperior": product.imgSuperior
            });
        }
    }
    localStorage.setItem("carrito", JSON.stringify(cart));
    const carritoLocalStorage = localStorage.getItem("carrito");
    alert();
}

imgInit();  

const scrollPageDown = () => {
    const landingPage = document.getElementById("productosRecientesSection");
    landingPage.scrollIntoView({behavior: 'smooth'})
    document.getElementById("showBottomContent").innerHTML= `
        <button id="scrollButton" onclick="scrollUp()">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v10.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 12.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708z"/>
            <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
            </svg>
        </button>
    `;
}

const scrollUp = () => {
    const landingPage = document.getElementById("banner-home");
    landingPage.scrollIntoView({behavior: 'smooth'})
    document.getElementById("showBottomContent").innerHTML= `
        <button id="scrollButton" onclick="scrollPageDown()">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v10.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 12.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
        </button>
    `;
}
