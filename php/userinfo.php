<?php
    include_once('dbconfig.php');
    include_once('tokenizer.php');
    $headers = apache_request_headers();
    $type = $headers["X-Type"];
    if($_SERVER['REQUEST_METHOD']=='GET'){
        $token = $headers["X-Authentication"];
    }
    if($_SERVER['REQUEST_METHOD']=='POST'){
        $content = file_get_contents('php://input');
        $json = json_decode($content,true);
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
        case 'update':
            updateAvt($token);
            break;
        case 'delete':
            deleteAccount($token);
            break;        
        default:
            echo json_encode(array('ok'=>false));
            break;        
    } 
    
    function viewInfo($token){
        global $conn;
        if(strlen($token)<60) {$swap=getToken($token);
            $token=$swap["Token"];}
        $select = $conn->prepare("SELECT Nome,Cognome,Residenza,Biografia FROM utenti WHERE token=:token");
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
        $update = $conn->prepare("UPDATE utenti SET Nome =:nome,Cognome=:cognome,Residenza=:residenza,Biografia=:biografia WHERE token = :token");
        $update->bindParam(":token",$json["token"]);
        $update->bindParam(":nome",$json["nome"]);
        $update->bindParam(":cognome",$json["cognome"]);
        $update->bindParam(":residenza",$json["residenza"]);
        $update->bindParam(":biografia",$json["biografia"]);
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
        $select = $conn->prepare("SELECT Psw FROM utenti WHERE token=:token");
        $select->bindParam(":token",$json["token"]);
        $select->execute();
        if($select){
            $pwd=$select->fetch(PDO::FETCH_ASSOC);
            if(password_verify($json["oldPwd"],$pwd["Psw"])){
                $passwordHashed = password_hash($json["newPwd"], PASSWORD_BCRYPT);
                $update = $conn->prepare("UPDATE utenti SET Psw=:psw WHERE token = :token");
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

    function updateAvt($token){
        global $conn;
        $update = $conn->prepare("UPDATE utenti SET Avatar=null WHERE token=:token");
        $update->bindParam(":token",$token);
        $update->execute();
        if($update){
            $array = array("ok" => true,);
            echo json_encode($array);
        }else{
            $array = array("ok" => true,);
            echo json_encode($array);
        }
    }
    
    function deleteAccount($token){
        global $conn;
        $delete = $conn->prepare("DELETE FROM utenti WHERE token=:token");
        $delete->bindParam(":token",$token);
        $delete->execute();
        if($delete){
            $array = array("ok" => true,);
            echo json_encode($array);
        }else{
            $array = array("ok" => true,);
            echo json_encode($array);
        }
    }

    


    
