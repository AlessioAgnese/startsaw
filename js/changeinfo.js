$(document).ready(function(){
    if('token' in localStorage){
        $.ajax({
            url:'http://localhost/php/userinfo.php',
            type:'get',
            dataType:'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Type', 'view');
                xhr.setRequestHeader('X-Authentication',localStorage.getItem('token'));

            },
            success:function(data){
                if(data.ok){
                    $('#nome').attr("placeholder",data.nome);
                    $('#cognome').attr("placeholder",data.cognome);
                    $('#residenza').attr("placeholder",data.residenza);
                    $('#bio').attr("placeholder",data.biografia);
                }
                else{
                    alert("La sessione è scaduta");

                    localStorage.removeItem('token'); 
                    
                    }
            },
            error:function(errorThrown){
                console.log(errorThrown);
            }
        })
    }
});

$(document).ready(function () {
    $('#submitChange').click(function () {
        $.ajax({
            url:'http://localhost/php/userinfo.php',
            type:'post',
            dataType:'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Type', 'edit');
            },
            data:JSON.stringify({
                token:localStorage.getItem('token'),
                nome:$('#nome').val().trim().toString(),
                cognome:$('#cognome').val().trim().toString(),
                residenza:$('#residenza').val().trim().toString(),
                biografia:$('#biografia').val().trim().toString(),
            }),
            success: function (data) {
                if (data.ok) {
                    $("#notif").removeClass("is-danger").addClass("is-link");
                    $("#notif").css("display","block");
                    $("#notifText").text("Modifiche effettuate con successo");
                   

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
    })
});

$(document).ready(function () {
    $('#ChangePdw').click(function () {
        $.ajax({
            url:'http://localhost/php/userinfo.php',
            type:'post',
            dataType:'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Type', 'change');
            },
            data:JSON.stringify({
                token:localStorage.getItem('token'),
                oldPwd:$('#oldPwd').val().toString(),
                newPwd:$('#pwdR').val().toString(),
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
    })
});


