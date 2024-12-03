<?php
require('../db/conn.php');
// Lấy danh sách năm để filter
$yearQuery = "SELECT DISTINCT YEAR(sale_date) as year FROM sales ORDER BY year DESC";
$yearResult = $conn->query($yearQuery);
$years = [];
while($row = $yearResult->fetch_assoc()) {
    $years[] = $row['year'];
}

// Lấy danh sách sản phẩm để filter
$productQuery = "SELECT product_id, product_name FROM products ORDER BY product_name";
$productResult = $conn->query($productQuery);
$products = [];
while($row = $productResult->fetch_assoc()) {
    $products[] = $row;
}

// Xử lý filter
$selectedYear = isset($_GET['year']) ? $_GET['year'] : date('Y');
$selectedProduct = isset($_GET['product']) ? $_GET['product'] : 'all';

// Query lấy dữ liệu doanh thu
$sql = "SELECT 
            MONTH(s.sale_date) as month,
            YEAR(s.sale_date) as year,
            p.product_name,
            SUM(s.total_amount) as revenue,
            SUM(s.quantity) as quantity_sold
        FROM sales s
        JOIN products p ON s.product_id = p.product_id
        WHERE YEAR(s.sale_date) = ?";

if($selectedProduct != 'all') {
    $sql .= " AND s.product_id = ?";
}

$sql .= " GROUP BY MONTH(s.sale_date), YEAR(s.sale_date), p.product_name
          ORDER BY year, month";

$stmt = $conn->prepare($sql);

if($selectedProduct != 'all') {
    $stmt->bind_param("ii", $selectedYear, $selectedProduct);
} else {
    $stmt->bind_param("i", $selectedYear);
}

$stmt->execute();
$result = $stmt->get_result();

$data = array();
$productRevenue = array();
while($row = $result->fetch_assoc()) {
    $data[] = array(
        "month" => "Tháng " . $row['month'],
        "revenue" => $row['revenue'],
        "product" => $row['product_name'],
        "quantity" => $row['quantity_sold']
    );
    
    // Tính tổng doanh thu theo sản phẩm
    if(!isset($productRevenue[$row['product_name']])) {
        $productRevenue[$row['product_name']] = 0;
    }
    $productRevenue[$row['product_name']] += $row['revenue'];
}

$conn->close();

// Chuyển đổi dữ liệu sang JSON
$jsonData = json_encode($data);
$jsonProductRevenue = json_encode($productRevenue);
?>