if (document.querySelector('[data-slider="vogez-slide-first"]')) {
    let sliderFirstAbout = new Splide('[data-slider="vogez-slide-first"]', {
        type : 'loop',
        rewind: false,
        arrows: false,
        pagination: false,
        focus: 'left',
        fixedWidth: '100%',
        start: 0,
        perPage: 3,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        pauseOnFocus: true,
        speed: 600,
    });

    sliderFirstAbout.mount();
}
if (document.querySelector('[data-slider="vogez-slide-block"]')) {
    let sliderBlocksAbout = new Splide('[data-slider="vogez-slide-block"]', {
        type: 'loop',
        rewind: false,
        arrows: false,
        pagination: false,
        gap: 14,
        focus: 'left',
        fixedWidth: '100%',
        start: 0,
        perPage: 3,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        pauseOnFocus: true,
        speed: 400,
    });

    sliderBlocksAbout.mount();
}

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    const yearsColumn = document.getElementById('yearsColumn');
    const descriptionsColumn = document.getElementById('descriptionsColumn');
    const yearItems = document.querySelectorAll('.year-item');
    const descriptionItems = document.querySelectorAll('.description-item');

    let isProgrammaticScroll = false;
    let scrollTimeout;
    let isMobile = window.innerWidth <= 768;

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function scrollYearsColumnToYear(year) {
        if (isProgrammaticScroll) return;

        const selectedYear = document.querySelector(`.year-item[data-year="${year}"]`);
        if (!selectedYear) return;

        isProgrammaticScroll = true;

        if (isMobile) {
            const containerLeft = yearsColumn.scrollLeft;
            const containerRight = containerLeft + yearsColumn.clientWidth;
            const itemLeft = selectedYear.offsetLeft;
            const itemRight = itemLeft + selectedYear.offsetWidth;

            if (itemLeft < containerLeft || itemRight > containerRight) {
                yearsColumn.scrollTo({
                    left: itemLeft - (yearsColumn.clientWidth / 2) + (selectedYear.offsetWidth / 2),
                    behavior: 'smooth'
                });
            }
        } else {
            const containerTop = yearsColumn.scrollTop;
            const containerBottom = containerTop + yearsColumn.clientHeight;
            const itemTop = selectedYear.offsetTop;
            const itemBottom = itemTop + selectedYear.offsetHeight;

            if (itemTop < containerTop || itemBottom > containerBottom) {
                yearsColumn.scrollTo({
                    top: itemTop - (yearsColumn.clientHeight / 2) + (selectedYear.offsetHeight / 2),
                    behavior: 'smooth'
                });
            }
        }

        setTimeout(() => {
            isProgrammaticScroll = false;
        }, 300);
    }

    function updateActiveYear() {
        if (isProgrammaticScroll) return;

        const scrollTop = descriptionsColumn.scrollTop;
        const containerHeight = descriptionsColumn.clientHeight;

        let activeYear = null;
        let minTopOffset = Infinity;

        descriptionItems.forEach((item) => {
            const offsetTop = item.offsetTop;
            const relativeTop = offsetTop - scrollTop;

            if (relativeTop <= containerHeight * 0.3 && relativeTop > -item.offsetHeight) {
                if (relativeTop >= 0 && relativeTop < minTopOffset) {
                    minTopOffset = relativeTop;
                    activeYear = item.dataset.year;
                }
            }
        });

        if (!activeYear) {
            for (let i = 0; i < descriptionItems.length; i++) {
                const item = descriptionItems[i];
                const offsetTop = item.offsetTop;
                const offsetBottom = offsetTop + item.offsetHeight;

                if (offsetBottom > scrollTop && offsetTop < scrollTop + containerHeight) {
                    activeYear = item.dataset.year;
                    break;
                }
            }
        }

        if (activeYear) {
            yearItems.forEach(item => {
                const isActive = item.dataset.year === activeYear;
                item.classList.toggle('active', isActive);
            });

            scrollYearsColumnToYear(activeYear);
        }
    }

    function scrollToYear(year) {
        const targetItem = Array.from(descriptionItems).find(
            item => item.dataset.year === year
        );

        if (targetItem) {
            isProgrammaticScroll = true;

            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            const targetPosition = targetItem.offsetTop - 24;

            descriptionsColumn.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            yearItems.forEach(item => {
                item.classList.toggle('active', item.dataset.year === year);
            });

            setTimeout(() => {
                scrollYearsColumnToYear(year);
            }, 100);

            scrollTimeout = setTimeout(() => {
                isProgrammaticScroll = false;
                updateActiveYear();
            }, 500);
        }
    }

    yearItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const year = this.dataset.year;

            yearItems.forEach(y => y.classList.remove('active'));
            this.classList.add('active');

            scrollToYear(year);
        });

        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        if (!item.hasAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
        }
    });

    yearsColumn.addEventListener('scroll', function() {
        if (isProgrammaticScroll || !isMobile) return;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollLeft = this.scrollLeft;
            const containerWidth = this.clientWidth;
            const centerPosition = scrollLeft + containerWidth / 2;

            let activeYear = null;
            let minDistance = Infinity;

            yearItems.forEach(item => {
                const itemLeft = item.offsetLeft;
                const itemCenter = itemLeft + item.offsetWidth / 2;
                const distance = Math.abs(itemCenter - centerPosition);

                if (distance < minDistance) {
                    minDistance = distance;
                    activeYear = item.dataset.year;
                }
            });

            if (activeYear) {
                yearItems.forEach(item => {
                    item.classList.toggle('active', item.dataset.year === activeYear);
                });

                scrollToYear(activeYear);
            }
        }, 100);
    }, { passive: true });

    descriptionsColumn.addEventListener('wheel', function(e) {
        const container = this;
        const isAtTop = container.scrollTop <= 1;
        const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

        if (e.deltaY < 0 && isAtTop) {
            return true;
        }

        if (e.deltaY > 0 && isAtBottom) {
            return true;
        }

    }, { passive: true });

    function handleTouchMove(e) {
        const container = this;
        const touch = e.touches[0];

        if (!this.lastTouchY) {
            this.lastTouchY = touch.clientY;
            return;
        }

        const deltaY = this.lastTouchY - touch.clientY;
        this.lastTouchY = touch.clientY;

        const isAtTop = container.scrollTop <= 1;
        const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

        if (deltaY < 0 && isAtTop) {
            return true;
        }

        if (deltaY > 0 && isAtBottom) {
            return true;
        }

        e.preventDefault();
    }

    let touchStartY = 0;

    descriptionsColumn.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    descriptionsColumn.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        const deltaY = touchStartY - touch.clientY;

        const isAtTop = this.scrollTop <= 0;
        const isAtBottom = this.scrollTop + this.clientHeight >= this.scrollHeight;

        if (window.innerWidth > 769 && !(deltaY < 0 && isAtTop) && !(deltaY > 0 && isAtBottom)) {
            e.preventDefault();
        }

        touchStartY = touch.clientY;
    }, { passive: false });

    yearsColumn.addEventListener('touchstart', function(e) {
        this.lastTouchY = e.touches[0].clientY;
    }, { passive: true });

    yearsColumn.addEventListener('touchmove', handleTouchMove, { passive: false });

    descriptionsColumn.addEventListener('scroll', debounce(() => {
        if (!isProgrammaticScroll) {
            updateActiveYear();
        }
    }, 50));

    const resizeObserver = new ResizeObserver(debounce(() => {
        isMobile = window.innerWidth <= 768;
        updateActiveYear();
    }, 100));

    resizeObserver.observe(descriptionsColumn);
    resizeObserver.observe(yearsColumn);

    setTimeout(updateActiveYear, 100);

    if (window.location.hash) {
        const yearFromHash = window.location.hash.replace('#', '');
        const targetYear = Array.from(yearItems).find(item => item.dataset.year === yearFromHash);
        if (targetYear) {
            setTimeout(() => {
                targetYear.click();
            }, 200);
        }
    }

    function updateUrlWithYear(year) {
        const newUrl = `${window.location.pathname}#${year}`;
        history.replaceState(null, null, newUrl);
    }

    yearItems.forEach(item => {
        item.addEventListener('click', function() {
            updateUrlWithYear(this.dataset.year);
        });
    });

    descriptionItems.forEach(item => {
        item.style.scrollMarginTop = '24px';
    });

    window.addEventListener('resize', debounce(() => {
        isMobile = window.innerWidth <= 768;
    }, 100));

});