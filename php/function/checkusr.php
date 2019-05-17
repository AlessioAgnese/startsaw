<?php
session_start();
require '..\dbconfig.php';
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$name = mysqli_real_escape_string($link, $json["username"]);
$query = "SELECT COUNT(user) FROM Utenti WHERE user='$name'";//AS inDb
$result = mysqli_query($link,$query);
$row = mysqli_fetch_row($result);
//$count = $row['inDb'];
$array = array(
    "count" => $row[0],
);
echo json_encode($array);


?>