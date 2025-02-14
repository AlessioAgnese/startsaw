$(document).ready(function () {

    //funzione per il menu burger    
    $("#content").load("description.html");
    $(".navbar-burger").click(function () {
        $(".navbar-burger,#navbarBasicExample").toggleClass("is-active");
    });

    $('#home,#blog').hover(function () {
        $(this).addClass('has-text-warning');
    }, function () {
        $(this).removeClass('has-text-warning');
    });
    /*
        $('#userProfile,#write,#logout').hover(function(){
            $(this).css('background-color','#2f2f2f');
        },function(){
            $(this).removeClass("has-background-warning").css('color','');
        });
    */

    //funzione per il menu dropdown l
    $(".navbar-link").click(function () {
        $("#navbar-menu").toggleClass("is-active");
    });

//funzione per la list sotto la search bar
    $("#searchRes *a").hover(function(){
        $(this).addClass("is-active");
    }, function(){
        $(this).removeClass("is-active");
    })

    //funzione per il menu modal(show) e per resettare i campi del form una volta chiusa la "card"
    $(".delete,#loginRegisterButton,.modal-background,#enterR").click(function () {
        $(".modal").toggleClass("is-active");
        $(".loginUser,.registerUser").trigger("reset");
        $("#errorUser,#errorMail,#name_response,#pwd_response,.checkPswField").css("visibility", "hidden");
        $("#usernameR,#email").removeClass("is-danger");
        $('#submitRegister').attr("disabled", true);
        $("#name_response").css('color', 'black');
        $('#statusU,#statusE').css('display', 'none');
        $('#statusP').css("visibility", "hidden");
        $("#upLetterIcon,#lowLetterIcon,#numberIcon,#lengthIcon").removeClass('fa-check has-text-success').addClass('fa-times has-text-danger');
        $("#upLetter,#lowLetter,#number,#length").removeClass('has-text-success').addClass('has-text-danger');
    });
//funzione per gestire il login
    $('#submitlogin').click(function () {
        $.ajax({
            url: './php/login.php',
            type: "POST",
            dataType: 'json',
            data: JSON.stringify({
                name: $('#usernameL').val().trim().toString(),
                password: $('#pwdL').val()
            }),
            success: function (data) {
                if (data.ok) {
                    localStorage.setItem('token', data.token);
                    location.reload();
                } else {
                    $("#loginAppender").empty();
                    $("#loginAppender").append("Username o password errati");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
                alert("Errore durante il login, riprovare tra poco");
            }
        })
    });

    //funzione per gestire la register
    $(document).ready(function () {
        $('#submitRegister').click(function () {
            $.ajax({
                url: './php/register.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    username: $('#usernameR').val().trim().toString(),
                    pwd: $('#pwdR').val(),
                    email: $('#email').val().trim().toString()
                }),
                success: function (data) {
                    if (data.ok) {
                        localStorage.setItem('token', data.token);
                        window.location.reload();
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

    
     //funzione per ricercare articoli all'interno del blog
     $('#search').click(function () {
        $("#searchRes").empty();
        if($("#text").val().trim().toString().length>3){
        $.ajax({
            url: './php/searchengine.php',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                text: $("#text").val().trim().toString(),
            }),
            success: function (response) {
                if(response.ok){
                    $.each(response.rows, function(index){
                        var resarchText = $("#text").val().toString();
                       
                        var resultText = response.rows[index].Testo.replace(/(<([^>]+)>|&nbsp;)/ig,"");
                        resultText = resultText.substring(resarchText,resultText.indexOf("\n",resarchText))
                        //fare in modo di <mark> la parola simile

                        var html ='<a href="articolo.html#'+ response.rows[index].Id_A+'" class="list-item" >'+ resultText+'</a>';
                        $("#searchRes").append(html);
                        });
                }else{
                    $("#noRes").css("visibility","visible");
                    $("#searchRes").append("Nessun risultato trovato");
                }
            }
        });
    }else{
        $("#noRes").css("visibility","visible");
        $("#searchRes").append("ricerca minima di 4 lettere");
        }
    });

//controlliamo se l'utente è loggato

    if ('token' in localStorage) {
        $.ajax({
            url: './php/checklogin.php',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                token: localStorage.getItem('token')
            }),

            success: function (data) {
                if (data.ok && data.utente != null) {
                    $('#userNameNav').text(data.utente);
                    $('.modal').removeClass("is-active");
                    $('#userProfile').attr("href", "controlpanel.html");
                    $("#navbar-menu").css("visibility", "visible");
                    $('#loginRegisterButton').css("display", "none");
                    $('#enterR').css("display", "none");
                    $.ajax({
                        url: './php/manageImg.php',
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-Authentication', localStorage.getItem('token'));
                        },
                        success: function (data) {
                            if (data.ok) {
                                if (data.dataUrl != null) $('#profilePicUser').attr("src", data.dataUrl);
                            } else {
                                alert("Errore nel caricare l'immagine");
                            }
                        },
                        error: function (errorThrown) {
                            console.log(errorThrown);
                        }
                    })
                    if (data.perm > 1) {
                        $("#write").css("display", "block");
                        $('#write').attr("href", "writearticle.html");
                    }

                } else {
                    alert("La sessione è scaduta");
                    localStorage.removeItem('token');
                    $('#userProfile').removeAttr("href", "controlpanel.html");
                    $("#navbar-menu").css("visibility", "hidden");
                    $('#loginRegisterButton').css("display", "block");
                    $('#enterR').css("display", "block");
                    window.location.reload();

                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    }
//funzione per il log out dell'utente

    $('#logout').click(function () {
        $.ajax({
            url: './php/logout.php',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                token: localStorage.getItem('token')
            }),
            success: function (response) {
                if(response.ok){
                    localStorage.removeItem('token');
                    localStorage.removeItem('tinymce-urò-history');
                    $('#userProfile').removeAttr("href", "controlpanel.html");
                    $("#navbar-menu").css("visibility", "hidden");
                    $("#write").css("visibility", "hidden");
                    $('#loginRegisterButton').css("display", "block");
                    $('#enterR').css("display", "block");
                    window.location.replace("index.html");}
                else{
                    alert("Qualcosa e andato storto, riprova");
                }
            }
        });
    });

    //controllo dei caratteri ammessi , e controllo della presenza o meno dell'user inserito
    $("#usernameR").on("keyup change", function () {
        var regexUser = /^(?!.*__.*)(?!.*\.\..*)[a-zA-Z0-9_.]+$/;
        $("#errorUser").css("visibility", "visible");
        if ($("#usernameR").val().match(regexUser) != null) {
            var name = $("#usernameR").val().trim().toString();

            $("#usernameR").removeClass("is-danger");

            $.ajax({
                url: './php/checker.php',
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
                        $('#statusU').removeClass('has-text-success').addClass('has-text-danger');
                        $("#errorUser").text("Username gia in uso");
                        $("#errorUser").removeClass('has-text-success').addClass(
                            'has-text-danger');

                    } else {
                        $('#statusU').removeClass('fa-times').addClass('fa-check');
                        $('#statusU').css('display', 'block');
                        $('#statusU').removeClass('has-text-danger').addClass('has-text-success');
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

    //controllo dei caratteri ammessi , e controllo della presenza o meno della mail inserito

    $("#email").keyup(function () {
        var regexMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if ($("#email").val().match(regexMail) != null) {
            var mail = $("#email").val().trim()

            $("#email").removeClass("is-danger");

            $.ajax({
                url: './php/checker.php',
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


    //controllo che la password rispetti le condizioni date

    $("#pwdR,#oldPwd").on({

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
            if ($("#pwdR").val() != $("#oldPwd").val()) {
                $("#pwd_checkEqual").removeClass("has-text-danger").addClass("has-text-success");
                $("#pwd_checkEqual").text("");
            } else {
                $("#pwd_checkEqual").removeClass("has-text-success").addClass("has-text-danger");
                $("#pwd_checkEqual").text("La nuova password deve essere diversa da quella vecchia");
            }


        },

        focus: function () {
            $(".checkPswField").css("visibility", "visible");
        },

        blur: function () {
            $(".checkPswField").css("visibility", "hidden");
        }
    });




    $("#rePwdR , #pwdR").keyup(function () {
        $("#pwd_response").css("visibility", "visible");
        if ($("#pwdR").val() != $("#rePwdR").val()) {
            $('#statusP').removeClass('fa-check').addClass('fa-times');
            $('#statusP').css("visibility", "visible");
            $('#statusP').removeClass('has-text-success').addClass('has-text-danger');
            $("#pwd_response").text("Le password non corrispondono");
        } else {
            $('#statusP').removeClass('fa-times').addClass('fa-check');
            $('#statusP').css("visibility", "hidden");
            $('#statusP').removeClass('has-text-danger').addClass('has-text-success');
            $("#pwd_response").text("");
        }
    });


    $("#usernameR,#email,#pwdR,#rePwdR").on("change keyup", function () {

        var name;
        var mail;
        var psw;
        var rePsw;
        if($('#usernameR').val().toString().length>0){
            name = $("#usernameR").val().trim();
        }
        if($('#email').val().toString().length>0){
            mail = $("#email").val().trim();
        }
        if($('#pwdR').val().toString().length>0){
            psw = $("#pwdR").val();
        }
        if($('#rePwdR').val().toString().length>0){
            rePsw = $("#rePwdR").val();
        }

        if ($("#upLetterIcon,#lowLetterIcon,#numberIcon,#lengthIcon,#email,#statusU,#statusP").hasClass("fa-check") && name != '' && mail != '' && psw != '' && rePsw != '' && $("#upLetter,#lowLetter,#number,#length,#errorUser").hasClass('has-text-success') && !$('#email').hasClass('is-danger') && !$('#statusP').hasClass('has-text-danger')) {

            $('#submitRegister').attr("disabled", false);

        } else {
            $('#submitRegister').attr("disabled", true);
        }

    });

    //caricamento dei contenuti della seconda navbar direttamente su index e animazione dei "bottini" della navbar

    var container = $("#content");
    $("#contentSelector li a").click(function () {
        $("#contentSelector li[class='is-active']").removeClass("is-active");
        $(this).parent().addClass("is-active");
        var $this = $(this);
        target = $this.data("target");

        container.load(target + ".html");

        return false;

    })

   

    
    

});