<!DOCTYPE html>
<html>
<?php
session_start();
?>

<head>
    <!--<script src="https://cloud.tinymce.com/5/tinymce.min.js" apiKey=d4cxhl8d1f1x9a3g76ks6c1zk61f65dwy2yopjtc0d7woiwd></script>-->
    <script src="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=d4cxhl8d1f1x9a3g76ks6c1zk61f65dwy2yopjtc0d7woiwd"></script>
    <script>
        tinymce.init({
            selector: 'textarea'
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
    //WORK IN PROGRESS : FUNZIONE PER DISATTIVARE BOTTONE SE IL TESTO E VUOTO O SOLO SPAZI (E MAGARI MENO DI X CARATTERI)
    //tinymce.activeEditor.on('keyup', function(ed, e) {
      //  console.debug(
      //      tinyMCE.activeEditor.getContent({format : 'text'})
      //  )
   // });
    /*
    tinymce.activeEditor.on('keyup', function() {
        var articolo = tinymce.get("articolo").getContent({format : 'text'});;
            console.log(articolo);
            if (articolo != '') {
                console.log("2");
                $('#publish').attr("disabled", false);
            } else {
                console.log("3");
                $('#publish').attr("disabled", true);
            }
        });*/

    $(document).ready(function() {
        $('#publish').click(function() {
            $.ajax({
                url: 'http://localhost/php/pubarticle.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    articolo: tinymce.get("articolo").getContent(),
                }),
                success: function(data) {
                    console.log(l);
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
        })
    })
</script>

</html>