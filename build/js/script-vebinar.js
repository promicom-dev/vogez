document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector('[data-form="vebinar"]'),t=document.querySelector('[data-form="vebinar-note"]');e&&(e.addEventListener("submit",function(e){e.preventDefault(),console.log("Форма отправлена без перезагрузки"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("initSendFormSuccess"))},500)}),window.addEventListener("initSendFormSuccess",e=>{document.querySelector("#vebinar-popup").innerHTML=`
                <button popovertarget="vebinar-popup" popovertargetaction="hide" class="close">×</button>
                <article class="quest-list__sheet sent-note">
                    <div class="title">
                        <svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8519 33.4888L0.292969 17.9298L3.41089 14.8112L15.8519 27.2522L42.5846 0.519531L45.7026 3.63818L15.8519 33.4888Z" fill="#35EB4A"></path>
                        </svg>
                        <h3>Спасибо за вашу идею</h3>
                    </div>
                </article>
            `})),t&&(t.addEventListener("submit",function(e){e.preventDefault(),console.log("Форма отправлена без перезагрузки"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("initSendFormSuccessNote"))},500)}),window.addEventListener("initSendFormSuccessNote",e=>{document.querySelector("#vebinar-note-popup").innerHTML=`
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
            `}))});