document.addEventListener('DOMContentLoaded', function () {
    // Находим форму
    const vebinarForm = document.querySelector('[data-form="vebinar"]');
    const noteForm = document.querySelector('[data-form="vebinar-note"]');

    if(vebinarForm) {
        // Предотвращаем стандартную отправку формы
        vebinarForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Вот здесь нужно preventDefault!

            // Здесь должен быть ваш код отправки через AJAX/fetch
            console.log('Форма отправлена без перезагрузки');

            // После успешной отправки вызываем событие
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('initSendFormSuccess'));
            }, 500);
        });

        // Слушаем событие успешной отправки
        window.addEventListener('initSendFormSuccess', (e) => {
            let popup = document.querySelector('#vebinar-popup')
            popup.innerHTML = `
                <button popovertarget="vebinar-popup" popovertargetaction="hide" class="close">×</button>
                <article class="quest-list__sheet sent-note">
                    <div class="title">
                        <svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8519 33.4888L0.292969 17.9298L3.41089 14.8112L15.8519 27.2522L42.5846 0.519531L45.7026 3.63818L15.8519 33.4888Z" fill="#35EB4A"></path>
                        </svg>
                        <h3>Спасибо за вашу идею</h3>
                    </div>
                </article>
            `;
        });
    }

    if(noteForm) {
        // Предотвращаем стандартную отправку формы
        noteForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Вот здесь нужно preventDefault!

            // Здесь должен быть ваш код отправки через AJAX/fetch
            console.log('Форма отправлена без перезагрузки');

            // После успешной отправки вызываем событие
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('initSendFormSuccessNote'));
            }, 500);
        });

        // Слушаем событие успешной отправки
        window.addEventListener('initSendFormSuccessNote', (e) => {
            let popup = document.querySelector('#vebinar-note-popup')
            popup.innerHTML = `
                <button popovertarget="vebinar-note-popup" popovertargetaction="hide" class="close">×</button>
                <article class="quest-list__sheet sent-note">
                    <div class="title">
                        <svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8519 33.4888L0.292969 17.9298L3.41089 14.8112L15.8519 27.2522L42.5846 0.519531L45.7026 3.63818L15.8519 33.4888Z" fill="#35EB4A"></path>
                        </svg>
                        <h3>Вы записаны на вебинар </h3>
                        <div class="title__h4">“Как подобрать электропривод с регулирующим клапаном?”</div>
                        <div class="title__h5">“Мы пришлем вам напоминание о начале трансляции на указанную почту за 1 ч до начала ”</div>
                    </div>
                </article>
            `;
        });
    }
});