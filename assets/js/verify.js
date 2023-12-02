document.addEventListener('DOMContentLoaded', (event) => {
    const seuAmigoSecreto = atob(window.location.search.split('?')[1]);
    const friendNameText = window.document.getElementById("friendName");

    friendNameText.textContent = seuAmigoSecreto;
});