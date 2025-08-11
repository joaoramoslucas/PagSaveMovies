import gerarDiaDaSemana from "./gerarDiaDaSemana.js";
import { editButton } from "./components/editItem.js";
import { deleteButton } from "./components/deleteButton.js";

let contador = 0;
const inputItem = document.getElementById("input-item");

export function criarItemDaLista() {
    if (inputItem.value == "") {
        alert("Insira um filme para assistir mais tarde.");
        return;
    }

    const itemList = document.createElement("li");

    const containerItemList = document.createElement("div");
    containerItemList.classList.add("lista-item-container");

    const checkboxItem = document.createElement("input");
    checkboxItem.type = "checkbox";
    checkboxItem.id = "checkbox-" + contador++;

    const nameItem = document.createElement("p");
    nameItem.innerText = inputItem.value;

    const itemData = document.createElement("p");
    itemData.innerText = gerarDiaDaSemana();
    itemData.classList.add("texto-data");

    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("actions-container");

    const deleteBtn = deleteButton(itemList);
    const editBtns = editButton(nameItem, actionsContainer);

    checkboxItem.addEventListener("click", () => {
        if(checkboxItem.checked){
            nameItem.style.textDecoration = "line-through";
        } else {
            nameItem.style.textDecoration = "none";
        }
    });

    containerItemList.appendChild(checkboxItem);
    containerItemList.appendChild(nameItem);

    actionsContainer.appendChild(editBtns);
    actionsContainer.appendChild(deleteBtn);

    itemList.appendChild(containerItemList);
    itemList.appendChild(itemData);
    itemList.appendChild(actionsContainer);

    return itemList;
}