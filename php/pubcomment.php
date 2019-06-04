<?php
include_once('dbconfig.php');
include_once('tokenizer.php');
global $conn;
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$array=getUser($json["token"]);
$insert = $conn->prepare("INSERT INTO commenti(Testo,Id_A,User)VALUES(:testo,:art,:autore)");
$insert->bindParam(":testo", $json["commento"]);
$insert->bindParam(":autore",$array["utente"]);
$insert->bindParam(":art",$json["id"]);
$insert->execute();
if ($insert) {
    $array = array(
		"ok" => true
	);
	echo json_encode($array);
} else {
	$array = array(
		"ok" => false
	);
	echo json_encode($array);
}
?>
