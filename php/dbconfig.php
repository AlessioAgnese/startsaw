<?php
    $dsn = 'mysql:host=localhost;dbname=blog';
    $username = 'root';
    $password = '';
    $conn = new PDO($dsn, $username, $password);
/*
    Per connessione server unige(non funzionante)
    $dsn = 'mysql:host="localhost";dbname=S4396998';
    $username = 'S4396998';
    $password = '85aWs#9vp#';
    $conn = new PDO($dsn, $username, $password);
    */
?>
