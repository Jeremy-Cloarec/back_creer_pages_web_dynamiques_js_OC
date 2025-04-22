
import { afficherMessageErreur, afficherMessageSucces, validerNom, validerNote, validerTextarea } from "./validateForms.js"
import { baseURL } from "./baseURL.js"
import { compterAvis } from "./countAdvice.js"

export function ajoutListenerEnvoyerAvis(button) {
    button.addEventListener("click", async (e) => {
        const id = e.target.dataset.id
        const errorMessage = document.querySelector(".errorMessage")
        errorMessage.textContent = ""
        const popover = document.querySelector("#popoverForm")

        const envoyerMessage = document.querySelector(".envoieMessage")
        envoyerMessage.dataset.id = id
        const headerPopover = document.querySelector(".headerForm")
        const h3 = headerPopover.querySelector("h3")
        const img = headerPopover.querySelector("img")
        
        const reponseImgPiece = await fetch(`${baseURL}/pieces/${id}`)
        const imgPiece = await reponseImgPiece.json()

        img.src = imgPiece.image
        img.alt = "Photographie d'une " + imgPiece.nom
        h3.textContent = imgPiece.nom

        popover.showPopover()
    })
}

export async function sendAdvice() {
    const formulaireAvis = document.querySelector('.formulaire-avis')
    formulaireAvis.addEventListener("submit", async (e) => {
        const popover = document.querySelector("#popoverForm")
        e.preventDefault()
        const id = document.querySelector('.envoieMessage').dataset.id

        if (!id) throw new Error("L'id n'est pas renseigné")

        try {
            const nomOK = validerNom(e.target.querySelector("[name=utilisateur]").value)
            const messageOK = validerTextarea(e.target.querySelector("[name=commentaire]").value)
            const noteOK = validerNote(e.target.querySelector("[name=note]").value)

            const avis = {
                pieceId: id,
                utilisateur: nomOK,
                commentaire: messageOK,
                nbEtoiles: noteOK
            }

            const chargeUtile = JSON.stringify(avis)

            const response = await fetch(`${baseURL}/avis`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            })

            if (!response.ok) {
                throw new Error("Erreur lors de l’envoi de l’avis")
            }

            const nbreAvis = await compterAvis(id)
            const newAdvice = document.querySelector(".nbreAvis")
            newAdvice.textContent = `${nbreAvis[1]} avis`
            const successMessage = document.querySelector(".success")
            successMessage.classList.add("show")
            afficherMessageSucces(successMessage)

            formulaireAvis.reset()
            popover.hidePopover()
            console.log("Votre commentaire  a bien été envoyé");

        } catch (error) {
            console.error("Une erreur est survenue : " + error.message)
            afficherMessageErreur(error.message)
        }
    })
}