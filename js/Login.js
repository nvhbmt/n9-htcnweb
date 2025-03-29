function ktraten() {
    let ten = document.getElementById("txtName").value.trim();
    let errName = document.getElementById("errName");
    let namePattern = /^[A-Z][a-z]*$/; // Viết hoa chữ cái đầu mỗi từ
    let words = ten.split(" "); 

    if (ten === "" || !namePattern.test(ten) || words.length > 1) {
        document.getElementById("txtName").classList.add("error-border");
        errName.style.display = "inline";
        if(ten === ""){  
            errName.textContent = "Tên không được để trống.";
        }
        else if(words.length > 1){
            errName.textContent = "Chỉ nhập tên.";
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

function ktraLastName() {
    let ten = document.getElementById("txtLastName").value.trim();
    let errName = document.getElementById("errLastName");
    let namePattern = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/; // Viết hoa chữ cái đầu mỗi từ

    if (ten === "" || !namePattern.test(ten)) {
        document.getElementById("txtLastName").classList.add("error-border");
        errName.style.display = "inline";
        if(ten === ""){
            errName.textContent = "Họ không được để trống.";
        }
        else{          
            errName.textContent = "Phải viết hoa chữ cái đầu. ";
        }
        return false;
    } 
    else {
        document.getElementById("txtLastName").classList.remove("error-border");
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
            errEmail.innerHTML = "Vui lòng nhập email hợp lệ (Ví dụ: example@gmail.com)";
        }
        return false;
    } 
    else {
        document.getElementById("txtEmail").classList.remove("error-border");
        errEmail.style.display = "none";
        return true;
    }
}

function ktraPassword() {
    let password = document.getElementById("txtPassword").value.trim();
    let errPassword = document.getElementById("errPassword");

    // Biểu thức kiểm tra mật khẩu
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password === "" || !passwordPattern.test(password)) {
        document.getElementById("txtPassword").classList.add("error-border");
        errPassword.style.display = "inline";
        if (password === "") {
            errPassword.innerHTML = "Mật khẩu không được để trống.";
        } 
        else {
            errPassword.innerHTML = "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
        }
        return false;
    } 
    else {
        document.getElementById("txtPassword").classList.remove("error-border");
        errPassword.style.display = "none";
        return true;
    }
}

function btnLogin() {
    // Gọi lại các hàm kiểm tra đã có
    let validEmail = ktraEmail();
    let validPassword = ktraPassword();

    // Nếu tất cả đều hợp lệ thì sẽ đi đến trang khác
    if (validEmail && validPassword) {
        alert("Đăng nhập thành công!"); 
        window.location.href = "../html/Contact.html";
    }
};

function btnRegister() {
    // Gọi lại các hàm kiểm tra đã có
    let validName = ktraten();
    let valiLastName = ktraLastName();
    let validEmail = ktraEmail();
    let validPassword = ktraPassword();

    // Nếu tất cả đều hợp lệ thì thông báo
    if (validName && valiLastName && validEmail && validPassword) {
        alert("Đăng ký thành công!");
    }
};

function btnReset() {
    // Gọi lại các hàm kiểm tra đã có
    let validEmail = ktraEmail();

    // Nếu tất cả đều hợp lệ thì thông báo
    if (validEmail) {
        alert("Đăng nhập thành công!");
    }
};

