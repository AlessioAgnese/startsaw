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
$idA = $_REQUEST['id'];
$idA = mysqli_real_escape_string($link,$idA);
$query="SELECT a.titolo,a.data,a.autoreArticolo,a.testo,i.link 
        FROM articoli 
        WHERE Id_A='$idA'";
        mysqli_close($link);