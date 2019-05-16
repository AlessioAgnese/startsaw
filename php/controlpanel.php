<html><head>
</head>

<body>
 
<form action="user.php" id="login" method="POST">

<div class="container">

<?php 
session_start();
                                        // richiamo il file di configurazione
                                        require 'config.php';
                                        // richiamo lo script responsabile della connessione a MySQL
                                        require 'connect.php';
                                        
                                        $name= $_SESSION["utente"];
                                        $sql = "SELECT ddn,nome FROM utenti WHERE user = '$name'";
                                        $query = mysqli_query($link,$sql);
                                        $row = mysqli_fetch_row($query);
                                        echo '<input type="text" placeholder="'.$row[0].'" name="username2">';
                                        echo '<input type="text" placeholder="'.$row[1].'" name="username2">';
                                        echo '/n<a href="./changepassword.php">Cambia la password</a>';
                                        ?>
</div>
</form>