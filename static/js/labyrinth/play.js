
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
    characters = sessionStorage.getItem('characters');
    characters = JSON.parse(characters);

    // get all the characters and draw them
    var characters_row = document.getElementById('characters-row');
    for (var i=0; i<characters.length; i++){
        // Parent Div
        var characterDiv = document.createElement('div');
        characterDiv.setAttribute('characterDiv-id', i);
        characterDiv.setAttribute("style", "margin-right: 20px");
        // Image
        var characterImage = document.createElement('img');
        characterImage.setAttribute("src", characters[i].src);
        characterImage.setAttribute("character-id", i);
        characterImage.setAttribute("height", "100px");
        characterImage.setAttribute("width", "100px");
        characterImage.setAttribute("alt", characters[i].name);
        // Buttons
        var buttonsDiv = document.createElement('div');
        buttonsDiv.setAttribute('id', 'buttons-row');
        buttonsDiv.setAttribute('class', 'row');
        var infoBtn = document.createElement('button');
        infoBtn.setAttribute('id', 'infoBtn');
        infoBtn.setAttribute('character-btn', i);
        infoBtn.setAttribute('class', 'btn btn-info btn-md');
        infoBtn.textContent = 'Info';
        var playBtn = document.createElement('button');
        playBtn.setAttribute('id', 'playBtn');
        playBtn.setAttribute('character-btn', i);
        playBtn.setAttribute('class', 'btn btn-success btn-md');
        playBtn.textContent = 'Play';
        buttonsDiv.appendChild(infoBtn);
        buttonsDiv.appendChild(playBtn);
        characterDiv.appendChild(characterImage);
        characterDiv.appendChild(buttonsDiv);
        characters_row.appendChild(characterDiv);
    }

    // Get the Header columns [A|B|C|...]
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

    // Get the left side rows [1|2|3|...]
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

        // Get the lands for every row
        for(var x=0; x<maze[y].length; x++){
            var newMazeCell = document.createElement('div');
            var attribRow = document.createAttribute('data-row');
            var attribColumn = document.createAttribute('data-column');
            var cls = document.createAttribute('class');
            var idx = document.createAttribute('id');
            idx.value = x.toString() + '-' + y.toString();
            attribRow.value = y;
            attribColumn.value = x;
            cls.value = "cell";

            // setting divs for text and image in every cell
            var txtDiv = document.createElement('div');
            var idtxt = document.createAttribute('id');
            var clstxt = document.createAttribute('class');
            idtxt.value = x.toString() + '-' + y.toString() + 'txt';
            clstxt.value = "splitCell splitUp75";
            txtDiv.setAttributeNode(idtxt);
            txtDiv.setAttributeNode(clstxt);

            var imageDiv = document.createElement('div');
            var idimage = document.createAttribute('id');
            var clsimage = document.createAttribute('class');
            idimage.value = x.toString() + '-' + y.toString() + 'image';
            clsimage.value = "splitCell splitUp25";
            imageDiv.setAttributeNode(idimage);
            imageDiv.setAttributeNode(clsimage);
            txtDiv.textContent = "";

            newMazeCell.setAttributeNode(attribRow);
            newMazeCell.setAttributeNode(attribColumn);
            newMazeCell.setAttributeNode(cls);
            newMazeCell.setAttributeNode(idx);

            land = findLandById(maze[y][x]);
            newMazeCell.style.backgroundColor = '#' + (land.color).toString();
            if(x==begin[0] && y==begin[1]){
                txtDiv.textContent = "Inicio - ";
                // newMazeCell.focus();
                var tabIndex = document.createAttribute('tabIndex');
                tabIndex.value = 1;
                newMazeCell.setAttributeNode(tabIndex);
            }
            if(x==end[0] && y==end[1]){
                txtDiv.textContent = "Final - ";
            }
            rowDiv.appendChild(newMazeCell);
            newMazeCell.appendChild(txtDiv);
            newMazeCell.appendChild(imageDiv);
        }
    }

    // Set color to the labirynth
    $(".Hcell").css("background-color", "grey");
    var arr = $.find("div[data-letter]");
    $(arr).each(function(){
        $(this).text(
            alphabet[ $(this).attr('data-letter') ]
        )
    });

    var idBegin = '#' + begin.join('-');
    $(idBegin).click(function() {
      $(idBegin).focus();
    });
    $(idBegin).focus();
    currentPos = begin;

    // setting up the image
    setPlayer();
    appendMove();
});


function findLandById(search){
    for(var i = 0; i<lands.length; i++){
        if(lands[i].id == search ){
            var land = lands[i]
        }
    }
    return land
}


function move(side){
    var validPos = false;
    if(side=='39')
    {//si la tecla presionada es direccional derecho
        if(currentPos[0] + 1 < maze["0"].length){
            currentPos[0] = currentPos[0] + 1;
            validPos = true;
        }
    }

    if(side=='37')
    {//si la tecla presionada es direccional izquierdo
        if(currentPos[0] > 0){
            currentPos[0] = currentPos[0] - 1;
            validPos = true;
        }
    }

    if(side=='38')
    {//si la tecla presionada es direccional arriba
        if(currentPos[1] > 0){
            currentPos[1] = currentPos[1] - 1;
            validPos = true;
        }
    }

    if(side=='40')
    {// si la tecla presionada es direccional abajo
        if(currentPos[1] + 1 < maze.length){
            currentPos[1] = currentPos[1] + 1;
            validPos = true;
        }
    }

    if(validPos){
        appendMove();
        var element = document.getElementById("imagePlayer");
        element.parentNode.removeChild(element);
        setPlayer();
    }

    // console.log(currentPos);
    // console.log(movs);
}


function appendMove() {
    var mov = {};
    mov.x = currentPos[0];
    mov.y = currentPos[1];
    movs.push(mov);
    var target = document.getElementById(currentPos.join('-') + 'txt');
    if (target.textContent.length > 0) {
        target.textContent = target.textContent + ' ' + movs.length
    }
    else{
        target.textContent = target.textContent + movs.length
    }
}


function setPlayer(){
    var playerPos = currentPos.join('-') + 'image';
    playerImage = document.createElement('img');
    playerImage.setAttribute("src", srcImage);
    playerImage.setAttribute("id", "imagePlayer");
    playerImage.setAttribute("height", "100%");
    playerImage.setAttribute("width", "100%");
    playerImage.setAttribute("alt", "player");
    document.getElementById(playerPos).appendChild(playerImage);
}


$(document.body).on('click', '#infoBtn' ,function(e){
    var selected = $(e.currentTarget);
    swal({
          title: characters[selected.attr("character-btn")].name,
          html: createLandsTable(selected.attr("character-btn")),
          imageUrl: characters[selected.attr("character-btn")].src,
          imageWidth: 100,
          imageHeight: 100,
          animation: false
        })
});


function createLandsTable(characterID){
    var table = '<h5>Lands</h5>'+
            '<table class="table">'+
            '<thead class="thead-dark">'+
                '<tr>'+
                  '<th scope="col">ID</th>'+
                  '<th scope="col">Name</th>'+
                  '<th scope="col">Cost</th>'+
                '</tr>'+
            '</thead>'+
            '<tbody>';

    for (var i=0; i<lands.length; i++){
        table += `<tr>
            <td> ${lands[i].id} </td>
            <td><span style='color: #${lands[i].color}'> ${lands[i].name} </span></td>
            <td> ${characters[characterID][lands[i].id]} </td>
            </tr>`
    }
    table +=`</tbody>
    </table>`;
    console.log(table);
    return table
}


$(document.body).on('click', '#playBtn' ,function(e){
    var selected = $(e.currentTarget);
    selected[0].disabled = true;
    document.getElementById('characterPlaying').textContent = "Now playing: " + characters[selected.attr("character-btn")].name;
    document.getElementById('characterCost').textContent = "total cost: 0.00";
    document.getElementById(begin.join('-')).focus();
});

