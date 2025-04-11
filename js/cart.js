document.addEventListener("DOMContentLoaded", function () {
  // Hàm xóa sản phẩm
  document.querySelectorAll('.delete_product').forEach(deleteBtn => {
    deleteBtn.addEventListener('click', function() {
      const item = this.closest('.item');
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
      document.body.style.overflow = chatPopup.classList.contains("active") ? "hidden" : "";
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
      document.body.style.overflow = popup.classList.contains("active") ? "hidden" : "";
    }
  }

  const voucherBtn = document.getElementById("voucherBtn");
  if (voucherBtn) {
    voucherBtn.addEventListener("click", function(e) {
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

    document.getElementById("tongTien").textContent = formatCurrency(totalAmount);
    document.getElementById("soLuongHang").textContent = `(${selectedCount})`;
  }

  // Format tiền tệ
  function formatCurrency(amount) {
    return "₫" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  

});