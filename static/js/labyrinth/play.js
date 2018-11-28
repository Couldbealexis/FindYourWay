
$(document).ready(function (){
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
    let characters_row = document.getElementById('characters-row');
    for (let i=0; i<characters.length; i++){
        // Parent Div
        let characterDiv = document.createElement('div');
        characterDiv.setAttribute('characterDiv-id', i);
        characterDiv.setAttribute("style", "margin-right: 20px");
        // Image
        let characterImage = document.createElement('img');
        characterImage.setAttribute("src", characters[i].src);
        characterImage.setAttribute("character-id", i);
        characterImage.setAttribute("height", "100px");
        characterImage.setAttribute("width", "100px");
        characterImage.setAttribute("alt", characters[i].name);
        // Buttons
        let buttonsDiv = document.createElement('div');
        buttonsDiv.setAttribute('id', 'buttons-row');
        buttonsDiv.setAttribute('class', 'row');
        let infoBtn = document.createElement('button');
        infoBtn.setAttribute('id', 'infoBtn');
        infoBtn.setAttribute('character-btn', i);
        infoBtn.setAttribute('class', 'btn btn-info btn-md');
        infoBtn.textContent = 'Info';
        let playBtn = document.createElement('button');
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
    let mazeHeader = document.getElementById('mazeHeader');
    for(let i = 0; i < maze[1].length; i++){
        let newDiv = document.createElement('div');
        let att = document.createAttribute('data-letter');
        let cls = document.createAttribute('class');
        att.value = i;
        cls.value = "Hcell";
        newDiv.setAttributeNode(att);
        newDiv.setAttributeNode(cls);
        mazeHeader.appendChild(newDiv);
    }

    // Get the left side rows [1|2|3|...]
    let leftSide = document.getElementById('leftSide');
    for(let y=0; y<maze.length; y++){
        let rowDiv = document.createElement('div');
        let cls = document.createAttribute('class');
        cls.value = "row";
        rowDiv.setAttributeNode(cls);
        rowDiv.setAttribute('id', `row${y}`);
        leftSide.appendChild(rowDiv);
        let rowNumber = document.createElement('div');
        let rowNumberCls = document.createAttribute('class');
        rowNumberCls.value = "Hcell";
        rowNumber.textContent = (y+1).toString();
        rowNumber.setAttributeNode(rowNumberCls);
        rowDiv.appendChild(rowNumber);

        // Get the lands for every row
        for(let x=0; x<maze[y].length; x++){
            let newMazeCell = document.createElement('div');
            let attribRow = document.createAttribute('data-row');
            let attribColumn = document.createAttribute('data-column');
            let attribLand = document.createAttribute('data-land');
            let cls = document.createAttribute('class');
            var idx = document.createAttribute('id');
            idx.value = x.toString() + '-' + y.toString();
            attribRow.value = y;
            attribColumn.value = x;
            attribLand.value = maze[y][x];
            cls.value = "cell";
            //let title = `Land ID: ${attribLand.value}, Land Name: ${findLandById(attribLand.value).name}, Coords: (${alphabet[x]}${y+1})`;

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
            if(isBegin(x,y))
                newMazeCell.setAttribute('tabIndex', "1");

            rowDiv.appendChild(newMazeCell);
            newMazeCell.appendChild(txtDiv);
            newMazeCell.appendChild(imageDiv);
        }
    }

    if(characters.length == 1){
        createNxtBtn();
    }

    // Set color to the labirynth
    $(".Hcell").css("background-color", "grey");
    var arr = $.find("div[data-letter]");
    $(arr).each(function(){
        $(this).text(
            alphabet[ $(this).attr('data-letter') ]
        )
    });

});


// create a new Node to the tree
function Node(data, parent) {
    let node = {};
    node.data = data;
    // data = {
    //     coords,
    //     HN,
    //     GN,
    //     visit,
    //     side
    //}
    node.parent = parent;
    node.children = [];
    node.id = uuidv4();
    return node;
}


// Create a tree
function Tree(data){
    tree = new Node(data, null);
    actualNode = tree;
}


// Drawing the tree in the screen
// function drawTree(){
//
//     let divInstructions = document.getElementById('instructions');
//     let divGraph = document.getElementById("network-graph");
//     divInstructions.removeChild(divGraph);
//
//     divGraph = document.createElement('div');
//     divGraph.setAttribute('id', "network-graph");
//     divInstructions.appendChild(divGraph);
//
//     s = new sigma({
//         graph: data,
//         container: 'network-graph',
//         settings: {
//           defaultNodeColor: '#ec5148',
//           defaultEdgeColor: '#000'
//         }
//     });
//
//     s.refresh();
// }

// Drawing the tree in the screen
function drawTree(node){
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.setAttribute('id', node.id);
    li.textContent = node.data.visit.toString() + " GN:" + node.data.GN + " HN:" + node.data.HN + " coords:" + JSON.stringify(node.data.coords);
    if(node.children.length > 0){
        for(let i = 0; i<node.children.length; i++){
            let childUl = drawTree(node.children[i]);
            li.appendChild(childUl);
        }
    }
    ul.appendChild(li);
    return ul;
}

// #Section Aux functions
// Generate GUID for each node
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function isBegin(x,y) {
    return x==begin[0] && y==begin[1]
}

function isEnd(x,y) {
    return x==end[0] && y==end[1]
}

// Disable tootip on focus
$(document).on('focus', 'div', function () { $(this).tooltip('hide'); });

// Set the tooltip to a cell
function setTooltip(x, y){
    let idx = '#'+x.toString() + '-' + y.toString();
    let cell = document.getElementById(x.toString() + '-' + y.toString());
    let title = `Land ID: ${cell.getAttribute('data-land')}, Land Name: ${findLandById(cell.getAttribute('data-land')).name}, Coords: (${alphabet[x]}${y+1})`;
    if(isBegin(x,y))
        title += `, Begin`;
    if(isEnd(x,y))
        title += `, End`;
    cell.setAttribute('title', title);
    $(idx).tooltip();
}

// set the color to the cell
function colorCell(x,y){
    let cell = document.getElementById(x.toString() + '-' + y.toString());
    cell.style.backgroundColor = '#' + findLandById(cell.getAttribute('data-land')).color;
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

// aux function: set the total cost of all the movs in the screen
function setCost(){
    document.getElementById('characterCost').textContent = "Total cost: " + totalCost.toFixed(2);
}

// Create next btn
function createNxtBtn(){
    let leftSide = document.getElementById('leftSide');
    let buttonDiv = document.getElementById('nextBtnDiv');
    if(!buttonDiv){
        buttonDiv = document.createElement('div');
        buttonDiv.setAttribute('id', 'nextBtnDiv');
        buttonDiv.setAttribute('class', 'row');
        buttonDiv.setAttribute('style', 'margin-top:20px');
        let nextBtn = document.createElement('button');
        nextBtn.setAttribute('id', 'nextBtn');
        nextBtn.setAttribute('class', 'btn btn-primary btn-md');
        nextBtn.textContent = 'Go to Stats!';
        buttonDiv.appendChild(nextBtn);
        leftSide.appendChild(buttonDiv);
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

// Once the player movs, set the image in the map
function setPlayer(){
    let playerPos = currentPos.join('-') + 'image';
    playerImage = document.createElement('img');
    playerImage.setAttribute("src", srcImage);
    playerImage.setAttribute("id", "imagePlayer");
    playerImage.setAttribute("height", "100%");
    playerImage.setAttribute("width", "100%");
    playerImage.setAttribute("alt", "player");
    document.getElementById(playerPos).appendChild(playerImage);
}

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

$(document.body).on('click', '#infoBtn' ,function(e){
    let selected = $(e.currentTarget);
    swal({
          title: characters[selected.attr("character-btn")].name,
          html: createLandsTable(selected.attr("character-btn")),
          imageUrl: characters[selected.attr("character-btn")].src,
          imageWidth: 100,
          imageHeight: 100,
          animation: false
        })
});

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
// #End section Aux functions


// add new leaf to the tree
function addLeaf(coords, parent, visit, HN, GN, side){
    let data = {};
    // data = {
    //     coords,
    //     HN,
    //     GN,
    //     visit,
    //     side
    //}
    data.coords = coords;
    data.HN = HN;
    data.GN = GN;
    data.side = side;
    let leaf = new Node(data, parent);
    if(visit == 0){
        data.visit = 1;
        Tree(data);
    }else{
        data.visit = visit;
        treeSearch(tree, leaf)
    }
    return leaf
}


// Expand cell and his neighbours
function unmaskCell(x,y){
    colorCell(x,y);
    setTooltip(begin[0], begin[1]);
    // right cell
    if(parseInt(x) + 1 < maze["0"].length){
        let coordX = (parseInt(x) + 1);
        addLeaf([coordX,y], actualNode, -1, 0, 0, "R");
        colorCell(coordX, y);
        setTooltip(coordX, y);
    }
    // left cell
    if(x > 0){
        let coordX = (parseInt(x) - 1);
        addLeaf([coordX,y], actualNode, -1, 0, 0, "L");
        colorCell(coordX, y);
        setTooltip(coordX, y);
    }
    // up cell
    if(y > 0){
        let coordY = (parseInt(y) - 1);
        addLeaf([x,coordY], actualNode, -1, 0, 0, "U");
        colorCell(x, coordY);
        setTooltip(x, coordY);
    }
    // down cell
    if(parseInt(y) + 1 < maze.length){
        let coordY = (parseInt(y) + 1);
        addLeaf([x,coordY], actualNode, -1, 0, 0, "D");
        colorCell(x, coordY);
        setTooltip(x, coordY);
    }

}


// move the player
function move(side){
    let validPos = false;
    let nextPos = [];
    let zeroPos = parseInt(currentPos[0]);
    let onePos = parseInt(currentPos[1]);
    nextPos.push(zeroPos);
    nextPos.push(onePos);
    parentNode = [];
    parentNode.push(zeroPos);
    parentNode.push(onePos);
    let moveCell;

    if(side=='39')
    {//si la tecla presionada es derecha
        if(currentPos[0] + 1 < maze["0"].length){
            nextPos[0] = nextPos[0] + 1;
            validPos = true;
            moveCell = "R";
        }
    }

    if(side=='37')
    {//si la tecla presionada es izquierda
        if(currentPos[0] > 0){
            nextPos[0] = nextPos[0] - 1;
            validPos = true;
            moveCell = "L";
        }
    }

    if(side=='38')
    {//si la tecla presionada es arriba
        if(currentPos[1] > 0){
            nextPos[1] = nextPos[1] - 1;
            validPos = true;
            moveCell = "U";
        }
    }

    if(side=='40')
    {// si la tecla presionada es abajo
        if(currentPos[1] + 1 < maze.length){
            nextPos[1] = nextPos[1] + 1;
            validPos = true;
            moveCell = "D";
        }
    }

    // if the next pos is valid, go
    if(validPos){
        let nextCell = document.getElementById(nextPos.join('-'));
        land = findLandById(nextCell.getAttribute('data-land'));
        if(player[land.id] >= 0){
            totalCost = parseFloat(totalCost) + parseFloat(player[land.id]);
            currentPos = nextPos;
            appendMove();
            // let leaf = addLeaf(currentPos, parentNode, movs.length, 0, 0);
            let leaf = addLeaf(currentPos, actualNode, movs.length, 0, 0, moveCell);
            visited.push(leaf);
            actualNode = leaf;
            unmaskCell(currentPos[0], currentPos[1]);
            let element = document.getElementById("imagePlayer");
            element.parentNode.removeChild(element);
            setPlayer();
            setCost(totalCost);
            if(JSON.stringify(currentPos) === JSON.stringify(end)){
                goalReached(true)
            }
            let rightSide = document.getElementById("rightSide");
            let contenedor_arbol = document.getElementById("contenedor-arbol");
            rightSide.removeChild(contenedor_arbol);

            contenedor_arbol = document.createElement('div');
            contenedor_arbol.setAttribute('id', "contenedor-arbol");


            let estructura = drawTree(tree);
            contenedor_arbol.appendChild(estructura);
            rightSide.appendChild(contenedor_arbol);

        }

    }
}


// track all the movs
function appendMove() {
    let mov = {};
    mov.x = currentPos[0];
    mov.y = currentPos[1];
    movs.push(mov);
    let target = document.getElementById(currentPos.join('-') + 'txt');
    if (target.textContent.length > 0) {
        target.textContent = target.textContent + ' ' + movs.length
    }
    else{
        target.textContent = target.textContent + movs.length
    }
}


// currentNode is the node that is compared with the newNode.
// If the compare is true, append, else, keep searching
function treeSearch(currentNode, newNode){
    // if(currentNode.data.coords[0] == newNode.parent[0] && currentNode.data.coords[1] == newNode.parent[1] ){
    if(currentNode.id == newNode.parent.id){
        searchChild(currentNode, newNode);
        // currentNode.children.push(newNode);
        return;
    }
    if(currentNode.children.length > 0){
        for(let i=0; i<currentNode.children.length; i++){
            treeSearch(currentNode.children[i], newNode);
        }
    }

}

function searchChild(currentNode, newNode){
    let existChild = false;
    for(let i = 0; i<currentNode.children.length; i++){
        if(currentNode.children[i].data.side == newNode.data.side){
            currentNode.children[i].data.visit = newNode.data.visit;
            currentNode.children[i].id = newNode.id;
            existChild = true;
        }
    }
    if(!existChild){
        currentNode.children.push(newNode);
    }
}


// The goal is reached and the player is appended to the session storage
function goalReached(reached) {
    goal = true;
    let playedCharacters = sessionStorage.getItem('playedCharacters');
    playedCharacters = JSON.parse(playedCharacters);
    player.totalCost = totalCost;
    player.reachGoal = reached;
    player.movs = movs;
    //player.tree = tree;
    if(!playedCharacters){
        playedCharacters = [];
    }
    playedCharacters.push(player);
    console.log(playedCharacters);
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
        createNxtBtn();
    }
}


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
    let parentx = begin[0];
    let parenty = begin[1];
    parentNode.push(parentx);
    parentNode.push(parenty);
    setPlayer();
    appendMove();

}


// Clean the map before a new game starts
function cleanMap(){
    // clean text
    begin = sessionStorage.getItem('begin');
    begin = JSON.parse(begin);
    currentPos = begin;
    movs = [];
    tree = [];
    for(let y=0; y<maze.length; y++){
        for(let x=0; x<maze[y].length; x++){
            let pos = `${x.toString()}-${y.toString()}`;
            document.getElementById(pos).style.backgroundColor = '#808080';
            let txtDiv = document.getElementById(pos+'txt');
            txtDiv.textContent = "";
            if(isBegin(x, y)){
                txtDiv.textContent = "Inicio - ";
            }
            if(isEnd(x, y)){
                txtDiv.textContent = "Final - ";
            }
        }
    }
    let leaf = addLeaf(currentPos, [], movs.length, 0, 0, "");
    //actualNode = leaf;
    visited.push(leaf);
    unmaskCell(begin[0], begin[1]);
    colorCell(end[0], end[1]);
    setTooltip(end[0], end[1]);
    // clean image
    try {
        let imgDiv = document.getElementById("imagePlayer");
        imgDiv.parentNode.removeChild(imgDiv);
    }catch{}
}


