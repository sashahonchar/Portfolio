const animationHandler = class {
    constructor({
        selectors
    }) {
        this.selectors = selectors
        this.handle()
    }

    handle() {
        this.selectors.forEach(selector => {
            const {
                animate,
                start
            } = selector.dataset;
            switch (start) {
                case "load":
                    document.addEventListener("DOMContentLoaded", () => {
                        selector.classList.add(animate);
                    });
                case "scroll":
                    window.addEventListener("scroll", () => this.checkScroll(selector, animate));
                    this.checkScroll(selector, animate)
                    break;

                default:
                    break;
            }
        });

    }

    checkScroll(selector, animate) {
        if (selector.getBoundingClientRect().top <= document.documentElement.clientHeight) {
            selector.classList.add(animate);
        }

    }

}
document.addEventListener('DOMContentLoaded', () => {
    new animationHandler({
        selectors: [...document.querySelectorAll(".animated")]
    })
    
})
