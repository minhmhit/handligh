<?php
session_start();
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $taiKhoan = mysqli_real_escape_string($conn, $_POST['taiKhoan']);
    $matKhau = mysqli_real_escape_string($conn, $_POST['matKhau']);

    $query = "SELECT * FROM nguoidung WHERE taiKhoan='$taiKhoan' AND matKhau='$matKhau'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        $_SESSION['user'] = $row;
        header('Location: index.php');
    } else {
        echo "Sai tài khoản hoặc mật khẩu.";
    }
}
?>