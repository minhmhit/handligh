<?php
require('../db/conn.php');

$month = isset($_GET['month']) ? mysqli_real_escape_string($conn, $_GET['month']) : '';

$query = "SELECT * FROM donhang WHERE DATE_FORMAT(ngay_dat, '%Y-%m') = '$month'";
$result = mysqli_query($conn, $query);

$orders = [];
while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = $row;
}

header('Content-Type: application/json');
echo json_encode($orders);
?>