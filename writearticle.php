<!DOCTYPE html>
<html lang="it">

<?php
session_start();
?>

<head>
    <script src="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=d4cxhl8d1f1x9a3g76ks6c1zk61f65dwy2yopjtc0d7woiwd"></script>
    <script>
        tinymce.init({
            selector: 'textarea',
            language_url: './tinymce/it_IT.js',
            language: 'it_IT',

             });
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <title>
        Progetto SAW
    </title>
    <link rel="stylesheet" type="text/css" href="./css/style.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"> </script>
    <script type="text/javascript" language="javascript">
    </script>
</head>

<body>


    <textarea id="articolo"></textarea>
    <button id="publish" >Pubblica</button>

</body>


<script>

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
</script>

</html>