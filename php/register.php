<?php
include_once('../mlml/functions/dbconfig.php');
include_once('../mlml/functions/tokenizer.php');
global $conn;
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$passwordHashed = password_hash($json["pwd"], PASSWORD_BCRYPT);
$insert = $conn->prepare("INSERT INTO Utenti(User,Psw,Mail)VALUES(:nam,:psw,:mail)");
$insert->bindParam(":nam",$json["username"]);
$insert->bindParam(":psw",$passwordHashed);
$insert->bindParam(":mail",$json["email"]);
$insert->execute();
if ($insert){
	$array = array(
		"ok"=>true,
		"user"=>$json["username"],
	);
	echo genToken($array);
}else{
	$arr= array(
		"ok"=>false,
	);
	echo json_encode($arr);
}
?>
