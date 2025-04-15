import { ajoutListenerAvis, compterAvis, ajoutListenerEnvoyerAvis } from "./avis.js"

export async function generatePieces(pieces) {
    createResumePieces(pieces)

    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i]
        const imageElement = document.createElement("img")
        imageElement.src = article.image
        const nomElement = document.createElement("h2")
        nomElement.innerText = article.nom
        const containerPrix = document.createElement("div")
        const containerStar = document.createElement("div")
        containerStar.classList.add("containerStar")
        const nbreAvis = document.createElement("span")
        nbreAvis.classList.add("nbreAvis")
        const containerIsStockCategorie = document.createElement("div")

        containerPrix.classList.add("containerPrix")
        const prixElement = document.createElement("p")
        const prixAccessible = document.createElement("span")
        prixAccessible.innerText = `${article.prix < 35 ? "€" : "€€"}`
        prixElement.innerText = `${article.prix} €`
        const categorieElement = document.createElement("p")
        categorieElement.classList.add("categorie")
        categorieElement.innerText = article.categorie ?? "(aucune categorie)"
        const descriptionElement = document.createElement("p")
        descriptionElement.classList.add("description")
        descriptionElement.innerText = article.description ?? "(Pas encore de description)"
        const isStock = document.createElement("p")
        isStock.innerText = `${article.disponibilite ? "En stock" : "Plus de stock"}`
        article.disponibilite ? isStock.classList.add("green") : isStock.classList.add("red")
        const containerFiche = document.createElement("article")
        containerFiche.classList.add("article-produit")
        containerFiche.dataset.id = article.id
        const sectionFiches = document.querySelector(".fiches")
        containerIsStockCategorie.classList.add("containerIsStockCategorie")
        containerIsStockCategorie.appendChild(categorieElement)
        containerIsStockCategorie.appendChild(isStock)
        containerPrix.appendChild(prixElement)
        containerPrix.appendChild(prixAccessible)
        sectionFiches.appendChild(containerFiche)
        containerFiche.appendChild(imageElement)
        containerFiche.appendChild(nomElement)
        containerFiche.appendChild(descriptionElement)
        containerFiche.appendChild(containerStar)
        containerFiche.appendChild(containerIsStockCategorie)
        containerFiche.appendChild(containerPrix)

        const showAdvices = document.createElement("button")
        showAdvices.dataset.id = article.id
        showAdvices.textContent = "Afficher les avis"
        showAdvices.classList.add("showAdvice")
        showAdvices.setAttribute("popovertarget", "popoverAdvice")
        showAdvices.setAttribute("popovertargetaction", "show")
        containerFiche.appendChild(showAdvices)
        
        const writeAdvice = document.createElement("button")
        writeAdvice.dataset.id = article.id
        writeAdvice.textContent =  "Ecrire un avis"
        writeAdvice.classList.add("writeAdvice")
        writeAdvice.setAttribute("popovertarget", "popoverForm")
        writeAdvice.setAttribute("popovertargetaction", "show")
        containerFiche.appendChild(writeAdvice)

        ajoutListenerAvis(showAdvices)
        ajoutListenerEnvoyerAvis(writeAdvice)

        const avisData = await compterAvis(article.id)
        const [note, nombreAvis] = avisData

        nbreAvis.textContent = `${nombreAvis} avis`

        for (let index = 0; index < 5; index++) {
            const star = document.createElement("span")
            const img = document.createElement("img")
            img.classList.add("star")
            img.alt = "Icone etoile"

            const difference = note - index;

            if (difference >= 1) {
                img.src = "images/starFill.png"
            } else if (difference >= 0.75) {
                img.src = "images/star075.png"
            } else if (difference >= 0.5) {
                img.src = "images/starHalf.png"
            } else if (difference >= 0.25) {
                img.src = "images/star025.png"
            } else {
                img.src = "images/star.png"
            }

            star.appendChild(img)
            containerStar.appendChild(star)
        }
        containerStar.appendChild(nbreAvis)
    }
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
    titleArticle.textContent = "Pièces abordables"

    const piecesAbordables = pieces.filter(piece => piece.prix < 35)
    for (let i = 0; i < piecesAbordables.length; i++) {
        const nomElement = document.createElement("li")
        nomElement.innerHTML = `${piecesAbordables[i].nom} - ${piecesAbordables[i].prix}€`
        abordablesElement.appendChild(nomElement)
    }
    containerArticle.appendChild(titleArticle)
    containerArticle.appendChild(abordablesElement)
    articleResume.appendChild(containerArticle)
}