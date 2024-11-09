<?php
session_start(); // Bắt đầu session
require('../db/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['ajax'])) {
    // Lấy dữ liệu từ form
    $maSanPham = mysqli_real_escape_string($conn, $_POST['maSanPham']);
    $tenSanPham = mysqli_real_escape_string($conn, $_POST['tenSanPham']);
    $gia = mysqli_real_escape_string($conn, $_POST['gia']);
    $loaiSanPham = mysqli_real_escape_string($conn, $_POST['loaiSanPham']);
    $kichThuoc = mysqli_real_escape_string($conn, $_POST['kichThuoc']);
    $chatLieu = mysqli_real_escape_string($conn, $_POST['chatLieu']);
    $chatLieuDayDeo = mysqli_real_escape_string($conn, $_POST['chatLieuDayDeo']);
    $kieuKhoa = mysqli_real_escape_string($conn, $_POST['kieuKhoa']);
    $soNgan = mysqli_real_escape_string($conn, $_POST['soNgan']);
    $kichCo = mysqli_real_escape_string($conn, $_POST['kichCo']);
    $phuHopSuDung = mysqli_real_escape_string($conn, $_POST['phuHopSuDung']);
    $hinhAnh = $_FILES['hinhAnh']['name'];
    $xoaHinhAnh = isset($_POST['xoaHinhAnh']) ? true : false;

    // Xử lý xóa hình ảnh hiện có nếu checkbox được chọn
    if ($xoaHinhAnh) {
        $query = "SELECT hinhAnh FROM sanpham WHERE maSanPham='$maSanPham'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);
        if ($row['hinhAnh'] && file_exists($row['hinhAnh'])) {
            unlink($row['hinhAnh']); // Xóa file ảnh
        }
        $hinhAnh_sql = ", hinhAnh=NULL";
    } else {
        // Xử lý upload hình ảnh nếu có
        if ($hinhAnh) {
            $target_dir = "uploads/";
            $target_file = $target_dir . basename($hinhAnh);
            move_uploaded_file($_FILES["hinhAnh"]["tmp_name"], $target_file);
            $hinhAnh_sql = ", hinhAnh='$target_file'";
        } else {
            $hinhAnh_sql = "";
        }
    }

    // Câu lệnh cập nhật bảng
    $sql_str = "UPDATE sanpham SET tenSanPham='$tenSanPham', gia='$gia', loaiSanPham='$loaiSanPham', kichThuoc='$kichThuoc', chatLieu='$chatLieu', chatLieuDayDeo='$chatLieuDayDeo', kieuKhoa='$kieuKhoa', soNgan='$soNgan', kichCo='$kichCo', phuHopSuDung='$phuHopSuDung' $hinhAnh_sql WHERE maSanPham='$maSanPham'";

    // Thực thi câu lệnh
    if (mysqli_query($conn, $sql_str)) {
        // Trả về thông báo thành công và dữ liệu mới
        echo json_encode([
            'status' => 'success',
            'message' => 'Cập nhật sản phẩm thành công!',
            'data' => [
                'tenSanPham' => $tenSanPham,
                'gia' => $gia,
                'loaiSanPham' => $loaiSanPham,
                'kichThuoc' => $kichThuoc,
                'chatLieu' => $chatLieu,
                'chatLieuDayDeo' => $chatLieuDayDeo,
                'kieuKhoa' => $kieuKhoa,
                'soNgan' => $soNgan,
                'kichCo' => $kichCo,
                'phuHopSuDung' => $phuHopSuDung,
                'hinhAnh' => $hinhAnh ? $target_file : $row['hinhAnh']
            ]
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Lỗi: ' . mysqli_error($conn)]);
    }
    exit;
} else {
    // Lấy thông tin sản phẩm từ cơ sở dữ liệu
    $maSanPham = $_GET['id'];
    $query = "SELECT * FROM sanpham WHERE maSanPham='$maSanPham'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sửa sản phẩm</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3 class="text-center">Sửa sản phẩm</h3>
            </div>
            <div class="card-body">
                <form id="editProductForm" enctype="multipart/form-data">
                    <input type="hidden" name="maSanPham" value="<?php echo $row['maSanPham']; ?>">
                    <input type="hidden" name="ajax" value="1">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="tenSanPham">Tên sản phẩm:</label>
                            <input type="text" class="form-control" id="tenSanPham" name="tenSanPham" value="<?php echo $row['tenSanPham']; ?>" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="gia">Giá:</label>
                            <input type="number" class="form-control" id="gia" name="gia" value="<?php echo $row['gia']; ?>" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="loaiSanPham">Loại sản phẩm:</label>
                            <input type="text" class="form-control" id="loaiSanPham" name="loaiSanPham" value="<?php echo $row['loaiSanPham']; ?>" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="kichThuoc">Kích thước:</label>
                            <input type="text" class="form-control" id="kichThuoc" name="kichThuoc" value="<?php echo $row['kichThuoc']; ?>" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="chatLieu">Chất liệu:</label>
                            <input type="text" class="form-control" id="chatLieu" name="chatLieu" value="<?php echo $row['chatLieu']; ?>" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="chatLieuDayDeo">Chất liệu dây đeo:</label>
                            <input type="text" class="form-control" id="chatLieuDayDeo" name="chatLieuDayDeo" value="<?php echo $row['chatLieuDayDeo']; ?>" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="kieuKhoa">Kiểu khóa:</label>
                            <input type="text" class="form-control" id="kieuKhoa" name="kieuKhoa" value="<?php echo $row['kieuKhoa']; ?>" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="soNgan">Số ngăn:</label>
                            <input type="number" class="form-control" id="soNgan" name="soNgan" value="<?php echo $row['soNgan']; ?>" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="kichCo">Kích cỡ:</label>
                            <input type="text" class="form-control" id="kichCo" name="kichCo" value="<?php echo $row['kichCo']; ?>" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="phuHopSuDung">Phù hợp sử dụng:</label>
                            <input type="text" class="form-control" id="phuHopSuDung" name="phuHopSuDung" value="<?php echo $row['phuHopSuDung']; ?>" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="hinhAnh">Hình ảnh:</label>
                        <input type="file" class="form-control-file" id="hinhAnh" name="hinhAnh" onchange="previewImage(event)">
                        <img src="<?php echo $row['hinhAnh']; ?>" alt="Hình ảnh sản phẩm" class="img-thumbnail mt-2" id="preview" width="150">
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="checkbox" id="xoaHinhAnh" name="xoaHinhAnh">
                            <label class="form-check-label" for="xoaHinhAnh">Xóa ảnh hiện có</label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Cập nhật</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="successModalLabel">Thông báo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="successMessage">
                    <!-- Thông báo sẽ được hiển thị ở đây -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        // Xử lý gửi form bằng AJAX
        $('#editProductForm').on('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(this);
            $.ajax({
                url: 'editSanPham.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    var res = JSON.parse(response);
                    if (res.status === 'success') {
                        $('#successMessage').text(res.message);
                        $('#successModal').modal('show');

                        // Cập nhật dữ liệu trên trang mà không cần tải lại
                        $('#tenSanPham').val(res.data.tenSanPham);
                        $('#gia').val(res.data.gia);
                        $('#loaiSanPham').val(res.data.loaiSanPham);
                        $('#kichThuoc').val(res.data.kichThuoc);
                        $('#chatLieu').val(res.data.chatLieu);
                        $('#chatLieuDayDeo').val(res.data.chatLieuDayDeo);
                        $('#kieuKhoa').val(res.data.kieuKhoa);
                        $('#soNgan').val(res.data.soNgan);
                        $('#kichCo').val(res.data.kichCo);
                        $('#phuHopSuDung').val(res.data.phuHopSuDung);
                        if (res.data.hinhAnh) {
                            $('#preview').attr('src', res.data.hinhAnh);
                        }
                    } else {
                        alert(res.message);
                    }
                }
            });
        });

        // Hiển thị ảnh xem trước khi chọn tệp
        function previewImage(event) {
            var reader = new FileReader();
            reader.onload = function(){
                var output = document.getElementById('preview');
                output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    </script>
</body>
</html>