$(document).ready(function(){
    if('token' in localStorage){
        $.ajax({
            url:'http://localhost/php/userinfo.php',
            type:'post',
            dataType:'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Type', 'view');
            },
            data:JSON.stringify({
                token:localStorage.getItem('token')
            }),
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
                    alert("Cambio");
                    window.location.reload();

                } else {
                    alert("Failure");
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
                newPwd:$('#newPwd').val().toString(),
            }),
            success: function (data) {
                if (data.ok) {
                    alert("Cambio");
                    window.location.reload();
                } else {
                    alert("Failure");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
});


