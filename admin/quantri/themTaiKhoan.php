<?php 
require('includes/header.php');

?>
<div class="container">

<div class="card o-hidden border-0 shadow-lg my-5">
    <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
            <div class="col-lg-12">
                <div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Thêm tài khoản</h1>
                    </div>
                    <form class="user" method="post" action="addUser.php">
                        <div class="form-group">
                            <label class="form-label">Tài Khoản: </label>
                            <input type="text" class="form-control form-control-user"
                                   id="taiKhoan" name="taiKhoan" placeholder="Tên tài khoản">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Họ và Tên: </label>
                            <input type="text" class="form-control form-control-user"
                                   id="hoTen" name="hoTen" placeholder="Họ và tên">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Số Điện Thoại: </label>
                            <input type="text" class="form-control form-control-user"
                                   id="soDienThoai" name="soDienThoai" placeholder="Số điện thoại">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Địa Chỉ: </label>
                            <input type="text" class="form-control form-control-user"
                                   id="diaChi" name="diaChi" placeholder="Địa chỉ">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email: </label>
                            <input type="email" class="form-control form-control-user"
                                   id="email" name="email" placeholder="Email">
                        </div>
                        <button type="submit" class="btn btn-primary btn-user btn-block">
                            Tạo mới
                        </button>
                    </form>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</div>

</div>
<?php 
require('includes/footer.php')
?>