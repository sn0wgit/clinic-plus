export const dropdown = () => {
  if (document.querySelector(".dropdown")) {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const dropdownButton = dropdown.querySelector(".dropdown__button");
        const dropdownContent = dropdown.querySelector(".dropdown__content");
        const dropdownLinks = dropdownContent.querySelectorAll(".dropdown__link");
   
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
}