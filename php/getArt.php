<?php
include_once("dbconfig.php");
global $conn;
$content = file_get_contents('php://input');
$json = json_decode($content,true);
        $select = $conn->prepare("SELECT Testo FROM articoli WHERE Id_A=:id");
        $select->bindParam(":id",$json["id"]);
        $select->execute();
        if($select){
            $result = $select->fetch(PDO::FETCH_ASSOC);
            $array = array(
                "ok" => true,
                "testo"=>$result["Testo"],
            );
            echo json_encode($array);
        }else{
            $array = array(
                "ok" => false,
            );
            echo json_encode($array);}
        ?>