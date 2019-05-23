<?php
    include_once('dbconfig.php');
    $headers = apache_request_headers();
    $type = $headers["X-Type"];
    $token = $headers["Authentication"];
    $content;
    $json;
    if($_REQUEST['type']=='POST'){
        $content = file_get_contents('php://input');
        $json = json_decode($content);
    }
    switch ($type) {
        case 'view':
            viewInfo($token);
            break;
        case 'edit':
            editInfo($json);
            break;
        case 'change':
            changePwd($json);
            break;
        default:
            echo json_encode(array('ok'=>false));
            break;        
    } 
    
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

    function changePwd($json){
        global $conn;
        $select = $conn->prepare("SELECT Psw FROM Utenti WHERE token=:token");
        $select->bindParam(":token",$json["token"]);
        $select->execute();
        if($select){
            $pwd=$select->fetch(PDO::FETCH_ASSOC);
            if(password_verify($json["oldPwd"],$pwd["Psw"])){
                $passwordHashed = password_hash($json["newPwd"], PASSWORD_BCRYPT);
                $update = $conn->prepare("UPDATE Utenti SET Psw=:psw WHERE token = :token");
                $update->bindParam(":token",$json["token"]);
                $update->bindParam(":psw",$passwordHashed);
                $update->execute();
                if($update){
                    $array = array(
                    "ok" => true,
                    );
                    echo json_encode($array);
                    exit();
                }
            }
        }
            $array = array(
                "ok" => false,
                );
                echo json_encode($array);
    }

    
