export const feedback = () => {
    emailjs.init("swwSiyo7yzThslhjm");

    const feedbackFormModal = `
     <div class="feedback__popup form">
       <div class="feedback__popup-body">
        <button class="feedback__popup-close-button" type="button" aria-label="Закрыть окно об успешной отправке" aria-expanded="false" data-tippy-content="Закрыть">
         <span class="feedback__popup-close-button-icon"></span>
        </button>
       <div class="feedback__popup-content">
        <h6 class="feedback__title">Получите консультацию специалиста бесплатно</h6>
        <span class="feedback__desc">Не нашли категорию или остались вопросы? Оставьте заявку и мы поможем вам</span>
        <form class="feedback__form">
         <label class="feedback__form-input-container">
          <i class="fa-regular fa-user"></i>
          <input class="feedback__form-input" type="text" placeholder="Ваше имя" id="from_name" name="from_name" required>
         </label>
         <label class="feedback__form-input-container">
          <i class="fa-solid fa-mobile-screen-button"></i>
          <input class="feedback__form-input" type="tel" inputmode="tel" maxlength="11" id="reply_to" name="reply_to" placeholder="Телефон" required>
         </label>
         <button class="feedback__form-button" type="submit">
          <span>Оставить заявку</span>
         </button>
        </form>
       </div>
       </div>
    </div>
    `;

    const showFeedbackForm = () => {
        document.body.insertAdjacentHTML("beforeend", feedbackFormModal);
        const closeButton = document.querySelector(".feedback__popup-close-button");

        // Устанавливаем aria-expanded на true при открытии попапа
        closeButton.setAttribute("aria-expanded", "true");

        // Добавляем обработчик события для закрытия попапа по кнопке
        closeButton.addEventListener("click", () => {
            closePopup();
        });
    };

    const closePopup = () => {
        const popup = document.querySelector(".feedback__popup");
        if (popup) {
            // Устанавливаем aria-expanded на false при закрытии попапа
            const closeButton = popup.querySelector(".feedback__popup-close-button");
            closeButton.setAttribute("aria-expanded", "false");

            popup.remove();
        }
    };

    const showSuccessPopup = () => {
        const popupHTML = `
            <div class="feedback__popup">
             <div class="feedback__popup-body">
              <div class="feedback__popup-top">
               <button class="feedback__popup-close-button" type="button" aria-label="Закрыть окно об успешной отправке" aria-expanded="false" data-tippy-content="Закрыть">
                <span class="feedback__popup-close-button-icon"></span>
               </button>
              </div>
              <div class="feedback__popup-content">
               <img src="src/imgs/feedback/succes.gif" alt="Успешная отправка">
               <span>Заявка отправлена, ожидайте звонка</span>
              </div>
             </div>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", popupHTML);

        const popup = document.querySelector(".feedback__popup");
        const closeButton = popup.querySelector(".feedback__popup-close-button");

        // Устанавливаем aria-expanded на true при открытии попапа
        closeButton.setAttribute("aria-expanded", "true");

        closeButton.addEventListener("click", () => {
            closePopup();
        });

        popup.addEventListener("click", event => {
            if (event.target === popup) {
                closePopup();
            }
        });

        popup.focus();
    };

    document.addEventListener("click", event => {
        if (event.target.matches('[data-feedback-button]')) {
            showFeedbackForm();
        } else if (event.target.closest(".feedback__form")) {
            const feedbackForm = event.target.closest(".feedback__form");

            feedbackForm.addEventListener("submit", event => {
                event.preventDefault();

                emailjs.sendForm("service_uok76pv", "template_pf306j1", feedbackForm)
                    .then(() => {
                        closePopup();
                        showSuccessPopup();
                    })
                    .catch(error => {
                        console.error("Не удалось отправить письмо. Ошибка: ", error);
                    });
            });
        }
    });

    document.addEventListener("click", event => {
        const popup = document.querySelector(".feedback__popup");
        if (popup && event.target === popup) {
            closePopup();
        }
    });
}
