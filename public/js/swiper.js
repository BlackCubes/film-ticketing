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
    slidesPerView,
    spaceBetween,
    slidesPerGroup: 2,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: slidesSmallMobile,
        spaceBetween: spaceSmallMobile
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
