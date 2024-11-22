<?php
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Lấy dữ liệu từ form và kiểm tra sự tồn tại của các khóa
    $tenSanPham = mysqli_real_escape_string($conn, $_POST['tenSanPham']);
    $soLuong = (int)$_POST['soLuong'];
    $gia = (int)$_POST['gia'];
    $loaiSanPham = mysqli_real_escape_string($conn, $_POST['loaiSanPham']);
    $kichThuoc = mysqli_real_escape_string($conn, $_POST['kichThuoc']);
    $chatLieu = mysqli_real_escape_string($conn, $_POST['chatLieu']);
    $chatLieuDayDeo = mysqli_real_escape_string($conn, $_POST['chatLieuDayDeo']);
    $kieuKhoa = mysqli_real_escape_string($conn, $_POST['kieuKhoa']);
    $soNgan = (int)$_POST['soNgan'];
    $kichCo = mysqli_real_escape_string($conn, $_POST['kichCo']);
    $phuHopSuDung = mysqli_real_escape_string($conn, $_POST['phuHopSuDung']);

    // Xử lý upload hình ảnh
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["hinhAnh"]["name"]);
    move_uploaded_file($_FILES["hinhAnh"]["tmp_name"], $target_file);

    // Câu lệnh thêm vào bảng
    $sql_str = "INSERT INTO `sanpham` (`maSanPham`, `tenSanPham`, `soLuong`, `gia`, `loaiSanPham`, `kichThuoc`, `chatLieu`, `chatLieuDayDeo`, `kieuKhoa`, `soNgan`, `kichCo`, `hinhAnh`, `phuHopSuDung`) 
    VALUES (NULL, '$tenSanPham', $soLuong, $gia, '$loaiSanPham', '$kichThuoc', '$chatLieu', '$chatLieuDayDeo', '$kieuKhoa', $soNgan, '$kichCo', '$target_file', '$phuHopSuDung');";

    // Gỡ lỗi: Xuất câu lệnh SQL
    //echo $sql_str; exit;

    // Thực thi câu lệnh
    if (mysqli_query($conn, $sql_str)) {
        // Trở về trang
        header("location: themSanPham.php");
    } else {
        echo "Error: " . $sql_str . "<br>" . mysqli_error($conn);
    }
}
?>
