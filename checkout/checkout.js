document.addEventListener('DOMContentLoaded', () => {
    const orderSummaryContainer = document.getElementById('order-summary-container');
    const totalPriceElement = document.getElementById('total-price');
    const confirmOrderButton = document.getElementById('confirm-order');
    const finalConfirmOrderButton = document.getElementById('final-confirm-order');
    const orderConfirmationDetails = document.getElementById('order-confirmation-details');
    const creditCardDetails = document.getElementById('credit-card-details');
    const orderConfirmationModal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));

    // Payment method selection
    const paymentMethodCards = document.querySelectorAll('.payment-method-card');
    paymentMethodCards.forEach(card => {
        card.addEventListener('click', () => {
            paymentMethodCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const paymentMethod = card.dataset.method;
            const radioButton = card.querySelector('input[type="radio"]');
            radioButton.checked = true;

            creditCardDetails.style.display = paymentMethod === 'credit' ? 'block' : 'none';
        });
    });

    // Render order summary
    function renderOrderSummary() {
        const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]');
        orderSummaryContainer.innerHTML = '';
        let total = 0;

        checkoutItems.forEach(item => {
            const price = item.price * item.quantity;
            total += price;

            const itemElement = document.createElement('div');
            itemElement.classList.add('d-flex', 'justify-content-between', 'mb-2');
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>${formatCurrency(price)}</span>
            `;
            orderSummaryContainer.appendChild(itemElement);
        });

        totalPriceElement.textContent = formatCurrency(total);
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(amount);
    }

    // Validate form
    function validateForm() {
        const form = document.getElementById('shipping-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
        if (!paymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán');
            return false;
        }

        if (paymentMethod === 'credit') {
            const creditFields = ['cardName', 'cardNumber', 'cardExpiry', 'cardCVV'];
            for (let field of creditFields) {
                if (!document.getElementById(field).value.trim()) {
                    alert('Vui lòng nhập đầy đủ thông tin thẻ');
                    return false;
                }
            }
        }

        return true;
    }

    // Prepare order confirmation details
    function prepareOrderConfirmation() {
        const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]');
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        let orderDetailsHtml = `
            <h5>Thông Tin Đơn Hàng</h5>
            <div class="mb-3">
                <strong>Khách Hàng:</strong> ${document.getElementById('firstName').value} ${document.getElementById('lastName').value}<br>
                <strong>Số Điện Thoại:</strong> ${document.getElementById('phone').value}<br>
                <strong>Địa Chỉ:</strong> ${document.getElementById('address').value}<br>
                <strong>Phương Thức Thanh Toán:</strong> ${paymentMethod === 'cash' ? 'Tiền Mặt' : 'Thẻ Tín Dụng'}
            </div>

            <h5>Chi Tiết Sản Phẩm</h5>
        `;

        let total = 0;
        checkoutItems.forEach(item => {
            const price = item.price * item.quantity;
            total += price;
            orderDetailsHtml += `
                <div class="d-flex justify-content-between">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>${formatCurrency(price)}</span>
                </div>
            `;
        });

        orderDetailsHtml += `
            <hr>
            <div class="d-flex justify-content-between fw-bold">
                <span>Tổng Cộng:</span>
                <span>${formatCurrency(total)}</span>
            </div>
        `;

        orderConfirmationDetails.innerHTML = orderDetailsHtml;
    }

    // Save order to localStorage
    function saveOrder() {
        const order = {
            customerInfo: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value
            },
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            items: JSON.parse(localStorage.getItem('checkoutItems') || '[]'),
            orderDate: new Date().toISOString()
        };

        // Get existing orders or create new array
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear checkout items
        localStorage.removeItem('checkoutItems');
    }

    // Event Listeners
    confirmOrderButton.addEventListener('click', () => {
        if (validateForm()) {
            prepareOrderConfirmation();
            orderConfirmationModal.show();
        }
    });

    finalConfirmOrderButton.addEventListener('click', () => {
        saveOrder();
        orderConfirmationModal.hide();
        window.location.href = '../index.html'; // Redirect to confirmation page
    });

    // Initial render of order summary
    renderOrderSummary();
});