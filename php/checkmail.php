<?php
include_once('dbconfig.php');
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$select = $conn->prepare("SELECT COUNT(*) as cou FROM Utenti WHERE Mail=:mail");
$select->bindParam(":mail",$json["mail"]);
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
