
$(document).ready(function () {
    setTableHeaders();
    maze = sessionStorage.getItem('maze');
    maze = JSON.parse(maze);
    begin = sessionStorage.getItem('begin');
    begin = JSON.parse(begin);
    end = sessionStorage.getItem('end');
    end = JSON.parse(end);
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
    var characterSrc = e.currentTarget.getElementsByTagName('img')[0].src;
    jqCharacter.hasClass("selected") ?
    deselectACharacter(jqCharacter) : selectACharacter(jqCharacter, characterSrc);
});


function selectACharacter(jqCharacter, characterSrc){
    if(selectedCharacters.length < 4){
        jqCharacter.addClass("selected");

        var pushableObject = { 'name': jqCharacter.attr('name'), 'src': characterSrc };
        lands.forEach(function(land, index){
            pushableObject[land.id] = 0;
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
            var val = character[land.id];
            val = val === undefined ? 0 : val;

            appendableRow += "<td>" +
                "<input type='number' style='width: 100%' class='cost-input' min='0' value="
                + val + " land-name=" + land.name +
                " land-id=" + land.id + " character-index=" + charIndex + "></td>"
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
    character[jqTarget.attr('land-id')] = jqTarget.val();
});


// given an id returns the id with that id
function findLandById(search){
    for(var i = 0; i<lands.length; i++){
        if(lands[i].id == search ){
            var land = lands[i]
        }
    }
    return land
}


$("#next").on("click", function(){
    if(selectedCharacters.length > 0){
        let error = false;
        let beginLand = findLandById( maze[begin[1]][begin[0]] );
        // let endLand = findLandById( maze[end[1]][end[0]] );
        for(let i= 0; i<selectedCharacters.length; i++){
            for(let l=0; l<lands.length; l++){
                if(selectedCharacters[i][lands[l].id] < 0){
                    if(lands[l].id == beginLand.id){
                        error = true;
                    }
                    // if(lands[l].id == endLand.id){
                    //     error = true;
                    // }
                }
            }
        }
        if(error){
            swal({
                title: "Oh no! :(",
                text: "One of the characters can't start in the land " + beginLand.name,
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            });
        }else{
            sessionStorage.setItem('characters', JSON.stringify(selectedCharacters));
            window.location.href = "/maze/play";
        }
    }
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

