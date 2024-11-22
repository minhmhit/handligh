<?php 
require('includes/header.php');
?>


<div> 
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
            <div class="row mb-3">
                <div class="col-md-6">
                    <button class="btn btn-primary" onclick="redirectToPage()">Tạo mới</button>
                </div>
                <div class="col-md-6">
                    <!-- Search Bar -->
                    <form method="GET" action="listSanPham.php" class="form-inline float-right">
                        <input type="text" name="search" class="form-control mr-sm-2" placeholder="Tìm kiếm sản phẩm" value="<?php echo isset($_GET['search']) ? $_GET['search'] : ''; ?>">
                        <button type="submit" class="btn btn-outline-success my-2 my-sm-0">Tìm kiếm</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Loại sản phẩm</th>
                            <th>Kích thước</th>
                            <th>Chất liệu</th>
                            <th>Chất liệu dây đeo</th>
                            <th>Kiểu khóa</th>
                            <th>Số ngăn</th>
                            <th>Kích cỡ</th>
                            <th>Phù hợp sử dụng</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <?php
                        require('../db/conn.php');

                        // Xác định số lượng sản phẩm trên mỗi trang
                        $products_per_page = 10;

                        // Tính toán số trang cần thiết
                        $total_products_query = "SELECT COUNT(*) as total FROM sanpham";
                        $total_products_result = mysqli_query($conn, $total_products_query);
                        $total_products_row = mysqli_fetch_assoc($total_products_result);
                        $total_products = $total_products_row['total'];
                        $total_pages = ceil($total_products / $products_per_page);

                        // Lấy trang hiện tại từ URL, mặc định là trang 1
                        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
                        $offset = ($page - 1) * $products_per_page;

                        // Truy vấn cơ sở dữ liệu với giới hạn và bù trừ
                        $query = "SELECT * FROM sanpham LIMIT $products_per_page OFFSET $offset";
                        $result = mysqli_query($conn, $query);

                        if ($result) {
                            while($row = mysqli_fetch_assoc($result)) {
                                echo "<tr id='productRow" . $row['maSanPham'] . "'>";
                                echo "<td>" . $row['tenSanPham'] . "</td>";
                                echo "<td>" . $row['gia'] . "</td>";
                                echo "<td>" . $row['loaiSanPham'] . "</td>";
                                echo "<td>" . $row['kichThuoc'] . "</td>";
                                echo "<td>" . $row['chatLieu'] . "</td>";
                                echo "<td>" . $row['chatLieuDayDeo'] . "</td>";
                                echo "<td>" . $row['kieuKhoa'] . "</td>";
                                echo "<td>" . $row['soNgan'] . "</td>";
                                echo "<td>" . $row['kichCo'] . "</td>";
                                echo "<td>" . $row['phuHopSuDung'] . "</td>";
                                echo "<td><img src='" . $row['hinhAnh'] . "' alt='Hình ảnh sản phẩm' width='100'></td>";
                                echo "<td><a href='javascript:void(0);' onclick='editProduct(" . $row['maSanPham'] . ")' class='btn btn-primary'><i class='fas fa-edit fa-lg'></i> Sửa</a> <a href='javascript:void(0);' onclick='deleteProduct(" . $row['maSanPham'] . ")' class='btn btn-danger'><i class='fas fa-trash fa-lg'></i> Xóa</a></td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='12'>Không có dữ liệu</td></tr>";
                            echo "Lỗi: " . mysqli_error($conn);
                        }
                        ?>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    <!-- Hiển thị các liên kết phân trang -->
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <?php
            for ($i = 1; $i <= $total_pages; $i++) {
                echo '<li class="page-item ' . ($i == $page ? 'active' : '') . '"><a class="page-link" href="listSanPham.php?page=' . $i . '">' . $i . '</a></li>';
            }
            ?>
        </ul>
    </nav>
</div>

<!-- Modal chỉnh sửa sản phẩm -->
<div class="modal fade" id="editProductModal" tabindex="-1" role="dialog" aria-labelledby="editProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editProductModalLabel">Chỉnh sửa sản phẩm</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Nội dung sẽ được tải động từ AJAX -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                <button type="button" class="btn btn-primary" onclick="saveChanges()">Lưu thay đổi</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal xác nhận xóa -->
<div class="modal fade" id="deleteProductModal" tabindex="-1" role="dialog" aria-labelledby="deleteProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteProductModalLabel">Xác nhận xóa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Bạn có chắc chắn muốn xóa sản phẩm này không?
                <input type="hidden" id="deleteProductId">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-danger" onclick="confirmDelete()">Xóa</button>
            </div>
        </div>
    </div>
</div>
<script>
    function redirectToPage() {
        window.location.href = "./themSanPham.php"; // Thay thế URL này bằng trang bạn muốn chuyển đến
    }

    function editProduct(id) {
        $.ajax({
            url: 'editSanPham.php', // Đảm bảo URL này là chính xác
            type: 'GET',
            data: { id: id },
            success: function(response) {
                $('#editProductModal .modal-body').html(response);
                $('#editProductModal').modal('show');
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }

    function deleteProduct(id) {
        $('#deleteProductId').val(id);
        $('#deleteProductModal').modal('show');
    }

    function confirmDelete() {
        var id = $('#deleteProductId').val();
        $.ajax({
            url: 'deleteSanPham.php',
            type: 'POST',
            data: { id: id },
            success: function(response) {
                var res = JSON.parse(response);
                if (res.status === 'success') {
                    $('#deleteProductModal').modal('hide');
                    $('#productRow' + id).remove();
                } else {
                    alert(res.message);
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }
</script>

<!-- Thêm Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<?php 
require('includes/footer.php')
?>