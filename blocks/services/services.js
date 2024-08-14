import data from "./data.js";

export const services = () => {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".services__list")) {
      const sliderWrapper = document.querySelector(".services__slider-wrapper");
      let slides = [];

      const updateServicesList = (selectedValue) => {
        sliderWrapper.innerHTML = "";
        slides = [];

        const servicesList = document.createElement("ul");
        servicesList.classList.add("services__list");

        if (selectedValue === "all") {
          for (const category in data) {
            data[category].forEach((service) => {
              const listItem = document.createElement("li");
              listItem.classList.add("services__list-item");
              listItem.innerHTML = `<button class="services__card" type="button"><span>${service.name}</span></button>`;
              listItem.addEventListener("click", () => openPopup(service));
              servicesList.appendChild(listItem);
            });
          }
        } else {
          const services = data[selectedValue];
          if (services) {
            services.forEach((service) => {
              const listItem = document.createElement("li");
              listItem.classList.add("services__list-item");
              listItem.innerHTML = `<div class="services__card"><span>${service.name}</span></div>`;
              listItem.addEventListener("click", () => openPopup(service));
              servicesList.appendChild(listItem);
            });
          }
        }

        const slide = document.createElement("div");
        slide.classList.add("services__slider-slide");
        slide.appendChild(servicesList);
        sliderWrapper.appendChild(slide);
        slides.push(slide);

        showSlide(0);
      };

      const showSlide = (index) => {
        slides.forEach((slide, i) => {
          slide.style.display = (i === index) ? "block" : "none";
        });
      };

      const openPopup = (service) => {
        const popupHTML = `
          <div class="services__popup" style="display: flex;">
            <div class="services__popup-body">
              <header class="services__popup-header">
                <span></span>
                <h2 class="services__popup-title">${service.name}</h2>
                <button class="services__popup-close-button" type="button" aria-label="Закрыть описание услуги" aria-expanded="true">
                  <span class="services__popup-close-button-icon"></span>
                </button>
              </header>
              <footer class="services__popup-footer">
                <span class="services__popup-desc">${service.desc}</span>
              </footer>
            </div>
          </div>
        `;

        const servicesBody = document.querySelector(".services__body");
        servicesBody.insertAdjacentHTML("beforeend", popupHTML);

        const popup = document.querySelector(".services__popup");
        popup.classList.add("show");

        const closeButton = document.querySelector(".services__popup-close-button");
        closeButton.addEventListener("click", closePopup);

        popup.addEventListener("click", (event) => {
          if (event.target === popup) {
            closePopup();
          }
        });
      };

      const closePopup = () => {
        const popup = document.querySelector(".services__popup");
        if (popup) {
          popup.remove();
        }
      };

      const radioButtons = document.querySelectorAll(".services__filter-checkbox");

      radioButtons.forEach((radio) => {
        radio.addEventListener("change", (event) => {
          const selectedValue = event.target.value;
          updateServicesList(selectedValue);
        });
      });

      const allRadio = document.querySelector('.services__filter-checkbox[value="all"]');
      allRadio.checked = true;
      updateServicesList("all");
    }
  });
}