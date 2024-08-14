import data from "./data.js";

export const services = () => {
  if (document.querySelector(".services__list")) {
    const sliderWrapper = document.querySelector(".services__slider-wrapper");
    const currentCounter = document.querySelector(".services__slider-counter .current");
    const totalCounter = document.querySelector(".services__slider-counter:last-child");
    const prevButton = document.querySelector(".services__slider-menu-button.prev");
    const nextButton = document.querySelector(".services__slider-menu-button.next");
    let currentSlide = 0;
    let slides = [];

    const updateServicesList = (selectedValue) => {
      sliderWrapper.innerHTML = "";
      slides = [];

      if (selectedValue === "all") {
        for (const category in data) {
          createSlide(data[category]);
        }
      } else {
        const services = data[selectedValue];
        if (services) {
          createSlide(services);
        }
      }

      updateCounter();
      showSlide(currentSlide);
      updateButtonsState();
    };

    const createSlide = (services) => {
      const slide = document.createElement("div");
      slide.classList.add("services__slider-slide");
      const servicesList = document.createElement("ul");
      servicesList.classList.add("services__list");

      services.forEach((service) => {
        const listItem = document.createElement("li");
        listItem.classList.add("services__list-item");
        listItem.innerHTML = `<div class="services__card"><span>${service}</span></div>`;
        servicesList.appendChild(listItem);
      });

      slide.appendChild(servicesList);
      sliderWrapper.appendChild(slide);
      slides.push(slide);
    };

    const updateCounter = () => {
      totalCounter.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;
      currentCounter.textContent = "01";
    };

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? "block" : "none";
      });
      currentCounter.textContent = slides.length > 0 ? (index < 9 ? `0${index + 1}` : index + 1) : "00";
    };

    const updateButtonsState = () => {
      prevButton.disabled = currentSlide === 0;
      nextButton.disabled = currentSlide === slides.length - 1 || slides.length === 0;
    };

    const radioButtons = document.querySelectorAll(".services__filter-checkbox");

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        currentSlide = 0; // Сбрасываем текущий слайд на 0 при смене фильтра
        updateServicesList(selectedValue);
        showSlide(currentSlide);
        updateButtonsState();
      });
    });

    prevButton.addEventListener("click", () => {
      if (slides.length > 0) {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        updateButtonsState();
      }
    });

    nextButton.addEventListener("click", () => {
      if (slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        updateButtonsState();
      }
    });

    const allRadio = document.querySelector('.services__filter-checkbox[value="all"]');
    allRadio.checked = true;
    updateServicesList("all");
  }
}