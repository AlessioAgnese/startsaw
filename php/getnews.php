<?php
    include_once('dbconfig.php');
    $headers = apache_request_headers();
    $type = $headers["X-Type"];
    if($_SERVER['REQUEST_METHOD']=='POST'){
        $content = file_get_contents('php://input');
        $json = json_decode($content,true);
    }
    switch ($type) {
        case 'article':
            getArticle($json);
            break;
        case 'comments':
            getComments($json);
            break;  
        case 'blog':
            getBlog();
            break;    
        default:
            echo json_encode(array('ok'=>false));
            break;        
    } 
    function getArticle($json){
        global $conn;
        $select = $conn->prepare("SELECT Testo,Data,User FROM Articoli WHERE Id_A=:id");
        $select->bindParam(":id",$json["articolo"]);
        $select->execute();
        if($select){
            $result = $select->fetch(PDO::FETCH_ASSOC);
            $array = array(
                "ok" => true,
                "Testo"=>$result["Testo"],
                "Data"=>$result["Data"],
                "User"=>$result["User"],
            );
            echo json_encode($array);
        }else{
            $array = array(
                "ok" => false,
            );
            echo json_encode($array);
        }
    }
    function getComments($json){
        global $conn;
        $select = $conn->prepare("SELECT Testo,Data,User FROM Commenti WHERE Id_A=:id");
        $select->bindParam(":id",$json["articolo"]);
        $select->execute();
        if($select){
            $rows = $select->fetchAll(PDO::FETCH_ASSOC);
            $array = array("ok" => true, "rows"=>$rows);
            echo json_encode($array);
        }else{
            $array = array("ok" => false);
            echo json_encode($array);
        }
    }


    function getBlog(){
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
        }
    