<?php
    require('connect.php');

    $phone = isset($_GET['phone']) ? $_GET['phone']:null;
    $table = 'user_'.$phone;
    
    if(!empty($_COOKIE['goodslist'])){
        // 转为数组
        $arr = json_decode($_COOKIE['goodslist']);

        foreach($arr as $obj){
            $guid = $obj->guid;
            $imgurl = $obj->imgurl;
            $ourprice = $obj->ourprice;
            $des = $obj->des;
            $qty = $obj->qty;

            $sql = "insert into $table(guid,imgurl,ourprice,des,qty) 
            values('$guid','$imgurl','$ourprice','$des','$qty')";
            $conn->query($sql);
            echo 'success';
        }
    }
?>