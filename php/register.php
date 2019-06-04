<?php
include_once('dbconfig.php');
include_once('tokenizer.php');
global $conn;
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$passwordHashed = password_hash($json["pwd"], PASSWORD_BCRYPT);
$insert = $conn->prepare("INSERT INTO utenti(User,Psw,Mail)VALUES(:nam,:psw,:mail)");
$insert->bindParam(":nam",$json["username"]);
$insert->bindParam(":psw",$passwordHashed);
$insert->bindParam(":mail",$json["email"]);
$insert->execute();
if ($insert){
	$array = array(
		"ok"=>true,
		"user"=>$json["username"],
	);
	echo genToken($json["username"]);
}else{
	$arr= array(
		"ok"=>false,
	);
	echo json_encode($arr);
}
?>
