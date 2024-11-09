<?php
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id = mysqli_real_escape_string($conn, $_GET['id']);
    
    // Lấy trạng thái hiện tại của tài khoản
    $query = "SELECT trangThai FROM nguoidung WHERE id='$id'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    
    if ($row) {
        echo json_encode(['status' => 'success', 'trangThai' => $row['trangThai']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Tài khoản không tồn tại.']);
    }
}
?>