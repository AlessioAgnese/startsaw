<?php
include_once('dbconfig.php');
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getImg();
        break;
    case 'POST':
        sendImg();
        break;
} 

function getImg(){
global $conn;
$headers = apache_request_headers();
$token = $headers["X-Authentication"];
$select=$conn->prepare("SELECT Avatar FROM Utenti WHERE token=:token");
$select->bindValue(":token",$token);
$select->execute();
if($select){
    $res=$select->fetch(PDO::FETCH_ASSOC);
    $array=array();
    if($res["Avatar"] != null){
        $dataUrl = 'data:image; base64,'.base64_encode($res["Avatar"]);
        $array = array("ok" => true, "dataUrl" => $dataUrl,);
    }else{
        $array=array("ok" => true,"dataUrl" => null);
    }
    echo json_encode($array);
    
}else{
    $array = array("ok" => false);
    echo json_encode($array);}
}

function sendImg(){
global $conn;
$fileContent = file_get_contents($_FILES['fileI']['tmp_name']);
$update=$conn->prepare("UPDATE Utenti SET Avatar = :fileI WHERE Token=:token");
$update->bindParam(":fileI",$fileContent);
$update->bindParam(":token",$_REQUEST['token']);
$update->execute();
}
?>