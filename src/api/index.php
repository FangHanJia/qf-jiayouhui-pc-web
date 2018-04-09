<?php
    // 引入文件
    require('connect.php');

    // 获取前端的数据
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    // 获取countDown类型的所有数据
    $sql_cd = "select * from index_countDown";
    $sql_hot = "select * from index_hot";
    $sql_floor = "select * from index_floor";
    // 测试是否连接成功
    if($conn){
        
        $result_cd = $conn->query($sql_cd);
        $res_cd = $result_cd->fetch_all(MYSQLI_ASSOC);

        $result_h = $conn->query($sql_hot);
        $res_h = $result_h->fetch_all(MYSQLI_ASSOC);

        $result_f = $conn->query($sql_floor);
        $res_f = $result_f->fetch_all(MYSQLI_ASSOC);

        // 关闭
        $result_cd->close();
        $conn->close();

        // 组成一个数组
        $arr = array("cd"=>$res_cd,"h"=>$res_h,"f"=>$res_f);
        // 转为json字符串
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
?>