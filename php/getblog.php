<?php
include_once('dbconfig.php');
global $conn;
$select = $conn->prepare("SELECT * FROM Articoli ORDER BY Data DESC");
$select->execute();
if($select){
    $rows = $select->fetchAll(PDO::FETCH_ASSOC);
    $array=array("ok"=>true,"rows"=>$rows); 
    echo json_encode($array);       
}else{
    $array=array("ok"=>false);
    echo json_encode($array);}    
?>  