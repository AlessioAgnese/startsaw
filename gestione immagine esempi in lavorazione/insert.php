<?php
$dsn = 'mysql:host=localhost;dbname=test';
$username = 'root';
$password = '';
$conn = new PDO($dsn, $username, $password);
    $file=addslashes(file_get_contents('php://input'));
    $json = json_decode($file, true);
    $insert=$conn->prepare("INSERT INTO img(tmp) VALUES (':file')");
    $insert->bindParam(":file",$json["img"]);
    $insert->execute();
    if($insert){
        $array = array(
            "ok"=>true,
        );
        echo json_encode($array);         
    }else{
        $array = array(
            "ok"=>false,
        );
        echo json_encode($array);   
    }

?>