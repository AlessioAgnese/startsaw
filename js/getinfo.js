function GetURLParameter(){
    var user= window.location.href.substr(window.location.href.indexOf('#',+1));
    if(user != undefined){
        return user;
    }
    else{
        alert("error 404 user not found");
    }
}
$(document).ready(function(){
$.ajax({
    url: 'http://localhost/php/manageImg.php',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Authentication', GetURLParameter());
    },
    success: function (data) {
        if (data.ok) {

            if(data.dataUrl != null ) {
                $('#profilePic').attr('src', data.dataUrl); 
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

$.ajax({
    url: 'http://localhost/php/userinfo.php',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Type', 'view');
        xhr.setRequestHeader('X-Authentication', GetURLParameter());

    },
    success: function (data) {
        if (data.ok) {
            $('#nome').val(data.nome);
            $('#cognome').val(data.cognome);
            $('#residenza').val(data.residenza);
            $('#biografia').val(data.biografia);
        } else {
            alert("Errore nel recupero dei dati");
        }
    },
    error: function (errorThrown) {
        console.log(errorThrown);
    }
})
})