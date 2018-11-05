
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
    sessionStorage.removeItem('playedCharacters');

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
        rowDiv.setAttribute('id', `row${y}`);
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
            var attribLand = document.createAttribute('data-land');
            var cls = document.createAttribute('class');
            var idx = document.createAttribute('id');
            idx.value = x.toString() + '-' + y.toString();
            attribRow.value = y;
            attribColumn.value = x;
            attribLand.value = maze[y][x];
            cls.value = "cell";
            let title = `Land ID: ${attribLand.value}, Land Name: ${findLandById(attribLand.value).name}`;

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
            newMazeCell.setAttributeNode(attribLand);
            newMazeCell.setAttributeNode(cls);
            newMazeCell.setAttributeNode(idx);

            land = findLandById(maze[y][x]);
            newMazeCell.style.backgroundColor = '#808080';
            if(x==begin[0] && y==begin[1]){
                txtDiv.textContent = "Inicio - ";
                // newMazeCell.focus();
                var tabIndex = document.createAttribute('tabIndex');
                tabIndex.value = 1;
                // newMazeCell.style.backgroundColor = '#' + (land.color).toString();
                newMazeCell.setAttributeNode(tabIndex);
                title += ", Begin";
            }
            if(x==end[0] && y==end[1]){
                txtDiv.textContent = "Final - ";
                // newMazeCell.style.backgroundColor = '#' + (land.color).toString();
                title += ", End";
            }
            newMazeCell.setAttribute('title', title );
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

    colorCell(begin[0], begin[1]);
    colorCell(end[0], end[1]);
    setTooltip(begin[0], begin[1]);
    setTooltip(end[0], end[1]);

    // drawTree();

});

// Drawing the tree in the screen
function drawTree(){

    s = new sigma({
        graph: data,
        container: 'container',
        settings: {
          defaultNodeColor: '#ec5148',
          defaultEdgeColor: '#000'
        }
    });

    s.refresh();
}

// Set the tooltip to a cell
function setTooltip(x, y){
    let idx = '#'+x.toString() + '-' + y.toString();
    $(idx).tooltip();
}

// set the color to all the cell
function colorCell(x,y){
    let cell = document.getElementById(x.toString() + '-' + y.toString());
    cell.style.backgroundColor = '#' + findLandById(cell.getAttribute('data-land')).color;
    // right cell
    if(parseInt(x) + 1 < maze["0"].length){
        let rigthCell = document.getElementById((parseInt(x) + 1).toString() + '-' + y.toString());
        rigthCell.style.backgroundColor = '#' + findLandById(rigthCell.getAttribute('data-land')).color;
    }
    // left cell
    if(x > 0){
        let leftCell = document.getElementById((parseInt(x) - 1).toString() + '-' + y.toString());
        leftCell.style.backgroundColor = '#' + findLandById(leftCell.getAttribute('data-land')).color;
    }
    // up cell
    if(y > 0){
        let upCell = document.getElementById(x.toString() + '-' + (parseInt(y) -1).toString());
        upCell.style.backgroundColor = '#' + findLandById(upCell.getAttribute('data-land')).color;
    }
    // down cell
    if(parseInt(y) + 1 < maze.length){
        let upCell = document.getElementById(x.toString() + '-' + (parseInt(y) +1).toString());
        upCell.style.backgroundColor = '#' + findLandById(upCell.getAttribute('data-land')).color;
    }

}


// given an id returns the id with that id
function findLandById(search){
    for(var i = 0; i<lands.length; i++){
        if(lands[i].id == search ){
            var land = lands[i]
        }
    }
    return land
}


// move the player
function move(side){
    var validPos = false;
    let nextPos = [];
    let zeroPos = parseInt(currentPos[0].toString());
    let onePos = parseInt(currentPos[1].toString());
    nextPos.push(zeroPos);
    nextPos.push(onePos);
    parentNode = [];
    parentNode.push(zeroPos);
    parentNode.push(onePos);

    if(side=='39')
    {//si la tecla presionada es derecha
        if(currentPos[0] + 1 < maze["0"].length){
            nextPos[0] = nextPos[0] + 1;
            validPos = true;
        }
    }

    if(side=='37')
    {//si la tecla presionada es izquierda
        if(currentPos[0] > 0){
            nextPos[0] = nextPos[0] - 1;
                validPos = true;
        }
    }

    if(side=='38')
    {//si la tecla presionada es arriba
        if(currentPos[1] > 0){
            nextPos[1] = nextPos[1] - 1;
            validPos = true;
        }
    }

    if(side=='40')
    {// si la tecla presionada es abajo
        if(currentPos[1] + 1 < maze.length){
            nextPos[1] = nextPos[1] + 1;
            validPos = true;
        }
    }

    // if the next pos is valid, go
    if(validPos){
        var nextCell = document.getElementById(nextPos.join('-'));
        land = findLandById(nextCell.getAttribute('data-land'));
        if(player[land.id] >= 0){
            //console.log(totalCost);
            totalCost = parseFloat(totalCost) + parseFloat(player[land.id]);
            //console.log(totalCost);
            currentPos = nextPos;
            colorCell(currentPos[0], currentPos[1]);
            appendMove();
            var element = document.getElementById("imagePlayer");
            element.parentNode.removeChild(element);
            setPlayer();
            setCost(totalCost);
            if(JSON.stringify(currentPos) === JSON.stringify(end)){
                goalReached(true)
            }
        }

    }
}


// an array with all the movs is created
function appendMove() {
    let mov = {};
    mov.x = currentPos[0];
    mov.y = currentPos[1];
    let leaf = {};
    leaf.root = currentPos;
    leaf.childs = [];

    // let existingLeaf = false;
    // if(visited.length > 0){
    //     for(let i =0; i<visited.length; i++){
    //         if (leaf.root[0] == visited[i].root[0] && leaf.root[1] == visited[i].root[0]){
    //             existingLeaf = true;
    //         }
    //     }
    // }
    //
    // // if parent is root
    // if(tree.root[0] == parentNode[0] && tree.root[1] == parentNode[1]){
    //     for(let i =0; i<visited.length; i++) {
    //         if (leaf.root[0] == visited[i].root[0] && leaf.root[1] == visited[i].root[1]) {
    //             existingLeaf = true;
    //         } else {
    //             tree.childs.push(leaf);
    //         }
    //     }
    //
    // }
    //
    // if(!existingLeaf) {
    //     if(tree.childs.length > 0){
    //         for(let i=0; i<tree.childs.length; i++){
    //             treeSearch(tree.childs[i], leaf);
    //         }
    //     }
    //     visited.push(leaf);
    // }


    // let px = currentPos[0];
    // let py = currentPos[1];
    // let cellsToExpand = [];
    //
    //
    // // left right
    // if(parseInt(px) + 1 < maze["0"].length){
    //     let rightCell = document.getElementById((parseInt(px) + 1).toString() + '-' + py.toString());
    //     console.log(rightCell);
    //     let land = findLandById(rightCell.getAttribute('data-land'));
    //     if(player[land.id] >= 0){
    //         let cell = {};
    //         cell.root = [(parseInt(px) + 1), py];
    //         cell.childs = [];
    //         cellsToExpand.push(cell);
    //     }
    // }
    // // left cell
    // if(px > 0){
    //     let leftCell = document.getElementById((parseInt(px) - 1).toString() + '-' + py.toString());
    //     let land = findLandById(leftCell.getAttribute('data-land'));
    //     if(player[land.id] >= 0){
    //         let cell = {};
    //         cell.root = [(parseInt(px) - 1), py];
    //         cell.childs = [];
    //         cellsToExpand.push(cell);
    //     }
    // }
    // // up cell
    // if(y > 0){
    //     let upCell = document.getElementById(px.toString() + '-' + (parseInt(py) -1).toString());
    //     let land = findLandById(upCell.getAttribute('data-land')).color;
    //     if(player[land.id] >= 0){
    //         let cell = {};
    //         cell.root = [(px), (parseInt(py) -1)];
    //         cell.childs = [];
    //         cellsToExpand.push(cell);
    //     }
    // }
    // // down cell
    // if(parseInt(y) + 1 < maze.length){
    //     let downCell = document.getElementById(px.toString() + '-' + (parseInt(py) +1).toString());
    //     let land = findLandById(downCell.getAttribute('data-land'));
    //     if(player[land.id] >= 0){
    //         let cell = {};
    //         cell.root = [px, (parseInt(py) +1)];
    //         cell.childs = [];
    //         cellsToExpand.push(cell);
    //     }
    // }
    //
    // tree.push(cellsToExpand);



    movs.push(mov);
    let target = document.getElementById(currentPos.join('-') + 'txt');
    if (target.textContent.length > 0) {
        target.textContent = target.textContent + ' ' + movs.length
    }
    else{
        target.textContent = target.textContent + movs.length
    }
}


function treeSearch(leaf, posSearched){
    if(leaf.root[0] == parentNode[0] && leaf.root[1] == parentNode[1] ){
        leaf.childs.push(posSearched);
        return;
    }
    if(leaf.childs.length > 0){
        for(let i=0; i<leaf.childs.length; i++){
            treeSearch(leaf.childs[i], posSearched);
        }
    }

}


// Once the player movs, set the image in the map
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


// The goal is reached and the player is appended to the session storage
function goalReached(reached) {
    goal = true;
    let playedCharacters = sessionStorage.getItem('playedCharacters');
    playedCharacters = JSON.parse(playedCharacters);
    player.totalCost = totalCost;
    player.reachGoal = reached;
    player.movs = movs;
    player.tree = tree;
    if(!playedCharacters){
        playedCharacters = [];
    }
    playedCharacters.push(player);
    let playedCharactersString = JSON.stringify(playedCharacters);
    sessionStorage.removeItem('playedCharacters');
    sessionStorage.setItem('playedCharacters', playedCharactersString);
    if(reached){
        swal({
            title: player.name + ' just reach the goal',
            text: `The total cost was: ${totalCost}`,
            type: 'success'
        });
    }
    player = undefined;
    if(playedCharacters.length == characters.length-1 || characters.length == playedCharacters.length){
        var leftSide = document.getElementById('leftSide');

        var buttonDiv = document.getElementById('nextBtnDiv');
        if(!buttonDiv){
            buttonDiv = document.createElement('div');
            buttonDiv.setAttribute('id', 'nextBtnDiv');
            buttonDiv.setAttribute('class', 'row');
            buttonDiv.setAttribute('style', 'margin-top:20px');
            var nextBtn = document.createElement('button');
            nextBtn.setAttribute('id', 'nextBtn');
            nextBtn.setAttribute('class', 'btn btn-primary btn-md');
            nextBtn.textContent = 'Go to Stats!';
            buttonDiv.appendChild(nextBtn);
            leftSide.appendChild(buttonDiv);
        }


    }
}

// Aux function, create the map with the player habilities
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
    return table
}


// validate if isn´t a game started
$(document.body).on('click', '#playBtn' ,function(e){
    var selected = $(e.currentTarget);
    if(player){
        swal({
            title: 'A game is in progress',
            text: "You want to stop this game and play with " + characters[selected.attr("character-btn")].name,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, go ahead'
        }).then((result) => {
            //player = undefined;
            goalReached(false);
            startGame(e);
        })
    }
    else{
        startGame(e);
    }

});

// starts a new game, clean the vars and
function startGame(e){
    goal = false;
    cleanMap();
    let selected = $(e.currentTarget);
    player = characters[selected.attr("character-btn")];
    selected[0].disabled = true;
    document.getElementById('characterPlaying').textContent = "Now playing: " + characters[selected.attr("character-btn")].name;
    totalCost = 0;
    setCost();
    document.getElementById(begin.join('-')).focus();
    srcImage = characters[selected.attr("character-btn")].src;
    currentPos = begin;
    tree.root = begin;
    tree.childs = [];
    visited.push(tree);
    let parentx = begin[0];
    let parenty = begin[1];
    parentNode.push(parentx);
    parentNode.push(parenty);
    setPlayer();
    appendMove();

}

// aux function: set the total cost of all the movs in the screen
function setCost(){
    document.getElementById('characterCost').textContent = "Total cost: " + totalCost.toFixed(2);
}

// Clean the map before a new game starts
function cleanMap(){
    // clean text
    begin = sessionStorage.getItem('begin');
    begin = JSON.parse(begin);
    currentPos = begin;
    movs = [];
    for(y=0; y<maze.length; y++){
        for(x=0; x<maze[y].length; x++){
            var pos = `${x.toString()}-${y.toString()}`;
            document.getElementById(pos).style.backgroundColor = '#808080';
            var txtDiv = document.getElementById(pos+'txt');
            txtDiv.textContent = "";
            if(x==begin[0] && y==begin[1]){
                txtDiv.textContent = "Inicio - ";
            }
            if(x==end[0] && y==end[1]){
                txtDiv.textContent = "Final - ";
            }
        }
    }
    colorCell(begin[0], begin[1]);
    colorCell(end[0], end[1]);
    // clean image
    try {
        var imgDiv = document.getElementById("imagePlayer");
        imgDiv.parentNode.removeChild(imgDiv);
    }catch{}
}


$(document.body).on('click', '#nextBtn' ,function(e){
    if(player){
        swal({
            title: 'A game is in progress',
            text: "You want to stop this game and see the stats",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, go ahead'
        }).then((result) => {
            goalReached(false);
        })
    }

    window.location.href = "/maze/stats";

});



