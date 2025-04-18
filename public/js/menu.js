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

export function sticky() {
    const nav = document.querySelector("nav")
    const scrollTop = document.querySelector(".logo")
    scrollTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })

    const navTop = nav.offsetTop

    function fixnavbar() { 
        if (window.scrollY > navTop) {
            // document.body.style.paddingTop = nav.offsetHeight + "px";
            nav.classList.add("fixed-nav");
        } else  {
            nav.classList.remove("fixed-nav");
        }
    }

    window.addEventListener("scroll", fixnavbar);
}


