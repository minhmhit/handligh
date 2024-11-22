<?php
session_start();
require('includes/header.php');
require('../db/conn.php');

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    $query = "SELECT * FROM donhang WHERE id = $id";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $order = mysqli_fetch_assoc($result);

        $query = "SELECT * FROM chitietdonhang WHERE donhang_id = $id";
        $result = mysqli_query($conn, $query);
    } else {
        echo "Đơn hàng không tồn tại.";
        exit();
    }
} else {
    echo "ID đơn hàng không hợp lệ.";
    exit();
}
?>

<div class="container-fluid mt-3">
    <h3 class="text-center mb-4">Chi tiết đơn hàng</h3>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Thông tin đơn hàng</h6>
        </div>
        <div class="card-body">
            <p><strong>ID:</strong> <?php echo $order['id']; ?></p>
            <p><strong>Khách hàng:</strong> <?php echo $order['khachhang_id']; ?></p>
            <p><strong>Ngày đặt:</strong> <?php echo $order['ngay_dat']; ?></p>
            <p><strong>Trạng thái:</strong> <?php echo $order['trang_thai']; ?></p>
            <p><strong>Địa chỉ giao hàng:</strong> <?php echo $order['dia_chi_giao_hang']; ?></p>
            <p><strong>Tổng tiền:</strong> <?php echo $order['tong_tien']; ?></p>
        </div>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Chi tiết sản phẩm</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover" width="100%" cellspacing="0">
                    <thead class="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php if ($result && mysqli_num_rows($result) > 0) { ?>
                        <?php while ($row = mysqli_fetch_assoc($result)) { ?>
                            <tr>
                                <td><?php echo $row['id']; ?></td>
                                <td><?php echo $row['sanpham_id']; ?></td>
                                <td><?php echo $row['so_luong']; ?></td>
                                <td><?php echo $row['gia']; ?></td>
                            </tr>
                        <?php } ?>
                    <?php } else { ?>
                        <tr>
                            <td colspan="4" class="text-center">Không có chi tiết sản phẩm nào.</td>
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