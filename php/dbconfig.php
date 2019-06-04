<?php
try {
    $dsn = 'mysql:host=localhost;dbname=S4366276';
    $username = 'S4366276';
    $password = 'Saw*42';
    $conn = new PDO($dsn, $username, $password);
} catch (PDOException $Exception) {
    try {
        $username = 'root';
        $password = '';
        $conn = new PDO($dsn, $username, $password);
    } catch (PDOException $Exception) {
        throw new MyDatabaseException($Exception->getMessage(), $Exception->getCode());
    }
}
?>