
(function () {
    
    // burger
    document.body.addEventListener('click', burgerInit)
        function burgerInit(e) {
        
        

        const burgerIcon = e.target.closest('.burger-icon')
        const burgerNavLink = e.target.closest('.nav__link')
        


        if(!burgerIcon && !burgerNavLink) return

        if(document.documentElement.clientWidth > 900) {
            return
        }


        if(!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        }else{
            document.body.classList.remove('body--opened-menu')
        }
        

    //Modal
        }
        const modal =document.querySelector('.modal')
        const modalButton = document.querySelector('.about__img-btn')

        modalButton.addEventListener('click', openModal)
        modal.addEventListener('click',closeModal)

        function openModal(e) {
            e.preventDefault()
            document.body.classList.toggle('body--opened-modal')
        }

        function closeModal(e){
            e.preventDefault()

            const target = e.target

            if(target.closest('.modal__cancel') || target.classList.contains('modal')) {
                document.body.classList.remove('body--opened-modal')
            }
            
        }
    
    //Tab
    const tabControls = document.querySelector('.tab-controls')

    tabControls.addEventListener('click', switchTab)

    function switchTab(e) {
        
        const tabControl = e.target.closest('.tab-controls__link')

        if(!tabControl) return
        e.preventDefault()
        if(tabControl.classList.contains('tab-controls__link--active')) return

        

        const tabId = tabControl.getAttribute('href')
        const tabContent = document.querySelector(tabId)
        const activeControl = document.querySelector('.tab-controls__link--active')
        const activeContent = document.querySelector('.tab-content--show')
        
        activeControl.classList.remove('tab-controls__link--active')
        activeContent.classList.remove('tab-content--show')


        tabControl.classList.add('tab-controls__link--active')
        tabContent.classList.add('tab-content--show')
    }
    

    // Accordion
    const accocordionLists = document.querySelectorAll('.accordion-list');

    accocordionLists.forEach(el => {
        

        el.addEventListener('click',(e) => {

            const accordionList = e.currentTarget
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')


            const accordionControl = e.target.closest('.accordion-list__control');
            if(!accordionControl) return

            const accordionItem = accordionControl.parentElement;
            const accordionContent = accordionControl.nextElementSibling;

            if(accordionOpenedItem && accordionOpenedItem !== accordionItem) {
                accordionOpenedItem.classList.remove("accordion-list__item--opened");
                accordionOpenedContent.style.maxHeight = null;
            }
            accordionItem.classList.toggle("accordion-list__item--opened");

            if(accordionItem.classList.contains('accordion-list__item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            } else {
                accordionContent.style.maxHeight = null;
            }
            
        })
    });

    
    // Slider

    const swiper = new Swiper('.gallery__slider', {
        
        spaceBetween: 15,
        slidesPerView: 1.5,
        // If we need pagination
        pagination: {
            el: '.gallery__pagination',
            type: 'fraction',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.gallery__next',
            prevEl: '.gallery__prev',
        },


        breakpoints: {
            601: {
                slidesPerView:3,
            },
            800: {
                spaceBetween: 32,
            },
            1101: {
                slidesPerView: 4,
            }
        }
    });

    // Scroll Slider

    new Swiper('.testimonials__slider', {
        
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,


        // Navigation arrows
        navigation: {
            nextEl: '.testimonials__next',
            prevEl: '.testimonials__prev',
        },

        scrollbar: {
            el: '.testimonials__scrollbar',
            draggable: true,
        },

        breakpoints: {
            601: {
                slidesPerView: 1.5,
            },
            901: {
                slidesPerView: 1.5,
            },
            1201: {
                slidesPerView: 2.1,
            }
        }

    });




})()
