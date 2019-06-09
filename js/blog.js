
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
                var rex = new RegExp(/<img.*?src="([^">]*\/([^">]*?))".*?>/g);
                
                $.each(data.id, function (index) {
                    //immagine = rex.exec( data.testo[index] );
                    string = data.testo[index].substring(data.testo[index].indexOf('<h1>'), data.testo[index].indexOf("</h1>"));
                    
                    if(data.testo[index].includes('<img')){
                        
                        immagine = rex.exec( data.testo[index] );
                        console.log("immagine presente"+immagine);
                        
                    }
                    else{
                        immagine="./img/image-not-available.jpg";
                        console.log("immagine  non presente"+immagine);
                    }
                   
    
                    var titolo = string.substring(string.indexOf('>') + 1);
                    if (!titolo) titolo = "Empty Title";
                    var html = '<div class="column is-4 ">' +
                        '<a href="articolo.html#' + data.id[index] + '" class="card">' +
                        '<div class="card-content has-background-white">' +
                        '<p class="title is-5">' +
                        titolo.toUpperCase() +
                        '</p>' +
                        '</div>' +
                        '<div class="card-image">' +
                        '<figure class="image is-4by3">' +
                        '<img src="'+immagine+'">' +
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
                    var rex = new RegExp(/<img.*?src="([^">]*\/([^">]*?))".*?>/g);

                    $.each(data.id, function (index) {
                        
                        string = data.testo[index].substring(data.testo[index].indexOf('<h1>'), data.testo[index].indexOf("</h1>"));
                        if(data.testo[index].includes('<img')){
                            immagine = rex.exec( data.testo[index] );
                             
                            
                        }
                        else{
                            immagine="./img/image-not-available.jpg";
                        }
                        var titolo = string.substring(string.indexOf('>') + 1);
                        if (!titolo) titolo = "Empty Title";
                        var html = '<div class="column is-4 ">' +
                            '<a href="articolo.html#' + data.id[index] + '" class="card">' +
                            '<div class="card-content has-background-white">' +
                            '<p class="title is-5">' +
                            titolo.toUpperCase() +
                            '</p>' +
                            '</div>' +
                            '<div class="card-image">' +
                            '<figure class="image is-4by3">' +
                            '<img src="'+immagine+'">' +
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