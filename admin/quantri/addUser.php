<?php
session_start();
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $taiKhoan = isset($_POST['taiKhoan']) ? mysqli_real_escape_string($conn, $_POST['taiKhoan']) : '';
    $matKhau = isset($_POST['matKhau']) ? mysqli_real_escape_string($conn, $_POST['matKhau']) : '';
    $hoTen = isset($_POST['hoTen']) ? mysqli_real_escape_string($conn, $_POST['hoTen']) : '';
    $sdt = isset($_POST['sdt']) ? mysqli_real_escape_string($conn, $_POST['sdt']) : '';
    $email = isset($_POST['email']) ? mysqli_real_escape_string($conn, $_POST['email']) : '';
    $role = isset($_POST['role']) ? mysqli_real_escape_string($conn, $_POST['role']) : '';
    $ngaySinh = isset($_POST['ngaySinh']) ? mysqli_real_escape_string($conn, $_POST['ngaySinh']) : '';

    $sql_str = "INSERT INTO nguoidung (taiKhoan, matKhau, hoTen, sdt, email, role, ngaySinh) VALUES ('$taiKhoan', '$matKhau', '$hoTen', '$sdt', '$email', '$role', '$ngaySinh')";
    if (mysqli_query($conn, $sql_str)) {
        $_SESSION['message'] = "Thêm người dùng thành công!";
        header('Location: addUser.php');
        exit();
    } else {
        echo "Lỗi: " . mysqli_error($conn);
    }
}

require('includes/header.php');
?>

<div class="container mt-5">
    <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
            <div class="row">
                <div class="col-lg-12">
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Thêm tài khoản</h1>
                        </div>
                        <form class="user" method="post" action="addUser.php">
                            <div class="form-group">
                                <label class="form-label">Tài Khoản:</label>
                                <input type="text" class="form-control form-control-user" id="taiKhoan" name="taiKhoan" placeholder="Tên tài khoản" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mật Khẩu:</label>
                                <input type="password" class="form-control form-control-user" id="matKhau" name="matKhau" placeholder="Mật khẩu" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Họ và Tên:</label>
                                <input type="text" class="form-control form-control-user" id="hoTen" name="hoTen" placeholder="Họ và tên" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Số Điện Thoại:</label>
                                <input type="text" class="form-control form-control-user" id="sdt" name="sdt" placeholder="Số điện thoại" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email:</label>
                                <input type="email" class="form-control form-control-user" id="email" name="email" placeholder="Email" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Vai Trò:</label>
                                <input type="text" class="form-control form-control-user" id="role" name="role" placeholder="Vai trò" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ngày Sinh:</label>
                                <input type="date" class="form-control form-control-user" id="ngaySinh" name="ngaySinh" placeholder="Ngày sinh" required>
                            </div>
                            <button type="submit" class="btn btn-primary btn-user btn-block">Tạo mới</button>
                        </form>
                        <hr>
                        <?php
                        if (isset($_SESSION['message'])) {
                            echo '<div class="alert alert-success" role="alert">' . $_SESSION['message'] . '</div>';
                            unset($_SESSION['message']);
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal thông báo thành công -->
<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="successModalLabel">Thông báo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="successModalMessage">
                <!-- Thông báo sẽ được hiển thị ở đây -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>

<!-- Thêm Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<script>
    $(document).ready(function() {
        <?php if (isset($_SESSION['message'])): ?>
            $('#successModalMessage').text('<?php echo $_SESSION['message']; ?>');
            $('#successModal').modal('show');
            <?php unset($_SESSION['message']); ?>
        <?php endif; ?>
    });
</script>

<?php
require('includes/footer.php');
?>