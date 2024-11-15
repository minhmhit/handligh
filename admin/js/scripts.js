document.addEventListener('DOMContentLoaded', function() {
    // Xử lý đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Kiểm tra đăng nhập (giả lập)
            if (username === 'a' && password === 'a') {
                alert('Đăng nhập thành công!');
                window.location.href = 'index.html';
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        });
    }

    // Xử lý quản lý sản phẩm
    const productEditButtons = document.querySelectorAll('.edit');
    const productDeleteButtons = document.querySelectorAll('.delete');

    productEditButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Chức năng sửa sản phẩm chưa được triển khai.');
        });
    });

    productDeleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr');
            row.remove();
            alert('Sản phẩm đã được xóa.');
        });
    });

    // Xử lý quản lý người dùng
    const userEditButtons = document.querySelectorAll('.edit');
    const userDeleteButtons = document.querySelectorAll('.delete');

    userEditButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Chức năng sửa người dùng chưa được triển khai.');
        });
    });

    userDeleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr');
            row.remove();
            alert('Người dùng đã được xóa.');
        });
    });

    // Xử lý quản lý đơn hàng
    const orderViewButtons = document.querySelectorAll('.view');
    const orderDeleteButtons = document.querySelectorAll('.delete');

    orderViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Chức năng xem đơn hàng chưa được triển khai.');
        });
    });

    orderDeleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr');
            row.remove();
            alert('Đơn hàng đã được xóa.');
        });
    });
});
//index
async function fetchData() {
    const productCode = document.getElementById('product_code').value;
    const response = await fetch(`api/doanhthu.php?product_code=${productCode}`);
    const data = await response.json();

    const tableBody = document.getElementById('revenueTableBody');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ

    let totalRevenue = 0;
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        const monthCell = document.createElement('td');
        const revenueCell = document.createElement('td');
        const changeCell = document.createElement('td');

        row.setAttribute('onclick', `fetchOrders('${item.month}')`);

        monthCell.textContent = item.month;
        revenueCell.textContent = item.total_revenue;
        changeCell.textContent = item.change ? item.change.toFixed(2) + '%' : 'N/A';

        row.appendChild(monthCell);
        row.appendChild(revenueCell);
        row.appendChild(changeCell);
        tableBody.appendChild(row);

        totalRevenue += parseFloat(item.total_revenue);
    });

    document.getElementById('totalRevenue').textContent = totalRevenue.toFixed(2);
}

async function showSuggestions(value) {
    if (value.length === 0) {
        document.getElementById('suggestions').innerHTML = '';
        return;
    }

    const response = await fetch(`api/goiy.php?query=${value}`);
    const suggestions = await response.json();

    let suggestionsHtml = '';
    suggestions.forEach(item => {
        suggestionsHtml += `<div class="suggestion-item" onclick="selectSuggestion('${item.maSanPham}')">${item.maSanPham} - ${item.tenSanPham}</div>`;
    });

    document.getElementById('suggestions').innerHTML = suggestionsHtml;
}

function selectSuggestion(value) {
    document.getElementById('product_code').value = value;
    document.getElementById('suggestions').innerHTML = '';
}

async function fetchOrders(month) {
    const response = await fetch(`api/donhang_theo_thang.php?month=${month}`);
    const orders = await response.json();

    let ordersHtml = `<h3>Đơn hàng trong tháng ${month}</h3><table class="table table-bordered table-hover mt-4"><thead class="thead-dark"><tr><th>ID</th><th>Khách hàng</th><th>Ngày đặt</th><th>Tổng tiền</th></tr></thead><tbody>`;
    orders.forEach(order => {
        ordersHtml += `<tr><td>${order.id}</td><td>${order.khachhang_id}</td><td>${order.ngay_dat}</td><td>${order.tong_tien}</td></tr>`;
    });
    ordersHtml += `</tbody></table>`;

    document.getElementById('ordersContainer').innerHTML = ordersHtml;
}