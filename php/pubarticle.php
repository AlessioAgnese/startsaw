<?php
include_once('dbconfig.php');
include_once('tokenizer.php');
global $conn;
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$array=getUser($json["token"]);
$autore=implode(" ",$array["utente"]);
$insert = $conn->prepare("INSERT INTO Articoli(Testo,User)VALUES(:testo,:autore)");
$insert->bindParam(":testo", $json["articolo"]);
$insert->bindParam(":autore",$autore);
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
