import {baseURL} from "./baseURL.js"

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