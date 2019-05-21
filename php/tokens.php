<?php
    
    function createToken($array){
        //require './dbconfig.php';
        $date = new date('Y-m-d');
        $array["utente"] = $date;
        $json = json_encode($array);
        $json = sha1($json);
        return $json;
    }
    
    function checkAuth($token){
        require './dbconfig.php';
        $query="SELECT * FROM Utenti WHERE AuthToken = '$token'";
        $result=mysqli_query($link, $query);
        $row = mysqli_fetch_row($result);
        $username = $row[0];
        return $username;
    }
