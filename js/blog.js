//WORKIN PROGRESS
$(document).ready(function() {
    $.ajax({
                url: 'http://localhost/php/getnews.php',
                type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Type', 'blog');
                },
                data: JSON.stringify({}),
                success: function(data) {
                    if (data.ok) {
                        var counter = 0;
                        var article = 0;
                        var string = "";
                        

                        $.each(data.rows, function(index){
                        console.log(data.rows[index].Testo);
                        console.log(data.rows[index].User);
                        console.log(data.rows[index].Id_A);
                        console.log(data.rows[index].Data);
                        //.replace(/(<([^>]+)>)/ig,"")
                        string = data.rows[index].Testo.substring(data.rows[index].Testo.indexOf('<h1>'),data.rows[index].Testo.indexOf("</h1>"));
                        var titolo = string.substring(string.indexOf('>')+1);
                        
                        if(!titolo) titolo="Empty Title";
                        console.log('string '+string);
                        var html = '<div class="column is-4 ">'+
                                    '<div class="card">'+
                                    '<div class="card-content has-background-white">'+
                                    '<p class="title is-4">'+
                                        titolo.toUpperCase() +
                                    '</p>'+
                                    '</div>'+   
                                    '<div class="card-image">'+
                                    '<figure class="image is-4by3">'+
                                    '<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">'+
                                    '</figure>'+
                                    '</div>'+
                                    '<div class="card-content has-background-white">'+
                                    '<div class="media">'+
                                    '<div class="media-left">'+
                                    '<figure class="image is-48x48">'+
                                    '<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">'+
                                    '</figure>'+
                                    '</div>'+
                                    '<div class="media-content">'+
                                    '<p class="title is-4">'+data.rows[index].User+'</p>'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="content ">'+
                                
                                    '<br>'+
                                    '<time >'+data.rows[index].Data+'</time>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>';
                        
                        if(counter == 0 || Number.isInteger(counter/3)){

                        $("#articlesContainer").append('<div id="articleColumns'+counter+'" class="columns is-centered " style="margin-top: 2rem;margin-bottom: 2rem"></div>');
                        //id="articleColumns" class="columns is-centered " style="margin-top: 2rem;margin-bottom: 2rem;
                            article=counter;
                        }
                        $("#articleColumns"+article).append(html);
                        
                        counter = counter + 1;
                    });
                        //riesco a recuperare i dati nell'array come si publicano nella pagina???
                    } else {
                        alert("errore nella pubblicazione");
                    }
                },
                error: function(errorThrown) {
                    console.log(errorThrown);
                }
            });


            
 /*   $(window).bind('scroll', function() {
        if($(window).scrollTop() >= $('#articlesContainer').offset().top + $('#articlesContainer').outerHeight() - window.innerHeight) {
            $('#articlesContainer').append('<div class="columns is-centered " style="margin-top: 2rem;margin-bottom: 2rem;"><div class="column is-4 ">Giuse Merda</div></div>');
        }
    });*/

    $("#loadArticles").click(function (){
        var counter= 0;
        $("#articlesContainer").append();
    });

            
        })