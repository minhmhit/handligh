<?php
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    
    // Lấy trạng thái hiện tại của tài khoản
    $query = "SELECT trangThai FROM nguoidung WHERE id='$id'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    
    if ($row) {
        // Đảo ngược trạng thái
        $newStatus = $row['trangThai'] == 1 ? 0 : 1;
        $sql_str = "UPDATE nguoidung SET trangThai='$newStatus' WHERE id='$id'";
        
        if (mysqli_query($conn, $sql_str)) {
            $statusText = $newStatus == 1 ? 'Mở khóa tài khoản thành công!' : 'Khóa tài khoản thành công!';
            echo json_encode(['status' => 'success', 'message' => $statusText, 'newStatus' => $newStatus]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Lỗi: ' . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Tài khoản không tồn tại.']);
    }
}
?>