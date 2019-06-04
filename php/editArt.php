<?php
include_once("dbconfig.php");
global $conn;
$content = file_get_contents('php://input');
$json = json_decode($content,true);
        $update = $conn->prepare("UPDATE articoli SET Testo=:testo WHERE Id_A=:id");
        $update->bindParam(":id",$json["id"]);
        $update->bindParam(":testo",$json["articolo"]);
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
            echo json_encode($array);}
        ?>