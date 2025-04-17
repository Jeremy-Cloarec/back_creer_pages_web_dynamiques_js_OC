import { baseURL } from "./baseURL.js"

export async function compterAvis(id) {
    const reponse = await fetch(`${baseURL}/pieces/${id}/avis`)
    const avis = await reponse.json()

    if (!avis.length) return [0, 0]

    const moyenneEtoiles = avis.map(avis => avis.nbEtoiles).reduce((a, b) => a + b) / avis.length
    return [moyenneEtoiles, avis.length]
}