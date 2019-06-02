<?php
include_once('dbconfig.php');
include_once('tokenizer.php');
global $conn;
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$array=getUser($json["token"]);
$insert = $conn->prepare("INSERT INTO Articoli(Testo,User)VALUES(:testo,:autore)");
$insert->bindParam(":testo", $json["articolo"]);
$insert->bindParam(":autore",$array["utente"]);
$insert->execute();
$select = $conn->prepare("SELECT Id_A,Data FROM Articoli WHERE User=:user ORDER BY Data DESC LIMIT 1");
$select->bindParam(":user",$array["utente"]);
$select->execute();
if ($insert&&$select) {
	$res=$select->fetch(PDO::FETCH_ASSOC);
	$array = array(
		"ok" => true,
		"id" => $res["Id_A"]
	);
	echo json_encode($array);
} else {
	$array = array(
		"ok" => false
	);
	echo json_encode($array);
}
?>
