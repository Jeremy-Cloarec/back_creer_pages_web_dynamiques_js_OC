export function button(parent, text, classText, articleId) {
    const newButton = document.createElement("button")
        newButton.dataset.id = articleId
        newButton.textContent = text
        newButton.classList.add(classText)
        parent.appendChild(newButton)
}