<?php
include_once('dbconfig.php');
global $conn;
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$select = $conn->prepare("SELECT * FROM Articoli WHERE Testo LIKE :keyword");
$param = "%" . $json["text"] . "%";
$select->bindParam(":keyword",$param);
$select->execute();
if($select){
    $rows = $select->fetchAll(PDO::FETCH_ASSOC);
    $array = array("ok"=>true, "rows"=>$rows);
    echo json_encode($array);
}
else{
    $array = array("ok"=>false);
    echo json_encode($array);
}
?>

