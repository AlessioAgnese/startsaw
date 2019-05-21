<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <title>
        Progetto SAW
    </title>
    <link rel="stylesheet" type="text/css" href="./CSS/style.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"> </script>
    <script type="text/javascript" language="javascript">
    </script>
</head>


<body>
<?php
session_start();
if (empty($_SESSION["utente"])) {$_SESSION["utente"] = "Guest";}
require './php/dbconfig.php';
$query = "SELECT * FROM articoli";
$result = mysqli_query($link, $query);
$numrow=mysqli_num_rows($result);
//$i=0;
while($row = mysqli_fetch_row($result)){
    echo $row[1];
    echo $row[2];
    echo $row[3];

    $array = array(
        "articles"=>array()
    );

    while($row = mysqli_fetch_row($result)){
        array_push($array["articles"],$row);
    }
    echo json_encode($array);

}
mysqli_close($link);
?>