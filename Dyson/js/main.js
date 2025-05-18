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

    // MODAL

    const modal = document.querySelector('.modal')
    const modalButton = document.querySelector('.testimonials__button-review')

    if (modalButton) {
        modalButton.addEventListener('click', openModal)
        modal.addEventListener('click', closeModal)
    }

    function openModal(e) {
        e.preventDefault()
        document.body.classList.toggle('body--opened-modal')
    }

    function closeModal(e) {
        e.preventDefault()

        const target = e.target

        if (target.closest('.modal__cancel') || target.classList.contains('modal')) {
            document.body.classList.remove('body--opened-modal')
        }
    }

    // MODAL RAITING

    const stars = document.querySelectorAll('.modal__star')

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('active', i <= index)
            })

        })
    })

    // TESTIMONIALS GALLERY


    const buttons = document.querySelectorAll('.reviewer-more--link');

    let lightbox;


    const links = document.querySelectorAll('.glightbox');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });


    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (!lightbox) {
                lightbox = GLightbox({
                    selector: '.glightbox',
                    loop: true,
                    touchNavigation: true,
                });

                lightbox.on('open', () => {
                    createCounter();
                    updateCounter(lightbox.index, lightbox.elements.length);
                });

                lightbox.on('slide_changed', ({ current }) => {
                    updateCounter(current.index, lightbox.elements.length);
                });
            }
            lightbox.open();
        });
    });

    function createCounter() {
        const container = document.querySelector('.glightbox-container');
        if (container && !document.querySelector('.glightbox-counter')) {
            const counter = document.createElement('div');
            counter.className = 'glightbox-counter';
            container.appendChild(counter);
        }
    }

    function updateCounter(currentIndex, total) {
        const counter = document.querySelector('.glightbox-counter');
        if (counter) {
            counter.innerHTML = `${currentIndex + 1} / ${total}`;
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

    // Swiper

    const swiper = new Swiper('.swiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.arrow-next',
            prevEl: '.arrow-prev',
        },
        loop: false,

        on: {
            init: function () {
                updatePagination(this);
            },
            slideChange: function () {
                updatePagination(this);
            }
        }
    });

    function updatePagination(swiper) {
        const current = swiper.realIndex + 1;
        const total = swiper.slides.lenght;
        document.querySelector('.swiper-pagination-custom').textContent = `${current} из 3`;
    }

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

    // SHOW MORE BTN

    document.addEventListener("DOMContentLoaded", function () {
        // ===== Отзывы =====
        const reviews = document.querySelectorAll(".testimonials__reviewer");
        const showMoreBtn = document.querySelector(".show__more-btn");
        const reviewStep = 3;
        let currentReviewIndex = 1;
    
        // Скрываем лишние отзывы
        reviews.forEach((review, index) => {
            if (index >= reviewStep) {
                review.style.display = "none";
            }
        });
    
        function showNextReviews() {
            for (let i = currentReviewIndex; i < currentReviewIndex + reviewStep; i++) {
                if (reviews[i]) {
                    reviews[i].style.display = "flex";
                }
            }
            currentReviewIndex += reviewStep;
            if (currentReviewIndex >= reviews.length) {
                showMoreBtn.style.display = "none";
            }
        }
    
        showMoreBtn?.addEventListener("click", showNextReviews);
    
    
        // ===== Новости =====
    const newsLists = document.querySelectorAll(".news__list");
    const showMoreNewsBtn = document.querySelector(".news__button-more--news");
    const newsStep = 1; // по одному списку
    let currentNewsIndex = newsStep;

    // Скрываем списки, кроме первого
    newsLists.forEach((list, index) => {
        if (index >= newsStep) {
            list.style.display = "none";
        }
    });

    function showNextNews() {
        for (let i = currentNewsIndex; i < currentNewsIndex + newsStep; i++) {
            if (newsLists[i]) {
                newsLists[i].style.display = "flex"; // или "block", если нужно
            }
        }
        currentNewsIndex += newsStep;

        if (currentNewsIndex >= newsLists.length) {
            showMoreNewsBtn.style.display = "none";
        }
    }

    showMoreNewsBtn?.addEventListener("click", showNextNews);
    
    });

    // SORT PRODUCTS

    document.addEventListener('DOMContentLoaded', function () {
        const sortButton = document.querySelector('.sort-button');
        const sortOptions = document.querySelector('#sort-list');
        const sortItems = document.querySelectorAll('.sort-item');
        const cardsContainer = document.querySelector('.swiper-wrapper');

        sortButton.addEventListener('click', () => {
            sortOptions.classList.toggle('show');
        });

        sortItems.forEach(item => {
            item.addEventListener('click', function () {
                // Удаление активного класса у всех пунктов
                sortItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                const sortValue = this.getAttribute('data-value');
                const cards = Array.from(cardsContainer.querySelectorAll('.product-buy__card'));

                let sortedCards = [];

                switch (sortValue) {
                    case 'popular':
                        sortedCards = cards.sort((a, b) => +a.dataset.popular - +b.dataset.popular);
                        break;
                    case 'price-asc':
                        sortedCards = cards.sort((a, b) => +a.dataset.price - +b.dataset.price);
                        break;
                    case 'price-desc':
                        sortedCards = cards.sort((a, b) => +b.dataset.price - +a.dataset.price);
                        break;
                    case 'new':
                        sortedCards = cards.sort((a, b) => +b.dataset.new - +a.dataset.new);
                        break;
                    case 'rating':
                        sortedCards = cards.sort((a, b) => +b.dataset.rating - +a.dataset.rating);
                        break;
                }

                // Очистка контейнера и добавление отсортированных карточек
                cardsContainer.innerHTML = '';
                sortedCards.forEach(card => cardsContainer.appendChild(card));
            });
        });
    });
    
})()
