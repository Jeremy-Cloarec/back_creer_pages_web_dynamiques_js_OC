export function showMenu(btn) {
    btn.addEventListener("click", () => {
        const filtres = document.querySelector('.filtres')
        filtres.classList.add('show')
    })
}
export function hideMenu(btn) {
    btn.addEventListener("click", () => {
        const filtres = document.querySelector('.filtres')
        filtres.classList.remove('show')
    })
}

export function scrollPosition(btn) {
    const offsetTop = 500
    const btnHeight = btn.offsetHeight

    window.addEventListener("scroll", () => {
        if (window.scrollY >= offsetTop) {
            if (!btn.classList.contains("fixed")) {
                btn.classList.add("fixed")
                placeholder.style.display = "block"
                placeholder.style.height = btnHeight + "px"; // réserve l’espace
            }
        } else {
            if (btn.classList.contains("fixed")) {
                btn.classList.remove("fixed")
                placeholder.style.display = "none"
            }
        }
    });
}
