<?php
     session_start();
     // richiamo il file di configurazione
     require 'config.php';
     // richiamo lo script responsabile della connessione a MySQL
     require 'connect.php'; 

function register() {

        $name= $_POST ["username"];
        $mail= $_POST["email"];
        //LA PASSWORD DEVE ESSERE >3 CARATTERI 
        $passwordHashed = password_hash($_POST["psw"], PASSWORD_BCRYPT);
        $query="INSERT INTO utenti (user,psw,mail,Id_R)
                VALUES ('$name','$passwordHashed','$mail','1');";
        $result=mysqli_query($link,$query);
        echo '<h1>Complimenti ti sei registrato,ti stiamo riportando alla home</h1>';
        header('Refresh: 1; URL=./index.php');}

 function login() {
                                  
    $name= $_POST ["username2"];
    $sql = "SELECT user,psw FROM utenti WHERE user = '$name'";
    $query = mysqli_query($link,$sql);
                                        $row = mysqli_fetch_row($query);
                                            if (password_verify($_POST["psw2"], $row[1])) 
                                            {$_SESSION["utente"]=$row[0];
                                                echo 'login eseguito correttamente,ti stiamo riportando alla home'; 
                                                header('Refresh: 0.5; URL=./index.php');}
                                            else
                                            {echo "Username o password scorretta,riprova"; 
                                                header('Refresh: 2; URL=./index.php');}

 }
 
function logout() {
                                            session_start();
                                            session_destroy();
                                            session_unset(); 
                                            header('Location: ./index.php');
                                         }
?>