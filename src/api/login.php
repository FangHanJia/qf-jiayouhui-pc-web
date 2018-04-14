<?php
    // 连接数据库
    require('connect.php');

    // 接收前端数据
    $phone = isset($_GET['phone']) ? $_GET['phone'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $loginstatus = isset($_GET['loginstatus']) ? $_GET['loginstatus'] : null;
    $getStatus = isset($_GET['getStatus']) ? $_GET['getStatus'] : null;


    // 将密码加密位md5进行验证
    $password = md5($password);
    $sql = "select * from user where phone='$phone' and password='$password'";
    $resulet=$conn->query($sql);

    if($resulet->num_rows>0){
        //当用户验证成功时,状态改为online/offline 
        $sql_status = "update user set loginstatus ='$loginstatus' where phone='$phone'";
        $result_status = $conn->query($sql_status);
        if($result_status){
            echo 'success';
        }
    }else if($getStatus ==null){
        return;
    }else if($getStatus == 'online'){
        $sql_get = "select * from user where loginstatus='$getStatus'";
        $result_get = $conn->query($sql_get);
        $res = $result_get->fetch_all(MYSQLI_ASSOC);

        echo json_encode($res);
    }else if($getStatus == 'offline'){
        $sql_off = "update user set loginstatus ='$getStatus' where phone='$phone'";
        $result_off = $conn->query($sql_off);
        if($result_off){
            echo 'success';
        }
    }else{
        echo 'fail';
    }
    




   
    
?>