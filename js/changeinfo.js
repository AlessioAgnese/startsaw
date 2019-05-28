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
                    $('#nome').val(data.nome);
                    $('#cognome').val(data.cognome);
                    $('#residenza').val(data.residenza);
                    $('#biografia').val(data.biografia);
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
