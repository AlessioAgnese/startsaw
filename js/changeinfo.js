$(document).ready(function () {
    document.querySelector('#fileI').addEventListener('change', function (e) {
        var file = this.files[0];
        if (file.size > 16777215) {
            $("#notif").removeClass("is-link").addClass("is-danger");
            $("#notif").css("display", "block");
            $("#notifText").text("File troppo grande ,deve essere massimo 16MB");
            return false;
        }
        checkMIME(file).then(x => {
            var fd = new FormData();
            fd.append("fileI", file);
            fd.append("token", localStorage.getItem('token'));
            var xhr = new XMLHttpRequest();
            xhr.open('POST', './php/manageImg.php', true);
            xhr.send(fd);
    
            $("#notif").removeClass("is-danger").addClass("is-link");
            $("#notif").css("display", "block");
            $("#notifText").text("Immagine modificata con successo");
    
        }).catch(y => {
            $("#notif").removeClass("is-link").addClass("is-danger");
            $("#notif").css("display", "block");
            $("#notifText").text("Inserisci un'immagine");
            return false;
        })
    }, false);

        $.ajax({
            url: './php/manageImg.php',
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Authentication', localStorage.getItem('token'));
            },
            success: function (data) {
                if (data.ok) {
                    if (data.dataUrl != null) {
                        $('#profilePic').attr("src", data.dataUrl);
                    }
                } else {
                    $("#notif").removeClass("is-link").addClass("is-danger");
                    $("#notif").css("display", "block");
                    $("#notifText").text("Errore nel recupero dell'immagine,riprova più tardi");
                }

            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })

        if ('token' in localStorage) {
            $.ajax({
                url: './php/userinfo.php',
                type: 'get',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'view');
                    xhr.setRequestHeader('X-Authentication', localStorage.getItem('token'));

                },
                success: function (data) {
                    if (data.ok) {
                        $('#nome').val(data.nome);
                        $('#cognome').val(data.cognome);
                        $('#residenza').val(data.residenza);
                        $('#biografia').val(data.biografia);
                    } else {
                        alert("La sessione è scaduta");
                        localStorage.removeItem('token');
                        window.location.replace("./index.html")
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        }else{
            alert("Loggati per modificare il tuo profilo");
                        window.location.replace("./index.html")
        }
        //elimina account
        $('#accountD').click(function () {
            $.ajax({
                url: './php/userinfo.php',
                type: 'get',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'delete');
                    xhr.setRequestHeader('X-Authentication', localStorage.getItem('token'));
                },
                success: function (data) {
                    if (data.ok) {
                        alert("account cancellato correttametamente");
                        localStorage.removeItem('token');
                        window.location.replace("./index.html");

                    } else {
                        alert("Cancellazione non riuscita");
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        })
        //cancella l'avatar
        $('#fileD').click(function () {
            $.ajax({
                url: './php/userinfo.php',
                type: 'get',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'update');
                    xhr.setRequestHeader('X-Authentication', localStorage.getItem('token'));
                },
                success: function (data) {
                    if (data.ok) {
                        //$('html').load('#imgProfile > *');
                        $("#notif").removeClass("is-danger").addClass("is-link");
                        $("#notif").css("display", "block");
                        $("#notifText").text("Immagine Cancellata");
                        //setTimeout(function(){ $("#notif").css("display", "none");}, 5000);
                    } else {
                        alert("Cancellazione non riuscita");
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        })

        $('#submitChange').click(function () {
            $.ajax({
                url: './php/userinfo.php',
                type: 'post',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'edit');
                },
                data: JSON.stringify({
                    token: localStorage.getItem('token'),
                    nome: $('#nome').val().trim().toString(),
                    cognome: $('#cognome').val().trim().toString(),
                    residenza: $('#residenza').val().trim().toString(),
                    biografia: $('#biografia').val().trim().toString(),
                }),
                success: function (data) {
                    if (data.ok) {
                        $("#notif").removeClass("is-danger").addClass("is-link");
                        $("#notif").css("display", "block");
                        $("#notifText").text("Modifiche effettuate con successo");


                    } else {
                        $("#notif").removeClass("is-link").addClass("is-danger");
                        $("#notif").css("display", "block");
                        $("#notifText").text("Qualcosa è andato storto, ricontrolla i campi");
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        })



        $('#ChangePdw').click(function () {
            if ($("#ChangePdw").has("#ChangePdw").attr("disabled", false)) {
                $.ajax({
                    url: './php/userinfo.php',
                    type: 'post',
                    dataType: 'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Type', 'change');
                    },
                    data: JSON.stringify({
                        token: localStorage.getItem('token'),
                        oldPwd: $('#oldPwd').val().toString(),
                        newPwd: $('#pwdR').val().toString(),
                    }),
                    success: function (data) {
                        if (data.ok) {
                            $("#notif").removeClass("is-danger").addClass("is-link");
                            $("#notif").css("display", "block");
                            $("#notifText").text("Password modificata con successo");
                        } else {
                            $("#notif").removeClass("is-link").addClass("is-danger");
                            $("#notif").css("display", "block");
                            $("#notifText").text("Qualcosa è andato storto, ricontrolla i campi");
                        }
                    },
                    error: function (errorThrown) {
                        console.log(errorThrown);
                    }
                })
            }
        })

        $('#fileI').on('change', function (e) {
            var formdata = new FormData();
            formdata.append('image', $('input[type=file]')[0]);
            e.preventDefault();
            $.ajax({
                url: './php/userinfo.php',
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'avt');
                    xhr.setRequestHeader('X-Authentication', localStorage.getItem('token'));
                },
                data: formdata,
                cache: false,
                processData: false,
                success: function (data) {

                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        })

        $("#pwdR,#rePwdR,#oldPwd").on("change keyup", function () {
            var oldPsw = $("#oldPwd").val();
            var psw = $("#pwdR").val();
            var rePsw = $("#rePwdR").val();

            if ($("#upLetterIcon,#lowLetterIcon,#numberIcon,#lengthIcon,#statusP").hasClass("fa-check") && psw == rePsw && oldPsw != psw && psw != '' && rePsw != '' && oldPsw != '' && $("#upLetter,#lowLetter,#number,#length,#pwd_checkEqual,#statusP").hasClass('has-text-success')) {

                $('#ChangePdw').attr("disabled", false);

            } else {
                $('#ChangePdw').attr("disabled", true);
            }
        });

        //funzioni controlpanel.html

        $("#btnImg").click(function () {
            $("#menuImg").toggleClass("is-active");
        });



        $("#closeNotif").click(function () {
            $("#notif").css("display", "none");
            window.location.reload();
        });
})
    