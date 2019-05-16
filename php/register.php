<html><head>
</head>

<body>
<?php  
										session_start();
                                        // richiamo lo script responsabile della connessione a MySQL
                                        require 'dbconfig.php';

									    $name= mysqli_real_escape_string($link,$_POST ["username"]);
										$mail= mysqli_real_escape_string($link,$_POST["email"]);//anti sql injection
										//LA PASSWORD DEVE ESSERE >3 CARATTERI 
										$passwordHashed = password_hash($_POST["psw"], PASSWORD_BCRYPT);
										$query="INSERT INTO utenti (user,psw,mail,Id_R)
												VALUES ('$name','$passwordHashed','$mail','1')";
										
										
										if (mysqli_query($link, $query)) {
											echo '<h1>Complimenti ti sei registrato,ti stiamo riportando alla home</h1>';
											header('Refresh: 0.1; URL=../index.php');} 
									    else {
											echo "Error: " . $query . "<br>" . mysqli_error($link);
									  }
										
	
							?>
</body>
</html>        