const bestSeller = [{
    image: "https://themesflat.co/html/ecomus/images/products/purple.jpg",
    title: "Ribbed Tank Top",
    price: "$16.95",
    color: ["orange", "black", "white"]
}]

function loadCarousel() {
    $.ajax({
        method: "GET",
        url: "../data/carouselData.json",
        dataType: "json",
    }).done(function (data) {
        data.forEach((item, index) => {
            $('#fashionCarousel .carousel-indicators').append(`
                <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="${index}"
                    class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}"
                    aria-label="Slide ${index + 1}"></button>
            `)
            $('#fashionCarousel .carousel-inner').append(`
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${item.image}"
                        class="d-block w-100" alt="Slide ${index + 1}">
                    <div class="carousel-caption">
                        <h1>${item.title}</h1>
                        <p>${item.description}</p>
                        <a href="${item.buttonLink}" class="btn-shop">${item.buttonText} &nbsp; <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `)
        })
    })
}

function loadBestSeller() {
    $.ajax({
        method: "GET",
        url: "../data/bestSellerData.json",
        dataType: "json",
    }).done(function (data) {
        data.forEach((item) => {
            $('#best-seller').append(`
                <div class="col">
                    <a href="${item.link}" class="text-decoration-none text-dark">
                        <div class="card h-100 border-0">
                            <img src="${item.image}" class="card-img-top"
                                alt="${item.title}">
                            <div class="card-body px-0">
                                <h6 class="mb-1">${item.title}</h6>
                                <p class="fw-bold mb-1">${item.price}</p>
                                <div class="d-flex gap-2">
                                    ${item.colors.map(color => `
                                        <span class="rounded-circle border" style="width:15px;height:15px;background:${color};"></span>
                                        `).join('\n')}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `)
        })
    })
}

function loadBrands() {
    const brands = ['SSENSE', 'BURBERRY', 'NIKE', 'ASOS', 'PULL&BEAR', 'GILDAN']
    brands.map((item) => {
        $('#brands').append(`
           <div class="col-6 col-md-2"><strong>${item}</strong></div>
        `)
    })
}

function loadTestimonials() {
    $.ajax({
        method: "GET",
        url: "../data/testimonialData.json",
        dataType: "json",
    }).done(function (data) {
        data.forEach((item) => {
            $('#testimonials').append(`
                <div class="col-md-4">
                    <div class="p-4 border rounded">
                        <div class="text-warning mb-2">
                            ${Array(item.stars).map(_ => ``).join('★')}
                        </div>
                        <h6 class="fw-bold"${item.title}</h6>
                        <p class="fst-italic">“ ${item.description} ”</p>
                        <p class="fw-bold mb-0">${item.author}</p>
                        <small class="text-muted">${item.authorDescription}</small>
                        <hr>
                        <div class="d-flex align-items-center">
                            <img src="${item.productImage}" width="60"
                                alt="${item.productName}">
                            <div class="ms-3">
                                <div class="fw-normal">${item.productName}</div>
                                <strong>${item.productPrice}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        })
    })
}

$(document).ready(function () {
    loadCarousel();
    loadBestSeller();
    loadBrands();
    loadTestimonials();
});