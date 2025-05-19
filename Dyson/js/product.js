(function () {

    // BURGER
    document.body.addEventListener('click', burgerInit)
    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger-icon')
        const burgerNavLink = e.target.closest('.header__nav-link')

        if (!burgerIcon && !burgerNavLink) return
        if (document.documentElement.clientWidth > 1200) {
            return
        }

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }

    }

    // ADD TO CART

    const minusBtns = document.querySelectorAll('.minus');
    const plusBtns = document.querySelectorAll('.plus');
    const quantityValues = document.querySelectorAll('.quantity-value');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    let cartTotal = 0;

    minusBtns.forEach((minusBtn, index) => {
        minusBtn.addEventListener('click', () => {
            const quantityValue = quantityValues[index];
            const quantity = parseInt(quantityValue.textContent);
            if (quantity > 1) {
                quantityValue.textContent = quantity - 1;
            }
        });
    });

    plusBtns.forEach((plusBtn, index) => {
        plusBtn.addEventListener('click', () => {
            const quantityValue = quantityValues[index];
            const quantity = parseInt(quantityValue.textContent);
            quantityValue.textContent = quantity + 1;
            document.querySelector('.cart-status').classList.remove('hidden');
        });

    });

    addToCartBtns.forEach((addToCartBtn, index) => {
        addToCartBtn.addEventListener('click', () => {
            const quantityValue = quantityValues[index];
            const quantity = parseInt(quantityValue.textContent);
            cartTotal += quantity;
            cartCount.textContent = cartTotal;
            quantityValue.textContent = 1;
            const cartStatus = document.querySelector('.cart-status');
            cartStatus.classList.remove('hidden');
        });
    });


    // WISHLIST


    const heartIcons = document.querySelectorAll('.heart-icon, .product-buy__heart, .heart-icon--swiper');
    const wishlistCount = document.querySelector('.wishlist-count');
    const wishlistStatus = document.querySelector('.wishlist-status');


    let wishlistTotal = 0;

    console.log(heartIcons);
    console.log(wishlistCount);
    console.log(wishlistStatus);
    heartIcons.forEach(heartIcon => {
        heartIcon.addEventListener('click', () => {
            const liked = heartIcon.classList.toggle('liked');

            wishlistTotal += liked ? 1 : -1;
            wishlistCount.textContent = wishlistTotal;
            console.log(heartIcons);
            console.log(wishlistCount);
            console.log(wishlistStatus);

            wishlistStatus.classList.toggle('hidden', wishlistTotal === 0);

        });
    });

    // FAQ

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.classList.toggle('active');
            question.classList.toggle('active');
            const btn = question.querySelector('.faq-question__button');
            btn.classList.toggle('active');
            console.log("click");
        });
    });

    // SCROLL COMPONENTS

    document.querySelectorAll('.thumb').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            const thumbnails = document.querySelectorAll('.thumb');
            thumbnails.forEach(function (thumbnail) {
                thumbnail.classList.remove('active');
            });
            this.classList.add('active');

            const mainImage = document.querySelector('.main-image');
            mainImage.src = this.getAttribute('data-main-image');
            const replaceImage = document.querySelector('.data-main-image');
        });
    });
    const thumbnailsWrapper = document.querySelector('.thumbnails-wrapper');
    const upBtn = document.querySelector('.arrow-up');
    const downBtn = document.querySelector('.arrow-down');

    const scrollAmount = 200; // пикселей за один клик

    upBtn.addEventListener('click', () => {
        thumbnailsWrapper.scrollTop -= scrollAmount;
    });

    downBtn.addEventListener('click', () => {
        thumbnailsWrapper.scrollTop += scrollAmount;
    });


    const wrapper = document.querySelector('.thumbnails-wrapper');
    const uppButton = document.querySelector('.arrow-up');
    const downButton = document.querySelector('.arrow-down');

    function updateArrows() {
        const scrollTop = wrapper.scrollTop;
        const scrollHeight = wrapper.scrollHeight;
        const clientHeight = wrapper.clientHeight;

        const canScrollUp = scrollTop > 0;
        const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;

        // Сначала скрываем обе
        uppButton.classList.remove('show');
        downButton.classList.remove('show');

        // Показываем только одну
        if (canScrollUp && !canScrollDown) {
            upBtn.classList.add('show');
        } else if (canScrollDown && !canScrollUp) {
            downBtn.classList.add('show');
        } else if (canScrollDown && canScrollUp) {
            // Если можно и вверх, и вниз — выбираем приоритет (например, вниз)
            downBtn.classList.add('show');
        }
    }

    wrapper.addEventListener('scroll', updateArrows);
    wrapper.addEventListener('mouseenter', updateArrows);
    wrapper.addEventListener('mouseleave', () => {
        uppButton.classList.remove('show');
        downButton.classList.remove('show');
    });
    window.addEventListener('load', updateArrows);


    // TABBED CONTENT

    const tabs = document.querySelectorAll('.tab-btn');
    const sliderWrapper = document.querySelector('.tab-slider__wrapper');
    const slider = document.querySelector('.tab-slider');
    const slides = document.querySelectorAll('.tab-slide');

    let currentSlideIndex = 0; // <--- обязательно!

    // Функция для обновления высоты контейнера слайдера
    function updateHeight(index) {
        const activeSlide = slides[index];
        if (activeSlide) {
            sliderWrapper.style.height = `${activeSlide.offsetHeight}px`;
            console.log('Slide index:', index);
            console.log('OffsetHeight:', slides[index].offsetHeight);
            console.log('Wrapper height before:', sliderWrapper.style.height);
        }
    }

    // Инициализация при загрузке
    window.addEventListener('load', () => {
        updateHeight(0);
    });

    // Следим за изменением размеров
    const resizeObserver = new ResizeObserver(() => {
        updateHeight(currentSlideIndex);

    });

    slides.forEach(slide => {
        resizeObserver.observe(slide);
    });

    // Обработка кликов по табам
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');

            updateHeight(index);
            currentSlideIndex = index;
        });
    });


    // MAP

    var map = L.map('map').setView([55.7558, 37.6176], 13); // Координаты Москвы

    // Добавляем слой карты из OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Добавляем маркер на карту
    L.marker([59.927016043630914, 30.256499254222867]).addTo(map)
        .bindPopup('ПУНКТ ВЫДАЧИ')
        .openPopup();

    L.marker([59.95330370054098, 30.210817885470902]).addTo(map)
        .bindPopup('ПУНКТ ВЫДАЧИ')
        .openPopup();

    L.marker([59.93812852640021, 30.23064014105252]).addTo(map)
        .bindPopup('ПУНКТ ВЫДАЧИ')
        .openPopup();


    function updateZoomControlPosition() {

        
        if (window.innerWidth > 1000) {
            // Для мобильных устройств
            map.zoomControl.setPosition('bottomright');
        } else if (window.innerWidth > 700) {
            // Для десктопа
            map.zoomControl.setPosition('topright');
        }else if (window.innerWidth <= 700) {
            map.zoomControl.setPosition('topright');
        }
    }

    updateZoomControlPosition();
    window.addEventListener('resize', updateZoomControlPosition);


    // TEXT MORE
    const btn = document.getElementById('toggleText');
    const text = document.getElementById('description');

    btn.addEventListener('click', () => {
        text.classList.toggle('expanded');
        btn.textContent = text.classList.contains('expanded') ? 'Скрыть' : 'Показать ещё';
    });

    // SLIDER MOBILE
    // Инициализация основного слайдера
    const mainSwiper = new Swiper('.product__main-image--mobile', {
        direction: 'horizontal',
        loop: false,
        pagination: {
            el: '.custom-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    // Инициализация миниатюр
    const thumbsSwiper = new Swiper('.mobile-thumbnails', {
        slidesPerView: 5,
        spaceBetween: 0,
        slideToClickedSlide: true,
        direction: 'vertical',
        initialSlide: 0,
        watchSlidesProgress: true,
        centeredSlides: false,
    });

    // Синхронизация: при клике на миниатюру переключаем основной слайдер
    mainSwiper.on('slideChange', () => {
        const realIndex = mainSwiper.realIndex; // Получаем реальный индекс активного слайда

        // Обновляем класс активной миниатюры
        thumbsSwiper.slides.forEach((slide, index) => {
            slide.classList.remove('thumb-active'); // Убираем класс с всех слайдов
            if (index === realIndex) {
                slide.classList.add('thumb-active'); // Добавляем класс только к активной миниатюре
            }
        });

        // Прокручиваем миниатюры, чтобы активная была в центре
        thumbsSwiper.slideTo(realIndex);
    });

    // Синхронизация: при клике на миниатюру переключаем основной слайдер
    thumbsSwiper.on('click', (swiper, e) => {
        const clickedIndex = swiper.clickedIndex;
        if (clickedIndex !== undefined && clickedIndex !== mainSwiper.realIndex) {
            mainSwiper.slideTo(clickedIndex); // Переключаем основной слайдер на слайд, на который кликнули
        }
    });

    // RELATED PRODUCTS 


    document.addEventListener("DOMContentLoaded", function () {
        const relatedCards = document.querySelectorAll(".product-buy__card-inner");
        const showMoreRelatedBtn = document.querySelector(".related__products-button--show");
        const relatedStep = 3; // по одному элементу
        let currentRelatedIndex = relatedStep;
    
        // Скрываем все, кроме первых `relatedStep`
        relatedCards.forEach((card, index) => {
            if (index >= relatedStep) {
                card.style.display = "none";
            }
        });
    
        function showNextRelated() {
            const nextIndex = currentRelatedIndex + relatedStep;
            for (let i = currentRelatedIndex; i < nextIndex; i++) {
                if (relatedCards[i]) {
                    relatedCards[i].style.display = "flex"; // или "block" — по необходимости
                }
            }
            currentRelatedIndex = nextIndex;
    
            if (currentRelatedIndex >= relatedCards.length) {
                showMoreRelatedBtn.style.display = "none";
            }
        }
    
        showMoreRelatedBtn?.addEventListener("click", showNextRelated);
    });
    


})()