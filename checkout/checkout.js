document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const placeOrderButton = document.getElementById('place-order');
    const cardInfoPopup = document.getElementById('card-info-popup');
    const submitCardInfoButton = document.getElementById('submit-card-info');
    const orderConfirmationPopup = document.getElementById('order-confirmation');
    const orderDetailsContainer = document.getElementById('order-details');
    const closePopupButton = document.getElementById('close-popup');

    let selectedPaymentMethod = 'cod';
    let cardDetails = null;

    // Render cart summary
    function renderCheckoutCart() {
        const checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        checkoutCart.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            const price = parseFloat(item.price.replace(/[^\d]/g, ''));
            const itemTotal = price * item.quantity;

            itemElement.innerHTML = `
                <div class="item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <p class="item-name">${item.name}</p>
                        <p class="item-quantity">Số lượng: ${item.quantity}</p>
                    </div>
                </div>
                <div class="item-total">${itemTotal.toLocaleString()} vnđ</div>
            `;
            total += itemTotal;
            cartItemsContainer.appendChild(itemElement);
        });

        totalAmountElement.innerText = `${total.toLocaleString()} vnđ`;
    }

    // Handle payment method selection
    document.querySelectorAll('input[name="payment-method"]').forEach((input) => {
        input.addEventListener('change', (event) => {
            selectedPaymentMethod = event.target.value;
        });
    });

    // Handle place order
    placeOrderButton.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name || !email || !address || !phone) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (selectedPaymentMethod === 'credit') {
            cardInfoPopup.style.display = 'flex';
        } else {
            confirmOrder(name, email, address, phone);
        }
    });

    // Handle card info submission
    submitCardInfoButton.addEventListener('click', () => {
        const cardNumber = document.getElementById('card-number').value.trim();
        const cardExpiry = document.getElementById('card-expiry').value.trim();
        const cardCVV = document.getElementById('card-cvv').value.trim();

        if (!cardNumber || !cardExpiry || !cardCVV) {
            alert('Vui lòng nhập đầy đủ thông tin thẻ!');
            return;
        }

        cardDetails = {
            cardNumber,
            cardExpiry,
            cardCVV,
        };

        cardInfoPopup.style.display = 'none';

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();

        confirmOrder(name, email, address, phone);
    });

    // Confirm order
    function confirmOrder(name, email, address, phone) {
        const checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
        let total = 0;

        orderDetailsContainer.innerHTML = `
            <p><strong>Tên:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Địa chỉ:</strong> ${address}</p>
            <p><strong>Số điện thoại:</strong> ${phone}</p>
            <p><strong>Phương thức thanh toán:</strong> ${
                selectedPaymentMethod === 'credit'
                    ? `Thẻ tín dụng/ghi nợ (**** ${cardDetails.cardNumber.slice(-4)})`
                    : selectedPaymentMethod === 'bank'
                    ? 'Chuyển khoản'
                    : 'Thanh toán khi nhận hàng'
            }</p>
            <h3>Chi tiết đơn hàng:</h3>
        `;

        checkoutCart.forEach((item) => {
            const price = parseFloat(item.price.replace(/[^\d]/g, ''));
            const itemTotal = price * item.quantity;
            total += itemTotal;

            orderDetailsContainer.innerHTML += `<p>${item.name} x ${item.quantity}: ${itemTotal.toLocaleString()} vnđ</p>`;
        });

        orderDetailsContainer.innerHTML += `<h3>Tổng tiền: ${total.toLocaleString()} vnđ</h3>`;
        orderConfirmationPopup.style.display = 'flex';

        localStorage.removeItem('checkoutCart');
    }

    // Close popup
    closePopupButton.addEventListener('click', () => {
        orderConfirmationPopup.style.display = 'none';
        window.location.href = '../index.html';
    });

    renderCheckoutCart();
});
