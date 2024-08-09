export const header = () => {
    if (document.querySelector(".header__menu")) {
      const headerMenu = document.querySelector(".header__menu");
      const headerMenuButton = document.querySelector(".header__menu-button");  
      headerMenuButton.addEventListener("click", () => {
       headerMenu.classList.toggle("open");
       headerMenuButton.classList.toggle("active");
       document.querySelector("html").classList.toggle("lock");
      });
    };
};