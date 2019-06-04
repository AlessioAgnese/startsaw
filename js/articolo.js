function GetURLParameter() {
    var id = window.location.href.substr(window.location.href.indexOf('#') + 1);
    if (id != undefined) {
        return id;
    } else {
        alert("errore");
    }
}
$(document).ready(function () {
    $.ajax({
        url: './php/getnews.php',
        type: 'POST',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Type', 'article');
        },
        data: JSON.stringify({
            articolo: GetURLParameter(),
        }),

        success: function (data) {
            if (data.ok) {
                $("#contentArticle").append(data.Testo + '<br><time>' + data.Data.substring(0,data.Data.length-3) + '</time>');
                $("#author").append(data.User).attr("href", "userprofile.html#" + data.User);
                if (data.Avatar != null) $("#avt").attr("src", data.Avatar);
            } else {
                alert("errore nella pubblicazione");
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    })
    if ('token' in localStorage) {
        $.ajax({
            url: './php/checklogin.php',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                token: localStorage.getItem('token')
            }),
            success: function (data) {
                if (data.ok && data.utente != null && data.token != "logout") {
                    tinymce.init({
                        selector: 'textarea',
                        language_url: './js/it_IT.js',
                        language: 'it_IT',
                    });
                    $('#writeComment').css("visibility", "visible");
                    if (data.perm > 2) {
                        $('#edit').css("visibility", "visible");
                        $('#delete').css("visibility", "visible");
                    }
                } else {
                    alert("Sessione invalida, consigliamo di rifare il login per poter commentare");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    }
    $.ajax({
        url: './php/getnews.php',
        type: 'POST',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Type', 'comments');
        },
        data: JSON.stringify({
            articolo: GetURLParameter(),
        }),
        success: function (data) {
            if (data.ok) {
                var c=0;
                $.each(data.user, function (index) {
                    
                    var html = '<article class="media">' +
                        '<figure class="media-left">' +
                        '<p class="image is-64x64">' +
                        '<img id="userImg' + c + '" src="https://bulma.io/images/placeholders/128x128.png">' +
                        '</p>' +
                        '</figure>' +
                        '<div class="media-content">' +
                        '<div class="content">' +
                        '<p>' +
                        '<strong id ="userName">' + data.user[index] + '</strong>' +
                        '<br>' +
                        '<p id="comment">' + data.testo[index] + '</p>' +
                        '<small>' + data.data[index].substring(0,data.data[index].length-3) + '</small>' +
                        '<br>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</article>';
                    $("#comments").append(html);

                    if (data.avatar[index] != null) $("#userImg" + c).attr('src', data.avatar[index]);
                    c++;
                });

            } else {
                 //riesci a mettere una scritta con "nessun commento fin ora?"
                 //alert("nessun commento");
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    })

    $('#edit').click(function () {
        console.log("test2");
        window.location.replace("editArt.html#" + GetURLParameter() + "");
    });

    $('#delete').click(function () {
        console.log("test");
        $.ajax({
            url: './php/delArt.php',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({
                id: GetURLParameter(),
            }),
            success: function (response) {
                if (response.ok) {
                    $("#notifyArticle").removeClass("is-danger").addClass("is-link");
                    $("#notifTextA").text("Articolo Eliminato ,ti stiamo ripordando alla pagina principale");
                    $("#notifyArticle").css("display", "block");
                    $("html, body").animate({
                        scrollTop: 0
                    }, 1000);
                    setTimeout(function () {
                        window.location.replace("./blog.html");
                    }, 1000);
                } else {
                    $("#notifyArticle").removeClass("is-link").addClass("is-danger");
                    $("#notifTextA").text("Qualcosa è andato storto, riprova");
                    $("#notifyArticle").css("display", "block");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }

        });
    });



    $('#publish').click(function () {
        tmp = tinymce.get('commento').getContent().toString().length;
        if (tmp > 0 && tmp < 500) {
            $.ajax({
                url: './php/pubcomment.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    commento: tinymce.get("commento").getContent(),
                    token: localStorage.getItem('token'),
                    id: GetURLParameter(),
                }),
                success: function (data) {
                    if (data.ok) {
                        alert("Commento pubblicato");
                        location.reload();
                    } else {
                        alert("errore nella pubblicazione");
                    }
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            })
        }
    })
           
                    $('#edit').click(function () {
                        window.location.replace("editArt.html#"+GetURLParameter()+"");
                    });
                    
                    $('#delete').click(function () {
                        $.ajax({
                            url: './php/delArt.php',
                            type: 'post',
                            dataType: 'json',
                            data: JSON.stringify({
                                id: GetURLParameter(),
                            }),
                            success: function (response) {
                                if(response.ok){
                                    alert("Articolo cancellato ti stiamo riporatando al blog");
                                   // window.location.replace("blog.html");
                                }else{
                                    alert("Qualcosa e andato storto, riprova");
                                }
                            }
                        });
                    });
                  
                    
        if('token' in localStorage){
            $.ajax({
                     url:'./php/checklogin.php',
                        type:'post',
                        dataType:'json',
                        data:JSON.stringify({
                            token:localStorage.getItem('token')
                        }),
                        success:function(data){
                            if(data.ok && data.utente != null && data.token!="logout"){                         
                                tinymce.init({
                                    selector: 'textarea',
                                    language_url: './js/it_IT.js',
                                    language: 'it_IT',});
                                    $('#writeComment').css("visibility", "visible");
                                    if(data.perm>2){
                                        $('#edit').css("visibility", "visible");    
                                        $('#delete').css("visibility", "visible");
                                    }
                            }
                            else{
                                alert("Sessione invalida, consigliamo di rifare il login per poter commentare");
                            }
                        },
                        error:function(errorThrown){
                            console.log(errorThrown);
                        }
                    })
                }
        });
