tinymce.init({
    selector: 'textarea',
    language_url: './tinymce/it_IT.js',
    language: 'it_IT',

     });
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