<?php
    require '..\dbconfig.php';
    $data = file_get_contents('php://input');
    $json = json_decode($data,true);
    $name=mysqli_real_escape_string($link,$json["username"]) ;
   //$query="SELECT psw FROM utenti WHERE user=:num;";
   $query = "SELECT user,psw FROM utenti WHERE user = '$name'";
   //$query->bindValue(':num',$name);
   $result=mysqli_query($link,$query);
   $row=mysqli_fetch_row($result);  
   if (password_verify($json["pwd"], $row[1])) 
    {$_SESSION["utente"]=$row[0];
       $array = array(
           "ok"=>true,
           "username"=>$row[0]
       );
       echo json_encode($array);
        //header('Refresh: 0; URL=../index.php');    
    }
    
    else
    {  
        $array = array(
            "ok"=>false
        );
        echo json_encode($array);
    } 
?>