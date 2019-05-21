<?php
session_start();
require '.\dbconfig.php';
$_SESSION["utente"]='Alessio';
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$articolo = mysqli_real_escape_string($link, $json["articolo"]);
$autore=$_SESSION["utente"];
$query = "INSERT INTO articoli (Testo,User) VALUES ('$articolo','$autore')";
if (mysqli_query($link, $query)) {
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
