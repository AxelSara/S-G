const banner = () => {

}
banner();
(function () {
    "use strict";

    // Vertical Slider object
    const vertical_slider = {

        // Slide class name
        slider_class: ".slider",

        // Show slide
        show_slide: function (slide_id, context_item) {
            const slide_container = context_item.closest(this.slider_class).querySelector(".slides");
            if (slide_container) {
                const slides = slide_container.querySelectorAll(".slide");
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
    const response = await fetch("./Frontend/assets/json/productos.json");
    const data = await response.json();
    findData(data, url)
}

const findData = (data, url) => {
    return data.map(dat => {
        if (url === dat.imgMuestra) {
            document.getElementById("Modelo").innerHTML = dat.modelo;
            document.getElementById("Color").innerHTML = dat.color;
            document.getElementById("price").innerHTML = `$${dat.precio}.00`;
            document.getElementById("marca").innerHTML = dat.marca;
        }
    });
};

// Initialize a img for each slide

const imgInit = async () => {
    const response = await fetch("./Frontend/assets/json/productos.json");
    const data = await response.json();
    showImg(data, 0);
    const imgElements = document.querySelectorAll(".img-pdt img");
    findData(data, imgElements[0].src);
}

const showImg = (data, id) => {
    let banner = "";
    return data.map(dat => {
        if (0 === dat.id) {
            banner += `
            <div class="slide">
                <div class="img-pdt inner_content">
                    <img class="img-banner" src="${data[0].imgMuestra}" alt="" id="img_1">
                </div>
            </div>
            `;
        } else if (6 === dat.id) {
            banner += `
            <div class="slide">
                <div class="img-pdt inner_content">
                    <img class="img-banner" src="${data[6].imgMuestra}" alt="" id="img_1">
                </div>
            </div>
            `;
        } else if (10 === dat.id) {
            banner += `
            <div class="slide">
                <div class="img-pdt inner_content">
                    <img class="img-banner" src="${data[10].imgMuestra}" alt="" id="img_1">
                </div>
            </div>
            `;
        }
        document.getElementById("img__banner").innerHTML = banner;
    });
}

imgInit();

const indexBanner = () => {

    const imgElements = document.querySelectorAll(".img-pdt img");

    const enlaces = document.querySelectorAll('li');
    enlaces.forEach(function (enlace) {
        enlace.addEventListener('click', function (event) {
            event.preventDefault();
            let id = this.id;
            if(id == "li1"){
                dataProductos(imgElements[0].src);
            } else if(id == "li2"){
                dataProductos(imgElements[1].src);
            } else if(id == "li3"){
                dataProductos(imgElements[2].src);
            } 
        });
    });
}

let cart = [];
const AddCarritoBanner = async () => {
    const modelo = document.getElementById("Modelo").innerHTML;
    const color = document.getElementById("Color").innerHTML;
    const response = await fetch("./Frontend/assets/json/productos.json");
    const data = await response.json();
    for (const product of data) {
        if(modelo === product.modelo && color === product.color){
            cart.push( {
                "id": product.id,
                "modelo": product.modelo,
                "color": product.color,
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
    console.log(carritoLocalStorage);
}