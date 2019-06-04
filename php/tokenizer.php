<?php
    include_once('dbconfig.php');
    global $conn;

    function genToken($utente){
        global $conn;
        $date = date('U = Y-m-d H:i:s');
        $array = array(
            "utente"=>$utente,
            "data"=>$date,
        );
        $json=password_hash(json_encode($array), PASSWORD_BCRYPT);
        $insert = $conn->prepare("UPDATE utenti SET token = :token WHERE User = :user");
        $insert->bindParam(":token",$json);
        $insert->bindParam(":user",$utente);
        $insert->execute();
        if($insert){
            $ar = array(
                "ok"=>true,
                "token"=>$json,
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
        $user = $conn->prepare("SELECT User,Id_R,token FROM utenti WHERE token =:token");
        $user->execute(array(":token"=>$token));
        if($user){
            $result=$user->fetch(PDO::FETCH_ASSOC);
            $array = array(
                "ok"=>true,
                "utente"=>$result["User"],
                "perm"=>$result["Id_R"],
                "token"=>$result["token"]
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
    function getToken($user){
        global $conn;
        $user=substr($user, 1);
        $select = $conn->prepare("SELECT Token FROM utenti WHERE User =:user");
        $select->bindParam(":user",$user);
        $select->execute();
        if($select){
            $res=$select->fetch(PDO::FETCH_ASSOC);
            return $res;
        }
        else{
            $array = array(
                "ok"=>false
            );
            return $array;
        }
    }

?> 