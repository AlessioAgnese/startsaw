function GetURLParameter(){
        var id= window.location.href.substr(window.location.href.indexOf('#')+1);
        if(id != undefined){
            return id;
        }
        else{
            alert("errore");
        }
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
                        console.log("testo "+data.Testo);
                        console.log("user "+data.User);
                        console.log("data "+data.Data);
                        $("#contentArticle").append(data.Testo+'<br><time>'+data.Data+'</time>');
                        $("*#author").append(data.User);
                        //riesco a recuperare i dati nell'array come si publicano nella pagina???
                    } else {
                        alert("errore nella pubblicazione");
                    }
                },
                error: function(errorThrown) {     
                    console.log(errorThrown);
                }
            })
            
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
                                    var html = '<article class="media">'+
                                            '<figure class="media-left">'+
                                            '<p class="image is-64x64">'+
                                            '<img id ="userImg" src="https://bulma.io/images/placeholders/128x128.png">'+
                                            '</p>'+
                                            '</figure>'+
                                            '<div class="media-content">'+
                                            '<div class="content">'+
                                            '<p>'+
                                            '<strong id ="userName">'+data.rows[index].User+'</strong>'+
                                            '<br>'+
                                            '<p id="comment">'+data.rows[index].Testo+'</p>'+
                                            '<small>'+data.rows[index].Data+'</small>'+
                                            '<br>'+
                                            '</p>'+
                                            '</div>'+
                                            '</div>'+
                                            '</article>';

                                    console.log("testo2 "+data.rows[index].Testo);
                                    console.log("user2 "+data.rows[index].User);
                                    console.log("data2 "+data.rows[index].Data);
                                    $("#comments").append(html);
                                });
                                    
                                //riesco a recuperare i dati nell'array come si publicano nella pagina???
                            } else {
                                alert("errore nella pubblicazione");
                            }
                        },
                        error: function(errorThrown) {     
                            console.log(errorThrown);
                        }
                    })
                    
        if('token' in localStorage){
            $.ajax({
                     url:'http://localhost/php/checklogin.php',
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
            $('#publish').click(function() {
                tmp=tinymce.get('commento').getContent().toString().length;
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
                    alert("commento troppo lungo");
                   else 
                    alert("Impossibile pubblicare articolo vuoto");
                   }
            })
        })