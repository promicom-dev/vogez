document.addEventListener('DOMContentLoaded', function() {
    const customSelects = document.querySelectorAll('.customSelect');

    customSelects.forEach(function(select) {
        // label это input
        const labelInput = select.querySelector('.customSelect__label');
        const ul = select.querySelector('.customSelect__ul');
        const items = ul.querySelectorAll('li');
        const wrapper = select.closest('.input-wrapper-select');
        // Это поле для "Свой вариант"
        const customInput = wrapper.querySelector('input[type="text"]:not(.customSelect__label)');

        // Сохраняем оригинальные значения
        const defaultPlaceholder = labelInput ? labelInput.placeholder : '';
        const defaultCustomPlaceholder = customInput ? customInput.placeholder : '';
        let isOpen = false;

        // Функция закрытия списка
        function closeSelect() {
            isOpen = false;
            ul.classList.remove('active');
            select.classList.remove('open'); // Убираем класс open у .customSelect
        }

        // Функция открытия списка
        function openSelect() {
            isOpen = true;
            ul.classList.add('active');
            select.classList.add('open'); // Добавляем класс open к .customSelect
        }

        // Клик по label input - открываем/закрываем список
        labelInput.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isOpen) {
                closeSelect();
            } else {
                openSelect();
            }
        });

        // Запрещаем ввод в label input, если не выбран "Свой вариант"
        labelInput.addEventListener('input', function(e) {
            if (!wrapper.classList.contains('newInput')) {
                const activeItem = select.querySelector('li[aria-selected="true"]');
                if (activeItem) {
                    this.value = activeItem.dataset.name;
                } else {
                    this.value = '';
                }
            }
        });

        // Клик по пункту списка
        items.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.stopPropagation();

                const selectedValue = this.dataset.name;
                const isNewInput = this.dataset.tab === 'newInput';

                // Убираем active у всех пунктов
                items.forEach(function(li) {
                    li.removeAttribute('aria-selected');
                    li.classList.remove('active');
                });

                // Устанавливаем active на выбранный пункт
                this.setAttribute('aria-selected', 'true');
                this.classList.add('active');

                // ===== ВСЕГДА ЗАПИСЫВАЕМ В LABEL INPUT =====
                labelInput.value = selectedValue;
                labelInput.placeholder = selectedValue;

                // Убираем ошибки
                wrapper.classList.remove('error');
                const errorMsg = wrapper.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
                labelInput.classList.remove('error');

                // Проверяем, выбран ли "Свой вариант"
                if (isNewInput) {
                    wrapper.classList.add('newInput');
                    if (customInput) {
                        // Показываем custom input и очищаем его для ввода
                        customInput.value = '';
                        customInput.style.display = 'block';
                        setTimeout(function() {
                            customInput.focus();
                        }, 100);
                    }
                } else {
                    wrapper.classList.remove('newInput');
                    if (customInput) {
                        customInput.placeholder = defaultCustomPlaceholder;
                        customInput.style.display = 'none';
                        customInput.value = '';
                    }
                    // Восстанавливаем placeholder для label input
                    labelInput.placeholder = defaultPlaceholder;
                }

                // Закрываем список
                closeSelect();
            });
        });

        // Закрываем список при клике вне его
        document.addEventListener('click', function(e) {
            if (!select.contains(e.target)) {
                closeSelect();
            }
        });

        // Обработка ввода текста в custom input (поле "Свой вариант")
        if (customInput) {
            // Скрываем custom input по умолчанию
            customInput.style.display = 'none';

            customInput.addEventListener('input', function() {
                if (wrapper.classList.contains('newInput')) {
                    const value = this.value.trim();
                    if (value !== '') {
                        // Обновляем label input при вводе в custom input
                        labelInput.value = value;
                        labelInput.placeholder = value;
                    } else {
                        // Если поле пустое - показываем placeholder
                        const newInputItem = select.querySelector('[data-tab="newInput"]');
                        if (newInputItem && newInputItem.classList.contains('active')) {
                            const placeholderText = newInputItem.dataset.name;
                            labelInput.value = '';
                            labelInput.placeholder = placeholderText;
                        }
                    }
                }
                // Убираем ошибку при вводе
                this.classList.remove('error');
                const errorMsg = wrapper.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
                wrapper.classList.remove('error');
                labelInput.classList.remove('error');
            });

            customInput.addEventListener('blur', function() {
                if (wrapper.classList.contains('newInput') && this.value.trim() !== '') {
                    labelInput.value = this.value.trim();
                    labelInput.placeholder = this.value.trim();
                }
            });

            customInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && wrapper.classList.contains('newInput')) {
                    this.blur();
                    closeSelect();
                }
            });
        }
    });

    // ========== ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ОШИБОК ==========
    function showError(element, message) {
        element.classList.add('error');

        const wrapper = element.closest('.input-wrapper') || element.closest('.input-wrapper-select');
        if (wrapper) {
            // Удаляем старую ошибку
            const oldError = wrapper.querySelector('.error-message');
            if (oldError) oldError.remove();

            // Создаем новую ошибку
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: #FF3B30;
                font-size: 12px;
                margin-top: 4px;
                display: block;
            `;
            wrapper.appendChild(errorDiv);
        }
    }
});