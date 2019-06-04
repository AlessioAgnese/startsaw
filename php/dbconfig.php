<?php
    $dsn = 'mysql:host=localhost;dbname=S4366276';
    //$username = 'S4366276';
    //$password = 'Saw*42';
    $username = 'root';
    $password = '';
        
try {
    $conn = new PDO($dsn, $username, $password);
}
catch( PDOException $Exception ) {
    throw new MyDatabaseException( $Exception->getMessage( ) , $Exception->getCode( ) );
}
/*
    Per connessione server unige(non funzionante)
    $dsn = 'mysql:host="localhost";dbname=S4396998';
    $username = 'S4396998';
    $password = '85aWs#9vp#';
    $conn = new PDO($dsn, $username, $password);
*/
?>
