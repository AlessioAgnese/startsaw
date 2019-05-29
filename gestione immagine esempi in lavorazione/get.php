<?php
$dsn = 'mysql:host=localhost;dbname=test';
$username = 'root';
$password = '';
$conn = new PDO($dsn, $username, $password);
$select=$conn->prepare("SELECT * FROM Img ORDER BY id DESC");
$select->execute();
if($select){
    $rows=$select->fetchAll(PDO::FETCH_ASSOC);
    $array = array("ok" => true, "rows"=>$rows);
    echo json_encode($array);
}else{
    $array = array("ok" => false);
    echo json_encode($array);
}

        ?>