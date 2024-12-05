$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const username = $('#username').val();
        const password = $('#password').val();

        // Simple validation
        if (!username || !password) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng điền đầy đủ thông tin',
                icon: 'error',
                confirmButtonText: 'Đóng'
            });
            return;
        }

        // Example credentials (in real app, this would be checked against a database)
        if (username === 'admin' && password === 'admin123') {
            Swal.fire({
                title: 'Thành công!',
                text: 'Đăng nhập thành công',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '../index.html';
                }
            });
        } else {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Tên đăng nhập hoặc mật khẩu không đúng',
                icon: 'error',
                confirmButtonText: 'Thử lại'
            });
        }
    });
});
