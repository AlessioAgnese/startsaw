//WORKIN PROGRESS
$(document).ready(function() {
    $.ajax({
                url: 'http://localhost/php/getblog.php',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({}),
                success: function(data) {
                    if (data.ok) {
                        $.each(data.rows, function(index){
                        console.log(data.rows[index].Testo);
                        console.log(data.rows[index].User);
                        console.log(data.rows[index].Id_A);
                        console.log(data.rows[index].Data);});
                        //alert("pubblicato?");
                        //$('#parent').append('<div>hello</div>');    
                        //$windows.body.append( data.rows[0].Data );
                    } else {
                        alert("errore nella pubblicazione");
                    }
                },
                error: function(errorThrown) {
                    console.log(errorThrown);
                }
            })
        })