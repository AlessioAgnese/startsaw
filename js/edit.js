function GetURLParameter() {
    var id = window.location.href.substr(window.location.href.indexOf('#') + 1);
    if (id != undefined) {
        return id;
    } else {
        alert("errore");
    }
}
$(document).ready(function () {
    //controllo permessi
    if ('token' in localStorage) {
        $.ajax({
            url: './php/checklogin.php',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                token: localStorage.getItem('token')
            }),
            success: function (data) {
                if (data.ok && data.utente != null && data.perm == 3 && data.token != "logout") {
                    tinymce.init({
                        selector: '#articolo',
                        language_url: './js/it_IT.js',
                        language: 'it_IT',
                        content_css: '/style.css',
                        plugins: 'link image codesample table anchor wordcount',
                    });
                    $('#articolo').css("visibility", "visible");
                    $('#publish').css("visibility", "visible");
                } else {
                    alert("Non hai i permessi per accedere a questa pagina");
                    window.location.replace("./index.html");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    } else {
        alert("Devi effetuare il login");
        window.location.replace("./index.html");
    }
    $.ajax({
        url: './php/getArt.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            id: GetURLParameter(),
        }),
        success: function (data) {
            if (data.ok) {
                $('#articolo').html(data.testo.toString());
            } else {
                alert("error nel get");
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    })



    //funzione che pubblica
    $('#publish').click(function () {
        tmp = tinymce.get('articolo').getContent().toString().length;
        if (tmp > 0 && tmp < 32000) {
            $.ajax({
                url: './php/editArt.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    id: GetURLParameter(),
                    articolo: tinymce.get("articolo").getContent(),
                }),
                success: function (data) {
                    if (data.ok) {
                        $("#notifyArticle").removeClass("is-danger").addClass("is-link");
                        $("#notifTextA").text("Articolo modificato con successo");
                        $("#notifyArticle").css("display", "block");
                        $("html, body").animate({
                            scrollTop: 0
                        }, 1000);
                        setTimeout(function () {
                            window.location.replace('./articolo.html#' + GetURLParameter());
                        }, 1000);
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        } else {
            if (tmp > 0) {
                $("#notifyArticle").removeClass("is-link").addClass("is-danger");
                $("#notifTextA").text("Articolo troppo lungo");
                $("#notifyArticle").css("display", "block");
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
            } else {
                $("#notifyArticle").removeClass("is-link").addClass("is-danger");
                $("#notifTextA").text("Impossibile pubblicare articolo vuoto");
                $("#notifyArticle").css("display", "block");
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
            }


        }
    });



    $("#closeNotif").click(function () {
        $("#notifyArticle").css("display", "none");
    });
})