$(document).ready(function() {
    const ITEMS_PER_PAGE = 5;
    let currentPage = 1;

    // Sample orders data
    const orders = [
        { 
            id: 1, 
            customer: "Nguyễn Văn B", 
            phone: "0923456789",
            address: "123 Nguyễn Văn Linh, Q7, TP.HCM",
            product: "Túi xách ABC", 
            quantity: 2, 
            total: "2,000,000", 
            status: "Đang xử lý" 
        },
        { 
            id: 2, 
            customer: "Trần Thị B", 
            phone: "0934567890",
            address: "456 Lê Lợi, Q1, TP.HCM",
            product: "Balo XYZ", 
            quantity: 1, 
            total: "1,500,000", 
            status: "Đã giao" 
        },
        { 
            id: 3, 
            customer: "Lê Văn C", 
            phone: "0945678901",
            address: "789 Trần Hưng Đạo, Q5, TP.HCM",
            product: "Túi xách LMN", 
            quantity: 3, 
            total: "4,500,000", 
            status: "Chờ xác nhận" 
        },
        { 
            id: 4, 
            customer: "Phạm Thị D", 
            phone: "0956789012",
            address: "101 Nguyễn Trãi, Q5, TP.HCM",
            product: "Ví DEF", 
            quantity: 1, 
            total: "500,000", 
            status: "Đang giao" 
        },
        { 
            id: 5, 
            customer: "Hoàng Văn E", 
            phone: "0967890123",
            address: "202 Lý Thường Kiệt, Q10, TP.HCM",
            product: "Giày GHI", 
            quantity: 2, 
            total: "3,000,000", 
            status: "Đã hủy" 
        },
        { 
            id: 6, 
            customer: "Nguyễn Thị F", 
            phone: "0978901234",
            address: "303 Phan Đăng Lưu, Q.Phú Nhuận, TP.HCM",
            product: "Áo JKL", 
            quantity: 1, 
            total: "700,000", 
            status: "Đang xử lý" 
        },
        { 
            id: 7, 
            customer: "Trần Văn G", 
            phone: "0989012345",
            address: "404 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM",
            product: "Quần MNO", 
            quantity: 2, 
            total: "1,200,000", 
            status: "Chờ xác nhận" 
        },
        { 
            id: 8, 
            customer: "Lê Thị H", 
            phone: "0990123456",
            address: "505 Võ Văn Tần, Q.3, TP.HCM",
            product: "Mũ PQR", 
            quantity: 1, 
            total: "300,000", 
            status: "Đã giao" 
        },
        { 
            id: 9, 
            customer: "Phạm Văn I", 
            phone: "0901234567",
            address: "606 Nguyễn Đình Chiểu, Q.3, TP.HCM",
            product: "Kính STU", 
            quantity: 1, 
            total: "1,000,000", 
            status: "Đang giao" 
        },
        { 
            id: 10, 
            customer: "Hoàng Thị K", 
            phone: "0912345678",
            address: "707 Lê Quang Định, Q.Bình Thạnh, TP.HCM",
            product: "Đồng hồ VWX", 
            quantity: 1, 
            total: "2,500,000", 
            status: "Đã hủy" 
        },
        { 
            id: 11, 
            customer: "Vũ Văn L", 
            phone: "0923456789",
            address: "808 Trường Chinh, Q.Tân Bình, TP.HCM",
            product: "Túi xách YZ", 
            quantity: 2, 
            total: "2,000,000", 
            status: "Đang xử lý" 
        },
        { 
            id: 12, 
            customer: "Đặng Thị M", 
            phone: "0934567890",
            address: "909 Cách Mạng Tháng 8, Q.Tân Bình, TP.HCM",
            product: "Balo ABC", 
            quantity: 1, 
            total: "1,500,000", 
            status: "Đã giao" 
        },
        { 
            id: 13, 
            customer: "Ngô Văn N", 
            phone: "0945678901",
            address: "1010 Lê Văn Sỹ, Q.Tân Bình, TP.HCM",
            product: "Túi xách XYZ", 
            quantity: 3, 
            total: "4,500,000", 
            status: "Chờ xác nhận" 
        },
        { 
            id: 14, 
            customer: "Bùi Thị P", 
            phone: "0956789012",
            address: "1111 Hoàng Văn Thụ, Q.Tân Bình, TP.HCM",
            product: "Ví DEF", 
            quantity: 1, 
            total: "500,000", 
            status: "Đang giao" 
        },
        { 
            id: 15, 
            customer: "Đỗ Văn Q", 
            phone: "0967890123",
            address: "1212 Phạm Văn Đồng, Q.Thủ Đức, TP.HCM",
            product: "Giày GHI", 
            quantity: 2, 
            total: "3,000,000", 
            status: "Đã hủy" 
        },
        { 
            id: 16, 
            customer: "Mai Thị R", 
            phone: "0978901234",
            address: "1313 Kha Vạn Cân, Q.Thủ Đức, TP.HCM",
            product: "Áo JKL", 
            quantity: 1, 
            total: "700,000", 
            status: "Đang xử lý" 
        },
        { 
            id: 17, 
            customer: "Phan Văn S", 
            phone: "0989012345",
            address: "1414 Tô Ngọc Vân, Q.Thủ Đức, TP.HCM",
            product: "Quần MNO", 
            quantity: 2, 
            total: "1,200,000", 
            status: "Chờ xác nhận" 
        },
        { 
            id: 18, 
            customer: "Trương Thị T", 
            phone: "0990123456",
            address: "1515 Đặng Văn Bi, Q.Thủ Đức, TP.HCM",
            product: "Mũ PQR", 
            quantity: 1, 
            total: "300,000", 
            status: "Đã giao" 
        },
        { 
            id: 19, 
            customer: "Lý Văn U", 
            phone: "0901234567",
            address: "1616 Võ Văn Ngân, Q.Thủ Đức, TP.HCM",
            product: "Kính STU", 
            quantity: 1, 
            total: "1,000,000", 
            status: "Đang giao" 
        },
        { 
            id: 20, 
            customer: "Huỳnh Thị V", 
            phone: "0912345678",
            address: "1717 Nguyễn Xiển, Q.9, TP.HCM",
            product: "Đồng hồ VWX", 
            quantity: 1, 
            total: "2,500,000", 
            status: "Đã hủy" 
        },
        { 
            id: 21, 
            customer: "Võ Văn X", 
            phone: "0923456789",
            address: "1818 Lê Văn Việt, Q.9, TP.HCM",
            product: "Túi xách YZ", 
            quantity: 2, 
            total: "2,000,000", 
            status: "Đang xử lý" 
        },
        { 
            id: 22, 
            customer: "Đinh Thị Y", 
            phone: "0934567890",
            address: "1919 Đỗ Xuân Hợp, Q.9, TP.HCM",
            product: "Balo ABC", 
            quantity: 1, 
            total: "1,500,000", 
            status: "Đã giao" 
        },
        { 
            id: 23, 
            customer: "Chu Văn Z", 
            phone: "0945678901",
            address: "2020 Nguyễn Duy Trinh, Q.9, TP.HCM",
            product: "Túi xách XYZ", 
            quantity: 3, 
            total: "4,500,000", 
            status: "Chờ xác nhận" 
        },
        { 
            id: 24, 
            customer: "Dương Thị W", 
            phone: "0956789012",
            address: "2121 Lã Xuân Oai, Q.9, TP.HCM",
            product: "Ví DEF", 
            quantity: 1, 
            total: "500,000", 
            status: "Đang giao" 
        },
        { 
            id: 25, 
            customer: "Hồ Văn T", 
            phone: "0967890123",
            address: "2222 Nguyễn Văn Tăng, Q.9, TP.HCM",
            product: "Giày GHI", 
            quantity: 2, 
            total: "3,000,000", 
            status: "Đã hủy" 
        }
    ];

    // Add status icon helper function
    function getStatusIcon(status) {
        switch(status) {
            case 'Đang xử lý':
                return '<i class="fas fa-clock text-warning mr-2"></i>';
            case 'Chờ xác nhận':
                return '<i class="fas fa-hourglass-half text-info mr-2"></i>';
            case 'Đã giao':
                return '<i class="fas fa-check-circle text-success mr-2"></i>';
            case 'Đang giao':
                return '<i class="fas fa-shipping-fast text-primary mr-2"></i>';
            case 'Đã hủy':
                return '<i class="fas fa-times-circle text-danger mr-2"></i>';
            default:
                return '<i class="fas fa-question-circle text-secondary mr-2"></i>';
        }
    }

    // Add search functionality
    $('#searchOrder').on('keyup', function() {
        const searchValue = $(this).val().toLowerCase();
        const filteredOrders = orders.filter(order => {
            return order.customer.toLowerCase().includes(searchValue) ||
                   order.product.toLowerCase().includes(searchValue) ||
                   order.phone.includes(searchValue) ||
                   order.status.toLowerCase().includes(searchValue) ||
                   order.id.toString().includes(searchValue);
        });

        // Reset pagination to first page when searching
        currentPage = 1;
        
        if (searchValue === '') {
            // If search is empty, show original data
            loadOrders(currentPage);
        } else {
            // Show filtered results
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
            
            displayOrders(paginatedOrders);
            updatePagination(filteredOrders.length, currentPage);
        }
    });

    // Add helper function to display orders
    function displayOrders(ordersToDisplay) {
        const tbody = $('#orderTableBody');
        tbody.empty();
        
        ordersToDisplay.forEach(order => {
            tbody.append(`
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.product}</td>
                    <td>${order.quantity}</td>
                    <td>${order.total}đ</td>
                    <td>${getStatusIcon(order.status)}${order.status}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="viewOrder(${order.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-warning btn-sm" onclick="editOrder(${order.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteOrder(${order.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    // Modify loadOrders to use displayOrders function
    function loadOrders(page = 1) {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedOrders = orders.slice(startIndex, endIndex);
        
        displayOrders(paginatedOrders);
        updatePagination(orders.length, page);
    }

    // Update pagination controls
    function updatePagination(totalItems, currentPage) {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const pagination = $('#pagination');
        pagination.empty();

        pagination.parent().addClass('d-flex justify-content-center');

        // Previous button
        pagination.append(`
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Trước</a>
            </li>
        `);

        // First page
        pagination.append(`
            <li class="page-item ${currentPage === 1 ? 'active' : ''}">
                <a class="page-link" href="#" data-page="1">1</a>
            </li>
        `);

        // Page 2 (if total pages > 1)
        if (totalPages > 1) {
            pagination.append(`
                <li class="page-item ${currentPage === 2 ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="2">2</a>
            `);
        }

        // Ellipsis if there are more pages
        if (totalPages > 3) {
            pagination.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
        }

        // Last page (if more than 2 pages)
        if (totalPages > 2) {
            pagination.append(`
                <li class="page-item ${currentPage === totalPages ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
                </li>
            `);
        }

        // Next button
        pagination.append(`
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Sau</a>
            </li>
        `);

        // Handle pagination clicks
        $('.page-link').click(function(e) {
            e.preventDefault();
            const newPage = parseInt($(this).data('page'));
            if (newPage > 0 && newPage <= totalPages) {
                currentPage = newPage;
                loadOrders(currentPage);
            }
        });
    }

    // Edit order
    window.editOrder = function(id) {
        const order = orders.find(o => o.id === id);
        if (order) {
            // Fill modal with order data
            $('#editOrderId').val(order.id);
            $('#editOrderCustomer').val(order.customer);
            $('#editOrderProduct').val(order.product);
            $('#editOrderQuantity').val(order.quantity);
            $('#editOrderTotal').val(order.total);
            $('#editOrderStatus').val(order.status);
            $('#editOrderPhone').val(order.phone);
            $('#editOrderAddress').val(order.address);

            // Show modal
            $('#editOrderModal').modal('show');
        }
    };

    // Save edited order
    $('#saveEditOrderButton').click(function() {
        const orderId = $('#editOrderId').val();
        const orderData = {
            id: orderId,
            customer: $('#editOrderCustomer').val(),
            product: $('#editOrderProduct').val(),
            quantity: $('#editOrderQuantity').val(),
            total: $('#editOrderTotal').val(),
            status: $('#editOrderStatus').val(),
            phone: $('#editOrderPhone').val(),
            address: $('#editOrderAddress').val()
        };

        // Update order in the array
        const orderIndex = orders.findIndex(o => o.id == orderId);
        if (orderIndex !== -1) {
            orders[orderIndex] = {...orders[orderIndex], ...orderData};
        }

        // Close modal
        $('#editOrderModal').modal('hide');
        
        // Show success message using SweetAlert2
        Swal.fire({
            title: 'Thành công!',
            text: 'Đã cập nhật thông tin đơn hàng',
            icon: 'success',
            confirmButtonText: 'Đóng',
            customClass: {
                confirmButton: 'btn btn-success'
            }
        });
        
        // Reload orders table
        loadOrders(currentPage);
    });

    // Delete order
    window.deleteOrder = function(id) {
        Swal.fire({
            title: 'Xác nhận xóa?',
            text: "Bạn có chắc muốn xóa đơn hàng này không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                // Find and remove order from array
                const orderIndex = orders.findIndex(o => o.id === id);
                if (orderIndex !== -1) {
                    orders.splice(orderIndex, 1);
                }

                // Show success message
                Swal.fire({
                    title: 'Đã xóa!',
                    text: 'Đơn hàng đã được xóa thành công',
                    icon: 'success',
                    confirmButtonText: 'Đóng'
                });

                // Reload orders table
                loadOrders(currentPage);
            }
        });
    };

    // View order details
    window.viewOrder = function(id) {
        const order = orders.find(o => o.id === id);
        if (order) {
            // Populate modal with order data
            $('#viewOrderId').text(order.id);
            $('#viewOrderCustomer').text(order.customer);
            $('#viewOrderProduct').text(order.product);
            $('#viewOrderQuantity').text(order.quantity);
            $('#viewOrderTotal').text(order.total + 'đ');
            $('#viewOrderStatus').html(`${getStatusIcon(order.status)}${order.status}`);
            $('#viewOrderDate').text(new Date().toLocaleDateString('vi-VN')); // Example date
            $('#viewOrderPhone').text(order.phone);
            $('#viewOrderAddress').text(order.address);

            // Show modal
            $('#viewOrderModal').modal('show');
        }
    };

    // Add new order
    $('#saveNewOrderButton').click(function() {
        const newOrder = {
            id: orders.length + 1, // Simple ID generation
            customer: $('#addOrderCustomer').val(),
            phone: $('#addOrderPhone').val(),
            address: $('#addOrderAddress').val(),
            product: $('#addOrderProduct').val(),
            quantity: $('#addOrderQuantity').val(),
            total: $('#addOrderTotal').val(),
            status: $('#addOrderStatus').val()
        };

        // Validate required fields
        if (!newOrder.customer || !newOrder.phone || !newOrder.address || 
            !newOrder.product || !newOrder.quantity || !newOrder.total) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng điền đầy đủ thông tin',
                icon: 'error',
                confirmButtonText: 'Đóng'
            });
            return;
        }

        // Add to orders array
        orders.unshift(newOrder);

        // Close modal
        $('#addOrderModal').modal('hide');

        // Reset form
        $('#addOrderForm')[0].reset();

        // Show success message
        Swal.fire({
            title: 'Thành công!',
            text: 'Đã thêm đơn hàng mới',
            icon: 'success',
            confirmButtonText: 'Đóng'
        });

        // Reload orders table
        loadOrders(currentPage);
    });

    // Initial load
    loadOrders(currentPage);
});
