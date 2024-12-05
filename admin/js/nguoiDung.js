$(document).ready(function() {
    const ITEMS_PER_PAGE = 5;
    let currentPage = 1;

    // Sample users data
    const users = [
        { id: 1, name: "Nguyễn Thanh An", username: "thanhan", email: "thanhan@gmail.com", phone: "0923456789", role: "Admin", status: "active", accountStatus: "Hoạt động", createdDate: "01/01/2024" },
        { id: 2, name: "Trần Minh Bình", username: "minhbinh", email: "minhbinh@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "02/01/2024" },
        { id: 3, name: "Lê Hoàng Cường", username: "hoangcuong", email: "hoangcuong@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "03/01/2024" },
        { id: 4, name: "Phạm Thị Dung", username: "thidung", email: "thidung@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "04/01/2024" },
        { id: 5, name: "Hoàng Văn Em", username: "vanem", email: "vanem@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "05/01/2024" },
        { id: 6, name: "Đỗ Thu Hà", username: "thuha", email: "thuha@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "06/01/2024" },
        { id: 7, name: "Vũ Minh Giang", username: "minhgiang", email: "minhgiang@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "07/01/2024" },
        { id: 8, name: "Mai Thị Hồng", username: "thihong", email: "thihong@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "08/01/2024" },
        { id: 9, name: "Bùi Quang Huy", username: "quanghuy", email: "quanghuy@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "09/01/2024" },
        { id: 10, name: "Ngô Thị Kim", username: "thikim", email: "thikim@gmail.com", phone: "0923456789", role: "Admin", status: "active", accountStatus: "Hoạt động", createdDate: "10/01/2024" },
        { id: 11, name: "Đinh Văn Lâm", username: "vanlam", email: "vanlam@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "11/01/2024" },
        { id: 12, name: "Lý Thị Mai", username: "thimai", email: "thimai@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "12/01/2024" },
        { id: 13, name: "Phan Thanh Nam", username: "thanhnam", email: "thanhnam@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "13/01/2024" },
        { id: 14, name: "Võ Hoàng Oanh", username: "hoangoanh", email: "hoangoanh@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "14/01/2024" },
        { id: 15, name: "Đặng Minh Phúc", username: "minhphuc", email: "minhphuc@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "15/01/2024" },
        { id: 16, name: "Huỳnh Thị Quỳnh", username: "thiquynh", email: "thiquynh@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "16/01/2024" },
        { id: 17, name: "Trương Thanh Sơn", username: "thanhson", email: "thanhson@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "17/01/2024" },
        { id: 18, name: "Dương Thu Thảo", username: "thuthao", email: "thuthao@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "18/01/2024" },
        { id: 19, name: "Hồ Văn Uy", username: "vanuy", email: "vanuy@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "19/01/2024" },
        { id: 20, name: "Kim Thị Vân", username: "thivan", email: "thivan@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "20/01/2024" },
        { id: 21, name: "Nguyễn Thanh An", username: "thanhan", email: "thanhan@gmail.com", phone: "0923456789", role: "Admin", status: "active", accountStatus: "Hoạt động", createdDate: "01/01/2024" },
        { id: 22, name: "Trần Minh Bình", username: "minhbinh", email: "minhbinh@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "02/01/2024" },
        { id: 23, name: "Lê Hoàng Cường", username: "hoangcuong", email: "hoangcuong@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "03/01/2024" },
        { id: 24, name: "Phạm Thị Dung", username: "thidung", email: "thidung@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "04/01/2024" },
        { id: 25, name: "Hoàng Văn Em", username: "vanem", email: "vanem@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "05/01/2024" },
        { id: 26, name: "Đỗ Thu Hà", username: "thuha", email: "thuha@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "06/01/2024" },
        { id: 27, name: "Vũ Minh Giang", username: "minhgiang", email: "minhgiang@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "07/01/2024" },
        { id: 28, name: "Mai Thị Hồng", username: "thihong", email: "thihong@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "08/01/2024" },
        { id: 29, name: "Bùi Quang Huy", username: "quanghuy", email: "quanghuy@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "09/01/2024" },
        { id: 30, name: "Ngô Thị Kim", username: "thikim", email: "thikim@gmail.com", phone: "0923456789", role: "Admin", status: "active", accountStatus: "Hoạt động", createdDate: "10/01/2024" },
        { id: 31, name: "Đinh Văn Lâm", username: "vanlam", email: "vanlam@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "11/01/2024" },
        { id: 32, name: "Lý Thị Mai", username: "thimai", email: "thimai@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "12/01/2024" },
        { id: 33, name: "Phan Thanh Nam", username: "thanhnam", email: "thanhnam@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "13/01/2024" },
        { id: 34, name: "Võ Hoàng Oanh", username: "hoangoanh", email: "hoangoanh@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "14/01/2024" },
        { id: 35, name: "Đặng Minh Phúc", username: "minhphuc", email: "minhphuc@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "15/01/2024" },
        { id: 36, name: "Huỳnh Thị Quỳnh", username: "thiquynh", email: "thiquynh@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "16/01/2024" },
        { id: 37, name: "Trương Thanh Sơn", username: "thanhson", email: "thanhson@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "17/01/2024" },
        { id: 38, name: "Dương Thu Thảo", username: "thuthao", email: "thuthao@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "18/01/2024" },
        { id: 39, name: "Hồ Văn Uy", username: "vanuy", email: "vanuy@gmail.com", phone: "0923456789", role: "User", status: "inactive", accountStatus: "Đã khóa", createdDate: "19/01/2024" },
        { id: 40, name: "Kim Thị Vân", username: "thivan", email: "thivan@gmail.com", phone: "0923456789", role: "User", status: "active", accountStatus: "Hoạt động", createdDate: "20/01/2024" }
    ];

    // Update pagination controls
    function updatePagination(totalItems, currentPage) {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const pagination = $('#pagination');
        pagination.empty();

        // Previous button
        pagination.append(`
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Trước</a>
            </li>
        `);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // First page
                i === totalPages || // Last page
                (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current
            ) {
                pagination.append(`
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                    </li>
                `);
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pagination.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
            }
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
                loadUsers(currentPage);
            }
        });
    }

    // Load users with pagination
    function loadUsers(page = 1) {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedUsers = users.slice(startIndex, endIndex);
        
        const tbody = $('#userTableBody');
        tbody.empty();
        
        paginatedUsers.forEach(user => {
            const statusBadgeClass = user.status === 'active' ? 'success' : 'danger';
            const statusText = user.status === 'active' ? 'Hoạt động' : 'Đã khóa';
            const lockButtonClass = user.status === 'active' ? 'danger' : 'success';
            const lockIconClass = user.status === 'active' ? 'lock' : 'unlock';
            const lockButtonTitle = user.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản';
            
            tbody.append(`
                <tr data-id="${user.id}">
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.phone}</td>
                    <td>${user.email}</td>
                    <td>
                        <span class="badge badge-${user.role === 'Admin' ? 'primary' : 'info'}">
                            ${user.role}
                        </span>
                    </td>
                    <td>
                        <span class="badge badge-${statusBadgeClass}">
                            ${statusText}
                        </span>
                    </td>
                    <td>
                        <div class="btn-group" role="group">
                            <button class="btn btn-info btn-sm" onclick="viewUserDetails(${user.id})" title="Xem chi tiết">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})" title="Sửa">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-${lockButtonClass} btn-sm" 
                                onclick="toggleUserStatus(${user.id})"
                                title="${lockButtonTitle}">
                                <i class="fas fa-${lockIconClass}"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `);
        });

        updatePagination(users.length, page);
    }

    // Add toggle user status function
    window.toggleUserStatus = function(id) {
        const user = users.find(u => u.id === id);
        if (user) {
            const newStatus = user.status === 'active' ? 'inactive' : 'active';
            const actionText = newStatus === 'active' ? 'mở khóa' : 'khóa';
            
            Swal.fire({
                title: `Xác nhận ${actionText} tài khoản?`,
                text: `Bạn có chắc muốn ${actionText} tài khoản "${user.name}" không?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Update user status
                    user.status = newStatus;
                    user.accountStatus = newStatus === 'active' ? 'Hoạt động' : 'Đã khóa';
                    
                    // Update UI
                    loadUsers(currentPage);
                    
                    // Show success notification
                    const successMessage = newStatus === 'active' ? 
                        'Tài khoản đã được mở khóa thành công' : 
                        'Tài khoản đã được khóa thành công';
                    
                    Swal.fire({
                        title: 'Thành công!',
                        text: successMessage,
                        icon: 'success',
                        confirmButtonText: 'Đóng'
                    });
                }
            });
        }
    };

    // Update view user details to include new fields
    window.viewUserDetails = function(id) {
        const user = users.find(u => u.id === id);
        if (user) {
            $('#viewUserId').text(user.id);
            $('#viewUserName').text(user.name);
            $('#viewUserUsername').text(user.username);
            $('#viewUserPhone').text(user.phone);
            $('#viewUserEmail').text(user.email);
            $('#viewUserRole').text(user.role);
            $('#viewUserStatus').text(user.status === 'active' ? 'Hoạt động' : 'Đã khóa');
            $('#viewUserCreatedDate').text(user.createdDate);
            $('#viewUserModal').modal('show');
        }
    };

    // Edit user function
    window.editUser = function(id) {
        const user = users.find(u => u.id === id);
        if (user) {
            // Fill modal with user data
            $('#editUserId').val(user.id);
            $('#editUserName').val(user.name);
            $('#editUserEmail').val(user.email);
            $('#editUserUsername').val(user.username);
            $('#editUserPhone').val(user.phone);
            $('#editUserRole').val(user.role);
            $('#editUserStatus').val(user.status);

            // Show modal
            $('#editUserModal').modal('show');
        }
    };

    // Save edited user
    $('#saveEditUserButton').click(function() {
        const userId = $('#editUserId').val();
        const userData = {
            id: userId,
            name: $('#editUserName').val(),
            email: $('#editUserEmail').val(),
            username: $('#editUserUsername').val(),
            phone: $('#editUserPhone').val(),
            role: $('#editUserRole').val(),
            status: $('#editUserStatus').val()
        };

        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Validate required fields
        if (!userData.name || !userData.email || !userData.username || !userData.phone) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng điền đầy đủ thông tin',
                icon: 'error',
                confirmButtonText: 'Đóng'
            });
            return;
        }

        // Validate email format
        if (!emailRegex.test(userData.email)) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Email không đúng định dạng',
                icon: 'error',
                confirmButtonText: 'Đóng'
            });
            return;
        }

        // Update user in the array
        const userIndex = users.findIndex(u => u.id == userId);
        if (userIndex !== -1) {
            users[userIndex] = {...users[userIndex], ...userData};
        }

        // Close modal
        $('#editUserModal').modal('hide');
        
        // Show success message
        Swal.fire({
            title: 'Thành công!',
            text: 'Đã cập nhật thông tin người dùng',
            icon: 'success',
            confirmButtonText: 'Đóng'
        });
        
        // Reload users table
        loadUsers(currentPage);
    });

    // Add save new user functionality
    $('#saveUserButton').click(function() {
        const userData = {
            name: $('#userName').val(),
            email: $('#userEmail').val(),
            username: $('#userUsername').val(),
            password: $('#userPassword').val(),
            role: $('#userRole').val(),
            status: $('#userStatus').val(),
            phone: $('#userPhone').val()
        };

        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Validate required fields
        if (!userData.name || !userData.email || !userData.username || 
            !userData.password || !userData.phone) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng điền đầy đủ thông tin',
                icon: 'error',
                confirmButtonText: 'Đóng'
            });
            return;
        }

        // Validate email format
        if (!emailRegex.test(userData.email)) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Email không đúng định dạng',
                icon: 'error',
                confirmButtonText: 'Đóng'
            });
            return;
        }

        // Add new user to array with current date
        const newUser = {
            ...userData,
            id: users.length + 1,
            createdDate: new Date().toLocaleDateString('vi-VN'),
            accountStatus: userData.status === 'active' ? 'Hoạt động' : 'Đã khóa'
        };

        // Add to users array
        users.unshift(newUser);

        // Close modal
        $('#addUserModal').modal('hide');

        // Reset form
        $('#addUserForm')[0].reset();

        // Show success message
        Swal.fire({
            title: 'Thành công!',
            text: 'Đã thêm người dùng mới',
            icon: 'success',
            confirmButtonText: 'Đóng'
        });

        // Reload users table
        loadUsers(currentPage);
    });

    // Add search functionality
    $('#searchInput').on('keyup', function() {
        const searchText = $(this).val().toLowerCase();
        
        const filteredUsers = users.filter(user => {
            return user.name.toLowerCase().includes(searchText) ||
                   user.username.toLowerCase().includes(searchText) ||
                   user.email.toLowerCase().includes(searchText) ||
                   user.phone.includes(searchText) ||
                   user.role.toLowerCase().includes(searchText);
        });

        // Reset to first page when searching
        currentPage = 1;
        
        if (searchText === '') {
            loadUsers(currentPage);
        } else {
            const startIndex = 0;
            const endIndex = ITEMS_PER_PAGE;
            const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
            
            const tbody = $('#userTableBody');
            tbody.empty();
            
            paginatedUsers.forEach(user => {
                const statusBadgeClass = user.status === 'active' ? 'success' : 'danger';
                const statusText = user.status === 'active' ? 'Hoạt động' : 'Đã khóa';
                const lockButtonClass = user.status === 'active' ? 'danger' : 'success';
                const lockIconClass = user.status === 'active' ? 'lock' : 'unlock';
                const lockButtonTitle = user.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản';
                
                tbody.append(`
                    <tr data-id="${user.id}">
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>
                            <span class="badge badge-${user.role === 'Admin' ? 'primary' : 'info'}">
                                ${user.role}
                            </span>
                        </td>
                        <td>
                            <span class="badge badge-${statusBadgeClass}">
                                ${statusText}
                            </span>
                        </td>
                        <td>
                            <div class="btn-group" role="group">
                                <button class="btn btn-info btn-sm" onclick="viewUserDetails(${user.id})" title="Xem chi tiết">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})" title="Sửa">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-${lockButtonClass} btn-sm" 
                                    onclick="toggleUserStatus(${user.id})"
                                    title="${lockButtonTitle}">
                                    <i class="fas fa-${lockIconClass}"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `);
            });

            updatePagination(filteredUsers.length, currentPage);
        }
    });

    // Add search and filter functionality
    $('#searchInput, #roleFilter, #statusFilter').on('keyup change', function() {
        const searchText = $('#searchInput').val().toLowerCase();
        const roleFilter = $('#roleFilter').val();
        const statusFilter = $('#statusFilter').val();
        
        const filteredUsers = users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchText) ||
                                user.username.toLowerCase().includes(searchText) ||
                                user.email.toLowerCase().includes(searchText) ||
                                user.phone.includes(searchText);
            
            const matchesRole = !roleFilter || user.role === roleFilter;
            const matchesStatus = !statusFilter || user.status === statusFilter;
            
            return matchesSearch && matchesRole && matchesStatus;
        });

        // Reset to first page when filtering
        currentPage = 1;
        
        if (!searchText && !roleFilter && !statusFilter) {
            loadUsers(currentPage);
        } else {
            const startIndex = 0;
            const endIndex = ITEMS_PER_PAGE;
            const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
            
            const tbody = $('#userTableBody');
            tbody.empty();
            
            paginatedUsers.forEach(user => {
                const statusBadgeClass = user.status === 'active' ? 'success' : 'danger';
                const statusText = user.status === 'active' ? 'Hoạt động' : 'Đã khóa';
                const lockButtonClass = user.status === 'active' ? 'danger' : 'success';
                const lockIconClass = user.status === 'active' ? 'lock' : 'unlock';
                const lockButtonTitle = user.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản';
                
                tbody.append(`
                    <tr data-id="${user.id}">
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>
                            <span class="badge badge-${user.role === 'Admin' ? 'primary' : 'info'}">
                                ${user.role}
                            </span>
                        </td>
                        <td>
                            <span class="badge badge-${statusBadgeClass}">
                                ${statusText}
                            </span>
                        </td>
                        <td>
                            <div class="btn-group" role="group">
                                <button class="btn btn-info btn-sm" onclick="viewUserDetails(${user.id})" title="Xem chi tiết">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})" title="Sửa">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-${lockButtonClass} btn-sm" 
                                    onclick="toggleUserStatus(${user.id})"
                                    title="${lockButtonTitle}">
                                    <i class="fas fa-${lockIconClass}"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `);
            });

            updatePagination(filteredUsers.length, currentPage);
        }
    });

    // Initial load
    loadUsers(currentPage);
});
