<?php 
require('includes/header.php');
require('../db/conn.php');

// Truy vấn để lấy dữ liệu doanh thu theo tháng
$query = "SELECT DATE_FORMAT(ngay_dat, '%Y-%m') as thang, SUM(tong_tien) as doanh_thu 
          FROM donhang 
          GROUP BY DATE_FORMAT(ngay_dat, '%Y-%m') 
          ORDER BY DATE_FORMAT(ngay_dat, '%Y-%m')";
$result = mysqli_query($conn, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Tính toán sự thay đổi doanh thu qua từng tháng
for ($i = 1; $i < count($data); $i++) {
    $previous = $data[$i - 1]['doanh_thu'];
    $current = $data[$i]['doanh_thu'];
    $change = (($current - $previous) / $previous) * 100;
    $data[$i]['change'] = $change;
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thống kê doanh thu</title>
    <!-- Thêm Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <!-- Thêm file CSS riêng -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Thống kê doanh thu cửa hàng</h1>
        <div class="form-group position-relative">
            <label for="product_code">Lọc theo mã sản phẩm:</label>
            <input type="text" id="product_code" class="form-control" placeholder="Nhập mã sản phẩm" onkeyup="showSuggestions(this.value)">
            <div id="suggestions" class="suggestions"></div>
        </div>
        <button class="btn btn-primary mt-2" onclick="fetchData()">Lọc</button>
        <table class="table table-bordered table-hover mt-4">
            <thead class="thead-dark">
                <tr>
                    <th>Tháng</th>
                    <th>Doanh thu (vnd)</th>
                    <th>tỷ lệ tăng / giảm doanh thu (%)</th>
                </tr>
            </thead>
            <tbody id="revenueTableBody">
                <!-- Dữ liệu sẽ được chèn vào đây -->
                <?php 
                foreach ($data as $index => $row) { 
                    $change = isset($row['change']) ? number_format($row['change'], 2) . '%' : 'N/A';
                ?>
                    <tr onclick="fetchOrders('<?php echo $row['thang']; ?>')">
                        <td><?php echo $row['thang']; ?></td>
                        <td><?php echo $row['doanh_thu']; ?></td>
                        <td><?php echo $change; ?></td>
                    </tr>
                <?php } ?>
            </tbody>
            <tfoot>
                <tr>
                    <th>Tổng doanh thu</th>
                    <th id="totalRevenue"></th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
        <div id="ordersContainer" class="mt-4"></div>
    </div>

    <!-- Thêm Bootstrap JS và các phụ thuộc -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- Thêm file JavaScript riêng -->
    <script src="js/scripts.js"></script>
</body>
</html>
<?php 
require('includes/footer.php')
?>