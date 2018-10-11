
$(document).ready(function (){
    $(".cell").css("background-color", "grey");
    $(".Hcell").css("background-color", "grey");
    var arr = $.find("div[data-letter]");
    var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
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

}


function checkMaze(){
    var incomplete = false;
    lands.find(function (element) {
        if (element.name == element.id || element.color == "808080"){
            incomplete = true;
        }
    });
    console.log(incomplete)
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
          if (result) {
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })

    }
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
    console.log(x, y)
    if(begin){
        $('#inputBegin').val(x.toString() + "," + y.toString())
        coordBegin.append(x);
        coordBegin.append(y);
        begin = false
    }
    else if(end){
        $('#inputEnd').val(x.toString() + "," + y.toString())
        coordEnd.append(x);
        coordEnd.append(y);
        end = false
    }
}


/*
<script src="jscolor.js"></script>

<div style="position:absolute; left:280px; top:10px;">
    toHEXString = <span id="hex-str"></span><br />
    toRGBString = <span id="rgb-str"></span><br />
    R, G, B = <span id="rgb"></span><br />
    H, S, V = <span id="hsv"></span>
</div>

<input class="jscolor {onFineChange:'update(this)'}" value="ffcc00">

<script>
function update(picker) {
    document.getElementById('hex-str').innerHTML = picker.toHEXString();
    document.getElementById('rgb-str').innerHTML = picker.toRGBString();

    document.getElementById('rgb').innerHTML =
        Math.round(picker.rgb[0]) + ', ' +
        Math.round(picker.rgb[1]) + ', ' +
        Math.round(picker.rgb[2]);

    document.getElementById('hsv').innerHTML =
        Math.round(picker.hsv[0]) + '&deg;, ' +
        Math.round(picker.hsv[1]) + '%, ' +
        Math.round(picker.hsv[2]) + '%';
}
</script>
 */
