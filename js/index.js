// scroll to top btn
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};
scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
// end

// load product img

//end

//login, register, forgot password
document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".wrapper");
    preventSubmitForm();
    login(wrapper);
    register(wrapper);
    clickClose(wrapper);
    initUser();
    checkAuthentication();

    document.getElementById("register").addEventListener("submit", function (event) {
        const checkbox = document.getElementById("term-condition");
        if (!checkbox.checked) {
            alert("Vui lòng đồng ý với các điều khoản và điều kiện trước khi đăng ký.");
            event.preventDefault();
        }
    });
    document.querySelector('.remember-forgot a').addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('.form-box.login').style.display = 'none';
        document.querySelector('.form-box.forgot-password').style.display = 'block';
    });

    document.querySelector('.back-to-login').addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('.form-box.login').style.display = 'block';
        document.querySelector('.form-box.forgot-password').style.display = 'none';
    });
});

function checkAuthentication() {
    var user = localStorage.getItem("userInfor");
    if (user) {
        var eles = document.querySelectorAll(".unauthen");
        eles.forEach(function (e) {
            e.style.display = "none";
        })
        var authen = document.querySelectorAll(".authen");
        authen.forEach(function (e) {
            e.style.display = "block";
        })
        var userInfor = document.querySelector(".user-infor");
        userInfor.innerHTML = user;
    }
    else {
        var eles = document.querySelectorAll(".authen, .unauthen");
        eles.forEach(function (e) {
            e.style.display = "";
        })
    }
}
function initUser() {
    var usersStorage = localStorage.getItem("users");
    if (!usersStorage) {
        const users = [
            { email: "user1@gmail.com", password: "password" },
            { email: "user2@gmail.com", password: "password" },
            { email: "user3@gmail.com", password: "password" },
        ];
        localStorage.setItem("users", JSON.stringify(users));
    }
}
function preventSubmitForm() {
    const forms = document.querySelectorAll("form");
    forms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
        });
    });
}
function login(wrapper) {
    const loginLink = document.querySelector(".login-link");
    const btnPopup = document.querySelector(".btnLogin-popup");
    loginLink.addEventListener("click", () => {
        wrapper.classList.remove("active");
        var login = wrapper.getElementsByClassName("form-box login");
        setDialogHeight(login && login[0], wrapper);
    });
    btnPopup.addEventListener("click", () => {
        wrapper.classList.add("active-popup");
    });
}
function register(wrapper) {
    const registerLink = document.querySelector(".register-link");
    const btnRegisterPopup = document.querySelector(".btnRegister-popup");
    registerLink.addEventListener("click", () => {
        wrapper.classList.add("active");
        var rg = wrapper.getElementsByClassName("form-box register");
        setDialogHeight(rg && rg[0], wrapper);
    });
    btnRegisterPopup.addEventListener("click", () => {
        wrapper.classList.add("active-popup");
        registerLink.click();
    });
}
function clickClose(wrapper) {
    const iconClose = document.querySelector(".icon-close");
    const wrapperDialog = wrapper.querySelector(".wrapper-dialog");
    iconClose.addEventListener("click", () => {
        wrapper.classList.remove("active-popup", "active");
        wrapperDialog.style.height = "";
    });
}
function closePopup() {
    const iconClose = document.querySelector(".icon-close");
    iconClose.click();
    resetForm();
}
function setDialogHeight(element, wrapper) {
    const wrapperDialog = wrapper.querySelector(".wrapper-dialog");
    element && (wrapperDialog.style.height = element.offsetHeight + "px");
}

function loginUser() {
    var form = document.getElementById("login");
    var data = getData(form);
    var user = findUser(data);
    if (user && user.password == data.password) {
        alert("Đăng nhập thành công!");
        closePopup();
        localStorage.setItem("userInfor", user.fullName);
        checkAuthentication();
    } else {
        alert("Email hoặc mật khẩu không hợp lệ!");
    }
}
function logout() {
    localStorage.removeItem("userInfor");
    checkAuthentication();
}
function registerSubmit() {
    var form = document.getElementById("register");
    var data = getData(form);
    console.log(data);
    if (addUser(data)) {
        alert("Đăng ký thành công");
        closePopup();
    }
}
function getData(form) {
    var data = {};
    var inputs = form.querySelectorAll("input[name]");
    inputs.forEach(function (ele) {
        data[ele.name] = ele.value;
    });
    return data;
}

function addUser(user) {
    if (findUser(user)) {
        alert("Đã tồn tại tài khoản trong hệ thống");
        return false;
    }
    var users = getUsers();
    users.push(user);
    setUsers(users);
    return true;
}
function findUser(user) {
    var users = getUsers();
    return users.find((u) => u.email == user.email);
}
function getUsers() {
    var usersStorage = localStorage.getItem("users");
    return JSON.parse(usersStorage);
}
function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
function resetForm(){
    document.getElementById("login").reset();
    document.getElementById("register").reset();
}
// end login, register, fotgot password