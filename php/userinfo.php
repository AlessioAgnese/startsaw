<?php
    include_once('dbconfig.php');
    $headers = apache_request_headers();
    $type = $headers["X-Type"];
    $content = file_get_contents('php://input');
    $json = json_decode($content,true);
    if($type=='view') viewInfo($json["token"]);
    else editInfo($json);
    
    
    function viewInfo($token){
        global $conn;
        $select = $conn->prepare("SELECT Nome,Cognome,Residenza,Biografia FROM Utenti WHERE token=:token");
        $select->bindParam(":token",$token);
        $select->execute();
        if($select){
            $token = $select->fetch(PDO::FETCH_ASSOC);
            $array = array(
                "ok" => true,
                "nome"=>$token["Nome"],
                "cognome"=>$token["Cognome"],
                "residenza"=>$token["Residenza"],
                "biografia"=>$token["Biografia"],
            );
            echo json_encode($array);
        }else{
            $array = array(
                "ok" => true,
            );
            echo json_encode($array);
        }
    }

    function editInfo($json){
        global $conn;
        $update = $conn->prepare("UPDATE Utenti SET Nome =:nome,Cognome=:cognome,Residenza=:residenza,Biografia=:biografia WHERE token = :token");
        $update->bindParam(":token",$json["token"]);
        $update->bindParam(":nome",$json["nome"]);
        $update->bindParam(":cognome",$json["cognome"]);
        $update->bindParam(":residenza",$json["residenza"]);
        $update->bindParam(":biografia",$json["nome"]);
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
    }
