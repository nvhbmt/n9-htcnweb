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