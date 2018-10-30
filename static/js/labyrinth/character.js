
$(document).ready(function () {
    setTableHeaders();

});


function setTableHeaders(){
    $("#characters-table").append("<th>Heroe</th>");
    lands.forEach(function(land, landIndex){
        var appendableRow = "<th><span style='color: #" + land.color + "'>" + land.name + "</span></th>";
        //var appendableRow = "<th><span style='color: black'>" + land.name + "</span></th>";
        $("#characters-table").append(appendableRow);
    });
}


$(".thumbnail").on("click", function(e){
    var jqCharacter = $(e.currentTarget);
    jqCharacter.hasClass("selected") ?
    deselectACharacter(jqCharacter) : selectACharacter(jqCharacter);
});


function selectACharacter(jqCharacter){
    if(selectedCharacters.length < 4){
        jqCharacter.addClass("selected");

        pushableObject = { 'name': jqCharacter.attr('name') };
        lands.forEach(function(land, index){
            pushableObject['cost-' + land.name] = 0;
        });
        selectedCharacters.push(pushableObject);

        refreshTable();
        disableProperty();

    }
}


function deselectACharacter(jqCharacter){
    var foundIndex = selectedCharacters.findIndex(function(element){
        return element.name == jqCharacter.attr("name");
    });

    selectedCharacters.splice( foundIndex, 1 );
    jqCharacter.removeClass("selected");

    refreshTable();
    disableProperty();
}


function refreshTable(){
    $("#characters-table tr").remove();
    selectedCharacters.forEach(function(character, charIndex){
        var appendableRow = "<tr>" +
        "<td>" + character.name + "</td>";

        lands.forEach(function(land, landIndex){
            var val = character['cost-' + land.name];
            val = val === undefined ? 0 : val;

            appendableRow += "<td>" +
                "<input type='number' style='width: 100%' class='cost-input' min='0' value="
                + val +
                " land-name=" + land.name + " character-index=" + charIndex + "></td>"
        });
        appendableRow += "</tr>";

        $("#characters-table").append(appendableRow);
    });

}


function disableProperty(){
    selectedCharacters.length == 0 ? $("#next").attr('disabled', 'disabled') : $("#next").removeAttr('disabled');
}


$("#characters-table").on("input", ".cost-input", function(costInput){
    var jqTarget = $(costInput.currentTarget);
    var character = selectedCharacters[jqTarget.attr('character-index')];
    character['cost-' + jqTarget.attr('land-name')] = jqTarget.val();
});


$("#next").on("click", function(){
    if($(this).attr('disabled') === undefined)
        window.location.href = "/maze/play";
    else {
      swal({
        title: "Oooops!",
        text: "You must select at least one character",
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
    }
});

