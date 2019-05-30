$(document).ready(function () {
    function fixChrome(){
        sUsrAg = navigator.userAgent;
        if (sUsrAg.indexOf("Chrome") > -1) return true;
        return false;
        }
    document.querySelector('#fileI').addEventListener('change', function (e) {
        var file = this.files[0];
        if (file.size > 16777215) {
            alert("file troppo grosso");
            return false;
        }
        checkMIME(file).then(x => {            
            var fd = new FormData();
            fd.append("fileI", file);
            fd.append("token", localStorage.getItem('token'));
            var xhr = new XMLHttpRequest();
            xhr.open('POST', './php/manageImg.php', true);
            xhr.send(fd);
            if(fixChrome()){
                $("#notif").removeClass("is-danger").addClass("is-link");
                $("#notif").css("display", "block");
                $("#notifText").text("Immagine modificata con successo");
            }
            xhr.upload.onprogress = function (e) {
                var percentComplete = 0;
                while (e.lengthComputable < 99) {
                    if (e.lengthComputable) percentComplete = (e.loaded / e.total) * 100;
                    if (percentComplete == 100) {break;}
                }
                $("#notif").removeClass("is-danger").addClass("is-link");
                $("#notif").css("display", "block");
                $("#notifText").text("Immagine modificata con successo");
            }
        }).catch(y => {
            $("#notif").removeClass("is-link").addClass("is-danger");
                $("#notif").css("display", "block");
                $("#notifText").text("Inserisci un'immagine");
            return false;
        })
    }, false);
 


    //PRENDE IMG E LA METTE 
    $.ajax({

        url: 'http://localhost/php/manageImg.php',
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Authentication', localStorage.getItem('token'));
        },
        success: function (data) {
            if (data.ok) {
                
                if(data.dataUrl != null) $('#profilePic').attr("src", data.dataUrl); 
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
            url: 'http://localhost/php/userinfo.php',
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

                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    $('#fileD').click(function () {
        $.ajax({
            url: 'http://localhost/php/userinfo.php',
            type: 'get',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Type', 'delete');
                xhr.setRequestHeader('X-Authentication', localStorage.getItem('token'));
            },
            success: function (data) {
                if (data.ok) {
                $("#notif").removeClass("is-danger").addClass("is-link");
                $("#notif").css("display", "block");
                $("#notifText").text("Immagine Cancellata");
                } else {
                    alert("Cancellazione finita male");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })

    $('#submitChange').click(function () {
        $.ajax({
            url: 'http://localhost/php/userinfo.php',
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
        $.ajax({
            url: 'http://localhost/php/userinfo.php',
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
    })
});
$('#fileI').on('change', function (e) {
    var formdata = new FormData();
    formdata.append('image', $('input[type=file]')[0]);
    e.preventDefault();
    $.ajax({
        url: 'http://localhost/php/userinfo.php',
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

/*



$(document).ready(function () {
    $('#fileI').change(function () {
        if ($("#fileI").val().files.length > 0) {
        $.ajax({
            url:'http://localhost/php/userinfo.php',
            type:'post',
            dataType:'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Type', 'change');
            },
            data:JSON.stringify({
                token:localStorage.getItem('token'),
                img:file.files[0].name,
            }),
            success: function (data) {
                if (data.ok) {
                    $("#notif").removeClass("is-danger").addClass("is-link");
                    $("#notif").css("display","block");
                    $("#notifText").text("Password modificata con successo");
                } else {
                    $("#notif").removeClass("is-link").addClass("is-danger");
                    $("#notif").css("display","block");
                    $("#notifText").text("Qualcosa è andato storto, ricontrolla i campi");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
        }
    })
});

*/