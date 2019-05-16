
      <?php  

// richiamo il file di configurazione
require 'dbconfig.php';
$name=mysqli_real_escape_string($link,$_POST ["username2"]) ;
   //$query="SELECT psw FROM utenti WHERE user=:num;";
   $query = "SELECT user,psw FROM utenti WHERE user = '$name'";
   //$query->bindValue(':num',$name);
   $result=mysqli_query($link,$query);
   $row=mysqli_fetch_row($result);  
   if (password_verify($_POST["psw2"], $row[1])) 
    {$_SESSION["utente"]=$row[0];
        echo "<script type='text/javascript'>alert('Login eseguito correttamente');</script>";
        sleep(4);
        header('Location: ../index.php');
        //header('Refresh: 0; URL=../index.php');    
    }
    
    else
    {   echo "<script type='text/javascript'>alert('Username o password errati');</script>";
        header('Refresh: 0; URL=../index.php');    
    } 
?>
		
