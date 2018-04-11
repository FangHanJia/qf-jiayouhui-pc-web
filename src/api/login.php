<?php
    // 连接数据库
    require('connect.php');

    // 接收前端数据
    $phone = isset($_GET['phone']) ? $_GET['phone'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;

    // 将密码加密位md5进行验证
    $password = md5($password);
    $sql = "select * from user where phone='$phone' and password='$password'";
    $resulet=$conn->query($sql);
    if($resulet->num_rows>0){
        echo 'success';
    }else {
        echo 'fail';
    }
?>