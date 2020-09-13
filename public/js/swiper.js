/* eslint-disable */
import { Swiper, Navigation } from 'swiper';
// import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export const displaySwiper = obj => {
  Swiper.use([Navigation]);

  const {
    containerClass,
    slidesPerView,
    spaceBetween,
    slidesSmallMobile,
    spaceSmallMobile,
    slidesPortrait,
    spacePortrait,
    slidesLand,
    spaceLand,
    slidesDesktop,
    spaceDesktop
  } = obj;

  var swiper = new Swiper(containerClass, {
    observer: true,
    observeParents: true,
    direction: 'horizontal',
    slidePerView: slidesSmallMobile,
    spaceBetween: spaceSmallMobile,
    slidesPerGroup: 2,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      377: {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        slidesPerGroup: 2
      },
      600: {
        slidesPerView: slidesPortrait,
        spaceBetween: spacePortrait
      },
      900: {
        slidesPerView: slidesLand,
        spaceBetween: spaceLand
      },
      1200: {
        slidesPerView: slidesDesktop,
        spaceBetween: spaceDesktop
      }
    }
  });
};
