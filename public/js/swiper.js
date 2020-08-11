/* eslint-disable */
import { Swiper, Navigation } from 'swiper';
// import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export const displaySwiper = obj => {
  Swiper.use([Navigation]);

  const {
    slidesPerView,
    spaceBetween,
    slidesPortrait,
    spacePortrait,
    slidesLand,
    spaceLand,
    slidesDesktop,
    spaceDesktop
  } = obj;

  var swiper = new Swiper('.swiper-container', {
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
