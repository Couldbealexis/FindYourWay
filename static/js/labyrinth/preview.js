$(document).ready(function (){
    $(".cell").css("background-color", "grey");
    $(".Hcell").css("background-color", "grey");
    var arr = $.find("div[data-letter]");
    $(arr).each(function(){
        $(this).text(
            alphabet[ $(this).attr('data-letter') ]
        )
    })
});


function changeName(event) {
    var idx = $(event).attr('placeholder');
    var arr = $.find("div[data-id='" + idx + "']");
    var name = "";
    if($(event).val()){
            name = $(event).val();
        }
        else{
             name = idx
        }

    $(arr).each(function(){
        if($(event).val()){
            $(this).text( $(event).val() )
        }
        else{
             $(this).text( idx )
        }
    });
    lands.find(function (element) {
        if (element.id == idx){
            element.name = name
        }
    });
}


function update(jscolor, event) {
// 'jscolor' instance can be used as a string
    var idx = $(event).attr('data-colorid');
    var arr = $.find("div[data-id='" + idx + "']");

    $(arr).css("background-color", '#' + jscolor);
    lands.find(function (element) {
        if (element.id == idx ){
            element.color = jscolor.toString();
        }
    });

}

$('#btnNext').click(function(){
    if ($('#inputBegin').val() == "" || $('#inputEnd').val() == ""){
        swal({
          title: "You can't continue",
          text: "You haven't define a start or end point",
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Oh no!'
        });
        return;
    }

    var incomplete = false;
    lands.find(function (element) {
        if (element.name == element.id || element.color == "808080"){
            incomplete = true;
        }
    });
    if(incomplete){
        swal({
          title: 'Do you want to continue?',
          text: "Not all the lands has a name or a color (not default)",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, go ahead!'
        }).then(function(result) {
              incomplete = false;
              nextPage();
        })

    }else{
        nextPage();
    }
});


function nextPage(){
    sessionStorage.clear();
    sessionStorage.setItem('maze', JSON.stringify(maze));
    sessionStorage.setItem('lands', JSON.stringify(lands));
    sessionStorage.setItem('begin', JSON.stringify(coordBegin));
    sessionStorage.setItem('end', JSON.stringify(coordEnd));
    window.location.href = "/maze/character";
}

function selectBegin() {
    begin = true;
    end = false;
}


function selectEnd() {
    end = true;
    begin = false;
}


function selectCell(x, y){
    var letterX = alphabet[x];
    var pos = letterX + "," + y.toString() + " (" + x.toString() + "," + y.toString() + ")";
    if(begin){
        coordBegin.pop();
        coordBegin.pop();
        $('#inputBegin').val(pos);
        coordBegin.push(x);
        coordBegin.push(y);
        begin = false;
    }
    else if(end){
        coordEnd.pop();
        coordEnd.pop();
        $('#inputEnd').val(pos);
        coordEnd.push(x);
        coordEnd.push(y);
        end = false;
    }
}
