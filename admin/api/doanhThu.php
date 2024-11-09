<?php
require('../db/conn.php');

$productCode = isset($_GET['product_code']) ? mysqli_real_escape_string($conn, $_GET['product_code']) : null;

$query = "SELECT DATE_FORMAT(dh.ngay_dat, '%Y-%m') as month, SUM(dh.tong_tien) as total_revenue 
          FROM donhang dh 
          JOIN chitietdonhang ctdh ON dh.id = ctdh.donhang_id 
          JOIN sanpham sp ON ctdh.sanpham_id = sp.id 
          WHERE 1=1";

if ($productCode) {
    $query .= " AND sp.maSanPham = '$productCode'";
}

$query .= " GROUP BY DATE_FORMAT(dh.ngay_dat, '%Y-%m') ORDER BY DATE_FORMAT(dh.ngay_dat, '%Y-%m')";

$result = mysqli_query($conn, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
?>