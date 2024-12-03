<?php
require('includes/header.php');
require('getThongKe.php');
?>

<!DOCTYPE html>
<html>
<head>
    <title>Thống kê doanh thu bán túi xách</title>
    <meta charset="UTF-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
    <style>
        .container {
            width: 90%;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .filters {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 5px;
            display: flex;
            gap: 20px;
            align-items: center;
        }
        .filters select {
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        .filters label {
            font-weight: bold;
            margin-right: 10px;
        }
        .chart-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding: 20px;
            margin-top: 20px;
        }
        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .stat-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stat-card h3 {
            margin: 0;
            color: #333;
            font-size: 16px;
        }
        .stat-card p {
            margin: 10px 0 0;
            font-size: 20px;
            font-weight: bold;
            color: #28a745;
        }
        .product-revenue-chart {
            margin-top: 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f9fa;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thống kê doanh thu bán túi xách</h1>
        
        <div class="filters">
            <div>
                <label for="year">Năm:</label>
                <select id="year" name="year" onchange="this.form.submit()">
                    <?php foreach($years as $year): ?>
                        <option value="<?php echo $year; ?>" <?php echo $year == $selectedYear ? 'selected' : ''; ?>>
                            <?php echo $year; ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div>
                <label for="product">Sản phẩm:</label>
                <select id="product" name="product" onchange="this.form.submit()">
                    <option value="all" <?php echo $selectedProduct == 'all' ? 'selected' : ''; ?>>Tất cả sản phẩm</option>
                    <?php foreach($products as $product): ?>
                        <option value="<?php echo $product['product_id']; ?>" 
                                <?php echo $selectedProduct == $product['product_id'] ? 'selected' : ''; ?>>
                            <?php echo $product['product_name']; ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

        <div class="chart-container">
            <canvas id="revenueChart"></canvas>
        </div>

        <div class="product-revenue-chart">
            <canvas id="productChart"></canvas>
        </div>

        <div class="stats-container">
            <div class="stat-card">
                <h3>Tổng doanh thu</h3>
                <p id="totalRevenue">0 VNĐ</p>
            </div>
            <div class="stat-card">
                <h3>Doanh thu trung bình/tháng</h3>
                <p id="avgRevenue">0 VNĐ</p>
            </div>
            <div class="stat-card">
                <h3>Tháng cao nhất</h3>
                <p id="highestMonth">-</p>
            </div>
        </div>

        <table id="revenueTable">
            <thead>
                <tr>
                    <th>Tháng</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng bán</th>
                    <th>Doanh thu</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

    <script>
        // Lấy dữ liệu từ PHP
        const data = <?php echo $jsonData; ?>;
        const productRevenue = <?php echo $jsonProductRevenue; ?>;
        
        // Tính toán thống kê
        const total = data.reduce((sum, item) => sum + item.revenue, 0);
        const average = total / data.length;
        const highest = Math.max(...data.map(item => item.revenue));
        const highestMonth = data.find(item => item.revenue === highest)?.month;

        // Cập nhật thông tin tổng quan
        document.getElementById('totalRevenue').textContent = 
            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
        document.getElementById('avgRevenue').textContent = 
            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(average);
        document.getElementById('highestMonth').textContent = highestMonth;

        // Cập nhật bảng chi tiết
        const tableBody = document.querySelector('#revenueTable tbody');
        data.forEach(item => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = item.month;
            row.insertCell().textContent = item.product;
            row.insertCell().textContent = item.quantity;
            row.insertCell().textContent = new Intl.NumberFormat('vi-VN', { 
                style: 'currency', 
                currency: 'VND' 
            }).format(item.revenue);
        });

        // Vẽ biểu đồ doanh thu theo tháng
        const ctx = document.getElementById('revenueChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'Doanh thu (VNĐ)',
                    data: data.map(item => item.revenue),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('vi-VN', { 
                                    style: 'currency', 
                                    currency: 'VND',
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Doanh thu theo tháng'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return new Intl.NumberFormat('vi-VN', { 
                                    style: 'currency', 
                                    currency: 'VND' 
                                }).format(context.raw);
                            }
                        }
                    }
                }
            }
        });

        // Vẽ biểu đồ doanh thu theo sản phẩm
        const productCtx = document.getElementById('productChart').getContext('2d');
        new Chart(productCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(productRevenue),
                datasets: [{
                    data: Object.values(productRevenue),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Tỷ lệ doanh thu theo sản phẩm'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${new Intl.NumberFormat('vi-VN', { 
                                    style: 'currency', 
                                    currency: 'VND' 
                                }).format(value)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
<?php 
require('includes/footer.php')
?>