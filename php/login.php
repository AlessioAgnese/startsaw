<?php
session_start();
require '..\dbconfig.php';
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$name = mysqli_real_escape_string($link, $json["username"]);
$query = "SELECT user,psw FROM utenti WHERE user = '$name'";
$result = mysqli_query($link, $query);
$row = mysqli_fetch_row($result);
if (password_verify($json["pwd"], $row[1])) {
    $_SESSION["utente"] = $row[0];
    $array = array(
        "ok" => true,
        "username" => $row[0]
    );
    echo json_encode($array);
} else {
    $array = array(
        "ok" => false
    );
    echo json_encode($array);
}
?>