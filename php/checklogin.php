<?php
    include_once('tokenizer.php');
    global $conn;
    $content = file_get_contents('php://input');
    $json = json_decode($content,true);
    $user = getUser($json["token"]);
    if($user["ok"]){
        echo json_encode($user);
    }
    else{
        $array = array(
            "ok"=>false
        );
        echo json_encode($array);
    }

?>