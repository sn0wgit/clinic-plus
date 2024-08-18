export const preloader = () => {
    const rootElement = document.querySelector("html");

    const preloaderDiv = document.querySelector(".preloader");
    
    preloaderDiv.style.display = "flex";
    rootElement.style.overflow = "hidden";

    setTimeout(() => {
        preloaderDiv.style.display = "none";
        rootElement.style.overflow = "auto";
    }, 3000);
};

window.addEventListener("load", preloader);