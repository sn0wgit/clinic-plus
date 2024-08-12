export const reports = () => {
  new Swiper(".reports__slider", {
    slidesPerView: 2,
    spaceBetween: 50,
    navigation: {
      nextEl: ".reports__slider-button.next",
      prevEl: ".reports__slider-button.prev",
    },
    breakpoints: {
      320: {
          slidesPerView: 1,
          spaceBetween: 0
      },
      480: {
          slidesPerView: 1,
          spaceBetween: 0
      },
      768: {
          slidesPerView: 1,
          spaceBetween: 0
      },
      1024: {
          slidesPerView: 2,
          spaceBetween: 5
      }
    },
  });
}