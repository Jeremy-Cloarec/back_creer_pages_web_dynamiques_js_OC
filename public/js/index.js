import { afficherGraphiqueAvis, afficherAvisPieceDispo } from "./chartGraphic.js"
import { baseURL } from "./baseURL.js"
import { showMenu, hideMenu } from "./menu.js"
import { generatePieces } from './generatePieces.js'
import { mettreAJour, trierOrdreCroissant, trierOrdreDecroissant, trierParRange, trierPiecesAvecDescription, trierPiecesPasAbordables } from "./filteringPieces.js"
import { sendAdvice } from "./sendAdvice.js"

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
const filtreContainer = document.querySelector(".filtres")
const date = new Date()
const dateFooter = document.querySelector("footer span")
dateFooter.textContent = date.getFullYear()

showMenu(showMenuButton)
hideMenu(hideMenuButton)
hideMenu(filtreContainer)

sendAdvice()

if (pieces === null) {
    const reponse = await fetch(`${baseURL}/pieces`)
    pieces = await reponse.json()
    const valeurPieces = JSON.stringify(pieces)
    window.localStorage.setItem("pieces", valeurPieces)
} else {
    pieces = JSON.parse(pieces)
}

generatePieces(pieces)

// Fonction pour trier les produits
mettreAJour(boutonMettreAJour, generatePieces, pieces, boutonRange, afficherPrix)
// Trier par range
trierParRange(boutonRange, generatePieces, pieces, afficherPrix)

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



