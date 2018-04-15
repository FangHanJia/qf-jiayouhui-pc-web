<?php
    // 验证用户的有效性
     // 连接数据库
    require('connect.php');

    // 前端数据
    $type     = isset($_GET['type'])? $_GET['type'] : null;
    $phone     = isset($_GET['phone'])? $_GET['phone'] : null;
    $password = isset($_GET['password'])? $_GET['password'] : null;
    $loginstatus = isset($_GET['loginstatus'])? $_GET['loginstatus'] : null;


    // 验证用户的有效性
    // 查询数据库是否存在
    $sql = "select phone from user where phone='$phone'";
    // 查询返回结果集
    $result = $conn->query($sql);
    // 结果集返回布尔值：num_rows--》是否存在
    if($result->num_rows>0 ){
        echo 'fail';
    }else{
        // 用户名验证成功
        if($type == 'reg'){
            // 加密密码
            $password = md5($password);
            $sql = "insert into user (phone,password,loginstatus) values('$phone','$password','$loginstatus')";
            if($conn->query($sql)){
                // 为每一个用户创建一个购物表
                $table_name = 'user_'.$phone;
                $sql_table = "CREATE TABLE $table_name(
                                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                                guid VARCHAR(20) NOT NULL,
                                imgurl VARCHAR(30) NOT NULL,
                                ourprice VARCHAR(10),
                                des VARCHAR(30) NOT NULL,
                                qty VARCHAR(20),
                                reg_date TIMESTAMP
                            )";
                // 创建表格
                if($conn->query($sql_table)){
                    echo 'success';
                }
            }else{
                echo 'fail';
            }
        }else{
            echo 'success';
        }
    }
?>