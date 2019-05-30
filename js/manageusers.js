$(document).ready(function(){
if('token' in localStorage){
    $.ajax({
        url:'http://localhost/php/checklogin.php',
        type:'post',
        dataType:'json',
        data:JSON.stringify({
            token:localStorage.getItem('token')
        }),
        success:function(data){
            if(data.ok && data.utente != null && data.perm==3){
            }
            else{
                alert("Non hai i permessi per accedere a questa pagina");
                window.location.replace("http://localhost");
            }
        },
        error:function(errorThrown){
            console.log(errorThrown);
        }
    })
}else{
    alert("Devi effetuare il login");
    window.location.replace("http://localhost");
}



})