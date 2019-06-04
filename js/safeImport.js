document.querySelector('#fileI').addEventListener('change', function (e) {
    var file = this.files[0];
    if (file.size > 16777215) {
        $("#notif").removeClass("is-link").addClass("is-danger");
        $("#notif").css("display", "block");
        $("#notifText").text("File troppo grande ,deve essere massimo 16MB");
        return false;
    }
    checkMIME(file).then(x => {
        var fd = new FormData();
        fd.append("fileI", file);
        fd.append("token", localStorage.getItem('token'));
        var xhr = new XMLHttpRequest();
        xhr.open('POST', './php/manageImg.php', true);
        xhr.send(fd);

        $("#notif").removeClass("is-danger").addClass("is-link");
        $("#notif").css("display", "block");
        $("#notifText").text("Immagine modificata con successo");

    }).catch(y => {
        $("#notif").removeClass("is-link").addClass("is-danger");
        $("#notif").css("display", "block");
        $("#notifText").text("Inserisci un'immagine");
        return false;
    })
}, false);