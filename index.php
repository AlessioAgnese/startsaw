<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">

    <title>
        Progetto SAW
    </title>
    <link rel="stylesheet" type="text/css" href="./css/style.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"> </script>
    <script>
        //funzione per il menu burger
        $(document).ready(function() {
            $(".navbar-burger").click(function() {
                $(".navbar-burger,#navbarBasicExample").toggleClass("is-active");
            });
        });
        //funzione per il menu dropdown l
        $(document).ready(function() {
            $(".navbar-link").click(function() {
                $("#navbar-menu").toggleClass("is-active");
            });
        });
        //funzione per il menu modal(show),e per resettare i campi del form una volta chiusa la "card"
        $(document).ready(function() {
            $(".delete,#loginRegisterButton,.modal-background").click(function() {
                $(".modal").toggleClass("is-active");
                $("[name='registerUser'],[name='loginUser']").trigger("reset");
                $("#errorUser,#errorMail").css("visibility", "hidden");
                $("[name='username'],[name='email']").removeClass("is-danger");

            });
        });
        //controllo che l'input nel campo utente non contenga caratteri vietati
        $(document).ready(function() {
            $("[name='username']").keyup(function() {
                var regexUser = /^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$/;
                if (document.forms["registerUser"]["username"].value.match(regexUser) == null) {
                    $("#errorUser").css("visibility", "visible");
                    $("[name='username']").addClass("is-danger");
                } else {
                    $("#errorUser").css("visibility", "hidden");
                    $("[name='username']").removeClass("is-danger");
                }

            });
        });
        $(document).ready(function() {
            $("[name='email']").keyup(function() {
                var regexMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
                if (document.forms["registerUser"]["email"].value.match(regexMail) == null) {
                    $("#errorMail").css("visibility", "visible");
                    $("[name='email']").addClass("is-danger");
                } else {
                    $("#errorMail").css("visibility", "hidden");
                    $("[name='email']").removeClass("is-danger");
                }

            });
        });
        $(document).ready(function() {
            $("[name='psw']").keyup(function() {
                var regexMail = /[a-z0-9._%+-]+$/;
                if (document.forms["registerUser"]["email"].value.match(regexMail) == null) {
                    $("#errorMail").css("visibility", "visible");
                    $("[name='email']").addClass("is-danger");
                } else {
                    $("#errorMail").css("visibility", "hidden");
                    $("[name='email']").removeClass("is-danger");
                }

            });
        });
    </script>

    <script type="text/javascript" language="javascript">
    </script>
</head>

<body>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card ">
            <header class="modal-card-head">
                <p class="modal-card-title">Log in</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="tile is-ancestor ">
                    <div class="tile  is-parent is-vertical">
                        <div class="field">
                            <label class="label">Username</label>
                            <p class="control has-icons-left has-icons-right">
                                <input class="input" type="text" id="usernameL" placeholder="Nome Utente">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <p class="control has-icons-left">
                                <input class="input" type="password" id="pwdL" placeholder="Password">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <br>
                        <button class="button is-warning " id="submitlogin">
                            Login
                        </button>
                    </div>
                    <div class="tile is-parent is-vertical">

                        <div class="field">
                            <label class="label">Username</label>
                            <p class="control has-icons-left has-icons-right">
                                <input id="usernameR" class="input" type="text" placeholder="Nome Utente" pattern="^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$" required>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>
                                <label class="label" id=name_response></label>
                            </p>
                            <p id="errorUser" class="is-size-7 has-text-danger" style="visibility: hidden">Caratteri non ammessi
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Email</label>
                            <p class="control has-icons-left has-icons-right">
                                <input id="email" class="input" type="email" placeholder="esempio@domain.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                                <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                </span>

                            </p>
                            <p id="errorMail" class="is-size-7 has-text-danger" style="visibility: hidden">Non rispetta le
                                caratteristiche della Email
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <p class="control has-icons-left">
                                <input id=pwdR class="input" type="password" placeholder="Password" title="Deve contenere almeno un numero ,una lettera minuscola , una maiuscola ed un simbolo e la lunghezza deve essere almeno di 8 caratteri " path="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>

                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Ripeti Password</label>
                            <p class="control has-icons-left">
                                <input name="rePsw" class="input" type="password" placeholder="Password" title="Deve essere uguale alla password inserita precedentemente" path="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </p>
                            <div class="checkPswField" style="visibility: block ;text-align:justify">
                                <h3>La password deve contenere:</h3>
                                <p id="upLetter" class="is-size-7 has-text-danger">1 Lettera maiuscola</p>
                                <p id="lowLetter" class="is-size-7 has-text-danger">1 Lettera minuscola</p>
                                <p id="symbol" class="is-size-7 has-text-danger">1 Simbolo</p>
                                <p id="length" class="is-size-7 has-text-danger">Minimo 8 caratteri</p>
                            </div>
                        </div>
                        <br>
                        <button class="button is-danger " id="submitRegister">
                            Registrati
                        </button>

                    </div>
                </div>
            </section>
            <footer class="modal-card-foot ">
            </footer>
        </div>
    </div>

    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">
                <img src="./img/logo.png" width="30" height="28">
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            <button style="display: none" class="button"><i class="fas fa-times"></i></button>

        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item">
                    Home
                </a>

                <a class="navbar-item">
                    Documentation
                </a>

                <div id="navbar-menu" class="navbar-item has-dropdown">
                    <a class="navbar-link">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            About
                        </a>
                        <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a id="loginRegisterButton" class="button is-warning is-outlined">
                            <strong id="userLogged">Log in/Registrati</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <h1 class="title">Titolo</h1>
    <footer class="footer">
        <div class="content has-text-centered has-text-white">
            <p>
                <strong class="has-text-warning">&copy 2019 Saw</strong> by Simone Risso & Alessio Agnese.
            </p>
        </div>
    </footer>
</body>

<script>
    $(document).ready(function() {
        $('#submitlogin').click(function() {

            $.ajax({
                url: 'http://localhost/php/function/login.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    username: $('#usernameL').val(),
                    pwd: $('#pwdL').val()
                }),
                success: function(data) {
                    if (data.ok == true) {
                        $('#userLogged').text(data.username);
                        $('.modal').removeClass("is-active");
                    } else {
                        alert("email or password wrong");
                    }
                }
            })
        })
    })

    $(document).ready(function() {
        $('#submitRegister').click(function() {
            $.ajax({
                url: 'http://localhost/php/function/register.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    username: $('#usernameR').val(),
                    pwd: $('#pwdR').val(),
                    email: $('#email').val()
                }),
                success: function(data) {
                    if (data.ok == true) {
                        $('#submitRegister').text('Registrato con successo');
                        $('#submitRegister').attr("disabled", true);
                    } else {
                        alert("Registrazione fallita");
                    }
                }
            })
        })
    })

    $(document).ready(function() {

        $("#usernameR").keyup(function() {
            var name = $("#usernameR").val()
            if (name != '') {
                $("#name_response").show();
                
                $.ajax({
                    url: 'http://localhost/php/function/checkusr.php',
                    type: 'post',
                    data: JSON.stringify({
                        username: $('#usernameR').val(),
                    }),
                    
                    success: function(response) {
                        if (response > 0) {
                            $("#name_response").text("Username gia in uso");
                            $('#submitRegister').attr("disabled", true);
                        } else {
                            $("#name_response").text("Username disponibile");
                            $('#submitRegister').attr("disabled", false);
                        }

                    }
                });
            } else {
                $("#name_response").hide();
                $('#submitRegister').attr("disabled", false);
            }

        });

    });
</script>

</html>