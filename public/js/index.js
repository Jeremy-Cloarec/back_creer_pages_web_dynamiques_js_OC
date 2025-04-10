import { /* ajoutListenerEnvoyerAvis,*/ afficherAvis, afficherGraphiqueAvis, afficherAvisPieceDispo } from "./avis.js"
import { PORT } from "./port.js"
import { showMenu, hideMenu } from "./menu.js"
import { generatePieces, createResumePieces} from './generatePieces.js'
import { mettreAJour, trierOrdreCroissant, trierOrdreDecroissant, trierParRange, trierPiecesAvecDescription, trierPiecesPasAbordables } from "./filteringPieces.js"

const boutonTrier = document.querySelector("#asc")
const boutonTrierDecroissant = document.querySelector("#desc")
const btnFiltrerDescription = document.querySelector("#description")
const boutonFiltrerAbordables = document.querySelector("#abordable")
const boutonRange = document.querySelector("#prix")
let afficherPrix = document.querySelector(".prixAffichee")
let pieces = window.localStorage.getItem("pieces")
const boutonMettreAJour = document.querySelector(".btn-maj")
const showMenuButton = document.querySelector(".menu")
const hideMenuButton = document.querySelector(".btn-fermer")
const articleResume = document.querySelector(".resume")

showMenu(showMenuButton)
hideMenu(hideMenuButton)

if (pieces === null) {
    const reponse = await fetch(`http://${PORT}:8080/pieces`)
    pieces = await reponse.json()
    const valeurPieces = JSON.stringify(pieces)
    window.localStorage.setItem("pieces", valeurPieces)
} else {
    pieces = JSON.parse(pieces)
}

mettreAJour(boutonMettreAJour, generatePieces, pieces, boutonRange, afficherPrix)

generatePieces(pieces)

// ajoutListenerEnvoyerAvis()

for (let i = 0; i < pieces.length; i++) {
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
    const avis = JSON.parse(avisJSON);

    if (avis !== null) {
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis(pieceElement, avis)
    }
}

// Fonction pour trier les produits

// Trier par range
trierParRange(boutonRange,generatePieces, pieces, afficherPrix)

// Trier par ordre croissant
trierOrdreCroissant(boutonTrier, generatePieces, pieces)

//Trier decroissant
trierOrdreDecroissant(boutonTrierDecroissant, generatePieces, pieces)

//filtrer pieces pas abordables
trierPiecesPasAbordables(boutonFiltrerAbordables, generatePieces, pieces)

//Filtrer pièces avec description
trierPiecesAvecDescription(btnFiltrerDescription, generatePieces, pieces)

afficherGraphiqueAvis()
afficherAvisPieceDispo(pieces)



