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




$(document).ready(function () {
    $('#submitlogin').click(function () {
        $.ajax({
            url: 'http://localhost/php/login.php',
            type: "POST",
            dataType: 'json',
            data: JSON.stringify({
                name: $('#usernameL').val().trim().toString(),
                password: $('#pwdL').val()
            }),
            success: function (data) {
                if (data.ok) {
                    console.log(data);
                    console.log(data.user.user);
                    $('#userLogged').text(data.user.user);
                    $('.modal').removeClass("is-active");
                    localStorage.setItem('token', data.token);
                    //$('#loginRegisterButton').attr("href", "./php/controlpanel.php");
                    //$("#logOutButton").css("visibility : visible");
                } else {
                    alert("Username o password errata");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                alert("Errore durante il login, riprovare tra poco");
            }
        })
    });
});




$(document).ready(function () {
    $('#logout2').click(function () {
        localStorage.removeItem('token');
        window.location.reload();
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
                    console.log(data);
                    //$('#submitRegister').text('Registrato con successo');
                    //$('#submitRegister').attr("disabled", true);
                    $('#userLogged').text(data.user.user);
                    localStorage.setItem('token', data.token);
                    $('.modal').removeClass("is-active");
                    $('#loginRegisterButton').attr("href", "./php/controlpanel.php");

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
                url: 'http://localhost/php/checker.php',
                type: 'post',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'user');
                },
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

                    } else {
                        $('#statusU').removeClass('fa-times').addClass('fa-check');
                        $('#statusU').css('display', 'block');
                        $('#statusU').css('color', '#14b64d');
                        $("#errorUser").text("Username disponibile");

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
                url: 'http://localhost/php/checker.php',
                type: 'post',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'mail');
                },
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
            $('#statusE').css('display', 'none');
        }
    });
});

//working in press --(controllo che la password rispetti le condizioni date)
$(document).ready(function () {
    $("#pwdR").on({

        keyup: function () {
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
            if ($('#pwdR').val().length > 7) {
                $("#lengthIcon").removeClass('fa-times').addClass('fa-check');
                $("#length, #lengthIcon").removeClass("has-text-danger").addClass(
                    "has-text-success");
            } else {
                $("#lengthIcon").removeClass('fa-check').addClass('fa-times');
                $("#length, #lengthIcon").removeClass("has-text-success").addClass(
                    "has-text-danger");
            }


        },

        focus: function () {
            $(".checkPswField").css("visibility", "visible");
        },

        blur: function () {
            $(".checkPswField").css("visibility", "hidden");
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
//aggiunto controllo su password ma mail fa passare anche se errata
$(document).ready(function () {
    $("#usernameR,#email,#pwdR,#rePwdR").change(function () {
        var name = $("#usernameR").val().trim().toString();
        var mail = $("#email").val().trim()
        var psw = $("#pwdR").val();
        var rePsw = $("#rePwdR").val();
        //&& $("#upLetter,#lowLetter,#number,#length").hasClass('has-text-success') && !$('#email').hasClass('is-danger') && !$('#statusP').hasClass('has-text-danger')
        if ($("#upLetterIcon,#lowLetterIcon,#numberIcon,#lengthIcon,#email,#statusU,#statusP").hasClass("fa-check") && name != '' && mail != '' && psw != '' && rePsw != '') {

            $('#submitRegister').attr("disabled", false);

        } else {
            $('#submitRegister').attr("disabled", true);
        }


    });
});