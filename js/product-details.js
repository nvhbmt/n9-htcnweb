document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".card");

    productCards.forEach((card) => {
        const productImage = card.querySelector(".card-img-top");
        const colorOptions = card.querySelectorAll(".color-radio input");

        colorOptions.forEach((option) => {
            option.addEventListener("mouseover", function () {
                const newImage = this.getAttribute("data-image");
                if (newImage && productImage.src !== newImage) {
                    productImage.style.transition = "opacity 0.5s ease-in-out";
                    productImage.style.opacity = 0; 

                    setTimeout(() => {
                        productImage.src = newImage;
                        productImage.style.opacity = 1; 
                    }, 300);
                }
            });
        });
    });
});


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

function updateColor(element){
    document.querySelector('#selectedColor').textContent = element.value;
}

function updateSize(element){
    document.querySelector('#selectedSize').textContent = element.value;
}


function changeQuantity(amount) {
        const count = document.querySelector(".txtNumber");
        let values = parseInt(count.textContent);

        values += amount;
        if (values < 1) values = 1;

        count.textContent = values;
}

function formatCurrency(amount) {
    if (isNaN(amount)) amount = 0;
    return amount.toLocaleString("vi-VN") + " VND";
}

document.querySelector('.addCart').addEventListener('click', function () {
    // Lấy thông tin sản phẩm
    const name = document.querySelector('.product-infor h2').innerText;
    const priceText = document.querySelector('.after-discount').innerText;
    const price = parseInt(priceText.replace(/[^\d]/g, '')); // Lấy số từ chuỗi "105.000 VND"
    const color = document.querySelector('input[name="color"]:checked').value;
    const size = document.getElementById('selectedSize').innerText;
    const quantity = parseInt(document.querySelector('.txtNumber').innerText);
    const image = document.querySelector('.col-md-6 img').getAttribute('src');

    const product = {
      name,
      price,
      color,
      size,
      quantity,
      image
    };

    // Lấy giỏ hàng từ localStorage hoặc tạo mới
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra nếu sản phẩm đã tồn tại (cùng tên, size, màu)
    const existing = cart.find(item =>
      item.name === product.name &&
      item.color === product.color &&
      item.size === product.size
    );

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    // Lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Chuyển trang
    window.location.href = 'cart.html';
  });