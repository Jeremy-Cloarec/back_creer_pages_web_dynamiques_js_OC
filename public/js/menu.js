export function showMenu(btn) {
    btn.addEventListener("click", () => {
        const filtres = document.querySelector('.filtres')
        filtres.classList.add('show')
    })
}
export function hideMenu(btn) {
    
    btn.addEventListener("click", (event) => {
        if (event.target !== event.currentTarget) return
        const filtres = document.querySelector('.filtres')
        filtres.classList.remove('show')
    })
}


