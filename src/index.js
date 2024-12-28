import {Mtg} from "./api/mtg";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";

document.addEventListener("DOMContentLoaded", searchingCards);

let deckCards = {};
let findsCards = {};

function setup(cards) {
        const menu = document.getElementById('listContainer');
        const list = document.createElement('ul');

        cards.forEach(card => {
            const listItem = document.createElement('li');
            listItem.innerHTML = card.name;
            listItem.addEventListener('click', () => showCardDetails(card));
            list.appendChild(listItem)
        })
        menu.innerHTML = ''

        menu.appendChild(list);


}

//Поиск карт
function searchingCards(){
    const mtg = new Mtg();
    mtg.loadCards()
        .then((cards) => {
            findsCards = cards;
            setup(cards);
        });
    const searchInput = document.getElementById('searchCard');
    searchInput.addEventListener('input', () => {
        const item = searchInput.value.toLowerCase();
        findsCards.forEach(card => {
            if(card.name.toLowerCase().includes(item)){
                setup(card);
            }
        })
    })
}

//Показывает детали
function showCardDetails(card){
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = `
    <div class="details">
        <h2>${card.name}</h2>
        <p>Type: ${card.type}</p>
        <p>Description: ${card.text}</p>
        <p>Mana: ${card.manaCost}</p>
        <button id = "addCard">Add</button>
    </div>
    ` 
    const addCardButton = document.getElementById('addCard');

    addCardButton.onClick = () => addToDeck(card);
}

//Добавить карту в колоду
function addToDeck(card){

}


//Пересчитываем виджеты
function reculcWidgets(){
    new ColorStats().buildStats(document.getElementById("colorStats"));
    new ManaCostStats().buildStats(document.getElementById("manaStats"));
}