class CartManager {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartContainer = document.getElementById('cart-items');
        this.cartEmptyMessage = document.getElementById('cart-empty');
        this.cartTotalContainer = document.getElementById('cart-container');
        this.cartTotalElement = document.getElementById('cart-total');
        this.selectedCountElement = document.getElementById('selected-count');
        this.clearCartButton = document.getElementById('clear-cart');
        this.checkoutButton = document.getElementById('checkout');
        this.selectAllCheckbox = document.getElementById('select-all');

        this.initEventListeners();
        this.renderCart();
    }

    initEventListeners() {
        this.clearCartButton.addEventListener('click', () => this.clearCart());
        this.checkoutButton.addEventListener('click', () => this.checkout());
        this.selectAllCheckbox.addEventListener('change', (e) => this.toggleSelectAll(e.target.checked));
    }

    // Rest of the methods remain the same as in the original code
    renderCart() {
        // Xóa các mục hiện tại
        this.cartContainer.innerHTML = '';

        if (this.cartItems.length === 0) {
            this.cartEmptyMessage.style.display = 'block';
            this.cartTotalContainer.style.display = 'none';
            return;
        }

        this.cartEmptyMessage.style.display = 'none';
        this.cartTotalContainer.style.display = 'flex';

        this.cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');
            
            // Thêm checkbox cho từng sản phẩm
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('form-check-input', 'me-3');
            checkbox.checked = item.selected || false;
            checkbox.addEventListener('change', (e) => this.toggleItemSelection(index, e.target.checked));

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('d-flex', 'align-items-center', 'flex-grow-1');
            itemDetails.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                <div>
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="mb-1">${this.formatCurrency(item.price)}</p>
                </div>
            `;

            const itemControls = document.createElement('div');
            itemControls.classList.add('d-flex', 'align-items-center');
            itemControls.innerHTML = `
                <button class="btn btn-sm btn-outline-secondary me-2" onclick="cartManager.decreaseQuantity(${index})">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary ms-2" onclick="cartManager.increaseQuantity(${index})">+</button>
                <button class="btn btn-sm btn-danger ms-3" onclick="cartManager.removeItem(${index})">Xóa</button>
            `;

            cartItemElement.appendChild(checkbox);
            cartItemElement.appendChild(itemDetails);
            cartItemElement.appendChild(itemControls);

            this.cartContainer.appendChild(cartItemElement);
        });

        this.updateTotalsAndCheckout();
        this.saveToLocalStorage();
    }

    updateTotalsAndCheckout() {
        let total = 0;
        let selectedCount = 0;
        let selectedItems = [];

        this.cartItems.forEach(item => {
            if (item.selected) {
                total += item.price * item.quantity;
                selectedCount++;
                selectedItems.push(item);
            }
        });

        // Cập nhật tổng tiền
        this.cartTotalElement.textContent = this.formatCurrency(total);
        
        // Cập nhật số lượng sản phẩm đã chọn
        this.selectedCountElement.textContent = selectedCount > 0 
            ? `Đã chọn: ${selectedCount} sản phẩm` 
            : 'Chưa chọn sản phẩm';

        // Cập nhật trạng thái nút Thanh Toán
        this.checkoutButton.disabled = selectedCount === 0;

        // Cập nhật trạng thái checkbox "Chọn tất cả"
        this.selectAllCheckbox.checked = selectedCount === this.cartItems.length;
    }

    toggleItemSelection(index, isSelected) {
        this.cartItems[index].selected = isSelected;
        this.updateTotalsAndCheckout();
        this.saveToLocalStorage();
    }

    toggleSelectAll(isSelected) {
        this.cartItems.forEach(item => {
            item.selected = isSelected;
        });
        this.renderCart();
    }

    increaseQuantity(index) {
        this.cartItems[index].quantity++;
        this.renderCart();
    }

    decreaseQuantity(index) {
        if (this.cartItems[index].quantity > 1) {
            this.cartItems[index].quantity--;
        } else {
            this.cartItems.splice(index, 1);
        }
        this.renderCart();
    }

    removeItem(index) {
        this.cartItems.splice(index, 1);
        this.renderCart();
    }

    clearCart() {
        this.cartItems = [];
        this.renderCart();
        localStorage.removeItem('cart');
    }

    checkout() {
        // Lấy các sản phẩm đã chọn
        const selectedItems = this.cartItems.filter(item => item.selected);
        
        // Lưu các sản phẩm đã chọn vào localStorage để chuyển sang trang thanh toán
        localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
        
        // Xóa các sản phẩm đã chọn khỏi giỏ hàng
        this.cartItems = this.cartItems.filter(item => !item.selected);
        
        // Cập nhật giao diện và localStorage
        this.renderCart();
        this.saveToLocalStorage();
        
        // Chuyển đến trang thanh toán
        window.location.href = '../checkout/checkout.html';
    }
    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(amount);
    }
}

// Khởi tạo quản lý giỏ hàng
const cartManager = new CartManager();
window.cartManager = cartManager;