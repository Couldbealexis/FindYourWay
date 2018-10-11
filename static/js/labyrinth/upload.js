$(function () {
    document.getElementById('fileInput').onchange = function () {
        var file = this.files[0];
        var ext = file.name.split('.').pop();
        if (ext == "txt"){
            $("button").prop("disabled", this.files.length == 0);

            var reader = new FileReader();
            reader.onload = function(progressEvent){
            // Entire file
            //     console.log("Entire File");
            //     console.log(this.result);
            //     console.log("###");
            //     console.log("By Lines");
                // By lines
                var lines = this.result.split('\n');
                // console.log(lines);
                for(var line = 0; line < lines.length; line++){
                  // console.log(lines[line]);
                    console.log( (line + 1).toString() + " line");
                  var one_line = lines[line].split(',');
                  console.log(one_line)
                  for(var land =0; land<one_line.length; land++){
                      console.log(land, one_line[land], one_line[land].length);
                      one = one_line[land];
                      if(!isNaN(one)) {
                        console.log('could not parse')
                      }
                      else{
                        console.log('parse good')
                      }
                  }

                }
            };
            reader.readAsText(file);

        }
        else{
            swal({
              title: 'Oh no!',
              text: "You need to upload a .txt archive",
              type: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'I understand'
            })
        }

    };
});



/*
$("#form").submit(function(e){
    var formData = new FormData(document.getElementById("formuploadajax"));
    formData.append("archive", $('#form input').get(0).files[0]);
    e.preventdefault();
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
  });
*/