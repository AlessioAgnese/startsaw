<!DOCTYPE html>
<html>
<?php
session_start();
?>

<head>
    <script src="https://cloud.tinymce.com/5/tinymce.min.js"></script>
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
    <button id="publish">Pubblica</button>

</body>
<script>
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