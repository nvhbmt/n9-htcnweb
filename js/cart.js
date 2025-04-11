document.addEventListener("DOMContentLoaded", function () {
  renderCartItems();
  // Hàm xóa sản phẩm
  document.querySelectorAll(".delete_product").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function () {
      const item = this.closest(".item");
      if (item) {
        item.remove();
        updateCartSummary();
      }
    });
  });

  // Hàm tăng số lượng
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("counter-increase")) {
      const counter = e.target.closest(".counter");
      const valueElement = counter.querySelector(".counter-value");
      let value = parseInt(valueElement.textContent);
      value++;
      valueElement.textContent = value;
      updateCartSummary();
    }

    if (e.target.classList.contains("counter-decrease")) {
      const counter = e.target.closest(".counter");
      const valueElement = counter.querySelector(".counter-value");
      let value = parseInt(valueElement.textContent);
      if (value > 1) {
        value--;
        valueElement.textContent = value;
        updateCartSummary();
      }
    }
  });

  // Hàm chọn sản phẩm để tính giá
  document.body.addEventListener("change", function (e) {
    if (e.target.classList.contains("chonSanPham")) {
      updateCartSummary();
    }

    if (e.target.classList.contains("allProduct")) {
      const isChecked = e.target.checked;
      document.querySelectorAll(".chonSanPham").forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
      updateCartSummary();
    }
  });

  //  chat popup
  function toggleChatPopup() {
    const chatPopup = document.getElementById("chatPopup");
    if (chatPopup) {
      chatPopup.classList.toggle("active");
      document.body.style.overflow = chatPopup.classList.contains("active")
        ? "hidden"
        : "";
    }
  }

  const chatBtn = document.getElementById("chatBtn");
  if (chatBtn) {
    chatBtn.addEventListener("click", function (e) {
      e.preventDefault();
      toggleChatPopup();
    });
  }

  const closeChatBtn = document.querySelector("#chatPopup .btn-close");
  if (closeChatBtn) {
    closeChatBtn.addEventListener("click", toggleChatPopup);
  }

  // voucher popup
  function togglePopup() {
    const popup = document.getElementById("voucherPopup");
    if (popup) {
      popup.classList.toggle("active");
      document.body.style.overflow = popup.classList.contains("active")
        ? "hidden"
        : "";
    }
  }

  const voucherBtn = document.getElementById("voucherBtn");
  if (voucherBtn) {
    voucherBtn.addEventListener("click", function (e) {
      e.preventDefault();
      togglePopup();
    });
  }

  const closeBtn = document.querySelector(".voucherPopup .btn-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", togglePopup);
  }

  // Cập nhập cart
  function updateCartSummary() {
    let totalAmount = 0;
    let selectedCount = 0;

    document.querySelectorAll(".item").forEach((item) => {
      const checkbox = item.querySelector(".chonSanPham");
      if (checkbox && checkbox.checked) {
        const priceText = item.querySelector(".text-danger").textContent;
        const quantity = parseInt(
          item.querySelector(".counter-value").textContent
        );
        const price = parseInt(priceText.replace(/[^\d]/g, ""));

        totalAmount += price * quantity;
        selectedCount++;
      }
    });

    document.getElementById("tongTien").textContent =
      formatCurrency(totalAmount);
    document.getElementById("soLuongHang").textContent = `(${selectedCount})`;
  }

  // Format tiền tệ
  function formatCurrency(amount) {
    return "₫" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Load sản phẩm từ localStorage lên giao diện
  function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemList = document.querySelector(".item-list");
    itemList.innerHTML = ""; // Xóa sản phẩm cũ nếu có

    cart.forEach((product, index) => {
      const item = document.createElement("div");
      item.classList.add("item", "mb-3", "rounded-4");
      item.dataset.id = index;

      item.innerHTML = `
      <div class="row g-0 text-decoration-none text-dark align-items-center">
        <div class="col-2 d-flex align-items-center gap-2 p-3">
          <input type="checkbox" class="chonSanPham" />
          <div class="img_product">
            <img
              src="${product.image}"
              alt=""
              class="img-fluid rounded-4"
            />
          </div>
        </div>
        <div class="col-10 ps-0 pe-5">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h3 class="mb-0">${product.name}</h3>
              <p class="text-danger mb-0 fw-bold">&#8363;${product.price.toLocaleString(
                "vi-VN"
              )}</p>
            </div>
            <div class="d-flex align-items-center">
              <div class="counter me-3">
                <button class="btn btn-outline-secondary counter-decrease">-</button>
                <span class="fs-5 counter-value">${product.quantity}</span>
                <button class="btn btn-outline-secondary counter-increase">+</button>
              </div>
              <div class="delete_product">
                <i class="fa-solid fa-trash trash" style="color: #74C0FC;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

      itemList.appendChild(item);
    });

    const btnMuaHang = document.querySelector(".muaHang");

    if (btnMuaHang) {
      btnMuaHang.addEventListener("click", function () {
        window.location.href = "payment.html";
      });
    }

    updateCartSummary(); // cập nhật tổng
  }
  window.addEventListener("beforeunload", function () {
    localStorage.removeItem("cart");
  });
});
