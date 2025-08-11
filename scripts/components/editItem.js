export function editButton(nameItem) {
    const editItem = document.createElement("img");
    editItem.alt = "Editar item";
    editItem.src = "./img/edit.svg";
    editItem.classList.add("input-edit-item");

    editItem.addEventListener("click", () => {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = nameItem.innerText;
        editInput.classList.add("input-edit-item");

        nameItem.replaceWith(editInput);
        editInput.focus();

        editInput.addEventListener("blur", () => {
            if (editInput.value !== "") {
                nameItem.innerText = editInput.value;
            }
            editInput.replaceWith(nameItem)
        });
    });

    return editItem;
}