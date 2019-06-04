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
        case 'loadA':
            loadArticles($json);
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
        $select = $conn->prepare("SELECT Testo,Data,User,Avatar FROM Articoli NATURAL JOIN utenti WHERE Id_A=:id");
        $select->bindParam(":id",$json["articolo"]);
        $select->execute();
        if($select){
            $Avatar=null;
            $result = $select->fetch(PDO::FETCH_ASSOC);
            if($result["Avatar"] != null) $Avatar = 'data:image; base64,'.base64_encode($result["Avatar"]);
            $array = array(
                "ok" => true,
                "Testo"=>$result["Testo"],
                "Data"=>$result["Data"],
                "User"=>$result["User"],
                "Avatar"=>$Avatar,
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
        $select = $conn->prepare("SELECT Testo,Data,User,Avatar,Biografia FROM commenti NATURAL JOIN utenti WHERE Id_A=:id");
        $select->bindParam(":id",$json["articolo"]);
        $select->execute();
        if($select){
            $i=0;
            $user=null;
            while($tmp=$select->fetch(PDO::FETCH_NUM)){
                $testo[$i]=$tmp[0];
                $data[$i]=$tmp[1];
                $user[$i]=$tmp[2];
                $dataUrl[$i]='data:image; base64,'.base64_encode($tmp[3]);
                $bio[$i]=$tmp[4];
                $i++;
            }
            if($user==null){
                $array=array("ok"=>false);
                echo json_encode($array);
                exit();    
            }
            $array=array("ok"=>true,
                        "testo"=>$testo,
                        "data"=>$data,
                        "user"=>$user,
                        "avatar"=>$dataUrl,
                        "biografia"=>$bio);
            echo json_encode($array);     
        }else{
            $array = array("ok" => false);
            echo json_encode($array);
        }
    }

    function loadArticles($json){
        global $conn;
        $select = $conn->prepare("SELECT Id_A,Testo,Data,User,Avatar FROM Articoli NATURAL JOIN utenti WHERE Id_A<:id ORDER BY Data DESC LIMIT 6");
        $select->bindParam(":id",$json["idB"]);
        $select->execute();
        if($select){
            $i=0;
            $id=null;
            while($tmp=$select->fetch(PDO::FETCH_NUM)){
                $id[$i]=$tmp[0];
                $testo[$i]=$tmp[1];
                $data[$i]=$tmp[2];
                $user[$i]=$tmp[3];
                $dataUrl[$i]='data:image; base64,'.base64_encode($tmp[4]);
                $i++;
            }
            if($id==null){
                $array=array("ok"=>false);
                echo json_encode($array);
                exit();    
            }
            $array=array("ok"=>true,
                        "id"=>$id,
                        "testo"=>$testo,
                        "data"=>$data,
                        "user"=>$user,
                        "avatar"=>$dataUrl);
            echo json_encode($array);     
        }else{
            $array=array("ok"=>false);
            echo json_encode($array);    
        }
    }


    function getBlog(){
        global $conn;
        $select = $conn->prepare("SELECT Id_A,Testo,Data,User,Avatar FROM Articoli NATURAL JOIN utenti ORDER BY Data DESC LIMIT 6");
        $select->execute();
        if($select){
            $i=0;
            while($tmp=$select->fetch(PDO::FETCH_NUM)){
                $id[$i]=$tmp[0];
                $testo[$i]=$tmp[1];
                $data[$i]=$tmp[2];
                $user[$i]=$tmp[3];
                $dataUrl[$i]='data:image; base64,'.base64_encode($tmp[4]);
                $i++;
            }
            $array=array("ok"=>true,
                        "id"=>$id,
                        "testo"=>$testo,
                        "data"=>$data,
                        "user"=>$user,
                        "avatar"=>$dataUrl);
            echo json_encode($array);       
        }else{
            $array=array("ok"=>false);
            echo json_encode($array);
        }
    }
