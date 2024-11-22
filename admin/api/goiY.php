<?php
require('../db/conn.php');

$query = isset($_GET['query']) ? mysqli_real_escape_string($conn, $_GET['query']) : '';

$sql = "SELECT maSanPham, tenSanPham FROM sanpham WHERE maSanPham LIKE '%$query%' OR tenSanPham LIKE '%$query%' LIMIT 10";
$result = mysqli_query($conn, $sql);

$suggestions = [];
while ($row = mysqli_fetch_assoc($result)) {
    $suggestions[] = $row;
}

header('Content-Type: application/json');
echo json_encode($suggestions);
?>