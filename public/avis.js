export function ajoutListenerAvis() {
    const piecesElement = document.querySelectorAll(".avisBouton")

    for (let i = 0; i < piecesElement.length; i++) {

        piecesElement[i].addEventListener("click", async (event) => {

            const id = event.target.dataset.id
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`)
            const avis = await reponse.json()
            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis))
            const parentElement = event.target.parentElement

            afficherAvis(parentElement, avis)
        })
    }
}

export function afficherAvis(piecesElement, avis) {
    const avisElement = document.createElement("p")

    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `${avis[i].utilisateur} : ${avis[i].commentaire} <br>`
    }
    
    piecesElement.appendChild(avisElement)
}

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector('.formulaire-avis')
    formulaireAvis.addEventListener("submit", (e) => {
        e.preventDefault()
        const avis = {
            pieceId: parseInt(e.target.querySelector("[name=piece-id]").value),
            utilisateur: e.target.querySelector("[name=utilisateur]").value,
            commentaire: e.target.querySelector("[name=commentaire]").value,
            nbEtoiles: parseInt(e.target.querySelector("[name=note]").value)
        }

        const chargeUtile = JSON.stringify(avis)
        console.log(chargeUtile);

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
    })
}
