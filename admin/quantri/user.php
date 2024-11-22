<?php 
session_start(); // Bắt đầu session
require('includes/header.php');
?>

<script>
    function redirectToPage() {
        window.location.href = "./addUser.php"; // Thay thế URL này bằng trang bạn muốn chuyển đến
    }

    function editUser(id) {
        $.ajax({
            url: 'editUser.php',
            type: 'GET',
            data: { id: id },
            success: function(response) {
                $('#editUserModal .modal-body').html(response);
                $('#editUserModal').modal('show');
            }
        });
    }

    function lockUser(id) {
        $.ajax({
            url: 'getUserStatus.php',
            type: 'GET',
            data: { id: id },
            success: function(response) {
                var res = JSON.parse(response);
                if (res.status === 'success') {
                    var message = res.trangThai == 1 ? 'Bạn có chắc chắn muốn khóa tài khoản này không?' : 'Bạn có muốn mở lại tài khoản này không?';
                    $('#lockUserMessage').text(message);
                    $('#lockUserId').val(id);
                    $('#lockUserModal').modal('show');
                } else {
                    alert(res.message);
                }
            }
        });
    }

    function confirmLock() {
        var id = $('#lockUserId').val();
        $.ajax({
            url: 'khoaTaiKhoan.php',
            type: 'POST',
            data: { id: id },
            success: function(response) {
                var res = JSON.parse(response);
                if (res.status === 'success') {
                    $('#lockUserModal').modal('hide');
                    var statusText = res.newStatus == 1 ? '<span class="text-success"><i class="fas fa-check-circle"></i> Hoạt động</span>' : '<span class="text-danger"><i class="fas fa-times-circle"></i> Bị khóa</span>';
                    $('#userRow' + id + ' .user-status').html(statusText);
                } else {
                    alert(res.message);
                }
            }
        });
    }

    function resetPassword(id) {
        $('#resetPasswordUserId').val(id);
        $('#resetPasswordModal').modal('show');
    }

    function confirmResetPassword() {
        var id = $('#resetPasswordUserId').val();
        var newPassword = $('#newPassword').val();
        $.ajax({
            url: 'resetPassword.php',
            type: 'POST',
            data: { id: id, newPassword: newPassword },
            success: function(response) {
                var res = JSON.parse(response);
                if (res.status === 'success') {
                    $('#resetPasswordModal').modal('hide');
                    $('#successModalMessage').text(res.message);
                    $('#successModal').modal('show');
                } else {
                    alert(res.message);
                }
            }
        });
    }
</script>

<div class="container-fluid mt-3"> 
    <h3 class="text-center mb-4">Danh sách người dùng</h3>

    <div class="row mb-3">
        <div class="col-md-6">
            <button class="btn btn-primary" onclick="redirectToPage()">Thêm người dùng mới</button>
        </div>
        <div class="col-md-6">
            <!-- Search Bar -->
            <form method="GET" action="user.php" class="form-inline float-right">
                <input type="text" name="search" class="form-control mr-sm-2" placeholder="Tìm kiếm người dùng" value="<?php echo isset($_GET['search']) ? $_GET['search'] : ''; ?>">
                <button type="submit" class="btn btn-outline-success my-2 my-sm-0">Tìm kiếm</button>
            </form>
        </div>
    </div>
    
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Danh sách người dùng</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                    <thead class="thead-light">
                        <tr>
                            <th>Tài Khoản</th>
                            <th>Họ và Tên</th>
                            <th>Số Điện Thoại</th>
                            <th>Email</th>
                            <th>Vai Trò</th>
                            <th>Ngày Sinh</th>
                            <th>Trạng Thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tfoot>
                    <?php
                    require('../db/conn.php');

                    // Pagination settings
                    $limit = 10; // Number of rows per page
                    $page = isset($_GET['page']) ? $_GET['page'] : 1;
                    $offset = ($page - 1) * $limit;

                    // Search query
                    $search = isset($_GET['search']) ? $_GET['search'] : '';

                    // Fetch total number of rows
                    $total_query = "SELECT COUNT(*) as total FROM nguoidung WHERE taiKhoan LIKE '%$search%' OR hoTen LIKE '%$search%' OR email LIKE '%$search%'";
                    $total_result = mysqli_query($conn, $total_query);
                    $total_row = mysqli_fetch_assoc($total_result);
                    $total_rows = $total_row['total'];
                    $total_pages = ceil($total_rows / $limit);

                    // Fetch limited rows for current page
                    $sql_str = "SELECT * FROM nguoidung WHERE taiKhoan LIKE '%$search%' OR hoTen LIKE '%$search%' OR email LIKE '%$search%' LIMIT $limit OFFSET $offset";
                    $result = mysqli_query($conn, $sql_str);
                    while ($row = mysqli_fetch_assoc($result)) {
                        ?>
                        <tr id="userRow<?=$row['id']?>">
                            <td><?=$row['taiKhoan']?></td>
                            <td><?=$row['hoTen']?></td>
                            <td><?=$row['sdt']?></td>
                            <td><?=$row['email']?></td>
                            <td><?=$row['role']?></td>
                            <td><?=$row['ngaySinh']?></td>
                            <td class="user-status">
                                <?php if ($row['trangThai'] == 1): ?>
                                    <span class="text-success"><i class="fas fa-check-circle"></i> Hoạt động</span>
                                <?php else: ?>
                                    <span class="text-danger"><i class="fas fa-times-circle"></i> Bị khóa</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <a href="javascript:void(0);" onclick="editUser(<?=$row['id']?>)" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a>
                                <a href="javascript:void(0);" onclick="lockUser(<?=$row['id']?>)" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></a>
                                <a href="javascript:void(0);" onclick="resetPassword(<?=$row['id']?>)" class="btn btn-info btn-sm"><i class="fas fa-key"></i></a>
                            </td>
                        </tr>
                        <?php
                    }
                    ?>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                <li class="page-item <?php if ($i == $page) echo 'active'; ?>">
                    <a class="page-link" href="user.php?page=<?=$i?>&search=<?=$search?>"><?=$i?></a>
                </li>
            <?php endfor; ?>
        </ul>
    </nav>
</div>


<!-- Modal chỉnh sửa người dùng -->
<div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editUserModalLabel">Chỉnh sửa người dùng</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Nội dung form chỉnh sửa sẽ được tải vào đây bằng AJAX -->
            </div>
        </div>
    </div>
</div>

<!-- Modal xác nhận khóa -->
<div class="modal fade" id="lockUserModal" tabindex="-1" role="dialog" aria-labelledby="lockUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="lockUserModalLabel">Xác nhận khóa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <span id="lockUserMessage">Bạn có chắc chắn muốn khóa tài khoản này không?</span>
                <input type="hidden" id="lockUserId">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-danger" onclick="confirmLock()">Khóa</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal thiết lập lại mật khẩu -->
<div class="modal fade" id="resetPasswordModal" tabindex="-1" role="dialog" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="resetPasswordModalLabel">Thiết lập lại mật khẩu</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="resetPasswordUserId">
                <div class="form-group">
                    <label for="newPassword">Mật khẩu mới:</label>
                    <input type="password" class="form-control" id="newPassword" placeholder="Nhập mật khẩu mới">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary" onclick="confirmResetPassword()">Thiết lập lại mật khẩu</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal thông báo thành công -->
<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="successModalLabel">Thông báo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="successModalMessage">
                <!-- Thông báo sẽ được hiển thị ở đây -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>

<!-- Thêm Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<?php 
require('includes/footer.php');
?>
