

export function mettreAJour(
    boutonMettreAJour,
    generatePieces,
    pieces,
    boutonRange,
    afficherPrix
) {
    boutonMettreAJour.addEventListener("click", () => {
        window.localStorage.removeItem("pieces")
        const boutonsRadios = document.querySelectorAll(".filtres input")
        boutonRange.value = 30
        for (let btn of boutonsRadios) {
            if (btn.checked) btn.checked = false
        }
        afficherPrix.setAttribute("value", 30)
        document.querySelector(".fiches").innerHTML = ""
        generatePieces(pieces)
    })
}

export function trierParRange(
    boutonRange,
    generatePieces,
    pieces,
    afficherPrix
) {
    boutonRange.addEventListener("input", () => {
        const newArray = pieces.filter(piece => piece.prix <= boutonRange.value)
        afficherPrix.setAttribute("value", boutonRange.value)
        document.querySelector(".fiches").innerHTML = ""
        generatePieces(newArray)
    })
}

export function trierOrdreCroissant(
    boutonTrier,
    generatePieces,
    pieces
) {
    boutonTrier.addEventListener("click", () => {
        const piecesOrdonnees = [...pieces]
        piecesOrdonnees.sort((a, b) => a.prix - b.prix)
        //On efface l'ecran
        document.querySelector(".fiches").innerHTML = ""
        // On regenere le tableau
        generatePieces(piecesOrdonnees)
    })
}

export function trierOrdreDecroissant(
    boutonTrierDecroissant,
    generatePieces,
    pieces
) {
    boutonTrierDecroissant.addEventListener("click", () => {
        const piecesOrdonnees = [...pieces]
        piecesOrdonnees.sort((a, b) => a.prix + b.prix)
        //On efface l'ecran
        document.querySelector(".fiches").innerHTML = ""
        // On regenere le tableau
        generatePieces(piecesOrdonnees)
    })
}

export function trierPiecesPasAbordables(
    boutonFiltrerAbordables,
    generatePieces,
    pieces
) {
    boutonFiltrerAbordables.addEventListener("click", () => {
        const piecesFiltrees = pieces.filter((piece) => piece.prix >= 35)
        //On efface l'ecran
        document.querySelector(".fiches").innerHTML = ""
        // On regenere le tableau
        generatePieces(piecesFiltrees)
    })
}

export function trierPiecesAvecDescription(
    btnFiltrerDescription,
    generatePieces,
    pieces
) {
    btnFiltrerDescription.addEventListener("click", () => {
        const pieceFiltreeDescription = pieces.filter(piece => piece.description)
        //On efface l'ecran
        document.querySelector(".fiches").innerHTML = ""
        // On regenere le tableau
        generatePieces(pieceFiltreeDescription)
    })
}



