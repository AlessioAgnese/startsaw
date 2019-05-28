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
                        $.each(data.rows, function(index){
                        console.log(data.rows[index].Testo.replace(/(<([^>]+)>)/ig,""));
                        console.log(data.rows[index].User);
                        console.log(data.rows[index].Id_A);
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