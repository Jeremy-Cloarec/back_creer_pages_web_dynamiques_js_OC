export function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error(`Le champ nom doit contenir au moins deux lettres`)
    }

    if (nom.trim() === "") {
        throw new Error(`Le champ nom ne doit pas être vide`)
    }

    if (!/^[a-zA-ZÀ-ÿ\- ]+$/.test(nom)) {
        throw new Error(`Le champ nom ne doit pas contenir de caractères spéciaux`)
    }

    nom = nom.trim()

    return nom
}

export function validerTextarea(contenu) {
    if (contenu.trim() === "") {
        throw new Error("Le champ message ne doit pas être vide")
    }

    if (contenu.trim().length < 2) {
        throw new Error("Le champ message doit contenir minimum 2 caractères");
    }

    if (contenu.trim().length > 300) {
        throw new Error("Le champ message doit contenir maximum 300 caractères");
    }

    if (!/^[a-zA-ZÀ-ÿ0-9\s.,;:'"!?()-]+$/.test(contenu)) {
        throw new Error("Le champ message contient des caractères non autorisés (Emojis, sympbole @, #, %, &, balise <, >, / et caractères non latins)");
    }

    return contenu;
}

export function validerNote(note) {
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

export function afficherMessageErreur(messageErr) {
    let messageErreur = document.querySelector(".errorMessage")
    messageErreur.textContent = messageErr
}

export function afficherMessageSucces(element) {
    setTimeout(() => {
        element.classList.remove("show")
    }, 3000);
}