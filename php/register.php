<?php
session_start();
require '.\dbconfig.php';
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$name = mysqli_real_escape_string($link, $json["username"]);
$mail = mysqli_real_escape_string($link, $json["email"]); //anti sql injection
//LA PASSWORD DEVE ESSERE >3 CARATTERI 
$passwordHashed = password_hash($json["pwd"], PASSWORD_BCRYPT);
$query = "INSERT INTO utenti (user,psw,mail,Id_R)
												VALUES ('$name','$passwordHashed','$mail','1')";
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
