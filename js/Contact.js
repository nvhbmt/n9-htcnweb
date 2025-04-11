function ktraten() {
    let ten = document.getElementById("txtName").value.trim();
    let errName = document.getElementById("errName");
    let namePattern = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/; // Viết hoa chữ cái đầu mỗi từ

    if (ten === "" || !namePattern.test(ten)) {
        document.getElementById("txtName").classList.add("error-border");
        errName.style.display = "inline";
        if(ten === ""){ 
            errName.textContent = "Tên không được để trống.";
        }
        else{
            errName.textContent = "Phải viết hoa chữ cái đầu.";
        }
        return false;
    } 
    else {
        document.getElementById("txtName").classList.remove("error-border");
        errName.style.display = "none";
        return true;
    }
}

function ktraEmail() {
    let email = document.getElementById("txtEmail").value.trim();
    let errEmail = document.getElementById("errEmail"); 
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex kiểm tra email hợp lệ

    if (email === "" || !emailPattern.test(email)) {
        document.getElementById("txtEmail").classList.add("error-border");
        errEmail.style.display = "inline";
        if (email === ""){
            errEmail.innerHTML = "Email không được để trống.";
        }
        else{
            errEmail.innerHTML = "Vui lòng nhập email hợp lệ.<br>(Ví dụ: example@gmail.com)";
        }
        return false;
    } 
    else {
        document.getElementById("txtEmail").classList.remove("error-border");
        errEmail.style.display = "none";
        return true;
    }
}

function ktraMessage() {
    let message = document.getElementById("Message").value.trim();
    let errMessage = document.getElementById("errMessage");

    if (message === "") {
        document.getElementById("Message").classList.add("error-border");
        errMessage.style.display = "inline";
        errMessage.innerHTML = "Vui lòng nhập nội dung tin nhắn.";
        return false;
    } 
    else {
        document.getElementById("Message").classList.remove("error-border");
        document.querySelector(".lbMess").style.top = "2px";
        errMessage.style.display = "none";
        return true;
    }
}

function btnSend() {
    // Gọi lại các hàm kiểm tra đã có
    let valiName = ktraten();
    let validEmail = ktraEmail();
    let validPassword = ktraMessage();

    // Nếu tất cả đều hợp lệ thì thông báo
    if (valiName && validEmail && validPassword) {
        alert("Gửi tin thành công!"); 
    }
};