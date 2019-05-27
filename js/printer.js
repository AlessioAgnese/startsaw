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
                    if(data.ok && data.utente != false && data.perm==3){
                        tinymce.init({
                            selector: 'textarea',
                            language_url: './js/it_IT.js',
                            language: 'it_IT',});
                            $('#articolo').css("visibility", "visible");
                            $('#publish').css("visibility", "visible"); 
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

$(document).ready(function() {
        $('#publish').click(function() {
            tmp=tinymce.get('articolo').getContent().toString().length;
           if(tmp>0 && tmp<3200){
            $.ajax({
                url: 'http://localhost/php/pubarticle.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    articolo: tinymce.get("articolo").getContent(),
                    token: localStorage.getItem('token')
                }),
                success: function(data) {
                    if (data.ok) {
                        alert("articolo pubblicato");
                    } else {
                        alert("errore nella pubblicazione");
                    }
                },
                error: function(errorThrown) {
                    console.log(errorThrown);
                }
            })
           }else{
               if(tmp>0)
                alert("Articolo troppo lungo");
               else 
                alert("Impossibile pubblicare articolo vuoto");
               }
        })
    })