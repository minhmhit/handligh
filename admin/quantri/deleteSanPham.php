<?php
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $maSanPham = mysqli_real_escape_string($conn, $_POST['id']);

    // Xóa hình ảnh nếu có
    $query = "SELECT hinhAnh FROM sanpham WHERE maSanPham='$maSanPham'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    if ($row['hinhAnh'] && file_exists($row['hinhAnh'])) {
        unlink($row['hinhAnh']); // Xóa file ảnh
    }

    // Xóa sản phẩm
    $sql_str = "DELETE FROM sanpham WHERE maSanPham='$maSanPham'";
    if (mysqli_query($conn, $sql_str)) {
        echo json_encode(['status' => 'success', 'message' => 'Xóa sản phẩm thành công!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Lỗi: ' . mysqli_error($conn)]);
    }
}
?>