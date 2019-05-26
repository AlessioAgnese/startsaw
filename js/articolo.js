//WORKIN PROGRESS
tinymce.init({
    selector: 'textarea',
    language_url: './tinymce/it_IT.js',
    language: 'it_IT',

     });
$(document).ready(function() {
    tmp=GetURLParameter('a');
    console.log(tmp);
    $.ajax({
                url: 'http://localhost/php/getnews.php',
                type: 'POST',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'article');
                },
                data:JSON.stringify({
                articolo : tmp,
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
function GetURLParameter(sParam){
        var sPageURL= window.location.search.substring(1);
        var sParameterName=sPageURL.split('=');
        if(sParameterName[0]=sParam) return sParameterName[1];
    }

    $(document).ready(function() {
            $('#publish').click(function() {
                tmp=tinymce.get('articolo').getContent().toString().length;
               if(tmp>0 && tmp<3200){
                $.ajax({
                    url: 'http://localhost/php/pubcomment.php',
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