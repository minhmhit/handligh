window.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('#cart-items');
    const cartTotalElement = document.querySelector('#cart-total span');
    const clearCartButton = document.getElementById("clear-cart");
    const checkoutButton = document.getElementById("checkout");
    const selectAllCheckbox = document.getElementById("select-all");

    // Hiển thị giỏ hàng
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';
        let totalItems = 0;

        cart.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.dataset.key = item.key;

            // Tính tổng giá cho sản phẩm này
            const itemPrice = parseFloat(item.price.replace(/[^\d]/g, ""));
            const itemTotal = itemPrice * item.quantity;

            cartItem.innerHTML = `
                <input type="checkbox" class="select-item" ${item.selected ? "checked" : ""}>
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                    </div>
                </div>
                <div class="cart-item-price">${item.price}</div>
                <div class="quantity-container">
                    <button class="btn decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="btn increase">+</button>
                </div>
                <div class="cart-item-total">${itemTotal.toLocaleString()} vnđ</div>
                <div class="cart-item-actions">
                    <button class="btn remove-item text-danger">Xóa</button>
                </div>
            `;

            cartContainer.appendChild(cartItem);
            totalItems++;
        });

        document.getElementById("total-items").innerText = totalItems;
        updateTotal();
        updateSelectAllStatus();
    }

    // Cập nhật tổng tiền của các sản phẩm được tick
    function updateTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

        cart.forEach((item) => {
            if (item.selected) {
                const itemPrice = parseFloat(item.price.replace(/[^\d]/g, ""));
                total += itemPrice * item.quantity;
            }
        });

        cartTotalElement.innerText = `${total.toLocaleString()} vnđ`;
    }

    // Cập nhật trạng thái "Chọn tất cả"
    function updateSelectAllStatus() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const allSelected = cart.every((item) => item.selected);
        selectAllCheckbox.checked = allSelected;
    }

    // Xử lý sự kiện "Chọn tất cả"
    selectAllCheckbox.addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.forEach((item) => {
            item.selected = isChecked;
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    });

    // Xử lý checkbox của từng sản phẩm
    cartContainer.addEventListener("change", (event) => {
        if (event.target.classList.contains("select-item")) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItem = event.target.closest(".cart-item");
            const productKey = cartItem.dataset.key;
            const itemIndex = cart.findIndex((item) => item.key === productKey);

            cart[itemIndex].selected = event.target.checked;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotal();
            updateSelectAllStatus();
        }
    });

    // Tăng/giảm số lượng và xóa sản phẩm
    cartContainer.addEventListener('click', (event) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const target = event.target;
        const cartItem = target.closest('.cart-item');
        const productKey = cartItem.dataset.key;
        const itemIndex = cart.findIndex(item => item.key === productKey);

        if (target.classList.contains('increase')) {
            cart[itemIndex].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }

        if (target.classList.contains('decrease')) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }

        if (target.classList.contains('remove-item')) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Xóa toàn bộ giỏ hàng
    clearCartButton.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
            localStorage.removeItem('cart');
            renderCart();
        }
    });

    // Chuyển đến trang thanh toán chỉ với các sản phẩm đã chọn
    checkoutButton.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const selectedItems = cart.filter((item) => item.selected);

        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
        } else {
            localStorage.setItem('checkoutCart', JSON.stringify(selectedItems));
            window.location.href = "../checkout/checkout.html"; // Đường dẫn tới trang thanh toán
        }
    });

    // Hiển thị giỏ hàng khi tải trang
    renderCart();
});
