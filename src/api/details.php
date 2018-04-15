<?php
    require('connect.php');
    //获取前端发来的数据
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $id = isset($_GET['id']) ? $_GET['id'] :  null;

    if($type && $id){
        $sql = "select * from $type where id >= '$id' limit 0,5";
        $result  =$conn->query($sql);
        $res = $result->fetch_all(MYSQL_ASSOC);
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }
   
?>