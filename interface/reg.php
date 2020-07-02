<?php

    include('./conn.php');

    $username=$_REQUEST['username'];
    $password=$_REQUEST['password'];



    $sql="select * from user where user_name='$username'";//查询用户名
    $res=$mysqli->query($sql);
    if($res->num_rows>0){
        echo '
            alert("用户名已经存在");
            location.href="./reg.html";
        ';
        die;
    };

    //添加数据
    
    $insertUser="insert into user (user_name,password) values ('$username','$password')";
    $res1=$mysqli->query($insertUser);
    $mysqli->close();
    

    //判断添加成功与否
    if($res1){
        echo '
        alert("注册成功");
        location.href="./login.html";
       ';
    }else{
        echo "
            alert('注册失败');
            location.href='./reg.html';
        ";
    };
?>