export const header = () => {
    if (document.querySelector(".header__dropdown")) {
     const dropdowns = document.querySelectorAll(".header__dropdown");
     dropdowns.forEach(dropdown => {
         const dropdownButton = dropdown.querySelector(".header__dropdown-button");
         const dropdownContent = dropdown.querySelector(".header__dropdown-content");
         const dropdownLinks = dropdownContent.querySelectorAll(".header__dropdown-link");
    
         const toggleDropdown = () => {
             const isOpen = dropdown.classList.toggle("open");
             dropdownButton.setAttribute("aria-expanded", isOpen);
         };
    
         dropdownButton.addEventListener("focus", () => {
             dropdown.classList.add("open");
             dropdownButton.setAttribute("aria-expanded", "true");
         });
    
         dropdownButton.addEventListener("blur", () => {
             if (!hasFocusableItems()) {
                 dropdown.classList.remove("open");
                 dropdownButton.setAttribute("aria-expanded", "false");
             }
         });
    
         document.addEventListener("keydown", event => {
             if (event.key === "Escape") {
                 dropdown.classList.remove("open");
                 dropdownButton.setAttribute("aria-expanded", "false");
                 dropdownButton.blur();
             };
         });
    
         dropdownButton.addEventListener("click", toggleDropdown);
    
         document.addEventListener("click", event => {
             if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
                 dropdown.classList.remove("open");
                 dropdownButton.setAttribute("aria-expanded", "false");
             };
         });
    
         const hasFocusableItems = () => {
             return Array.from(dropdownLinks).some(link => link.offsetParent !== null);
         };
    
         dropdownLinks.forEach(link => {
             link.addEventListener("focus", () => {
                 dropdown.classList.add("open");
                 dropdownButton.setAttribute("aria-expanded", "true");
             });
    
             link.addEventListener("blur", () => {
                 if (!hasFocusableItems()) {
                     dropdown.classList.remove("open");
                     dropdownButton.setAttribute("aria-expanded", "false");
                 }
             });
         });
     });
    };

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