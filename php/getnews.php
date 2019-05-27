<?php
    include_once('dbconfig.php');
    $headers = apache_request_headers();
    $type = $headers["X-Type"];
    $content = file_get_contents('php://input');
    $json = json_decode($content,true);
    switch ($type) {
        case 'article':
            getArticle($json);
            break;
        case 'comments':
            //editInfo($json);
            break;
        default:
            echo json_encode(array('ok'=>false));
            break;        
    } 
    function getArticle($json){
        global $conn;
        $select = $conn->prepare("SELECT Testo,Data,User FROM Articoli WHERE Id_A=:id");
        $select->bindParam(":id",$json["articolo"]);
        $select->execute();
        if($select){
            $result = $select->fetch(PDO::FETCH_ASSOC);
            $array = array(
                "ok" => true,
                "Testo"=>$result["Testo"],
                "Data"=>$result["Data"],
                "User"=>$result["User"],
            );
            echo json_encode($array);
        }else{
            $array = array(
                "ok" => false,
            );
            echo json_encode($array);
        }
    }
/*
    function getComments($json){
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
    */