<?php
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $hoTen = mysqli_real_escape_string($conn, $_POST['hoTen']);
    $sdt = mysqli_real_escape_string($conn, $_POST['sdt']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $role = mysqli_real_escape_string($conn, $_POST['role']);
    $ngaySinh = mysqli_real_escape_string($conn, $_POST['ngaySinh']);

    $sql_str = "UPDATE nguoidung SET hoTen='$hoTen', sdt='$sdt', email='$email', role='$role', ngaySinh='$ngaySinh' WHERE id='$id'";
    if (mysqli_query($conn, $sql_str)) {
        echo json_encode(['status' => 'success', 'message' => 'Cập nhật người dùng thành công!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Lỗi: ' . mysqli_error($conn)]);
    }
    exit;
} else {
    $id = $_GET['id'];
    $query = "SELECT * FROM nguoidung WHERE id='$id'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
}
?>

<form id="editUserForm">
    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
    <div class="form-group">
        <label for="hoTen">Họ và Tên:</label>
        <input type="text" class="form-control" id="hoTen" name="hoTen" value="<?php echo $row['hoTen']; ?>" required>
    </div>
    <div class="form-group">
        <label for="sdt">Số Điện Thoại:</label>
        <input type="text" class="form-control" id="sdt" name="sdt" value="<?php echo $row['sdt']; ?>" required>
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" name="email" value="<?php echo $row['email']; ?>" required>
    </div>
    <div class="form-group">
        <label for="role">Vai Trò:</label>
        <input type="text" class="form-control" id="role" name="role" value="<?php echo $row['role']; ?>" required>
    </div>
    <div class="form-group">
        <label for="ngaySinh">Ngày Sinh:</label>
        <input type="date" class="form-control" id="ngaySinh" name="ngaySinh" value="<?php echo $row['ngaySinh']; ?>" required>
    </div>
    <button type="submit" class="btn btn-primary btn-block">Cập nhật</button>
</form>

<script>
    $('#editUserForm').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url: 'editUser.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                var res = JSON.parse(response);
                if (res.status === 'success') {
                    $('#editUserModal').modal('hide');
                    alert(res.message);
                    location.reload(); // Tải lại trang để cập nhật dữ liệu
                } else {
                    alert(res.message);
                }
            }
        });
    });
</script>