function createNameContainer(name) {
    let singleNameContainer = document.createElement('div');
    singleNameContainer.setAttribute('class', 'singleNameContainer');

    const nameTxt = document.createElement('p');
    nameTxt.textContent = newName;

    const copySecretBtn = document.createElement('input');
    copySecretBtn.type = 'button';
    copySecretBtn.setAttribute('class', 'copySecretBtn');
    copySecretBtn.value = 'Copiar link';
    copySecretBtn.disabled = true;

    const removeBtn = document.createElement('input');
    removeBtn.type = 'button';
    removeBtn.value = 'X';
    
    removeBtn.addEventListener('click', (event) => {
        singleNameContainer.remove();
    });
    
    singleNameContainer.appendChild(nameTxt);
    singleNameContainer.appendChild(copySecretBtn);
    singleNameContainer.appendChild(removeBtn);

    return singleNameContainer;
}

function addNewNameToContainer() {
    const newName = newNameTxtInp.value;
    if (newName == '') {
        alert('Digite um nome para adicionar');
        return;
    }

    newNameTxtInp.value = '';

    let singleNameContainer = document.createElement('div');
    singleNameContainer.setAttribute('class', 'singleNameContainer');

    const nameTxt = document.createElement('p');
    nameTxt.textContent = newName;

    const copySecretBtn = document.createElement('img');
    copySecretBtn.src = 'assets/icons/copy_disabled.svg';
    copySecretBtn.setAttribute('class', 'copySecretBtn');
    copySecretBtn.disabled = true;

    const removeBtn = document.createElement('img');
    removeBtn.src = 'assets/icons/circular_x.svg';
    
    removeBtn.addEventListener('click', (event) => {
        disableAllCopyBtns();
        singleNameContainer.remove();
    });
    
    singleNameContainer.appendChild(nameTxt);
    singleNameContainer.appendChild(copySecretBtn);
    singleNameContainer.appendChild(removeBtn);
    
    namesContainer.appendChild(singleNameContainer);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateLink(name) {
    const b64Name = btoa(name);
    return `${window.location.protocol}//${window.location.hostname}/amigo_secreto/verify/?${b64Name}`;
}

function disableAllCopyBtns() {
    const copySecretsBtnsArray = document.getElementsByClassName('copySecretBtn');

    for (let i = 0; i < copySecretsBtnsArray.length; i++) {
        copySecretsBtnsArray[i].disabled = true;
        copySecretsBtnsArray[i].src = 'assets/icons/copy_disabled.svg';
    }
}

function getNames() {
    const singleNameContainersArray = document.getElementsByClassName('singleNameContainer');
    let names = [];

    for (let i = 0; i < singleNameContainersArray.length; i++) {
        names.push(singleNameContainersArray[i].getElementsByTagName('p')[0].textContent);
    }

    return names;
}

function getNamesMap() {
    const singleNameContainersArray = document.getElementsByClassName('singleNameContainer');
    let names = new Map();

    for (let i = 0; i < singleNameContainersArray.length; i++) {
        names.set(singleNameContainersArray[i].getElementsByTagName('p')[0].textContent, "");
    }

    return names;
}

function sortSecretFriends() {
    const singleNameContainersArray = document.getElementsByClassName('singleNameContainer');
    let namesRelation = getNamesMap();
    let names = getNames();
    let randX;
    let is_even = names.length % 2 == 0;

    if (singleNameContainersArray.length < 2) {
        alert('Adicione pelo menos 2 nomes para sortear os amigos secretos');
        return;
    }

    for (let i = 0; i < singleNameContainersArray.length; i++) {
        let actualName = singleNameContainersArray[i].getElementsByTagName('p')[0].textContent;

        while (true) {
            randX = getRandomInt(names.length);

            if (names[randX] != actualName && is_even == false && namesRelation.get(names[randX]) != actualName && namesRelation.get(actualName) != names[randX]) {
                break;
            }
            else if (names[randX] != actualName && is_even == true) {
                break;
            }
            else if (names.length == 1) {
                i = 0;
                names = getNames();
            }
        }
    
        console.log(`${names[randX]} -> ${actualName}`);

        const nameChoosen = names[randX];
        namesRelation.set(actualName, nameChoosen);
        names.splice(randX, 1);

        const link = generateLink(nameChoosen);
        const copySecretBtn = singleNameContainersArray[i].getElementsByClassName('copySecretBtn')[0];
        copySecretBtn.disabled = false;
        copySecretBtn.src = 'assets/icons/copy.svg';

        copySecretBtn.addEventListener('click', (event) => {
            navigator.clipboard.writeText(link);
        });
    }

    console.log(namesRelation.size);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const newNameTxtInp = document.getElementById("newNameTxtInp");
    const addNewNameBtn = document.getElementById("addNewNameBtn");
    const namesContainer = document.getElementById("namesContainer");
    const sortSecretFriendsBtn = document.getElementById("sortSecretFriendsBtn");

    sortSecretFriendsBtn.addEventListener('click', (event) => {
        sortSecretFriends();
    });
    addNewNameBtn.addEventListener('click', (event) => {
        disableAllCopyBtns();
        addNewNameToContainer(namesContainer, newNameTxtInp);
    });
    newNameTxtInp.addEventListener('keypress', (event) => {
        if (event.key == 'Enter') {
            event.preventDefault();
            addNewNameBtn.click();
        }
    });
});