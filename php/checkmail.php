<?php
session_start();
require '.\dbconfig.php';
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$mail = mysqli_real_escape_string($link, $json["mail"]);
$query = "SELECT COUNT(*) FROM Utenti WHERE mail='$mail'";
$result = mysqli_query($link,$query);
$row = mysqli_fetch_row($result);

if($row[0]>0){
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
