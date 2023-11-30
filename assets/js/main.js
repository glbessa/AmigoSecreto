function createNameContainer(name) {
    const singleNameContainer = document.createElement('div');
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

function addNewNameToContainer(namesContainer, newNameTxtInp) {
    const newName = newNameTxtInp.value;
    newNameTxtInp.value = '';

    let singleNameContainer = createNameContainer(newName);
    
    namesContainer.appendChild(singleNameContainer);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateLink(name) {
    const b64Name = btoa(name);
    return `${window.location.protocol}${window.location.hostname}/AmigoSecreto/verify/index.html?${b64Name}`;
}

function disableAllCopyBtns() {
    const copySecretsBtnsArray = document.getElementsByClassName('copySecretBtn');

    for (let i = 0; i < copySecretsBtnsArray.length; i++) {
        copySecretsBtnsArray[i].disabled = true;
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

function sortSecretFriends() {
    const singleNameContainersArray = document.getElementsByClassName('singleNameContainer');
    let names = getNames();

    let randX;
    for (let i = 0; i < singleNameContainersArray.length; i++) {
        do {
            randX = getRandomInt(names.length);
        } while (names[randX] == singleNameContainersArray[i].getElementsByTagName('p').value);

        const name = names[randX];
        names.splice(randX, 1);

        const link = generateLink(name);
        const copySecretBtn = singleNameContainersArray[i].getElementsByClassName('copySecretBtn')[0];
        copySecretBtn.disabled = false;
        copySecretBtn.addEventListener('click', (event) => {
            navigator.clipboard.writeText(link);
        });
    }
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