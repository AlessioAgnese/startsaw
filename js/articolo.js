function GetURLParameter(char) {
 
    var id = window.location.href.substr(window.location.href.indexOf(char) + 1);
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
        articolo: GetURLParameter("#"),
    }),

    success: function (data) {
        if (data.ok) {
            $("#contentArticle").append(data.Testo + '<br><time>' + data.Data.substring(0, data.Data.length - 3) + '</time>');
            $("#bio").append(data.Bio);
            $("#author").append(data.User).attr("href", "userprofile.html#" + data.User);
            $("#bio").text(data.Biografia);
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
                console.log(data.perm);
                if (data.perm > 1) {
                    $('#perm').css("display", "block");}
            } else {
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
        articolo: GetURLParameter("#"),
    }),
    success: function (data) {
        if (data.ok) {
            var c = 0;
            $.each(data.user, function (index) {

                var html = '<article class="media">' +
                    '<figure class="media-left">' +
                    '<p class="image is-64x64">' +
                    '<img id="userImg' + c + '" src="./img/default-user.jpg">' +
                    '</p>' +
                    '</figure>' +
                    '<div class="media-content">' +
                    '<div class="content">' +
                    '<p>' +
                    '<strong id ="userName">' +
                    '<a href="userprofile.html#' + data.user[index] + '">' +
                    data.user[index] +
                    '</a>' +
                    '</strong>' +
                    '<br>' +
                    '<p id="comment">' + data.testo[index] + '</p>' +
                    '<small>' + data.data[index].substring(0, data.data[index].length - 3) + '</small>' +
                    '<br>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '</article>';
                $("#comments").append(html);

                if (data.avatar[index] != null) {
                    $("#userImg" + c).attr('src', data.avatar[index]);
                }
                c++;
            });

        }
    },
    error: function (errorThrown) {
        console.log(errorThrown);
    }
})

$('#edit').click(function () {
    window.location.replace("editArt.html#" + GetURLParameter("#") + "");
});

$('#delete').click(function () {
    $.ajax({
        url: './php/delArt.php',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({
            id: GetURLParameter("#"),
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
    if (tmp > 0) {
        $.ajax({
            url: './php/pubcomment.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                commento: tinymce.get("commento").getContent(),
                token: localStorage.getItem('token'),
                id: GetURLParameter("#"),
            }),
            success: function (data) {
                if (data.ok) {
                $("#notifyComment").removeClass("is-danger").addClass("is-link");
                $("#notifyCommentText").text("Commento pubblicato");
                $("#notifyComment").css("display", "block");
                $('html,body').animate({
                    scrollTop: $('#notifyComment').offset().top}, 1000);
                setTimeout(function () {
                    window.location.reload();
                }, 1500);
                    
                } else {
                $("#notifyComment").removeClass("is-link").addClass("is-danger");
                $("#notifyCommentText").text("errore nella pubblicazione del commento");
                $("#notifyComment").css("display", "block");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    }else{
        $("#notifyComment").removeClass("is-link").addClass("is-danger");
        $("#notifyCommentText").text("Commento vuoto");
        $("#notifyComment").css("display", "block");
    }
})

$('#edit').click(function () {
    window.location.replace("editArt.html#" + GetURLParameter("#") + "");
});

$('#delete').click(function () {
    $.ajax({
        url: './php/delArt.php',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({
            id: GetURLParameter("#"),
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
        }
    });
});

$("#closeNotifC").click(function () {
    $("#notifyComment").css("display", "none");
    window.location.reload();
});
});