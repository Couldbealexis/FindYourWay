function changeName(event) {
    var idx = $(event).attr('placeholder');
    var arr = $.find("div[data-id='" + idx + "']");

    $(arr).each(function(){
        $(this).text( $(event).val() )
    })

    console.log(event)
}