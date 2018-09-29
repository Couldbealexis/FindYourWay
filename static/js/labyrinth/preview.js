
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
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
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
