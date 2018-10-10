$(function () {
    document.getElementById('fileInput').onchange = function () {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
            // Entire file
            console.log(this.result);
            // By lines
            var lines = this.result.split('\n');
            var list = [];
            for (var line = 0; line < lines.length; line++) {
                list.push(lines[line]);
            }
            console.log(list)
        };
        reader.readAsText(file);
    };
});


 $("#fileInput").change(function()
  {
    $("button").prop("disabled", this.files.length == 0);
  });
/*
$("#form").submit(function(){
    var formData = new FormData(document.getElementById("formuploadajax"));
    formData.append("archive", $('#form input').get(0).files[0]);

    $.ajax({
        url: 'play/',
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function(archive) {
            // alert('well done')
            // alert(archive.responseText);
        },
        error: function () {
            alert('Oh no, It seems that your Labirynth isn\'t correct.');
        }
    });
    return true;
  });
*/