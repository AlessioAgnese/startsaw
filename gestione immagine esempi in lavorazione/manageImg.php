<?php
include_once('dbconfig.php');
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getImg();
        break;
    case 'POST':
        sendImg($_FILES['afile']['tmp_name']);
        break;
} 

function getImg(){
global $conn;
$select=$conn->prepare("SELECT tmp FROM img WHERE id=50");
$select->execute();
if($select){
    $res=$select->fetch(PDO::FETCH_ASSOC);
    $dataUrl = 'data:image; base64,' . base64_encode($res["tmp"]);
    $array = array("ok" => true, "dataUrl" => $dataUrl,);
    echo json_encode($array);
}else{
    $array = array("ok" => false);
    echo json_encode($array);}
}

function sendImg($filet){
global $conn;
$fileContent = file_get_contents($filet);
$update=$conn->prepare("UPDATE img SET tmp = :filet WHERE id=50");
$update->bindParam(":filet",$fileContent);
$update->execute();
}
?>