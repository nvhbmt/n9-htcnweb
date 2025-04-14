// Hàm chuẩn hóa chuỗi để bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
    return str.normalize("NFD") // Chuyển về dạng Unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
        .replace(/đ/g, "d").replace(/Đ/g, "D") // Đổi đ -> d
        .toLowerCase(); // Chuyển thành chữ thường
}

// Hàm tìm kiếm sản phẩm
function searchProduct() {
    let input = document.getElementById("searchInput").value.trim();
    let normalizedInput = removeVietnameseTones(input); // Bỏ dấu tiếng Việt
    let products = document.querySelectorAll(".card");

    products.forEach((product) => {
        let productName = product.querySelector(".card-title").textContent.trim();
        let normalizedName = removeVietnameseTones(productName); // Bỏ dấu tên sản phẩm

        // Kiểm tra nếu tên sản phẩm chứa nội dung nhập vào
        if (normalizedName.includes(normalizedInput)) {
            product.style.display = "block"; // Hiển thị sản phẩm phù hợp
        } else {
            product.style.display = "none"; // Ẩn sản phẩm không khớp
        }
    });
}

function loadProducts() {
    const $container = $('#products-container');
    $.ajax({
        method: "GET",
        url: "./data/productData.json",
        dataType: "json",
    }).done(function (data) {
        $.each(data, function (index, product) {
            // Tạo HTML cho các lựa chọn màu sắc
            const colorOptionsHtml = product.colors.map(color => `
                <label class="color-radio" title="${color.name}">
                    <input
                        type="radio"
                        name="color-${product.id}"
                        value="${color.value}"
                        data-image="${color.image}"
                        ${color.default ? 'checked' : ''}>
                    <span class="color-circle" style="background-color: ${color.style};"></span>
                </label>
            `).join('');

            const productHtml = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card rounded-4 h-100" style="width:100%;">
                        <div class="products-img">
                            <a href="${product.details_link}">
                                <img src="${product.image}" class="card-img-top product-thumbnail" alt="${product.name}">
                            </a>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <a href="${product.details_link}" class="product-name text-decoration-none text-dark">
                                <h5 class="card-title">${product.name}</h5>
                            </a>
                            <p class="card-text price">${product.price.toLocaleString('vi-VN')} VND</p>
                            <div class="size-selector mb-2">
                                ${product.sizes.join(' ')}
                            </div>
                            <div class="color-option mt-auto">
                                <button class="btnCart btnIcon" title="Add to Cart" onclick="addToCart(${product.id})">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </button>
                                ${colorOptionsHtml}
                                <button class="btnHeart btnIcon" title="Add to Wishlist" onclick="addToWishlist(${product.id})">
                                    <i class="fa-solid fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            $container.append(productHtml);
        });

        // Thêm sự kiện cho các radio button màu sắc
        $container.on('change', 'input[type="radio"][name^="color-"]', function () {
            const newImage = $(this).data('image');
            // Tìm ảnh tương ứng trong card và thay đổi src
            $(this).closest('.card').find('.product-thumbnail').attr('src', newImage);
        });
    })
}

$(document).ready(function () {
    loadProducts();
});