export const reports = () => {
  new Swiper(".reports__slider", {
    slidesPerView: 2,
    spaceBetween: 50,
    navigation: {
      nextEl: ".reports__slider-button.next",
      prevEl: ".reports__slider-button.prev",
    },
  });
};