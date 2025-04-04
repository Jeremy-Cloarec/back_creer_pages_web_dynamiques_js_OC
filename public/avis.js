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

export async function afficherGraphiqueAvis() {
    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const nb_commentaires = [0, 0, 0, 0, 0];
    for (let commentaire of avis) {
        nb_commentaires[commentaire.nbEtoiles - 1]++;
        console.log(nb_commentaires[1]);

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

    // Rendu du graphique dans l'élément canvas
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
    console.log(arrayData);


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
            const piece = await fetch(`http://localhost:8081/pieces/${id}/avis`).then(avis => avis.json())
            piecesNumber += piece.length

        } catch (error) {
            console.error("Erreur : " + error.message)
        }
    }

    return piecesNumber
}
