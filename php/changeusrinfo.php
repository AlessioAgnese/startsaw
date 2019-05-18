<?php
//NESSUN TEST PER MANCANZA FORM
session_start();
require '.\dbconfig.php';
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$nome = mysqli_real_escape_string($link, $json["nome"]);
$cognome = mysqli_real_escape_string($link, $json["cognome"]);
$residenza = mysqli_real_escape_string($link, $json["residenza"]);
$bio = mysqli_real_escape_string($link, $json["biografia"]);
$name=$name = $_SESSION["utente"];
$query = "UPDATE Utenti SET Nome='$nome',cognome='$cognome',Residenza='$residenza',Biografia='$bio', WHERE User = '$name'";
if (mysqli_query($link, $query)) {
    $array = array(
        "ok" => true
    );
    echo json_encode($array);
} else {
    $array = array(
        "ok" => false,
    );
    echo json_encode($array);
}