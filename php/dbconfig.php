<?php
    $dsn = 'mysql:host=localhost;dbname=blog';
    $username = 'root';
    $password = '';
        
try {
    $conn = new PDO($dsn, $username, $password); // PDO Driver DSN. Throws A PDOException.
}
catch( PDOException $Exception ) {
    throw new MyDatabaseException( $Exception->getMessage( ) , $Exception->getCode( ) );
    /*$array = array(
        "ok"=>false,
        "message"=>$Exception->getMessage(),
        "code"=>(int)$Exception->getCode());
    echo json_encode($array);*/
}
/*
    Per connessione server unige(non funzionante)
    $dsn = 'mysql:host="localhost";dbname=S4396998';
    $username = 'S4396998';
    $password = '85aWs#9vp#';
    $conn = new PDO($dsn, $username, $password);
*/
?>
