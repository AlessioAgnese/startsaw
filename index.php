<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <title>
        Progetto SAW
    </title>
    <link rel="stylesheet" type="text/css" href="./CSS/style.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"> </script>
    <script type="text/javascript" language="javascript">
    </script>
</head>


<body>
    <?php
session_start();
if (empty($_SESSION["utente"])) {
    $_SESSION["utente"] = "Guest";
    
}
echo $_SESSION["utente"];//a fini di test
?>
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
                        <form class="loginUser" action="javascript:void(0);">
                            <div class="field">
                                <label class="label">Username</label>
                                <p class="control has-icons-left has-icons-right">
                                    <input class="input" autocomplete="username" type="text" id="usernameL"
                                        placeholder="Nome Utente">
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
                                    <input class="input" autocomplete="current-password" type="password" id="pwdL"
                                        placeholder="Password">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <br>
                            <button class="button is-warning " id="submitlogin">
                                Login
                            </button>
                        </form>
                    </div>
                    <div class="tile is-parent is-vertical">
                        <form class="registerUser">
                            <div class="field">
                                <label class="label">Username</label>
                                <p class="control has-icons-left has-icons-right">
                                    <input id="usernameR" autocomplete="username" class="input is-loading" type="text"
                                        placeholder="Nome Utente" pattern="^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$"
                                        title="Deve contenere almeno un numero una lettera maiuscola una minuscola "
                                        required>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i id="statusU" style="display: none" class="fas"></i>
                                    </span>

                                </p>
                                <p id="errorUser" class="is-size-6 " style="visibility: hidden">

                                </p>
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <p class="control has-icons-left has-icons-right">
                                    <input id="email" autocomplete="email" class="input is-loading" type="email"
                                        placeholder="esempio@domain.com"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i id="statusE" style="display: none" class="fas"></i>
                                    </span>

                                </p>
                                <p id="errorMail" class="is-size-6" style="visibility: hidden">

                                </p>
                                <label id="email_response" style="visibility:hidden" class="label is-size-7"></label>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <p class="control has-icons-left">
                                    <input id=pwdR autocomplete="new-password" class="input" type="password"
                                        placeholder="Password"
                                        title="Deve contenere almeno un numero ,una lettera minuscola , una maiuscola ed un simbolo e la lunghezza deve essere almeno di 8 caratteri "
                                        path="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>

                                </p>
                            </div>
                            
                            
                            <div class="field">
                                <label class="label">Ripeti Password</label>
                                <p class="control has-icons-left">
                                    <input id="rePwdR" autocomplete="new-password" class="input" type="password"
                                        placeholder="Password"
                                        title="Deve essere uguale alla password inserita precedentemente"
                                        path="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" required>
                                    <span class="icon is-small is-left">
                                        <i id="statusP" style="visibility:hidden" class="fas fa-lock"></i>
                                    </span>
                                </p>
                                <label id="pwd_response" style="visibility:visible" class="label is-size-6"></label>
                                <button class="button is-danger " id="submitRegister" disabled="true">
                                    Registrati
                                </button>
                                <div class="checkPswField" style="visibility:hidden">
                                    <h3>La password deve contenere:</h3>
                                    <p class="has-text-danger">
                                        <span class="icon is-small is-left ">
                                            <i id="upLetterIcon" class="fas fa-times "></i>
                                        </span>
                                        <label id="upLetter" class="is-size-6 ">1 Lettera maiuscola</label>
                                    </p>
                                    <p class="has-text-danger">
                                        <span class="icon is-small is-left">
                                            <i id="lowLetterIcon" class="fas fa-times"></i>
                                        </span>
                                        <label id="lowLetter" class="is-size-6 ">1 Lettera minuscola</p>
                                    </p>
                                    <p class="has-text-danger">
                                        <span class="icon is-small is-left">
                                            <i id="numberIcon" class="fas fa-times "></i>
                                        </span>
                                        <label id="number" class="is-size-6 ">1 Numero</p>
                                    </p>
                                    <p class="has-text-danger">
                                        <span class="icon is-small is-left">
                                            <i id="lengthIcon" class="fas fa-times "></i>
                                        </span>
                                        <label id="length" class="is-size-6 ">Minimo 8 caratteri</p>
                                    </p>
                                </div>
                            </div>
                            
                        </form>
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

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                data-target="navbarBasicExample">
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
                            <strong id="userLogged">
                                    Log in/Registrati
                            </strong>
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
                <strong class="has-text-warning">&copy 2019 Saw</strong> by Alessio Agnese & Simone Risso.
            </p>
        </div>
    </footer>
</body>

<script>
    //funzione per il menu burger
    $(document).ready(function () {
        $(".navbar-burger").click(function () {
            $(".navbar-burger,#navbarBasicExample").toggleClass("is-active");
        });
    });
    //funzione per il menu dropdown l
    $(document).ready(function () {
        $(".navbar-link").click(function () {
            $("#navbar-menu").toggleClass("is-active");
        });
    });
    //funzione per il menu modal(show) e per resettare i campi del form una volta chiusa la "card"
    $(document).ready(function () {
        $(".delete,#loginRegisterButton,.modal-background").click(function () {
            $(".modal").toggleClass("is-active");
            $(".loginUser,.registerUser").trigger("reset");
            $("#errorUser,#errorMail,#name_response,#pwd_response,.checkPswField").css("visibility", "hidden");
            $("#usernameR,#email").removeClass("is-danger");
            //$("#name_response,#pwd_response,.checkPswField").css("visibility", "hidden");
            $('#submitRegister').attr("disabled", true);
            $("#name_response").css('color', 'black');
            $('#statusU,#statusE').css('display', 'none');
           // $('#statusE').css('display', 'none');
            //$(".checkPswField").css("visibility","hidden");
            $("#upLetterIcon,#lowLetterIcon,#numberIcon,#lengthIcon").removeClass('fa-check has-text-success').addClass('fa-times has-text-danger');
            $("#upLetter,#lowLetter,#number,#length").removeClass('has-text-success').addClass('has-text-danger');
        });
    });

    //funzione per correto login
    $(document).ready(function () {
        $('#submitlogin').click(function () {

            $.ajax({
                url: 'http://localhost/php/login.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    username: $('#usernameL').val().trim().toString(),
                    pwd: $('#pwdL').val()
                }),
                success: function (data) {
                    if (data.ok) {
                        $('#userLogged').text(data.username);
                        $('.modal').removeClass("is-active");
                        $('#loginRegisterButton').attr("href", "./php/controlpanel.php");

                    } else {
                        alert("username o password errati");
                    }
                }
            })
        })
    })

    $(document).ready(function () {
        $('#submitRegister').click(function () {
            $.ajax({
                url: 'http://localhost/php/register.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    username: $('#usernameR').val().trim().toString(),
                    pwd: $('#pwdR').val(),
                    email: $('#email').val().trim().toString()
                }),
                success: function (data) {
                    if (data.ok) {
                        $('#submitRegister').text('Registrato con successo');
                        $('#submitRegister').attr("disabled", true);
                        //setTimeout(function(){
                        //window.location.href="home.html";//Non ho capito perche?
                        //},1000);
                    } else {
                        $('#submitRegister').text('Si è verificato un problema');
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        })
    });
    //controllo dei caratteri ammessi , e controllo della presenza o meno dell'user inserito
    $(document).ready(function () {
        $("#usernameR").keyup(function () {
            var regexUser = /^(?!.*__.*)(?!.*\.\..*)[a-zA-Z0-9_.]+$/;

            if ($("#usernameR").val().match(regexUser) != null) {
                var name = $("#usernameR").val().trim().toString();
                $("#errorUser").css("visibility", "visible");
                $("#usernameR").removeClass("is-danger");

                $.ajax({
                    url: 'http://localhost/php/checkusr.php',
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify({
                        username: name,
                    }),

                    success: function (response) {
                        if (!response.ok) {
                            $('#statusU').removeClass('fa-check').addClass('fa-times');
                            $('#statusU').css('display', 'block');
                            $('#statusU').css('color', 'hsl(348, 100%, 61%)');
                            $("#errorUser").text("Username gia in uso");
                            $("#errorUser").removeClass('has-text-success').addClass(
                                'has-text-danger');
                            //$('#submitRegister').attr("disabled", true);
                        } else {
                            $('#statusU').removeClass('fa-times').addClass('fa-check');
                            $('#statusU').css('display', 'block');
                            $('#statusU').css('color', '#14b64d');
                            $("#errorUser").text("Username disponibile");
                            // $('#submitRegister').attr("disabled", false);
                            $("#errorUser").removeClass('has-text-danger').addClass(
                                'has-text-success');
                        }

                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                    }
                });
            } else {
                $("#errorUser").removeClass('has-text-success').addClass('has-text-danger');
                $("#usernameR").addClass('is-danger');
                $("#errorUser").text("Caratteri non ammessi");
                $('#statusU').css('display', 'none');
            }

        });

    });
    //controllo dei caratteri ammessi , e controllo della presenza o meno della mail inserito
    $(document).ready(function () {
        $("#email").keyup(function () {
            var regexMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if ($("#email").val().match(regexMail) != null) {
                var mail = $("#email").val().trim()

                $("#email").removeClass("is-danger");

                $.ajax({
                    url: 'http://localhost/php/checkmail.php',
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify({
                        mail: $('#email').val().toString(),
                    }),
                    success: function (response) {
                        if (!response.ok) {

                            $('#statusE').removeClass('fa-check').addClass('fa-times');
                            $('#statusE').css('display', 'block');
                            $('#statusE').css('color', 'hsl(348, 100%, 61%)');
                            $("#errorMail").css("visibility", "visible");
                            $("#errorMail").text("Email gia in uso");
                            $("#errorMail").addClass('has-text-danger');
                            
                        } else {
                            $('#statusE').removeClass('fa-times').addClass('fa-check');
                            $('#statusE').css('display', 'block');
                            $('#statusE').css('color', '#14b64d');
                            $("#errorMail").css("visibility", "hidden");
                            $("#errorMail").text("errorMail");
                            

                        }

                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                    }
                });
            } else {
                $("#errorMail").css("visibility", "visible");
                $("#email").addClass("is-danger");
                $("#errorMail").addClass('has-text-danger');
                $("#errorMail").text("Email non valida");
                //$('#submitRegister').attr("disabled", false);
                $('#statusE').css('display', 'none');
            }

        });

    });
    //working in press --(controllo che la password rispetti le condizioni date)
    $(document).ready(function () {
        $("#pwdR").on({

            keyup: function(){
                if ($("#pwdR").val().match(/[A-Z]/) != null) {
                    $("#upLetterIcon").removeClass('fa-times').addClass('fa-check');
                    $("#upLetter, #upLetterIcon").removeClass("has-text-danger").addClass(
                        "has-text-success");
                } else {
                    $("#upLetterIcon").removeClass('fa-check').addClass('fa-times');
                    $("#upLetter, #upLetterIcon").removeClass("has-text-success").addClass(
                        "has-text-danger");
                }
                if ($("#pwdR").val().match(/[a-z]/) != null) {
                    $("#lowLetterIcon").removeClass('fa-times').addClass('fa-check');
                    $("#lowLetter, #lowLetterIcon").removeClass("has-text-danger").addClass(
                        "has-text-success");
                } else {
                    $("#lowLetterIcon").removeClass('fa-check').addClass('fa-times');
                    $("#lowLetter, #lowLetterIcon").removeClass("has-text-success").addClass(
                        "has-text-danger");
                }
                if ($("#pwdR").val().match(/[0-9]/) != null) {
                    $("#numberIcon").removeClass('fa-times').addClass('fa-check');
                    $("#number, #numberIcon").removeClass("has-text-danger").addClass(
                    "has-text-success");
                } else {
                    $("#numberIcon").removeClass('fa-check').addClass('fa-times');
                    $("#number, #numberIcon").removeClass("has-text-success").addClass(
                    "has-text-danger");
                }
                if($('#pwdR').val().length >7){
                    $("#lengthIcon").removeClass('fa-times').addClass('fa-check');
                    $("#length, #lengthIcon").removeClass("has-text-danger").addClass(
                    "has-text-success");
                }else{
                    $("#lengthIcon").removeClass('fa-check').addClass('fa-times');
                    $("#length, #lengthIcon").removeClass("has-text-success").addClass(
                    "has-text-danger");
                }
            
            },

        focus:function(){
            $(".checkPswField").css("visibility","visible");
        },

        blur:function(){
            $(".checkPswField").css("visibility","hidden");
        }
    });
});
    //da fare : fare in modo che l'elemento #pwd_response sia visibility", "visible o visibility", "hidden"
    $(document).ready(function () {
        $("#rePwdR , #pwdR").keyup(function () {
            $("#pwd_response").css("visibility", "visible");
            if ($("#pwdR").val() != $("#rePwdR").val()) {
                $('#statusP').removeClass('fa-check').addClass('fa-times');
                $('#statusP').css("visibility", "visible");
                $('#statusP').removeClass('has-text-success').addClass('has-text-danger');
                $("#pwd_response").text("Le password non corrispondono");
                $("#pwd_response").css('color', 'red');
                //$('#submitRegister').attr("disabled", true);
            } else {
                $('#statusP').removeClass('fa-times').addClass('fa-check');
                $('#statusP').css("visibility", "hidden");
                $('#statusP').removeClass('has-text-danger').addClass('has-text-success');
                $("#pwd_response").text("");
                // $('#submitRegister').attr("disabled", false);
                $("#pwd_response").css('color', 'green')


            }
        });

    });
    // working in progress --controllo che tutti i campi siano compilati coorettamente e abilito il bottene per registrarsi(da finire il controllo sulla password)
    $(document).ready(function () {
        $("#usernameR,#email,#pwdR,#rePwdR").keyup(function () {
            var name = $("#usernameR").val().trim().toString();
            var mail = $("#email").val().trim()
            var psw = $("#pwdR").val();
            var rePsw = $("#rePwdR").val();
            if (name != '' && $("#errorUser").text() === 'Username disponibile' && mail != '' && !$('#email').hasClass('is-danger') && psw!='' && $("#upLetter,#lowLetter,#number,#length").hasClass('has-text-success') && rePsw!="" && !$('#statusP').hasClass('has-text-danger')  )  {

                $('#submitRegister').attr("disabled", false);

            } else {
                $('#submitRegister').attr("disabled", true);
            }


        });
    });
</script>

</html>