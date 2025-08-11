export function deleteButton(itemList) {
    const deleteItem = document.createElement("img");
    deleteItem.alt = "Excluir item";
    deleteItem.src = "./img/delete.svg";
    deleteItem.classList.add("delete-item-icon");

    deleteItem.addEventListener("click", () => {
        const confirmDelete = confirm("Tem certeza que deseja excluir?");
        if (confirmDelete) {
            itemList.remove();
            console.log("Item excluído com sucesso");
        }
    });

    return deleteItem;
}