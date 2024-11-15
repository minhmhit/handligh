<?php
include './db/connect.php'; // Kết nối tới cơ sở dữ liệu

if (isset($_POST['upload'])) {
    $errors = array();
    $file_name = $_FILES['hinhAnh']['name'];
    $file_tmp = $_FILES['hinhAnh']['tmp_name'];
    $file_ext = strtolower(end(explode('.', $file_name)));
    $extensions = array("jpeg", "jpg", "png");

    if (in_array($file_ext, $extensions) === false) {
        $errors[] = "Chỉ hỗ trợ upload file JPEG hoặc PNG.";
    }

    if (empty($errors) == true) {
        $target = "./images/" . basename($file_name);
        if (move_uploaded_file($file_tmp, $target)) {
            $sql = "INSERT INTO tuidathat (hinhAnh) VALUES ('$target')";
            if (mysqli_query($conn, $sql)) {
                echo "Đã upload thành công!";
            } else {
                echo "Lỗi: " . mysqli_error($conn);
            }
        } else {
            echo "Đã upload thất bại!";
        }
    } else {
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }
}
?>
