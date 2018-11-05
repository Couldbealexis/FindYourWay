
$(document).ready(function () {
    lands = sessionStorage.getItem('lands');
    lands = JSON.parse(lands);
    characters = sessionStorage.getItem('playedCharacters');
    characters = JSON.parse(characters);

    var masterDiv = document.getElementById('masterDiv');
    for(let i=0; i<characters.length; i++){
        let parentDiv = document.createElement('div');
        parentDiv.setAttribute('id', `parentDiv${i}`);
        parentDiv.setAttribute('style', 'margin-top:20px')

        let characterDiv = document.createElement('div');
        characterDiv.setAttribute('id', `characterDiv${i}`);
        characterDiv.setAttribute('class', 'row');

        let character = document.createElement('img');
        character.setAttribute('id', `characterID${i}`);
        character.setAttribute('src', characters[i].src);
        character.setAttribute('height', "100px");
        character.setAttribute('width', "100px");
        character.setAttribute('alt', characters[i].name);
        character.setAttribute('title', characters[i].name);

        // Display character info
        let infoDiv = document.createElement('div');
        infoDiv.setAttribute('style', 'margin-left:20px');

        let name = document.createElement('h5');
        name.textContent = characters[i].name;

        let ended = document.createElement('h5');
        if(characters[i].reachGoal){
            ended.textContent = 'Labyrinth ended';
        }else{
            ended.textContent = 'Labyrinth not ended';
        }

        let totalMovs = document.createElement('h5');
        totalMovs.textContent = 'Total movs: ' + characters[i].movs.length;

        let totalCost = document.createElement('h5');
        totalCost.textContent = 'Total cost: ' + characters[i].totalCost;

        infoDiv.appendChild(name);
        infoDiv.appendChild(ended);
        infoDiv.appendChild(totalMovs);
        infoDiv.appendChild(totalCost);

        // Create the table
        let tableDiv = document.createElement('div');
        tableDiv.setAttribute('style', 'margin-left:20px');

        let table = document.createElement('table');
        table.setAttribute('id', `table${i}`);
        table.setAttribute('class', 'table');

        let tableHead = document.createElement('thead');
        tableHead.setAttribute('id', `tHead${i}`);
        tableHead.setAttribute('class', 'thead-dark');

        let trHead = document.createElement('tr');

        let thHead1 = document.createElement('th');
        thHead1.setAttribute('scope', 'col');
        let text1 = document.createTextNode('ID');

        let thHead2 = document.createElement('th');
        thHead2.setAttribute('scope', 'col');
        let text2 = document.createTextNode('Name');

        let thHead3 = document.createElement('th');
        thHead3.setAttribute('scope', 'col');
        let text3 = document.createTextNode('Cost');

        thHead1.appendChild(text1);
        thHead2.appendChild(text2);
        thHead3.appendChild(text3);
        trHead.appendChild(thHead1);
        trHead.appendChild(thHead2);
        trHead.appendChild(thHead3);
        tableHead.appendChild(trHead);

        let tBody = document.createElement('tbody');
        for(let l=0; l<lands.length; l++){
            let trBody = document.createElement('tr');

            let td1 = document.createElement('td');
            let tdText1 = document.createTextNode(lands[l].id);
            let td2 = document.createElement('td');
            let span = document.createElement('span');
            span.setAttribute('style', `color: #${lands[l].color}`);
            let tdText2 = document.createTextNode(lands[l].name);
            let td3 = document.createElement('td');
            let tdText3 = document.createTextNode(characters[i][lands[l].id]);

            td1.appendChild(tdText1);
            span.appendChild(tdText2);
            td2.appendChild(span);
            td3.appendChild(tdText3);
            trBody.appendChild(td1);
            trBody.appendChild(td2);
            trBody.appendChild(td3);
            tBody.appendChild(trBody);
        }

        table.appendChild(tableHead);
        table.appendChild(tBody);
        tableDiv.appendChild(table);

        // Join everything
        characterDiv.appendChild(character);
        characterDiv.appendChild(infoDiv);
        characterDiv.appendChild(tableDiv);
        parentDiv.appendChild(characterDiv);
        masterDiv.appendChild(parentDiv);

    }

    // back to the first page
    let btnBack = document.createElement('button');
    btnBack.setAttribute('id', 'btnBack');
    btnBack.setAttribute('class', 'btn btn-success btn-lg');
    btnBack.setAttribute('style', 'margin:20px 0px 0px 50px');
    btnBack.textContent = 'Go back to the start!';
    masterDiv.appendChild(btnBack);

});


// Go back to the start page
$(document.body).on('click', '#btnBack' ,function(e){
    swal({
        title: 'Fresh new start',
        text: "Do you want to go back to the start?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, go ahead'
    }).then((result) => {
        window.location.href = "/";
    })

});


