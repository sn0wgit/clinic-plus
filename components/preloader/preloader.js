export const preloader = () => {
    const preloaderDiv = document.querySelector(".preloader");
    
    preloaderDiv.style.display = "flex";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        preloaderDiv.style.display = "none";
        document.body.style.overflow = "auto";
    }, 3000);
};

window.addEventListener("load", preloader);