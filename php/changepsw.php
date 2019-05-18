<?php
//NESSUN TEST PER MANCANZA FORM
session_start();
require '.\dbconfig.php';
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$pwd = mysqli_real_escape_string($link, $json["oldpwd"]);
$name = $_SESSION["utente"];
$query = "SELECT psw FROM utenti WHERE user = '$name'";
$result = mysqli_query($link, $query);
$row = mysqli_fetch_row($result);
if (password_verify($pwd, $row[1])) {
    $passwordHashed = password_hash($json["newpwd"], PASSWORD_BCRYPT);
    $query = "UPDATE Utenti SET psw = '$passwordHashed' WHERE User = '$name'";
    if (mysqli_query($link, $query)) {
        $array = array(
            "ok" => true
        );
        echo json_encode($array);
    } else {
        $array = array(
            "ok" => false,
            "error"=> 1
        );
        echo json_encode($array);
    }
} else {
    $array = array(
        "ok" => false,
        "error"=> 2
    );
    echo json_encode($array);
}
