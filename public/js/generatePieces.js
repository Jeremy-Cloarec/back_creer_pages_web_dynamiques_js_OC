import { ajoutListenerAvis } from "./avis.js"
import { button } from "./button.js"

export function generatePieces(pieces) {
    createResumePieces(pieces)

    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i]
        const imageElement = document.createElement("img")
        imageElement.src = article.image
        const nomElement = document.createElement("h2")
        nomElement.innerText = article.nom
        const prixElement = document.createElement("p")
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€"})`
        const categorieElement = document.createElement("p")
        categorieElement.innerText = article.categorie ?? "(aucune categorie)"
        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = article.description ?? "(Pas encore de description)"
        const isStock = document.createElement("p")
        isStock.innerText = `${article.disponibilite ? "En stock" : "Plus en stock"}`
        const containerFiche = document.createElement("article")
        containerFiche.classList.add("article-produit")
        containerFiche.dataset.id = article.id
        const sectionFiches = document.querySelector(".fiches")

        sectionFiches.appendChild(containerFiche)
        containerFiche.appendChild(imageElement)
        containerFiche.appendChild(nomElement)
        containerFiche.appendChild(prixElement)
        containerFiche.appendChild(categorieElement)
        containerFiche.appendChild(descriptionElement)
        containerFiche.appendChild(isStock)

        button(containerFiche, "Afficher les avis", "showAdvice", article.id)
        button(containerFiche, "Ecrire un avis", "writeAdvice", article.id)
    }
    ajoutListenerAvis()
}

export function createResumePieces(pieces) {
    const sectionFiches = document.querySelector(".fiches")
    const articleResume = document.createElement("article")
    articleResume.classList.add("resume")
    sectionFiches.appendChild(articleResume)

    genererPiecesDisponibles(articleResume, pieces)
    genererPiecesAbordables(articleResume, pieces)
}

function genererPiecesDisponibles(articleResume, pieces) {
    const containerArticle = document.createElement("div")
    const disponibleElement = document.createElement("ul")
    const titleArticle = document.createElement("h2")
    titleArticle.textContent = "Pièces disponibles"
    const pieceDisponibles = pieces.filter(piece => piece.description)
    for (let i = 0; i < pieceDisponibles.length; i++) {
        const nomElement = document.createElement("li")
        nomElement.innerText = pieceDisponibles[i].nom
        disponibleElement.appendChild(nomElement)
    }

    containerArticle.appendChild(titleArticle)
    containerArticle.appendChild(disponibleElement)
    articleResume.appendChild(containerArticle)
}

function genererPiecesAbordables(articleResume, pieces) {
    const containerArticle = document.createElement("div")
    const abordablesElement = document.createElement("ul")
    const titleArticle = document.createElement("h2")
    titleArticle.textContent = "Pièces abordable"

    const piecesAbordables = pieces.filter(piece => piece.prix < 35)
    for (let i = 0; i < piecesAbordables.length; i++) {
        const nomElement = document.createElement("li")
        nomElement.innerText = ` ${piecesAbordables[i].nom} - ${piecesAbordables[i].prix} €`
        abordablesElement.appendChild(nomElement)
    }
    containerArticle.appendChild(titleArticle)
    containerArticle.appendChild(abordablesElement)
    articleResume.appendChild(containerArticle)
}