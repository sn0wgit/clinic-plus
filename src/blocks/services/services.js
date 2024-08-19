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
        const prevPopup = document.querySelector(".services__popup");
        if (prevPopup) {
          prevPopup.remove();
        }

        const popupHTML = `
          <div class="services__popup" style="display: flex;">
            <div class="services__popup-body" data-simplebar>
              <button class="services__popup-close-button" type="button" aria-label="Закрыть описание услуги" aria-expanded="true">
                <span class="services__popup-close-button-icon"></span>
              </button>
              <div class="services__popup-tariffs">
                <h6 class="services__popup-tariffs-title">Выберите формулу:</h6>
                <ul class="services__popup-tariffs-list">
                  <li>
                    <button class="services__popup-tariffs-button active" type="button" data-price="${service.price.standard}">
                      <span>Стандарт</span>
                    </button>
                  </li>
                  <li>
                    <button class="services__popup-tariffs-button" type="button" data-price="${service.price['standard+']}">
                      <span>Стандарт+</span>
                    </button>
                  </li>
                  <li>
                    <button class="services__popup-tariffs-button" type="button" data-price="${service.price.maximum}">
                      <span>Максимальная</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="services__popup-content">
                <img class="services__popup-image" src="${service.image}" alt="">
                <div class="services__popup-content-block">
                  <h2 class="services__popup-title">${service.name}</h2>
                  <span class="services__popup-price">Цена: <strong class="services__popup-price-number">${service.price.standard} руб.</strong></span>
                  <a class="services__popup-button" href="contacts.html">Заказать</a>
                </div>
              </div>
              <div class="services__popup-effects">
                <div class="services__popup-effects-top">
                  <h6 class="services__popup-effects-title">Эффекты:</h6>
                  <span class="services__popup-effects-desc">Нажмите на эффект, что бы узнать его состав</span>
                </div>
                <ul class="services__popup-list">
                  ${service.effects.map((effect) => `
                    <li class="services__popup-list-item">
                      <div class="services__popup-effect">
                        <img class="services__popup-effect-image" src="${effect.image}" alt="">
                        <span>${effect.effect}</span>
                        <div class="services__popup-effect-content">
                          <h6 class="services__popup-effect-title">${effect.compound}</h6>
                        </div>
                      </div>
                    </li>
                  `).join("")}
                </ul>
              </div>
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

        const tariffButtons = popup.querySelectorAll(".services__popup-tariffs-button");
        tariffButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            if (!event.currentTarget.classList.contains("active")) {
              tariffButtons.forEach((btn) => btn.classList.remove("active"));
              event.currentTarget.classList.add("active");
              const priceElement = popup.querySelector(".services__popup-price-number");
              const price = event.currentTarget.dataset.price;

              if (price) {
                priceElement.textContent = `${price} руб.`;
              } else {
                console.error("Цена не определена для выбранного тарифа");
              }
            }
          });
        });

        const effectItems = popup.querySelectorAll(".services__popup-effect");
        const popupContents = popup.querySelectorAll(".services__popup-effect-content");
        
        effectItems.forEach((effectItem) => {
          effectItem.addEventListener("click", (event) => {
            const content = effectItem.querySelector(".services__popup-effect-content");
            if (content.classList.contains("active")) {
              content.classList.remove("active");
            } else {
              popupContents.forEach((item) => {
                item.classList.remove("active");
              });
              content.classList.add("active");
            }
            event.stopPropagation();
          });
        });
        
        popup.addEventListener("click", (event) => {
          if (!event.target.closest(".services__popup-effect-content")) {
            popupContents.forEach((item) => {
              item.classList.remove("active");
            });
          }
        });

        const firstButton = tariffButtons[0];
        firstButton.classList.add("active");
        const priceElement = popup.querySelector(".services__popup-price-number");
        priceElement.textContent = `${firstButton.dataset.price} руб.`;
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