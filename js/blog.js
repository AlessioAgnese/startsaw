
$(document).ready(function () {
    var global;
    var counter = 0;

    $.ajax({
        url: './php/getnews.php',
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Type', 'blog');
        },
        data: JSON.stringify({}),
        success: function (data) {
            if (data.ok) {
                var article = 0;
                var string = "";
                var immagine = [];
                var rex = new RegExp(/((?:https?\:\/\/)(?:[a-zA-Z]{1}(?:[\w\-]+\.)+(?:[\w]{2,5}))(?:\:[\d]{1,5})?\/(?:[^\s\/]+\/)*(?:[^\s]+\.(?:jpe?g|gif|png))(?:\?\w+=\w+(?:&\w+=\w+)*)?)|(data:image\/([a-zA-Z]*);base64,([^\"]*))/g);
                
                $.each(data.id, function (index) {

                    string = data.testo[index].substring(data.testo[index].indexOf('<h1>'), data.testo[index].indexOf("</h1>"));
                    if(data.testo[index].includes('<img')){
                       
                        while((immagine = rex.exec( data.testo[index]))!==null) {
                            
                           }
                           immagine = rex.exec( data.testo[index] );
                        
                    }
                    else{
                        immagine[0]="./img/image-not-available.jpg";
                    }
                  
                   
    
                    var titolo = string.substring(string.indexOf('>') + 1);
                    if (!titolo) titolo = "Empty Title";
                    var html = '<div class="column is-4 ">' +
                        '<a href="articolo.html#' + data.id[index] + '" class="card">' +
                        '<div class="card-content has-background-white">' +
                        '<p class="title is-5 is-capitalized">' +
                        titolo.trim() +
                        '</p>' +
                        '</div>' +
                        '<div class="card-image">' +
<<<<<<< HEAD
                        '<figure class="4by3">' +
                        '<img  src="'+immagine[0]+'">' +
=======
                        '<figure >' +
                        '<img class="imageBlog" src="'+immagine[0]+'">' +
>>>>>>> d7f12c549bcf67b682f57a5ced8b34eca29b1bea
                        '</figure>' +
                        '</div>' +
                        '<div class="card-content has-background-white">' +
                        '<div class="content ">' +
                        '<br>' +
                        '<time >' + data.data[index].substring(0,data.data[index].length-3) + '</time>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>';
                    
                    
                    if (counter == 0 || Number.isInteger(counter / 3)) {

                        $("#articlesContainer").append('<div id="articleColumns' + counter + '" class="columns is-centered " style="margin-top: 2rem;margin-bottom: 2rem"></div>');
                        article = counter;
                    }
                    $("#articleColumns" + article).append(html);
                   
                    counter++;
                    global = data.id[index];
                   
                });

            } else {
                alert("errore nella pubblicazione");
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });

    $("#loadArticles").click(function () {
        
        $.ajax({
            url: './php/getnews.php',
            type: 'POST',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Type', 'loadA');

            },
            data: JSON.stringify({
                idB: global
            }),
            success: function (data) {
                if (data.ok) {
                    var article = 0;
                    var string = "";
                    var immagine = [];
                    var rex = new RegExp(/((?:https?\:\/\/)(?:[a-zA-Z]{1}(?:[\w\-]+\.)+(?:[\w]{2,5}))(?:\:[\d]{1,5})?\/(?:[^\s\/]+\/)*(?:[^\s]+\.(?:jpe?g|gif|png))(?:\?\w+=\w+(?:&\w+=\w+)*)?)/g);

                    $.each(data.id, function (index) {
                        
                        string = data.testo[index].substring(data.testo[index].indexOf('<h1>'), data.testo[index].indexOf("</h1>"));
                        if(data.testo[index].includes('<img')){
                            
                            while((immagine = rex.exec( data.testo[index]))!==null) {
                            
                            }
                            immagine = rex.exec( data.testo[index] );
 
 
                        }
                        else{
                            immagine[0]="./img/image-not-available.jpg";
                        }
                        var titolo = string.substring(string.indexOf('>') + 1);
                        if (!titolo) titolo = "Empty Title";
                        var html = '<div class="column is-4 ">' +
                            '<a href="articolo.html#' + data.id[index] + '" class="card">' +
                            '<div class="card-content has-background-white">' +
                            '<p class="title is-5" is-capitalized>' +
                            titolo.trim() +
                            '</p>' +
                            '</div>' +
                            '<div class="card-image">' +
<<<<<<< HEAD
                            '<figure class="4by3">' +
                            '<img src="'+immagine[0]+'">' +
=======
                            '<figure >' +
                            '<img class="imageBlog" src="'+immagine[0]+'">' +
>>>>>>> d7f12c549bcf67b682f57a5ced8b34eca29b1bea
                            '</figure>' +
                            '</div>' +
                            '<div class="card-content has-background-white">' +
                            '<div class="content ">' +
                            '<br>' +
                            '<time >' + data.data[index].substring(0,data.data[index].length-3) + '</time>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>';

                        if (counter == 0 || Number.isInteger(counter / 3)) {

                            $("#articlesContainer").append('<div id="articleColumns' + counter + '" class="columns is-centered " style="margin-top: 2rem;margin-bottom: 2rem"></div>');
                            article = counter;
                        }
                        $("#articleColumns" + article).append(html);

                        counter++;
                        global = data.id[index];

                    });
                 } else {
                     $("#contLoad").html("<p class='subtitle has-text-danger'>Non ci sono altri articoli da caricare</p>");
                    $("#loadArticles").css("display","none");
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        });
    });

 

})