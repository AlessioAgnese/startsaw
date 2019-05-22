<?php
    include_once('dbconfig.php');
    include_once('tokenizer.php');
    global $conn;
    $content = file_get_contents('php://input');
    $json = json_decode($content,true);
    $select = $conn->prepare("SELECT User,Psw FROM Utenti WHERE User = :user");
    $select->bindParam(":user",$json["name"]);
    $select->execute();
    if($select){
        $user = $select->fetch(PDO::FETCH_ASSOC);
        if($user["User"] != null){
            if(password_verify($json["password"], $user["Psw"])){
                $array = array(
                    "user"=>$user["User"]
                    
                );
                echo genToken($array);
                exit();
            }
        }
    }
        $arr= array(
            "ok"=>false
        );
        echo json_encode($arr);
?>