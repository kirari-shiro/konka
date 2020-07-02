<?php

    include('./conn.php');

    $username=$_REQUEST['username'];
    $password=$_REQUEST['password'];

    $sql="select * from user where user_name='$username' and password='$password'";
    $res=$mysqli->query($sql);
    $mysqli->close();
    if($res->num_rows>0){
        echo "
            alert('登陆成功');
            if($('.auto').prop('checked')){
                localStorage.setItem('user',JSON.stringify({user:'$username',password:'$password'}));
            }else{
                sessionStorage.setItem('user',JSON.stringify({user:'$username',password:'$password'}));
            }
            location.href='./index.html';
            
        ";
    } else {
        echo '
            alert("用户名或者密码错误");
            location.href="./login.html";
        ';
    };
?>

