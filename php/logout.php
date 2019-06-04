<?php
    include_once('dbconfig.php');
    global $conn;
    $content = file_get_contents('php://input');
    $json = json_decode($content,true);
    $update = $conn->prepare("UPDATE utenti SET token='logout' WHERE token = :token");
    $update->bindParam(":token",$json["token"]);
    $update->execute();
    if($update){
        $array = array(
            "ok" => true,
        );
        echo json_encode($array);
    }else{
        $array = array(
            "ok" => false,
    );
    echo json_encode($array);
    }
?>