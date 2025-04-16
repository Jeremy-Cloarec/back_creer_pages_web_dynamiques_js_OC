import { baseURL } from "./baseURL.js"
console.log(baseURL);

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

export async function compterAvis(id) {
    const reponse = await fetch(`${baseURL}/pieces/${id}/avis`)
    const avis = await reponse.json()
    const moyenneEtoiles = await avis.map(avis => avis.nbEtoiles).reduce((a, b) => a + b) / avis.length
    return [moyenneEtoiles, avis.length]
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

export function ajoutListenerEnvoyerAvis() {
    let id = null
    const formulaireAvis = document.querySelector('.formulaire-avis')

    formulaireAvis.addEventListener("submit", async (e) => {
        e.preventDefault()
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

            const response = await fetch(`${baseURL}/avis`,  {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            })

            if (!response.ok) {
                throw new Error("Erreur lors de l’envoi de l’avis")
            }

            const popover = document.querySelector("#popoverForm")
            const nbreAvis = await compterAvis(id)
            const newAdvice = document.querySelector(".nbreAvis")
            newAdvice.textContent =`${nbreAvis[1]} avis`
            const successMessage = document.querySelector(".success")
            successMessage.classList.add("show")
            afficherMessageSucces(successMessage)

            formulaireAvis.reset()
            popover.hidePopover()

        } catch (error) {
            console.error("Une erreur est survenue : " + error.message)
            afficherMessageErreur(error.message)
        }
    })

    return (button) => {
        button.addEventListener("click", (e) => {
            id = e.target.dataset.id
        })
    }
}

function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error(`Le champ nom doit contenir au moins deux lettres`)
    }

    if (nom.trim() === "") {
        throw new Error(`Le champ nom ne doit pas être vide`)
    }

    if (!/^[a-zA-ZÀ-ÿ\- ]+$/.test(nom)) {
        throw new Error(`Le champ nom ne doit pas contenir de caractères spéciaux`);
    }

    nom = nom.trim()

    return nom
}

function validerTextarea(contenu) {
    if (contenu.trim() === "") {
        throw new Error("Le champ message ne doit pas être vide")
    }

    if (contenu.trim().length < 2) {
        throw new Error("Le champ message doit contenir minimum 2 caractères");
    }

    if (contenu.trim().length > 300) {
        throw new Error("Le champ message doit contenir maximum 300 caractères");
    }

    if (!/^[a-zA-ZÀ-ÿ0-9\s.,;:'"!?()\-]+$/.test(contenu)) {
        throw new Error("Le champ message contient des caractères non autorisés");
    }

    return contenu;
}

function validerNote(note) {
    if (note === "" || note === null || note === undefined) {
        throw new Error("Le champ note ne doit pas être vide")
    }

    const valeur = Number(note)

    if (isNaN(valeur)) {
        throw new Error("La valeur doit être un nombre");
    }

    if (valeur < 0 || valeur > 5) {
        throw new Error("La valeur doit être comprise entre 0 et 5")
    }

    return parseInt(note)
}

function afficherMessageErreur(messageErr) {
    let messageErreur = document.querySelector(".errorMessage")
    messageErreur.textContent = messageErr
}

function afficherMessageSucces (element) {
    setTimeout(() => {
        element.classList.remove("show")
    }, 3000);
}

export async function afficherGraphiqueAvis() {
    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = await fetch(`${baseURL}/avis`).then(avis => avis.json());
    const nb_commentaires = [0, 0, 0, 0, 0];
    for (let commentaire of avis) {
        nb_commentaires[commentaire.nbEtoiles - 1]++;
    }
    const labels = ["5", "4", "3", "2", "1"]

    // Données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: "Étoiles attribuées",
            data: nb_commentaires.reverse(),
            backgroundColor: "rgba(255, 230, 0, 1)",
        }],
    };

    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    };

    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-undef
    const graphiqueAvis = new Chart(
        document.querySelector("#graphique-avis"),
        config,
    );
}

export async function afficherAvisPieceDispo(pieces) {
    const pieceDisponibles = pieces.filter(piece => piece.disponibilite)
    const pieceIndisponibles = pieces.filter(piece => piece.disponibilite === false)

    const nombreAvisPieceDispo = await calculerNombrePiece(pieceDisponibles)
    const nombreAvisPieceIndispo = await calculerNombrePiece(pieceIndisponibles)

    const labels = ["Nomb", "Nomb"]

    const arrayData = [nombreAvisPieceDispo, nombreAvisPieceIndispo]

    const data = {
        labels: labels,
        datasets: [{
            label: "Etoiles attribuées",
            data: arrayData,
            backgroundColor: "rgba(255, 230, 0, 1)"
        }]
    }

    const config = {
        type: "bar",
        data: data,
    }

    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-undef
    const graphiquePiecesDispo = new Chart(
        document.querySelector("#graphique-piece-dispo"),
        config,
    )
}

async function calculerNombrePiece(arr) {
    let piecesNumber = 0

    for (let i = 0; i < arr.length; i++) {
        let id = arr[i].id

        try {
            const piece = await fetch(`${baseURL}/pieces/${id}/avis`).then(avis => avis.json())
            piecesNumber += piece.length

        } catch (error) {
            console.error("Erreur : " + error.message)
        }
    }

    return piecesNumber
}
