<?php
    // 连接数据库
    require('connect.php');

    // 接收前端数据
    $phone = isset($_GET['phone']) ? $_GET['phone'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $loginstatus = isset($_GET['loginstatus']) ? $_GET['loginstatus'] : null;


    // 将密码加密位md5进行验证
    $password = md5($password);
    $sql = "select * from user where phone='$phone' and password='$password'";
    $resulet=$conn->query($sql);

    if($resulet->num_rows>0){
        //当用户验证成功时,状态改为online 
        $sql_status = "update user set loginstatus ='$loginstatus' where phone='$phone'";
        $result_status = $conn->query($sql_status);
        if($result_status){
            echo 'success';
        }
    }else {
        echo 'fail';
    }
?>