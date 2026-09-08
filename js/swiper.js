const heroElement = document.querySelector('.container__swiperHero');

if (heroElement) {
    const heroPrice = document.querySelector('#heroProductPrice');
    const heroSideTitle = document.querySelector('#heroSideTitle');
    const heroSideDescription = document.querySelector('#heroSideDescription');
    const heroFeatures = [
        document.querySelector('#heroFeatureOne'),
        document.querySelector('#heroFeatureTwo'),
        document.querySelector('#heroFeatureThree'),
    ];
    const featureCards = [...document.querySelectorAll('#hero .roundedFiturProduk')];
    const bottomFeatureTexts = [
        document.querySelector('#heroBottomFeatureOne'),
        document.querySelector('#heroBottomFeatureTwo'),
        document.querySelector('#heroBottomFeatureThree'),
    ];
    const bottomFeatureCards = [...document.querySelectorAll('#hero .roundedBottomHead')];

    const updateHeroContent = (swiper) => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const features = activeSlide?.dataset.features?.split('|') || [];

        if (!activeSlide) {
            return;
        }

        heroPrice.textContent = activeSlide.dataset.price;
        heroSideTitle.textContent = activeSlide.dataset.sideTitle;
        heroSideDescription.textContent = activeSlide.dataset.description;
        heroFeatures.forEach((feature, index) => {
            feature.textContent = features[index] || '';
        });
        bottomFeatureTexts.forEach((feature, index) => {
            feature.textContent = features[index] || '';
        });

        featureCards.forEach((card, index) => {
            card.classList.remove('is-feature-refreshing');
            void card.offsetWidth;
            card.style.setProperty('--feature-delay', `${index * 90}ms`);
            card.classList.add('is-feature-refreshing');
        });
        bottomFeatureCards.forEach((card, index) => {
            card.classList.remove('is-feature-refreshing');
            void card.offsetWidth;
            card.style.setProperty('--feature-delay', `${index * 90}ms`);
            card.classList.add('is-feature-refreshing');
        });
    };

    new Swiper(heroElement, {
        loop: true,
        direction: 'horizontal',
        speed: 600,
        effect: 'slide',
        spaceBetween: 40,
        slidesPerView: 1,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
            nextEl: '.container__swiperHero .swiper-button-next',
            prevEl: '.container__swiperHero .swiper-button-prev',
        },
        on: {
            init: updateHeroContent,
            slideChangeTransitionStart: updateHeroContent,
        },
    });
}

