$(function () {
    document.getElementById('fileInput').onchange = function () {
        var file = this.files[0];
        var files_length = this.files.length;
        var ext = file.name.split('.').pop();
        var err_flag = false;
        if (ext == "txt"){

            var reader = new FileReader();
            reader.onload = function(progressEvent){
                var lines = this.result.split('\n');
                for(var line = 0; line < lines.length; line++){
                    if(lines[line].length > 1){
                        var one_line = lines[line].split(',');
                        for(var land =0; land<one_line.length; land++){
                            one = one_line[land];
                            one = parseFloat(one);
                            if(isNaN(one)) {
                                console.log(line, land, one);
                                err_flag = true;
                            }
                        }
                    }
                }
                if(err_flag == false){
                    $("button").prop("disabled", files_length == 0);
                }
                else{
                    swal({
                      title: 'Oh no!',
                      text: "Your txt is not well structured, please check.",
                      type: 'error',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'I understand'
                    });
                    $("#submitbtn").prop("disabled", true);
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
