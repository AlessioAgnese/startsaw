<?php
include_once('dbconfig.php');
global $conn;
$select = $conn->prepare("SELECT * FROM Articoli ORDER BY DESC");
$select->execute();
if($select){
    $article = $select->fetch(PDO::FETCH_ASSOC);
    $array =array("ok"=>true);
            echo json_encode($array);       
}else{
    $array=array("ok"=>false);
    echo json_encode($array);}    
?>  