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
    <script type="text/javascript" language="javascript"></script>
    <script src="./js/utility.js" type="text/javascript"></script> 
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
                            Contattaci
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
</html>