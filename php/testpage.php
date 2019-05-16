<html><head><title>IndexDiProva</title>
</head>

<body>
<?php  
					session_start();
          if(empty($_SESSION["utente"])){
          $_SESSION["utente"] = "Guest";}
						?>
<form id="register" action="register.php" method="POST" style="border:1px solid #ccc">
  <div class="container">
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>
    <label for="user"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" required>
    
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" name="psw-repeat" required>

    <div class="clearfix">
      <button type="button" class="cancelbtn">Cancel</button>
      <button type="submit" class="signupbtn" >Sign Up</button>
    </div>
  </div>
</form>

<form action="login.php" id="login" method="POST">

  <div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username2" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw2" required>

    <button type="submit">Login</button>
  </div>
</form>
<form action="logout.php" id="login" >
<button type="submit">Logout</button>
</form>
<?php  

          if($_SESSION["utente"] != "Guest"){
          echo '<a href="./controlpanel.php">Vai al pannello di controllo</a>';
          }
						?>

</body></html>
