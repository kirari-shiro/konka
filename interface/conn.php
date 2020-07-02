<?php
    header('context-type:text/html;charset=utf-8');

    $mysql_conf=array(    //创建数据库配置，用于连接数据库
        'host'=>'localhost:3306',
        'db_user'=>'root',
        'db_password'=>'root',
        'db'=>'demo'

    );

    //连接/登录数据库
    $mysqli=new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_password']);
    if($mysqli->connect_errno){
        die('连接错误'.$mysqli->connect_errno);
    };

    $mysqli->query('set names utf8');//设置查询字符集

    $res=$mysqli->select_db($mysql_conf['db']);  //选择数据库,返回一个布尔值

    //判断数据库选择成功
    if(!$res){
        die('数据库连接错误'.$mysqli->error);
    }
?>
