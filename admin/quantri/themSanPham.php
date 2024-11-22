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
                        <h1 class="h4 text-gray-900 mb-4">Thêm sản phẩm</h1>
                    </div>
                    <form class="user" method="post" action="addproduct.php"  enctype="multipart/form-data">
                        <div class="form-group">
                                <label class="form-lable">Tên sản Phẩm: </label>
                                 <input type="text" class="form-control form-control-user"
                                        id="tenSanPham" name="tenSanPham" aria-describedby="emailHelp"
                                                placeholder="Tên sản phẩm">
                        </div>
                        <div class="form-group row">
                                <div class="col-sm-4 mb-sm-0">
                                <label class="form-lable">Số lượng: </label>
                                <input type="number" class="form-control form-control-user"
                                         id="soLuong" name="soLuong" placeholder="Nhập số lượng sản phẩm">
                                </div>
                                <div class="col-sm-4 mb-sm-0">
                                        <label class="form-lable">Giá tiền: </label>
                                        <input type="number" class="form-control form-control-user"
                                         id="gia" name="gia" placeholder="Nhập giá tiền">
                                </div>
                                <div class="col-sm-4 mb-sm-0">
                                        <label class="form-lable">Loại sản phẩm: </label>
                                        <input type="text" class="form-control form-control-user"
                                         id="loaiSanPham" name="loaiSanPham" placeholder="Nhập loại sản phẩm">
                                </div>
                                
                        </div>
                        
                        <div class="form-group">
                                        <label class="form-lable">Kích thước sản phẩm: </label>
                                        <input type="text" class="form-control form-control-user"
                                         id="kichThuoc" name="kichThuoc" placeholder="Nhập kích thước">
                                </div>
                        <div class="form-group">
                                
                                        <label class="form-lable">Chất liệu sản phẩm: </label>
                                        <input type="text" class="form-control form-control-user"
                                         id="chatLieu" name="chatLieu" placeholder="Nhập chất liệu sản phẩm">
                                
                        </div>
                        <div class="form-group">
                                <label class="form-lable">Chất liệu dây đeo sản phẩm: </label>
                                <input type="text" class="form-control form-control-user"
                                         id="chatLieuDayDeo" name="chatLieuDayDeo" placeholder="Nhập chất liệu dây kéo của sản phẩm">
                        </div>
                        <div class="form-group row">
                                <div class="col-sm-4 mb-sm-0">
                                        <label class="form-lable">Kiểu khóa sản phẩm: </label>
                                        <input type="text" class="form-control form-control-user"
                                         id="kieuKhoa" name="kieuKhoa" placeholder="Nhập kiểu khóa sản phẩm">
                                </div>
                                <div class="col-sm-4 mb-sm-0">
                                        <label class="form-lable">Số ngăn sản phẩm: </label>
                                        <input type="text" class="form-control form-control-user"
                                         id="soNgan" name="soNgan" placeholder="Nhập số ngăn sản phẩm">
                                </div>
                                <div class="col-sm-4 mb-sm-0">
                                        <label class="form-lable">Kích cỡ sản phẩm: </label>
                                        <input type="text" class="form-control form-control-user"
                                         id="kichCo" name="kichCo" placeholder="Nhập kích cỡ sản phẩm">
                                </div>
                        </div>
                        
                                
                        <div class="form-group " >
                                <label class="form-lable">Phù hợp sử dụng cho: </label>
                                <input type="text" class="form-control "
                                id="phuHopSuDung" name="phuHopSuDung"
                                          placeholder="Mục đích sử dụng của sản phẩm">
                        </div>
                        <div class="form-group">
                                <label class="form-label">Hình ảnh: </label>
                                <input type="file" class="form-control" id="hinhAnh" name="hinhAnh">
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