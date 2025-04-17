import { baseURL } from "./baseURL.js"

export function ajoutListenerAvis(button) {
    button.addEventListener("click", async (event) => {
        const containerAdvice = document.querySelector("#popoverAdvice")
        containerAdvice.innerHTML = ""
        const headerPopover = document.createElement("div")
        const h3 = document.createElement("h3")
        const img = document.createElement("img")
        const containerCloseButton = document.createElement("div")
        const close = document.createElement("button")

        close.textContent = "Fermer\u00A0❌"
        close.setAttribute("popovertarget", "popoverAdvice")
        close.setAttribute("popovertargetaction", "close")

        const id = event.target.dataset.id

        const reponseImgPiece = await fetch(`${baseURL}/pieces/${id}`)
        const imgPiece = await reponseImgPiece.json()

        img.src = imgPiece.image
        img.alt = "Photographie d'une " + imgPiece.nom
        h3.textContent = imgPiece.nom

        headerPopover.classList.add("headerPopover")
        containerCloseButton.appendChild(close)
        containerAdvice.appendChild(h3)
        headerPopover.appendChild(img)
        headerPopover.appendChild(h3)
        headerPopover.appendChild(containerCloseButton)
        containerAdvice.appendChild(headerPopover)

        const reponse = await fetch(`${baseURL}/pieces/${id}/avis`)
        const avis = await reponse.json()

        afficherAvis(containerAdvice, avis)
    })
}

export async function afficherAvis(container, avis) {
    const avisElement = document.createElement("div")
    avisElement.classList.add("contentPopover")

    for (let i = 0; i < avis.length; i++) {
        let note = avis[i].nbEtoiles
        const containerStar = document.createElement("div")

        for (let index = 0; index < 5; index++) {
            let src
            const difference = note - index;

            if (difference >= 1) {
                src = "images/starFill.png"
            } else if (difference >= 0.75) {
                src = "images/star075.png"
            } else if (difference >= 0.5) {
                src = "images/starHalf.png"
            } else if (difference >= 0.25) {
                src = "images/star025.png"
            } else {
                src = "images/star.png"
            }

            const img = document.createElement("img")
            img.src = src;
            img.alt = `icone etoile pour note ${note}/5`

            containerStar.appendChild(img)
        }

        const avisDiv = document.createElement("div")
        avisDiv.classList.add("containerAdvices")

        const titre = document.createElement("h4")
        titre.textContent = avis[i].utilisateur

        const commentaire = document.createElement("p")
        commentaire.textContent = avis[i].commentaire

        avisDiv.appendChild(titre)
        avisDiv.appendChild(containerStar)
        avisDiv.appendChild(commentaire)

        avisElement.appendChild(avisDiv)
    }

    container.appendChild(avisElement)
}
