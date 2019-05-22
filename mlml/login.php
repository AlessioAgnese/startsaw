<?php
    include_once('functions/dbconfig.php');
    include_once('functions/tokenizer.php');
    global $conn;
    $content = file_get_contents('php://input');
    $json = json_decode($content,true);
    $select = $conn->prepare("SELECT * FROM Utenti WHERE User =:user");
    $select->execute(array(":user"=>$json["email"]));
    if($select){
        $user = $select->fetch(PDO::FETCH_ASSOC);
        if($user["User"] != null){
            if(password_verify($json["password"], $user["Psw"])){
                $array = array(
                    "user"=>$user["User"]
                );
                echo genToken($array);
            }
            else{
                $arr= array(
                    "ok"=>false
                );
                echo json_encode($arr);
            }
        }
        else{
            $arr= array(
                "ok"=>false
            );
            echo json_encode($arr);
        }
    }
    else{
        $arr= array(
            "ok"=>false
        );
        echo json_encode($arr);
    }


?>