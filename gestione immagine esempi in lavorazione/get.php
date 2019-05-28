<?php
//MANCA ADATTAMENTO
$query ="SELECT * FROM Img ORDER BY id DESC";
    $result=mysqli_query($conn,$query);
    while($row=mysqli_fetch_array($result)){
        echo '<img src="data:image/jpeg;base64,'.base64_encode($row['tmp']).'">';
        //echo 'image?';  
    }
        ?>