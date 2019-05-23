$(document).ready(function(){
    if('token' in localStorage){
        $.ajax({
            url:'http://localhost/mlml/checklogin.php',
            type:'post',
            dataType:'json',
            data:JSON.stringify({
                token:localStorage.getItem('token')
            }),
            success:function(data){
                if(data.ok && data.utente != false){
                    //$('#userLogged').text(data.utente.User);
                    //$('#loginRegisterButton').attr("href", "./php/controlpanel.php");
                    alert("Still logged");
                    
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
})

