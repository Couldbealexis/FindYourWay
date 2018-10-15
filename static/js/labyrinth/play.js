
$(document).ready(function (){
    var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    maze = sessionStorage.getItem('maze');
    maze = JSON.parse(maze);
    lands = sessionStorage.getItem('lands');
    lands = JSON.parse(lands);
    begin = sessionStorage.getItem('begin');
    begin = JSON.parse(begin);
    end = sessionStorage.getItem('end');
    end = JSON.parse(end);

    var mazeHeader = document.getElementById('mazeHeader');
    for(var i = 0; i < maze[1].length; i++){
        var newDiv = document.createElement('div');
        var att = document.createAttribute('data-letter');
        var cls = document.createAttribute('class');
        att.value = i;
        cls.value = "Hcell";
        newDiv.setAttributeNode(att);
        newDiv.setAttributeNode(cls);
        mazeHeader.appendChild(newDiv);
    }

    var leftSide = document.getElementById('leftSide');
    for(var y=0; y<maze.length; y++){
        var rowDiv = document.createElement('div');
        var cls = document.createAttribute('class');
        cls.value = "row";
        rowDiv.setAttributeNode(cls);
        leftSide.appendChild(rowDiv);
    }


    $(".cell").css("background-color", "grey");
    $(".Hcell").css("background-color", "grey");
    var arr = $.find("div[data-letter]");
    $(arr).each(function(){
        $(this).text(
            alphabet[ $(this).attr('data-letter') ]
        )
    })
});



