<?php
require('../db/conn.php');

$data = json_decode(file_get_contents('php://input'), true);
$orderId = $data['orderId'];
$newStatus = $data['newStatus'];

$query = "UPDATE donhang SET trang_thai = '$newStatus' WHERE id = $orderId";
$result = mysqli_query($conn, $query);

$response = [];
if ($result) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

header('Content-Type: application/json');
echo json_encode($response);
?>