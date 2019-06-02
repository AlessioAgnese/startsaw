$(document).ready(function () {

    if ('token' in localStorage) {
        $.ajax({
            url: 'http://localhost/php/checklogin.php',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                token: localStorage.getItem('token')
            }),
            success: function (data) {
                if (data.ok && data.utente != null && data.perm == 3 && data.token!="logout") {
                    tinymce.init({
                        selector: '#articolo',
                        language_url: './js/it_IT.js',
                        language: 'it_IT',
                        content_css : '/style.css'  
                    });
                    $('#articolo').css("visibility", "visible");
                    $('#publish').css("visibility", "visible");
                } else {
                    alert("Non hai i permessi per accedere a questa pagina");
                    window.location.replace("http://localhost");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    } else {
        alert("Devi effetuare il login");
        window.location.replace("http://localhost");
    }


    $('#publish').click(function () {
        tmp = tinymce.get('articolo').getContent().toString().length;
        if (tmp > 0 && tmp < 32000) {
            $.ajax({
                url: 'http://localhost/php/pubarticle.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    articolo: tinymce.get("articolo").getContent(),
                    token: localStorage.getItem('token')
                }),
                success: function (data) {
                    if (data.ok) {
                        $("#notifyArticle").removeClass("is-danger").addClass("is-link");
                        $("#notifTextA").text("Articolo Pubblicato");
                        $("#notifyArticle").css("display", "block");
                        $("html, body").animate({scrollTop: 0}, 1000);
                       
                        window.location.replace("http://localhost/articolo.html#"+data.id);
                        
                    } else {
                        $("#notifyArticle").removeClass("is-link").addClass("is-danger");
                        $("#notifTextA").text("Errore nella pubblicazione");
                        $("#notifyArticle").css("display", "block");
                        $("html, body").animate({scrollTop: 0}, 1000);
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        } else {
            if (tmp > 0){
                $("#notifyArticle").removeClass("is-link").addClass("is-danger");
                $("#notifTextA").text("Articolo troppo lungo");
                $("#notifyArticle").css("display", "block");
                $("html, body").animate({scrollTop: 0}, 1000);
            }
                
            else{
                $("#notifyArticle").removeClass("is-link").addClass("is-danger");
                $("#notifTextA").text("Impossibile pubblicare articolo vuoto");
                $("#notifyArticle").css("display", "block");
                $("html, body").animate({scrollTop: 0}, 1000);
            }

               
        }
    });



    $("#closeNotif").click(function () {
        $("#notifyArticle").css("display", "none");
    });
})