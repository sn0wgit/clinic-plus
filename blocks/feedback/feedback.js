export const feedback = () => {
    emailjs.init("swwSiyo7yzThslhjm");

    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            emailjs.sendForm("service_uok76pv", "template_pf306j1", form)
                .then(function() {
                    showPopup();
                    form.reset();
                }, function(error) {
                    console.log("Failed to send email. Error: ", error);
                });
        });
    });

    const showPopup = () => {
        const popupHTML = `
            <div class="feadback__popup">
                <div class="feadback__popup-body">
                    <div class="feadback__popup-top">
                        <button class="feadback__popup-close-button" type="button" aria-label="Закрыть окно об успешной отправке" aria-expanded="false" data-tippy-content="Закрыть">
                            <span class="feadback__popup-close-button-icon"></span>
                        </button>
                    </div>
                    <div class="feadback__popup-content">
                        <img src="https://i.ibb.co/6sz39b9/success.gif" alt="">
                        <span>Заявка отправлена, ожидайте звонка</span>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", popupHTML);

        const popup = document.querySelector(".feadback__popup");
        const closeButton = document.querySelector(".feadback__popup-close-button");

        closeButton.addEventListener("click", () => {
            popup.remove();
        });

        popup.addEventListener("click", event => {
            if (event.target === popup) {
                popup.remove();
            }
        });

        popup.focus();
    };

    document.addEventListener("DOMContentLoaded", () => {
        feedback();
    });
}