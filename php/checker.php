<?php
    header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET,POST');
	header('Access-Control-Allow-Headers: Authorization, Content-Type' );
    include_once('dbconfig.php');
    $headers = apache_request_headers();
    $type = $headers["X-Type"];
    $content = file_get_contents('php://input');
    $json = json_decode($content,true);
    if($type=='mail') checkEmail($json["mail"]);
    else checkUser($json["username"]);
    
    
    
    function checkEmail($email){
        global $conn;
        $select = $conn->prepare("SELECT COUNT(*) as cou FROM Utenti WHERE Mail=:mail");
        $select->bindParam(":mail",$email);
        $select->execute();
        $mail = $select->fetch(PDO::FETCH_ASSOC);
        if($mail["cou"]>0){
            $array = array(
                "ok" => false,
            );
            echo json_encode($array);}
        else{
            $array = array(
                "ok" => true,
    
            );
            echo json_encode($array);
        }
    }

    function checkUser($user){
        global $conn;
        $select = $conn->prepare("SELECT COUNT(*) as cou FROM Utenti WHERE User=:nam");
        $select->bindParam(":nam",$user);
        $select->execute();
        $user = $select->fetch(PDO::FETCH_ASSOC);
        if($user["cou"]>0){
            $array = array(
                "ok" => false,
            );
            echo json_encode($array);}
        else{
        $array = array(
            "ok" => true,
    
        );
        echo json_encode($array);
        }
    }

?>