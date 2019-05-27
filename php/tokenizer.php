<?php
    include_once('dbconfig.php');
    global $conn;

    function genToken($utente){
        global $conn;
        $date = date('Y-m-d');
        $utente["date"]=$date;
        $json = sha1(json_encode($utente));
        $insert = $conn->prepare("UPDATE Utenti SET token = :token WHERE User = :user");
        $insert->bindParam(":token",$json);
        $insert->bindParam(":user",$utente["user"]);
        $insert->execute();
        if($insert){
            $ar = array(
                "ok"=>true,
                "token"=>$json,
                "user"=>$utente
            );
            return json_encode($ar);
        }
        else{
            $ar = array(
                "ok"=>false
            );
            return json_encode($ar);
        }
    }

    function getUser($token){
        global $conn;
        $user = $conn->prepare("SELECT User,Id_R FROM Utenti WHERE token =:token");
        $user->execute(array(":token"=>$token));
        if($user){
            $result=$user->fetch(PDO::FETCH_ASSOC);
            $array = array(
                "ok"=>true,
                "utente"=>$result["User"],
                "perm"=>$result["Id_R"]
            );
            return $array;
        }
        else{
            $array = array(
                "ok"=>false
            );
            return $array;
        }
    }

?> 