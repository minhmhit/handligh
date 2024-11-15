<?php
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $newPassword = mysqli_real_escape_string($conn, $_POST['newPassword']);

    $sql_str = "UPDATE nguoidung SET matKhau='$newPassword' WHERE id='$id'";
    if (mysqli_query($conn, $sql_str)) {
        echo json_encode(['status' => 'success', 'message' => 'Thiết lập lại mật khẩu thành công!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Lỗi: ' . mysqli_error($conn)]);
    }
}
?>