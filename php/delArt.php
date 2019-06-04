<?php
include_once('dbconfig.php');
global $conn;
$data = file_get_contents('php://input');
$json = json_decode($data, true);
var_dump($json);
$delete = $conn->prepare("DELETE FROM articolo WHERE Id_A=:id");
$delete->bindParam(":id", $json["id"]);
$delete->execute();
$delete->debugDumpParams();
if ($delete) {
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