<?php
session_start();
require('includes/header.php');
require('../db/conn.php');

// Lọc thống kê theo khoảng thời gian
$start_date = isset($_GET['start_date']) ? $_GET['start_date'] : '';
$end_date = isset($_GET['end_date']) ? $_GET['end_date'] : '';

// Thống kê mặt hàng
$query = "SELECT sanpham_id, SUM(so_luong) as so_luong_ban_ra, SUM(so_luong * gia) as tong_tien FROM chitietdonhang WHERE 1=1";
if ($start_date && $end_date) {
    $query .= " AND ngay_dat BETWEEN '$start_date' AND '$end_date'";
}
$query .= " GROUP BY sanpham_id";
$result = mysqli_query($conn, $query);

// Thống kê khách hàng
$query_kh = "SELECT khachhang_id, SUM(tong_tien) as tong_tien FROM donhang WHERE 1=1";
if ($start_date && $end_date) {
    $query_kh .= " AND ngay_dat BETWEEN '$start_date' AND '$end_date'";
}
$query_kh .= " GROUP BY khachhang_id ORDER BY tong_tien DESC LIMIT 5";
$result_kh = mysqli_query($conn, $query_kh);
?>

<div class="container-fluid mt-3">
    <h3 class="text-center mb-4">Thống kê tình hình kinh doanh</h3>

    <!-- Form lọc thống kê -->
    <form method="GET" action="statistics.php" class="form-inline mb-3">
        <input type="date" name="start_date" class="form-control mr-sm-2" value="<?php echo $start_date; ?>">
        <input type="date" name="end_date" class="form-control mr-sm-2" value="<?php echo $end_date; ?>">
        <button type="submit" class="btn btn-outline-success my-2 my-sm-0">Lọc</button>
    </form>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Thống kê mặt hàng</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover" width="100%" cellspacing="0">
                    <thead class="thead-light">
                        <tr>
                            <th>ID Sản phẩm</th>
                            <th>Số lượng bán ra</th>
                            <th>Tổng tiền thu được</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php while ($row = mysqli_fetch_assoc($result)) { ?>
                        <tr>
                            <td><?php echo $row['sanpham_id']; ?></td>
                            <td><?php echo $row['so_luong_ban_ra']; ?></td>
                            <td><?php echo $row['tong_tien']; ?></td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Thống kê khách hàng</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover" width="100%" cellspacing="0">
                    <thead class="thead-light">
                        <tr>
                            <th>ID Khách hàng</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php while ($row = mysqli_fetch_assoc($result_kh)) { ?>
                        <tr>
                            <td><?php echo $row['khachhang_id']; ?></td>
                            <td><?php echo $row['tong_tien']; ?></td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<?php
require('includes/footer.php');
?>