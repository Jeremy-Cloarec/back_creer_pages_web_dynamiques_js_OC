export function button(parent,
    text,
    classText,
    onClickFunction,
    articleId, 
    popoverTarget, 
    popoverTargetAction)
    {
        
    const newButton = document.createElement("button")
    newButton.dataset.id = articleId
    newButton.textContent = text
    newButton.classList.add(classText)
    newButton.setAttribute("popovertarget", popoverTarget)
    newButton.setAttribute("popovertargetaction", popoverTargetAction)
    parent.appendChild(newButton)
    onClickFunction
}