function GetURLParameter(sParam){
        var sPageURL= window.location.search.substring(1);
        var sParameterName=sPageURL.split('=');
        if(sParameterName[0]=sParam) return sParameterName[1];
    }
$(document).ready(function() {
    $.ajax({
                url: 'http://localhost/php/getnews.php',
                type: 'POST',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'article');
                },
                data:JSON.stringify({
                articolo : GetURLParameter('a'),
                }),
                success: function(data) {
                    if (data.ok) {
                        console.log(data.Testo);
                        console.log(data.User);
                        console.log(data.Data);
                        //riesco a recuperare i dati nell'array come si publicano nella pagina???
                    } else {
                        alert("errore nella pubblicazione");
                    }
                },
                error: function(errorThrown) {     
                    console.log(errorThrown);
                }
            })
        })
        $(document).ready(function() {
            $.ajax({
                        url: 'http://localhost/php/getnews.php',
                        type: 'POST',
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-Type', 'comments');
                        },
                        data:JSON.stringify({
                        articolo : GetURLParameter('a'),
                        }),
                        success: function(data) {
                            if (data.ok) {
                                $.each(data.rows, function(index){
                                    console.log(data.rows[index].Testo);
                                    console.log(data.rows[index].User);
                                    console.log(data.rows[index].Data);});
                                //riesco a recuperare i dati nell'array come si publicano nella pagina???
                            } else {
                                alert("errore nella pubblicazione");
                            }
                        },
                        error: function(errorThrown) {     
                            console.log(errorThrown);
                        }
                    })
                })    
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
                            if(data.ok && data.utente != null){

                                tinymce.init({
                                    selector: 'textarea',
                                    language_url: './js/it_IT.js',
                                    language: 'it_IT',});
                                    //test?
                                    console.log(data.utente);
                                    $('#commento').css("visibility", "visible");
                                    $('#publish').css("visibility", "visible"); 
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
            })

    $(document).ready(function() {
            $('#publish').click(function() {
                tmp=tinymce.get('articolo').getContent().toString().length;
               if(tmp>0 && tmp<500){
                $.ajax({
                    url: 'http://localhost/php/pubcomment.php',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        commento: tinymce.get("commento").getContent(),
                        token: localStorage.getItem('token'),
                        id: GetURLParameter('a'),
                    }),
                    success: function(data) {
                        if (data.ok) {
                            alert("Commento pubblicato");
                            location.reload();
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