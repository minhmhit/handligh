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
//voucher
function copyToClipboard(code) {
    navigator.clipboard.writeText(code).then(() => {
        // Show popup
        const popup = document.getElementById('copyPopup');
        popup.style.display = 'block';

        // Hide popup after 1 second
        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}
//end

// load product img

//end

//login, register, forgot password
document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".wrapper");
    Validator({
        form: '#form-1',
        formGroupSelector: '.input-box',
        errorSelector: '.form-message',
        rules: [
            isRequired('#fullName', 'Vui lòng nhập tên đầy đủ của bạn'),
            isRequired('#email','Vui lòng nhập email của bạn'),
            isEmail('#email', 'Vui lòng nhập đúng cú pháp email'),
            minLength('#password', 6),
        ],
        onSubmit: function (data) {
            registerSubmit(data); 
        }
    });


    Validator({
        form: '#form-2',
        formGroupSelector: '.input-box',
        errorSelector: '.form-message',
        rules: [
            isRequired('#emailLogin', 'Vui lòng nhập email của bạn'),
            isEmail('#emailLogin', 'Vui lòng nhập đúng cú pháp email'),
            minLength('#passwordLogin', 6),
        ],
        onSubmit: function (data) {
            loginUser(data);
        }
    });
    preventSubmitForm();
    login(wrapper);
    register(wrapper);
    clickClose(wrapper);
    initUser();
    checkAuthentication();

    // document.getElementById("register").addEventListener("submit", function (event) {
    //     const checkbox = document.getElementById("term-condition");
    //     if (!checkbox.checked) {
    //         alert("Vui lòng đồng ý với các điều khoản và điều kiện trước khi đăng ký.");
    //         event.preventDefault();
    //     }
    // });
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
        userInfor.innerHTML = '<i class="fa-regular fa-user"></i> Xin chào, ' + user;
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
    if (!usersStorage || !Array.isArray(JSON.parse(usersStorage))) {
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
    var form = document.getElementById("form-2");
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
    var form = document.getElementById("form-1");
    form.submit();

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
    document.getElementById("form-2").reset();
    document.getElementById("form-1").reset();
}

// validate
// Đối tượng `Validator`

function formIsValid(form){
    var inValidEle = form.querySelectorAll('.input-box.invalid')
    return inValidEle.length == 0;
}
function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var selectorRules = {};

  // Hàm thực hiện validate
  function validate(inputElement, rule) {
    var errorElement = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    var errorMessage;

    // Lấy ra các rules của selector
    var rules = selectorRules[rule.selector];

    // Lặp qua từng rule & kiểm tra
    // Nếu có lỗi thì dừng việc kiểm
    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "radio":
        case "checkbox":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      errorElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    }

    return !errorMessage;
  }

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    // Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      // Lặp qua từng rules và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // Trường hợp submit với javascript
        if (typeof options.onSubmit === "function") {
          var enableInputs = formElement.querySelectorAll("[name]");
          var formValues = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            switch (input.type) {
              case "radio":
                values[input.name] = formElement.querySelector(
                  'input[name="' + input.name + '"]:checked'
                ).value;
                break;
              case "checkbox":
                if (!input.matches(":checked")) {
                  values[input.name] = "";
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case "file":
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }

            return values;
          },
          {});
          options.onSubmit(formValues);
        }
        // Trường hợp submit với hành vi mặc định
        else {
          formElement.submit();
        }
      }
    };

    // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
    options.rules.forEach(function (rule) {
      // Lưu lại các rules cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach(function (inputElement) {
        // Xử lý trường hợp blur khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // Xử lý mỗi khi người dùng nhập vào input
        inputElement.oninput = function () {
          var errorElement = getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
          errorElement.innerText = "";
          getParent(inputElement, options.formGroupSelector).classList.remove(
            "invalid"
          );
        };
      });
    });
  }
}


 function isRequired (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "Vui lòng nhập trường này";
    }
  };
};

function isEmail(selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || "Trường này phải là email";
    }
  };
};

function minLength(selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    }
  };
};
//validate
// end login, register, fotgot password
// Search //
function showSearch(){

	document.getElementById('searchSection').style.display = 'block';
}
function closeSearch(){

	document.getElementById('searchSection').style.display = 'none';
}
function search() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  const products = JSON.parse(localStorage.getItem('products')) || [];
  let resultHTML = '';

  if (searchInput.trim() !== '') {
      // Duyệt qua danh sách sản phẩm
      products.forEach(product => {
          if (product.name.toLowerCase().includes(searchInput)) {
              resultHTML += `
                <div class="col-md-3 mb-4">
            <div class="product-wrapper d-flex flex-column">
                <div class="product-thumbnail">
                    <img src="${product.images[0]}" class="img-fluid" alt="${product.name}">
                    <div class="quickaccess d-flex flex-fill w-100">
                        <a href="product/product.html#product/${product.id}" class="btn btn-primary container-fluid">Xem chi tiết</a>
                    </div>
                </div>
                <div class="product-info">
                    <p class="truncate-text">${product.name}</p>
                    <div class="d-flex justify-content-between">
                        <p class="text-danger">${product.price.toLocaleString()}₫</p>
                        <button class="btn rounded-pill cartbtn" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
              `;
          }
      });
  }

  // Cập nhật giao diện
  document.getElementById('searchResult').innerHTML = resultHTML 
      ? resultHTML 
      : '<p class="text-center">Không tìm thấy sản phẩm phù hợp.</p>';
}
