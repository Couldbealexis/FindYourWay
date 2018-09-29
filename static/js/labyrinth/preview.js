$(document).ready(function (){
    $(".cell").css("background-color", "grey");
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

    $(arr).each(function(){
        if($(event).val()){
          $(this).text( $(event).val() )
        }
        else{
             $(this).text( idx )
        }

    })
}

function update(jscolor, event) {
// 'jscolor' instance can be used as a string
    var idx = $(event).attr('data-colorid');
    var arr = $.find("div[data-id='" + idx + "']");

    $(arr).css("background-color", '#' + jscolor);

}