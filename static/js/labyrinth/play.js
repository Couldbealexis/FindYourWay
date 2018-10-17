
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
        var rowNumber = document.createElement('div');
        var rowNumberCls = document.createAttribute('class');
        rowNumberCls.value = "Hcell";
        rowNumber.textContent = (y+1).toString();
        rowNumber.setAttributeNode(rowNumberCls);
        rowDiv.appendChild(rowNumber);

        for(var x=0; x<maze[y].length; x++){
            var newMazeCell = document.createElement('div');
            var attribRow = document.createAttribute('data-row');
            var attribColumn = document.createAttribute('data-column');
            var cls = document.createAttribute('class');
            attribRow.value = y;
            attribColumn.value = x;
            cls.value = "cell";
            newMazeCell.textContent = (maze[y][x]).toString();
            newMazeCell.setAttributeNode(attribRow);
            newMazeCell.setAttributeNode(attribColumn);
            newMazeCell.setAttributeNode(cls);
            if(x==0 && y==0){
                newMazeCell.focus();
            }
            rowDiv.appendChild(newMazeCell);
        }
    }


    // $(".cell").css("background-color", "grey");
    $(".Hcell").css("background-color", "grey");
    var arr = $.find("div[data-letter]");
    $(arr).each(function(){
        $(this).text(
            alphabet[ $(this).attr('data-letter') ]
        )
    })
});



