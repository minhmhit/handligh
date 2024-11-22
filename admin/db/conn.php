
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bagstore";

// Tạo kết nối
$conn = mysqli_connect("localhost","root","","bagstore");

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

?>
