<?php
session_start();
require('includes/header.php');
require('../db/conn.php');

// Lọc đơn hàng theo thời gian và tình trạng
$search = isset($_GET['search']) ? $_GET['search'] : '';
$trang_thai = isset($_GET['trang_thai']) ? $_GET['trang_thai'] : '';
$start_date = isset($_GET['start_date']) ? $_GET['start_date'] : '';
$end_date = isset($_GET['end_date']) ? $_GET['end_date'] : '';

// Truy vấn đơn hàng
$query = "SELECT * FROM donhang WHERE 1=1";
if ($search) {
    $query .= " AND dia_chi_giao_hang LIKE '%$search%'";
}
if ($trang_thai) {
    $query .= " AND trang_thai = '$trang_thai'";
}
if ($start_date && $end_date) {
    $query .= " AND ngay_dat BETWEEN '$start_date' AND '$end_date'";
}
$result = mysqli_query($conn, $query);
?>

<div class="container-fluid mt-3">
    <h3 class="text-center mb-4">Quản lý đơn hàng</h3>

    <!-- Form lọc đơn hàng -->
    <form method="GET" action="manageOrders.php" class="form-inline mb-3">
        <input type="text" name="search" class="form-control mr-sm-2" placeholder="Tìm kiếm địa chỉ" value="<?php echo $search; ?>">
        <select name="trang_thai" class="form-control mr-sm-2">
            <option value="">Tất cả trạng thái</option>
            <option value="chua_xu_ly" <?php if ($trang_thai == 'chua_xu_ly') echo 'selected'; ?>>Chưa xử lý</option>
            <option value="da_xac_nhan" <?php if ($trang_thai == 'da_xac_nhan') echo 'selected'; ?>>Đã xác nhận</option>
            <option value="da_giao_thanh_cong" <?php if ($trang_thai == 'da_giao_thanh_cong') echo 'selected'; ?>>Đã giao thành công</option>
            <option value="da_huy" <?php if ($trang_thai == 'da_huy') echo 'selected'; ?>>Đã hủy</option>
        </select>
        <input type="date" name="start_date" class="form-control mr-sm-2" value="<?php echo $start_date; ?>">
        <input type="date" name="end_date" class="form-control mr-sm-2" value="<?php echo $end_date; ?>">
        <button type="submit" class="btn btn-outline-success my-2 my-sm-0">Lọc</button>
    </form>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Danh sách đơn hàng</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover" width="100%" cellspacing="0">
                    <thead class="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                            <th>Địa chỉ giao hàng</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php while ($row = mysqli_fetch_assoc($result)) { ?>
                        <tr>
                            <td><?php echo $row['id']; ?></td>
                            <td><?php echo $row['khachhang_id']; ?></td>
                            <td><?php echo $row['ngay_dat']; ?></td>
                            <td>
                                <?php 
                                switch ($row['trang_thai']) {
                                    case 'chua_xu_ly':
                                        echo '<i class="fas fa-hourglass-start text-warning"></i> Chưa xử lý';
                                        break;
                                    case 'da_xac_nhan':
                                        echo '<i class="fas fa-check-circle text-primary"></i> Đã xác nhận';
                                        break;
                                    case 'da_giao_thanh_cong':
                                        echo '<i class="fas fa-shipping-fast text-success"></i> Đã giao thành công';
                                        break;
                                    case 'da_huy':
                                        echo '<i class="fas fa-times-circle text-danger"></i> Đã hủy';
                                        break;
                                    default:
                                        echo $row['trang_thai'];
                                        break;
                                }
                                ?>
                            </td>
                            <td><?php echo $row['dia_chi_giao_hang']; ?></td>
                            <td><?php echo $row['tong_tien']; ?></td>
                            <td>
                                <a href="orderDetails.php?id=<?php echo $row['id']; ?>" class="btn btn-info btn-sm">Xem chi tiết</a>
                                <button class="btn btn-warning btn-sm" onclick="updateOrderStatus(<?php echo $row['id']; ?>)">Cập nhật trạng thái</button>
                            </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Modal cập nhật trạng thái -->
<div class="modal fade" id="updateStatusModal" tabindex="-1" role="dialog" aria-labelledby="updateStatusModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateStatusModalLabel">Cập nhật trạng thái đơn hàng</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="updateStatusForm">
                    <input type="hidden" id="orderId" name="orderId">
                    <div class="form-group">
                        <label for="newStatus">Trạng thái mới</label>
                        <select id="newStatus" name="newStatus" class="form-control">
                            <option value="chua_xu_ly">Chưa xử lý</option>
                            <option value="da_xac_nhan">Đã xác nhận</option>
                            <option value="da_giao_thanh_cong">Đã giao thành công</option>
                            <option value="da_huy">Đã hủy</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="submitUpdateStatus()">Cập nhật</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
function updateOrderStatus(orderId) {
    document.getElementById('orderId').value = orderId;
    $('#updateStatusModal').modal('show');
}

async function submitUpdateStatus() {
    const orderId = document.getElementById('orderId').value;
    const newStatus = document.getElementById('newStatus').value;

    const response = await fetch('api/update_order_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, newStatus })
    });

    const result = await response.json();
    if (result.success) {
        alert('Cập nhật trạng thái thành công');
        location.reload();
    } else {
        alert('Cập nhật trạng thái thất bại');
    }
}
</script>

<?php
require('includes/footer.php');
?>