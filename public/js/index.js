/* eslint-disable */
import '@babel/polyfill';
require('./modernizr');
import gsap from 'gsap';
import Rellax from 'rellax';
// import { Swiper, Navigation } from 'swiper';
// // import Swiper from 'swiper/bundle';
// import 'swiper/swiper-bundle.css';
import { displaySwiper } from './swiper';
import { displayMap, displayHomeMap } from './mapbox';
import { ticketShow } from './stripe';
import CircleNav from './circleNav';
import { asideNav } from './dropdown';
import { ratingStars } from './ratingStars';
import { validateAttribute, attributeStatus } from './attributeController';
import { checkFormSubmit, formStatus } from './formController';
import { MultiForm } from './multiForm';
import {
  login,
  logout,
  register,
  forgotPassword,
  createShow,
  createReview,
  createTheater,
  createShowtime,
  createCastCrew
} from './login';
import {
  updateSettings,
  updateShowSettings,
  updateReviewSettings,
  updateTheaterSettings,
  updateShowtimeSettings,
  updateCastCrewSettings
} from './updateSettings';
import {
  deleteShow,
  deleteReview,
  deleteTheater,
  deleteShowtime,
  deleteCastCrew
} from './deleteSettings';

// MODERNIZR TEST
// if (Modernizr.csstransforms)
//   alert('CSSTransforms is available and Modernizr works!');

// DOM ELEMENTS
const mapBox = document.getElementById('map'),
  mapBoxHome = document.getElementById('mapHome');
const rellaxClass = document.querySelector('.rellax');
const swiperClass = document.querySelector('.swiper-container');
const ticketBtn = document.getElementById('ticketShow');
const circleNavTrigger = document.getElementById('trigger');
const checkboxNav = document.getElementById('navToggle'),
  navAside = document.querySelector('.nav__aside'),
  navButton = document.querySelector('.nav__toggle-container');
const stars = document.querySelector('.stars');
const loginForm = document.getElementById('loginForm');
// Possibly change class selector to an id selector for all logout's to use
const logoutBtn = document.querySelector('.nav__profile--logout');
const forgotPassForm = document.getElementById('forgotPassForm');
const registerForm = document.getElementById('registerForm'),
  registerFieldlist1 = document.getElementById('registerFieldlist1');
const updatePersonalForm = document.getElementById('updatePersonalForm');
const updateEmailUsernameForm = document.getElementById(
  'updateEmailUsernameForm'
);
const updatePassForm = document.getElementById('updatePassForm');
const eoCreateShowForm = document.getElementById('eoCreateShowForm'),
  eoFieldlist1 = document.getElementById('eoFieldlist1');
const adCreateTheaterForm = document.getElementById('adCreateTheaterForm'),
  adFieldlist1 = document.getElementById('adFieldlist1');
const adCreateShowtimeForm = document.getElementById('adCreateShowtimeForm'),
  updateShowtimeMainView = document.getElementById('updateShowtimeMainView'),
  updateShowtimeAddl = document.getElementById('updateShowtimeAddl'),
  deleteShowtimeForm = document.getElementById('deleteShowtimeForm');
const updateShowMainView = document.getElementById('updateShowMainView'),
  updateShowPoster = document.getElementById('updateShowPoster'),
  updateShowPlot = document.getElementById('updateShowPlot'),
  updateShowCastCrewForm = document.getElementById('updateShowCastCrewForm'),
  updateShowAddl = document.getElementById('updateShowAddl'),
  updateShowPrice = document.getElementById('updateShowPrice'),
  deleteShowForm = document.getElementById('deleteShowForm');
const createReviewForm = document.getElementById('createReviewForm'),
  updateReview = document.getElementById('updateReview'),
  deleteReviewForm = document.getElementById('deleteReviewForm');
const updateTheaterMainView = document.getElementById('updateTheaterMainView'),
  updateTheaterPhoto = document.getElementById('updateTheaterPhoto'),
  updateTheaterLocation = document.getElementById('updateTheaterLocation'),
  updateTheaterAddl = document.getElementById('updateTheaterAddl'),
  updateTheaterChain = document.getElementById('updateTheaterChain'),
  deleteTheaterForm = document.getElementById('deleteTheaterForm');
const adCreateCastCrewForm = document.getElementById('adCreateCastCrewForm'),
  adCreateCastCrewFieldlist1 = document.getElementById(
    'adCreateCastCrewFieldlist1'
  ),
  updateCastCrewMainView = document.getElementById('updateCastCrewMainView'),
  updateCastCrewPhoto = document.getElementById('updateCastCrewPhoto'),
  updateCastCrewAddlForm = document.getElementById('updateCastCrewAddlForm'),
  deleteCastCrewForm = document.getElementById('deleteCastCrewForm');

// VALUES (nothing, yet)

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (mapBoxHome) {
  displayHomeMap();
}

if (navAside) {
  asideNav(checkboxNav, navAside, navButton);
}

if (rellaxClass) {
  var rellax = new Rellax('.rellax');
}

if (swiperClass) {
  displaySwiper({
    containerClass: '.swiper--info.swiper-container',
    slidesPerView: 2,
    spaceBetween: 7,
    slidesPortrait: 3,
    spacePortrait: 15,
    slidesLand: 4,
    spaceLand: 15,
    slidesDesktop: 5,
    spaceDesktop: 10
  });

  displaySwiper({
    containerClass: '.swiper--review.swiper-container',
    slidesPerView: 2,
    spaceBetween: 4,
    slidesPortrait: 2,
    spacePortrait: 15,
    slidesLand: 3,
    spaceLand: 15,
    slidesDesktop: 4,
    spaceDesktop: 15
  });
}

if (ticketBtn) {
  ticketBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { showId, theaterId, showtimeId } = e.target.dataset;
    ticketShow(showId, theaterId, showtimeId);
  });
}

if (circleNavTrigger) {
  var svg = document.getElementById('menu'),
    items = svg.querySelectorAll('.item'),
    label = circleNavTrigger.querySelectorAll('#label')[0],
    open = false;

  let circleNav = new CircleNav(
    open,
    gsap,
    items,
    label,
    circleNavTrigger,
    svg
  );

  gsap.set(items, { scale: 0, visibility: 'visible' });
  svg.style.pointerEvents = 'none';

  circleNavTrigger.addEventListener(
    'click',
    e => {
      if (!e) var e = window.event;
      e.stopPropagation();
      circleNav.displayCircleNav();
    },
    false
  );

  svg.onclick = e => e.stopPropagation();
  circleNav.documentClick();
}

if (stars) {
  document.addEventListener('DOMContentLoaded', ratingStars);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    validateAttribute(email);
    validateAttribute(password);

    if (attributeStatus) {
      checkFormSubmit(email, password);

      if (formStatus === 2) {
        login(email.value, password.value);
      }
    }
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (forgotPassForm) {
  forgotPassForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email');

    validateAttribute(email);

    if (attributeStatus) {
      checkFormSubmit(email);

      if (formStatus === 1) {
        forgotPassword(email.value);
      }
    }
  });
}

if (registerFieldlist1) {
  const firstNextBtn = document.getElementById('btnNext-1'),
    firstPreviousBtn = document.getElementById('btnPrev-1'),
    createAccountBtn = document.getElementById('btnCreateAccount');

  let multiForm = new MultiForm(firstNextBtn, registerFieldlist1);

  firstNextBtn.addEventListener('click', e => {
    e.preventDefault();

    validateAttribute(document.getElementById('email'));
    validateAttribute(document.getElementById('password'));
    validateAttribute(document.getElementById('passwordConfirm'));

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('email'),
        document.getElementById('password'),
        document.getElementById('passwordConfirm')
      );

      if (formStatus === 3) multiForm.buttonNext();
    }
  });

  firstPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));

  registerForm.addEventListener('submit', async e => {
    e.preventDefault();

    validateAttribute(document.getElementById('name'));
    validateAttribute(document.getElementById('username'));
    validateAttribute(document.getElementById('selectBirthMonth'));
    validateAttribute(document.getElementById('selectBirthDay'));
    validateAttribute(document.getElementById('selectBirthYear'));
    validateAttribute(document.getElementById('selectGender'));

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('name'),
        document.getElementById('username'),
        document.getElementById('selectBirthMonth'),
        document.getElementById('selectBirthDay'),
        document.getElementById('selectBirthYear'),
        document.getElementById('selectGender')
      );

      if (formStatus === 6) {
        const genderSelect = document.getElementById('selectGender');

        const birthMonth = document.getElementById('selectBirthMonth');
        const birthDay = document.getElementById('selectBirthDay');
        const birthYear = document.getElementById('selectBirthYear');

        const birthMonthVal =
          birthMonth.options[birthMonth.selectedIndex].value;
        const birthDayVal = birthDay.options[birthDay.selectedIndex].value;
        const birthYearVal = birthYear.options[birthYear.selectedIndex].value;

        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm')
          .value;
        const name = document.getElementById('name').value;
        const birthdate = birthYearVal.concat(
          '-',
          birthMonthVal,
          '-',
          birthDayVal
        );
        const gender = genderSelect.options[genderSelect.selectedIndex].value;

        document.getElementById('btnCreateAccount').textContent = 'Creating...';

        // await register(
        //   email,
        //   username,
        //   password,
        //   passwordConfirm,
        //   name,
        //   birthdate,
        //   gender
        // );

        document.getElementById('btnCreateAccount').textContent = 'Continue';
      }
    }
  });
}

if (updatePersonalForm) {
  updatePersonalForm.addEventListener('submit', async e => {
    e.preventDefault();

    validateAttribute(document.getElementById('name'));
    validateAttribute(document.getElementById('selectBirthMonth'));
    validateAttribute(document.getElementById('selectBirthDay'));
    validateAttribute(document.getElementById('selectBirthYear'));
    validateAttribute(document.getElementById('selectGender'));
    validateAttribute(document.getElementById('userPhoto'));

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('name'),
        document.getElementById('selectBirthMonth'),
        document.getElementById('selectBirthDay'),
        document.getElementById('selectBirthYear'),
        document.getElementById('selectGender'),
        document.getElementById('userPhoto')
      );

      if (formStatus === 5) {
        const form = new FormData();

        document.getElementById('btnUpdateData').textContent = 'Updating...';

        const selectBirthMonth = document.getElementById('selectBirthMonth'),
          selectBirthDay = document.getElementById('selectBirthDay'),
          selectBirthYear = document.getElementById('selectBirthYear');

        const birthMonth =
            selectBirthMonth.options[selectBirthMonth.selectedIndex].value,
          birthDay = selectBirthDay.options[selectBirthDay.selectedIndex].value,
          birthYear =
            selectBirthYear.options[selectBirthYear.selectedIndex].value;

        const selectGender = document.getElementById('selectGender');

        const birthdate = birthYear.concat('-', birthMonth, '-', birthDay),
          name = document.getElementById('name').value,
          gender = selectGender.options[selectGender.selectedIndex].value;

        const photo = document.getElementById('userPhoto').files[0];

        const photoUrlArr = document
          .getElementById('photoSource')
          .src.split('/');
        let photoParams = photoUrlArr[photoUrlArr.length - 1];

        if (!photo) photoParams = '';

        form.append('name', name.value);
        form.append('birthdate', birthdate);
        form.append('gender', gender);
        form.append('photo', photo);

        // await updateSettings(form, 'data', photoParams);

        document.getElementById('btnUpdateData').textContent = 'Update';
        document.getElementById('name').value = '';
        document.getElementById('selectBirthMonth').value = '';
        document.getElementById('selectBirthDay').value = '';
        document.getElementById('selectBirthYear').value = '';
        document.getElementById('selectGender').value = '';
      }
    }
  });
}

if (updateEmailUsernameForm) {
  updateEmailUsernameForm.addEventListener('submit', async e => {
    e.preventDefault();

    validateAttribute(document.getElementById('email'));
    validateAttribute(document.getElementById('username'));

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('email'),
        document.getElementById('username')
      );

      if (formStatus === 2) {
        document.getElementById('btnUpdateEmailUsername').textContent =
          'Updating...';

        const email = document.getElementById('email').value,
          username = document.getElementById('username').value;

        // await updateSettings({ email, username }, 'email/username');

        document.getElementById('btnUpdateEmailUsername').textContent =
          'Update';
        document.getElementById('email').value = '';
        document.getElementById('username').value = '';
      }
    }
  });
}

if (updatePassForm) {
  updatePassForm.addEventListener('submit', async e => {
    e.preventDefault();

    validateAttribute(document.getElementById('currentPass'));
    validateAttribute(document.getElementById('newPass'));
    validateAttribute(document.getElementById('confirmNewPass'));

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('currentPass'),
        document.getElementById('newPass'),
        document.getElementById('confirmNewPass')
      );

      if (formStatus === 3) {
        document.getElementById('btnUpdatePass').textContent = 'Updating...';

        const passwordCurrent = document.getElementById('currentPass').value,
          password = document.getElementById('newPass').value,
          passwordConfirm = document.getElementById('confirmNewPass').value;

        // await updateSettings(
        //   { passwordCurrent, password, passwordConfirm },
        //   'password'
        // );

        document.getElementById('btnUpdatePass').textContent = 'Update';
        document.getElementById('currentPass').value = '';
        document.getElementById('newPass').value = '';
        document.getElementById('confirmNewPass').value = '';
      }
    }
  });
}

if (createReviewForm) {
  createReviewForm.addEventListener('submit', async e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('starRating'),
      document.getElementById('review')
    );

    if (formStatus === 2) {
      const { rating } = document.getElementById('starRating').dataset,
        review = document.getElementById('review').value,
        createReviewBtn = document.getElementById('btnCreateReview');

      const { showId, roleType } = createReviewBtn.dataset;

      document.getElementById('btnCreateReview').textContent = 'Creating...';

      await createReview({ review, rating }, showId, roleType);

      document.getElementById('btnCreateReview').textContent = 'Create Review';
    }
  });
}

if (eoFieldlist1) {
  // Gather the button DOM elements
  const firstNextBtn = document.getElementById('btnNext-1'),
    secondNextBtn = document.getElementById('btnNext-2'),
    thirdNextBtn = document.getElementById('btnNext-3'),
    fourthNextBtn = document.getElementById('btnNext-4'),
    createShowBtn = document.getElementById('btnCreateShow');

  const firstPreviousBtn = document.getElementById('btnPrev-1'),
    secondPreviousBtn = document.getElementById('btnPrev-2'),
    thirdPreviousBtn = document.getElementById('btnPrev-3'),
    fourthPreviousBtn = document.getElementById('btnPrev-4');

  let multiForm = new MultiForm(firstNextBtn, eoFieldlist1);

  // Initiate click event listeners for multiform with specific elements
  firstNextBtn.addEventListener('click', e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('showTitle'),
      document.getElementById('selectMpaa'),
      document.getElementById('showDuration'),
      document.getElementById('showOriginalMonth'),
      document.getElementById('showOriginalDay'),
      document.getElementById('showOriginalYear'),
      document.getElementById('showContentType')
    );

    if (formStatus === 7) multiForm.buttonNext();
  });

  secondNextBtn.addEventListener('click', e => {
    e.preventDefault();

    checkFormSubmit(document.getElementById('showPhoto'));

    if (formStatus === 1) multiForm.buttonNext();
  });

  thirdNextBtn.addEventListener('click', e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('showOverview'),
      document.getElementById('showSynopsis')
    );

    if (formStatus === 1) multiForm.buttonNext();
  });

  fourthNextBtn.addEventListener('click', e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('showLanguage'),
      document.getElementById('showSubtitles'),
      document.getElementById('showGenre')
    );

    if (formStatus === 0) multiForm.buttonNext();
  });

  // Initiate previous buttons
  firstPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  secondPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  thirdPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  fourthPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));

  eoCreateShowForm.addEventListener('submit', async e => {
    e.preventDefault();

    const { roleType } = createShowBtn.dataset;
    var roleAmount = -100;

    if (roleType === 'admin') {
      roleAmount = 2;

      checkFormSubmit(
        document.getElementById('showPrice'),
        document.getElementById('showSpecialVenue'),
        document.getElementById('showPrivateVenue'),
        document.getElementById('showEventOwner')
      );
    } else if (roleType === 'event-owner') {
      roleAmount = 1;

      checkFormSubmit(
        document.getElementById('showPrice'),
        document.getElementById('showSpecialVenue')
      );
    }

    if (formStatus === roleAmount) {
      const form = new FormData();

      const title = document.getElementById('showTitle').value,
        duration = document.getElementById('showDuration').value;

      const selectOriginalMonth = document.getElementById('showOriginalMonth'),
        selectOriginalDay = document.getElementById('showOriginalDay'),
        selectOriginalYear = document.getElementById('showOriginalYear'),
        selectContentType = document.getElementById('showContentType'),
        selectMpaa = document.getElementById('selectMpaa');

      const originalMonth =
          selectOriginalMonth.options[selectOriginalMonth.selectedIndex].value,
        originalDay =
          selectOriginalDay.options[selectOriginalDay.selectedIndex].value,
        originalYear =
          selectOriginalYear.options[selectOriginalYear.selectedIndex].value;

      const originalReleaseDate = originalYear.concat(
          '-',
          originalMonth,
          '-',
          originalDay
        ),
        mpaaRating = selectMpaa.options[selectMpaa.selectedIndex].value,
        contentType =
          selectContentType.options[selectContentType.selectedIndex].value;

      const overview = document.getElementById('showOverview').value,
        synopsis = document.getElementById('showSynopsis').value;

      const language = document.getElementById('showLanguage').value,
        subtitles = document.getElementById('showSubtitles').value,
        genres = document.getElementById('showGenre').value;

      const selectSpecialVenue = document.getElementById('showSpecialVenue');

      const specialVenueValue =
        selectSpecialVenue.options[selectSpecialVenue.selectedIndex].value;

      const specialVenue = specialVenueValue === 'y' ? true : false,
        price = document.getElementById('showPrice').value;

      const poster = document.getElementById('showPhoto').files[0];

      document.getElementById('btnCreateShow').textContent = 'Creating...';

      form.append('title', title);
      form.append('duration', duration);
      form.append('originalReleaseDate', originalReleaseDate);
      form.append('mpaaRating', mpaaRating);
      form.append('contentType', contentType);
      form.append('overview', overview);
      form.append('synopsis', synopsis);
      form.append('language', language);
      form.append('subtitles', subtitles);
      form.append('genres', genres);
      form.append('specialVenue', specialVenue);
      form.append('price', price);
      form.append('poster', poster);

      if (roleType === 'admin') {
        const selectPrivateVenue = document.getElementById('showPrivateVenue');

        const privateVenueValue =
          selectPrivateVenue.options[selectPrivateVenue.selectedIndex].value;

        const secretShow = privateVenueValue === 'y' ? true : false;

        const eventOrganizer = [
          document.getElementById('showEventOwner').value
        ];

        form.append('secretShow', secretShow);
        form.append('eventOrganizer', eventOrganizer);
      }

      // await createShow(form, roleType);

      document.getElementById('btnCreateShow').textContent = 'Create';
    }
  });
}

if (adFieldlist1) {
  const firstNextBtn = document.getElementById('btnNext-1'),
    secondNextBtn = document.getElementById('btnNext-2'),
    thirdNextBtn = document.getElementById('btnNext-3'),
    createTheaterBtn = document.getElementById('btnCreateTheater');

  const firstPreviousBtn = document.getElementById('btnPrev-1'),
    secondPreviousBtn = document.getElementById('btnPrev-2'),
    thirdPreviousBtn = document.getElementById('btnPrev-3');

  let multiForm = new MultiForm(firstNextBtn, adFieldlist1);

  firstNextBtn.addEventListener('click', e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('theaterName'),
      document.getElementById('theaterPhone'),
      document.getElementById('theaterLinkUrl')
    );

    if (formStatus === 2) multiForm.buttonNext();
  });

  secondNextBtn.addEventListener('click', e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('theaterAddress'),
      document.getElementById('theaterCity'),
      document.getElementById('theaterState'),
      document.getElementById('theaterZipCode'),
      document.getElementById('theaterGeoLong'),
      document.getElementById('theaterGeoLat')
    );

    if (formStatus === 6) multiForm.buttonNext();
  });

  thirdNextBtn.addEventListener('click', e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('theaterDescription'),
      document.getElementById('theaterPhoto')
    );

    if (formStatus === 1) multiForm.buttonNext();
  });

  firstPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  secondPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  thirdPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));

  adCreateTheaterForm.addEventListener('submit', async e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('theaterChainName'),
      document.getElementById('theaterChainLogo')
    );

    if (formStatus === 0) {
      const form = new FormData();

      const name = document.getElementById('theaterName').value,
        phone = document.getElementById('theaterPhone').value,
        linkUrl = document.getElementById('theaterLinkUrl').value,
        address = document.getElementById('theaterAddress').value,
        city = document.getElementById('theaterCity').value,
        state = document.getElementById('theaterState').value,
        zipCode = document.getElementById('theaterZipCode').value,
        geoLong = parseFloat(document.getElementById('theaterGeoLong').value),
        geoLat = parseFloat(document.getElementById('theaterGeoLat').value),
        description = document.getElementById('theaterDescription').value,
        chainName = document.getElementById('theaterChainName').value;
      // chainCode = document.getElementById('theaterChainCode').value;

      const geo = JSON.stringify([geoLong, geoLat]);

      const photo = document.getElementById('theaterPhoto').files[0],
        chainLogo = document.getElementById('theaterChainLogo').files[0];

      document.getElementById('btnCreateTheater').textContent = 'Creating...';

      form.append('name', name);
      form.append('phone', phone);
      form.append('linkUrl', linkUrl);
      form.append('address', address);
      form.append('city', city);
      form.append('state', state);
      form.append('zipCode', zipCode);
      form.append('geo', geo);
      form.append('description', description);
      form.append('chainName', chainName);
      // form.append('chainCode', chainCode);
      form.append('theaterPhoto', photo);
      form.append('chainPhoto', chainLogo);

      // await createTheater(form);

      document.getElementById('btnCreateTheater').textContent = 'Create';
    }
  });
}

if (adCreateShowtimeForm) {
  adCreateShowtimeForm.addEventListener('submit', async e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('showtimeShow'),
      document.getElementById('showtimeTheater'),
      document.getElementById('showtimeStartMonth'),
      document.getElementById('showtimeStartDay'),
      document.getElementById('showtimeStartYear'),
      document.getElementById('showtimeStartHour'),
      document.getElementById('showtimeStartMinute'),
      document.getElementById('showtimeStartSecond'),
      document.getElementById('showtimeEndHour'),
      document.getElementById('showtimeEndMinute'),
      document.getElementById('showtimeEndSecond')
    );

    if (formStatus === 11) {
      const shows = document.getElementById('showtimeShow').value,
        theaters = document.getElementById('showtimeTheater').value;

      const selectStartMonth = document.getElementById('showtimeStartMonth'),
        selectStartDay = document.getElementById('showtimeStartDay'),
        selectStartYear = document.getElementById('showtimeStartYear'),
        selectStartHour = document.getElementById('showtimeStartHour'),
        selectStartMinute = document.getElementById('showtimeStartMinute'),
        selectStartSecond = document.getElementById('showtimeStartSecond'),
        selectEndHour = document.getElementById('showtimeEndHour'),
        selectEndMinute = document.getElementById('showtimeEndMinute'),
        selectEndSecond = document.getElementById('showtimeEndSecond');

      const startMonth =
          selectStartMonth.options[selectStartMonth.selectedIndex].value,
        startDay = selectStartDay.options[selectStartDay.selectedIndex].value,
        startYear =
          selectStartYear.options[selectStartYear.selectedIndex].value,
        startHour =
          selectStartHour.options[selectStartHour.selectedIndex].value,
        startMinute =
          selectStartMinute.options[selectStartMinute.selectedIndex].value,
        startSecond =
          selectStartSecond.options[selectStartSecond.selectedIndex].value,
        endHour = selectEndHour.options[selectEndHour.selectedIndex].value,
        endMinute =
          selectEndMinute.options[selectEndMinute.selectedIndex].value,
        endSecond =
          selectEndSecond.options[selectEndSecond.selectedIndex].value;

      const startDateTime = new Date(
          `${startYear}-${startMonth}-${startDay} ${startHour}:${startMinute}:${startSecond}`
        ).toISOString(),
        endDateTime = new Date(
          `${startYear}-${startMonth}-${startDay} ${endHour}:${endMinute}:${endSecond}`
        ).toISOString();
      // const startDateTime = startYear.concat('-', startMonth, '-', startDay, ''),
      //   endDateTime = endYear.concat('-', endMonth, '-', endDay);

      document.getElementById('btnCreateShowtime').textContent = 'Creating...';

      // await createShowtime({ shows, theaters, startDateTime, endDateTime });

      document.getElementById('btnCreateShowtime').textContent = 'Create';
    }
  });
}

if (adCreateCastCrewFieldlist1) {
  const firstNextBtn = document.getElementById('btnNext-1'),
    firstPreviousBtn = document.getElementById('btnPrev-1'),
    createCastCrewBtn = document.getElementById('btnCreateCastCrew');

  let multiForm = new MultiForm(firstNextBtn, adCreateCastCrewFieldlist1);

  firstNextBtn.addEventListener('click', e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('name'),
      document.getElementById('selectBirthMonth'),
      document.getElementById('selectBirthDay'),
      document.getElementById('selectBirthYear'),
      document.getElementById('castcrewRoles')
    );

    if (formStatus === 5) multiForm.buttonNext();
  });

  firstPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));

  adCreateCastCrewForm.addEventListener('submit', async e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('biography'),
      document.getElementById('photo')
    );

    if (formStatus === 1) {
      const form = new FormData();

      const name = document.getElementById('name').value,
        rolesVal = document.getElementById('castcrewRoles').value,
        biography = document.getElementById('biography').value;

      const roles = JSON.stringify(rolesVal.split(', '));

      const birthMonth = document.getElementById('selectBirthMonth');
      const birthDay = document.getElementById('selectBirthDay');
      const birthYear = document.getElementById('selectBirthYear');

      const birthMonthVal = birthMonth.options[birthMonth.selectedIndex].value;
      const birthDayVal = birthDay.options[birthDay.selectedIndex].value;
      const birthYearVal = birthYear.options[birthYear.selectedIndex].value;

      const birthdate = birthYearVal.concat(
        '-',
        birthMonthVal,
        '-',
        birthDayVal
      );

      const photo = document.getElementById('photo').files[0];

      document.getElementById('btnCreateCastCrew').textContent = 'Creating...';

      form.append('name', name);
      form.append('roles', roles);
      form.append('biography', biography);
      form.append('birthdate', birthdate);
      form.append('photo', photo);

      // await createCastCrew(form);

      document.getElementById('btnCreateCastCrew').textContent = 'Create';
    }
  });
}

if (updateShowMainView) {
  updateShowMainView.addEventListener('submit', async e => {
    e.preventDefault();

    const updateShowDataBtn = document.getElementById('btnUpdateShowData');
    const { showId, roleType } = updateShowDataBtn.dataset;

    validateAttribute(document.getElementById('showTitle'));
    validateAttribute(document.getElementById('selectMpaa'));
    validateAttribute(document.getElementById('showOriginalMonth'));
    validateAttribute(document.getElementById('showOriginalDay'));
    validateAttribute(document.getElementById('showOriginalYear'));
    validateAttribute(document.getElementById('showDuration'));
    if (roleType === 'admin')
      validateAttribute(document.getElementById('showEventOwner'));
    validateAttribute(updateShowDataBtn, showId);

    if (attributeStatus) {
      var roleAmount = -100;

      if (roleType === 'admin') {
        roleAmount = 7;

        checkFormSubmit(
          document.getElementById('showTitle'),
          document.getElementById('selectMpaa'),
          document.getElementById('showOriginalMonth'),
          document.getElementById('showOriginalDay'),
          document.getElementById('showOriginalYear'),
          document.getElementById('showDuration'),
          document.getElementById('showEventOwner')
        );
      } else if (roleType === 'event-owner') {
        roleAmount = 6;

        checkFormSubmit(
          document.getElementById('showTitle'),
          document.getElementById('selectMpaa'),
          document.getElementById('showOriginalMonth'),
          document.getElementById('showOriginalDay'),
          document.getElementById('showOriginalYear'),
          document.getElementById('showDuration')
        );
      }

      if (formStatus === roleAmount) {
        const form = new FormData();

        const selectMpaa = document.getElementById('selectMpaa'),
          selectOriginalMonth = document.getElementById('showOriginalMonth'),
          selectOriginalDay = document.getElementById('showOriginalDay'),
          selectOriginalYear = document.getElementById('showOriginalYear');

        const originalMonth =
            selectOriginalMonth.options[selectOriginalMonth.selectedIndex]
              .value,
          originalDay =
            selectOriginalDay.options[selectOriginalDay.selectedIndex].value,
          originalYear =
            selectOriginalYear.options[selectOriginalYear.selectedIndex].value;

        const mpaaRating = selectMpaa.options[selectMpaa.selectedIndex].value,
          originalReleaseDate = [
            originalYear.concat('-', originalMonth, '-', originalDay)
          ];

        const title = document.getElementById('showTitle').value,
          duration = document.getElementById('showDuration').value;

        document.getElementById('btnUpdateShowData').textContent =
          'Updating...';

        form.append('title', title);
        form.append('duration', duration);
        form.append('mpaaRating', mpaaRating);
        form.append('originalReleaseDate', originalReleaseDate);

        if (roleType === 'admin') {
          const eventOrganizer = [
            document.getElementById('showEventOwner').value
          ];

          form.append('eventOrganizer', eventOrganizer);
        }

        // await updateShowSettings(form, 'setting', showId, roleType);

        document.getElementById('btnUpdateShowData').textContent = 'Update';
      }
    }
  });
}

if (updateShowPoster) {
  updateShowPoster.addEventListener('submit', async e => {
    e.preventDefault();

    const updateShowPosterBtn = document.getElementById('btnUpdateShowPoster');
    const { showId, roleType } = updateShowPosterBtn.dataset;

    validateAttribute(document.getElementById('showPhoto'));
    validateAttribute(updateShowPosterBtn, showId);

    if (attributeStatus) {
      checkFormSubmit(document.getElementById('showPhoto'));

      if (formStatus === 1) {
        const form = new FormData();
        const poster = document.getElementById('showPhoto').files[0],
          posterUrlArr = document.getElementById('posterSource').src.split('/');
        const posterParams = posterUrlArr[posterUrlArr.length - 1];

        document.getElementById('btnUpdateShowPoster').textContent =
          'Updating...';

        form.append('poster', poster);

        // await updateShowSettings(form, 'poster', showId, roleType, posterParams);

        document.getElementById('btnUpdateShowPoster').textContent = 'Update';
      }
    }
  });
}

if (updateShowPlot) {
  updateShowPlot.addEventListener('submit', async e => {
    e.preventDefault();

    const updateShowPlotBtn = document.getElementById('btnUpdateShowPlot');
    const { showId, roleType } = updateShowPlotBtn.dataset;

    validateAttribute(document.getElementById('showOverview'));
    validateAttribute(document.getElementById('showSynopsis'));
    validateAttribute(updateShowPlotBtn, showId);

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('showOverview'),
        document.getElementById('showSynopsis')
      );

      if (formStatus === 1) {
        const overview = document.getElementById('showOverview').value,
          synopsis = document.getElementById('showSynopsis').value;

        document.getElementById('btnUpdateShowPlot').textContent =
          'Updating...';

        // await updateShowSettings({ overview, synopsis }, 'plot', showId, roleType);

        document.getElementById('btnUpdateShowPlot').textContent = 'Update';
      }
    }
  });
}

if (updateShowCastCrewForm) {
  updateShowCastCrewForm.addEventListener('submit', async e => {
    e.preventDefault();

    let castcrewValue = document.getElementById('showCastCrew').value;

    castcrewValue = castcrewValue.replace(/ /g, '');
    castcrewValue = castcrewValue.replace(/,$/g, '');
    castcrewValue = castcrewValue.replace(/;$/g, '');

    const castcrew = castcrewValue.split(',');

    const updateShowCastCrewBtn = document.getElementById(
      'btnUpdateShowCastCrew'
    );

    const { showId, roleType } = updateShowCastCrewBtn.dataset;

    document.getElementById('btnUpdateShowCastCrew').textContent =
      'Updating...';

    // await updateShowSettings({ castcrew }, 'casts/crews', showId, roleType);

    document.getElementById('btnUpdateShowCastCrew').textContent = 'Update';
  });
}

if (updateShowAddl) {
  updateShowAddl.addEventListener('submit', async e => {
    e.preventDefault();

    const updateShowAddlBtn = document.getElementById('btnUpdateShowAddl');
    const { showId, roleType } = updateShowAddlBtn.dataset;

    validateAttribute(document.getElementById('showContentType'));
    validateAttribute(document.getElementById('showGenre'));
    validateAttribute(document.getElementById('showLanguage'));
    validateAttribute(document.getElementById('showSubtitles'));
    validateAttribute(updateShowAddlBtn, showId);

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('showContentType'),
        document.getElementById('showGenre'),
        document.getElementById('showLanguage'),
        document.getElementById('showSubtitles')
      );

      if (formStatus === 1) {
        const selectContentType = document.getElementById('showContentType');

        const contentType =
          selectContentType.options[selectContentType.selectedIndex].value;

        const genres = document.getElementById('showGenre').value,
          language = document.getElementById('showLanguage').value,
          subtitles = document.getElementById('showSubtitles').value;

        document.getElementById('btnUpdateShowAddl').textContent =
          'Updating...';

        // await updateShowSettings(
        //   { genres, language, subtitles, contentType },
        //   "add'l info",
        //   showId,
        //   roleType
        // );

        document.getElementById('btnUpdateShowAddl').textContent = 'Update';
      }
    }
  });
}

if (updateShowPrice) {
  updateShowPrice.addEventListener('submit', async e => {
    e.preventDefault();

    const updateShowPriceBtn = document.getElementById('btnUpdateShowPrice');
    const { showId, roleType } = updateShowPriceBtn.dataset;

    validateAttribute(document.getElementById('showPrice'));
    validateAttribute(document.getElementById('showSpecialVenue'));
    if (roleType === 'admin')
      validateAttribute(document.getElementById('showPrivateVenue'));
    validateAttribute(updateShowPriceBtn, showId);

    if (attributeStatus) {
      var roleAmount = -100;

      if (roleType === 'admin') {
        roleAmount = 1;

        checkFormSubmit(
          document.getElementById('showPrice'),
          document.getElementById('showSpecialVenue'),
          document.getElementById('showPrivateVenue')
        );
      } else if (roleType === 'event-owner') {
        roleAmount = 1;

        checkFormSubmit(
          document.getElementById('showPrice'),
          document.getElementById('showSpecialVenue')
        );
      }

      if (formStatus === roleAmount) {
        const selectSpecialVenue = document.getElementById('showSpecialVenue');
        const specialVenueValue =
          selectSpecialVenue.options[selectSpecialVenue.selectedIndex].value;
        const specialVenue = specialVenueValue === 'y' ? true : false;

        const price = document.getElementById('showPrice').value,
          updateShowPriceBtn = document.getElementById('btnUpdateShowPrice');

        const { showId, roleType } = updateShowPriceBtn.dataset;

        const data = {};
        data.price = price;
        data.specialVenue = specialVenue;

        if (roleType === 'admin') {
          const selectPrivateVenue = document.getElementById(
            'showPrivateVenue'
          );

          const privateVenueValue =
            selectPrivateVenue.options[selectPrivateVenue.selectedIndex].value;

          const secretShow = privateVenueValue === 'y' ? true : false;

          data.secretShow = secretShow;
        }

        document.getElementById('btnUpdateShowPrice').textContent = 'Updating';

        // await updateShowSettings(data, 'pricing', showId, roleType);

        document.getElementById('btnUpdateShowPrice').textContent = 'Update';
      }
    }
  });
}

if (updateReview) {
  updateReview.addEventListener('submit', async e => {
    e.preventDefault();

    checkFormSubmit(
      document.getElementById('reviewRating'),
      document.getElementById('review')
    );

    if (formStatus === 2) {
      const showTitle = document
        .getElementById('reviewShowTitle')
        .placeholder.split(' ')[2];

      const rating = document.getElementById('reviewRating').value,
        review = document.getElementById('review').value,
        updateReviewBtn = document.getElementById('btnUpdateReviewData');

      const { showId } = updateReviewBtn.dataset;

      document.getElementById('btnUpdateReviewData').textContent =
        'Updating...';

      // await updateReviewSettings({ review, rating }, showId, showTitle);

      document.getElementById('btnUpdateReviewData').textContent = 'Update';
    }
  });
}

if (updateTheaterMainView) {
  updateTheaterMainView.addEventListener('submit', async e => {
    e.preventDefault();

    const updateTheaterDataBtn = document.getElementById(
      'btnUpdateTheaterData'
    );
    const { theaterId } = updateTheaterDataBtn.dataset;

    validateAttribute(document.getElementById('theaterName'));
    validateAttribute(document.getElementById('theaterPhone'));
    validateAttribute(document.getElementById('theaterLinkUrl'));
    validateAttribute(updateTheaterDataBtn, theaterId);

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('theaterName'),
        document.getElementById('theaterPhone'),
        document.getElementById('theaterLinkUrl')
      );

      if (formStatus === 2) {
        const name = document.getElementById('theaterName').value,
          phone = document.getElementById('theaterPhone').value,
          linkUrl = document.getElementById('theaterLinkUrl').value;

        document.getElementById('btnUpdateTheaterData').textContent =
          'Updating...';

        // await updateTheaterSettings({ name, phone, linkUrl }, 'data', theaterId);

        document.getElementById('btnUpdateTheaterData').textContent = 'Update';
      }
    }
  });
}

if (updateTheaterPhoto) {
  updateTheaterPhoto.addEventListener('submit', async e => {
    e.preventDefault();

    const updateTheaterDataBtn = document.getElementById(
      'btnUpdateTheaterData'
    );
    const { theaterId } = updateTheaterDataBtn.dataset;

    validateAttribute(document.getElementById('theaterPhoto'));
    validateAttribute(updateTheaterDataBtn, theaterId);

    if (attributeStatus) {
      checkFormSubmit(document.getElementById('theaterPhoto'));

      if (formStatus === 1) {
        const form = new FormData();

        const photo = document.getElementById('theaterPhoto').files[0];

        const photoUrlArr = document
          .getElementById('photoSource')
          .src.split('/');
        const photoParams = photoUrlArr[photoUrlArr.length - 1];

        document.getElementById('btnUpdateTheaterPhoto').textContent =
          'Updating...';

        form.append('photo', photo);

        // await updateTheaterSettings(
        //   form,
        //   'data',
        //   theaterId,
        //   photoParams,
        //   'theaterPhoto'
        // );

        document.getElementById('btnUpdateTheaterPhoto').textContent = 'Update';
      }
    }
  });
}

if (updateTheaterLocation) {
  updateTheaterLocation.addEventListener('submit', async e => {
    e.preventDefault();

    const updateTheaterLocationBtn = document.getElementById(
      'btnUpdateTheaterLocation'
    );
    const { theaterId } = updateTheaterLocationBtn.dataset;

    validateAttribute(document.getElementById('theaterAddress'));
    validateAttribute(document.getElementById('theaterCity'));
    validateAttribute(document.getElementById('theaterState'));
    validateAttribute(document.getElementById('theaterZipCode'));
    validateAttribute(document.getElementById('theaterGeoLong'));
    validateAttribute(document.getElementById('theaterGeoLat'));
    validateAttribute(updateTheaterLocationBtn, theaterId);

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('theaterAddress'),
        document.getElementById('theaterCity'),
        document.getElementById('theaterState'),
        document.getElementById('theaterZipCode'),
        document.getElementById('theaterGeoLong'),
        document.getElementById('theaterGeoLat')
      );

      if (formStatus === 6) {
        const form = new FormData();

        const address = document.getElementById('theaterAddress').value,
          city = document.getElementById('theaterCity').value,
          state = document.getElementById('theaterState').value,
          zipCode = document.getElementById('theaterZipCode').value,
          geoLong = parseFloat(document.getElementById('theaterGeoLong').value),
          geoLat = parseFloat(document.getElementById('theaterGeoLat').value);

        const geo = JSON.stringify([geoLong, geoLat]);

        document.getElementById('btnUpdateTheaterLocation').textContent =
          'Updating...';

        form.append('address', address);
        form.append('city', city);
        form.append('state', state);
        form.append('zipCode', zipCode);
        form.append('geo', geo);

        // await updateTheaterSettings(form, 'location', theaterId);

        document.getElementById('btnUpdateTheaterLocation').textContent =
          'Update';
      }
    }
  });
}

if (updateTheaterAddl) {
  updateTheaterAddl.addEventListener('submit', async e => {
    e.preventDefault();

    const updateTheaterAddlBtn = document.getElementById(
      'btnUpdateTheaterAddl'
    );
    const { theaterId } = updateTheaterAddlBtn.dataset;

    validateAttribute(document.getElementById('theaterDescription'));
    validateAttribute(document.getElementById('theaterTicket'));
    validateAttribute(document.getElementById('theaterShowTimes'));
    validateAttribute(updateTheaterAddlBtn, theaterId);

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('theaterDescription'),
        document.getElementById('theaterTicket'),
        document.getElementById('theaterShowTimes')
      );

      if (formStatus === 0) {
        const description = document.getElementById('theaterDescription').value,
          ticketingSelect = document.getElementById('theaterTicket'),
          showtimesSelect = document.getElementById('theaterShowTimes');

        const ticketingVal =
            ticketingSelect.options[ticketingSelect.selectedIndex].value,
          showtimesVal =
            showtimesSelect.options[showtimesSelect.selectedIndex].value;

        const isTicketing = ticketingVal === 'y' ? true : false,
          hasShowTimes = showtimesVal === 'y' ? true : false;

        document.getElementById('btnUpdateTheaterAddl').textContent =
          'Updating...';

        // await updateTheaterSettings(
        //   { description, isTicketing, hasShowTimes },
        //   "add'l info",
        //   theaterId
        // );

        document.getElementById('btnUpdateTheaterAddl').textContent = 'Update';
      }
    }
  });
}

if (updateTheaterChain) {
  updateTheaterChain.addEventListener('submit', async e => {
    e.preventDefault();

    const updateTheaterChainBtn = document.getElementById(
      'btnUpdateTheaterChain'
    );
    const { theaterId } = updateTheaterChainBtn.dataset;

    validateAttribute(document.getElementById('theaterChainName'));
    validateAttribute(document.getElementById('theaterChainLogo'));
    validateAttribute(updateTheaterChainBtn, theaterId);

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('theaterChainName'),
        document.getElementById('theaterChainLogo')
      );

      if (formStatus === 0) {
        const form = new FormData();

        const chainName = document.getElementById('theaterChainName').value,
          chainLogo = document.getElementById('theaterChainLogo').files[0];

        const photoUrlArr = document.getElementById('chainLogo').src.split('/');
        const photoParams = photoUrlArr[photoUrlArr.length - 1];

        document.getElementById('btnUpdateTheaterChain').textContent =
          'Updating...';

        form.append('chainName', chainName);
        form.append('photo', chainLogo);

        // await updateTheaterSettings(
        //   form,
        //   'chain',
        //   theaterId,
        //   photoParams,
        //   'chainLogo'
        // );

        document.getElementById('btnUpdateTheaterChain').textContent = 'Update';
      }
    }
  });
}

if (updateShowtimeMainView) {
  updateShowtimeMainView.addEventListener('submit', async e => {
    e.preventDefault();

    const updateShowtimeDataBtn = document.getElementById(
      'btnUpdateShowtimeData'
    );
    const { showtimeId } = updateShowtimeDataBtn.dataset;

    validateAttribute(document.getElementById('showtimeStartMonth'));
    validateAttribute(document.getElementById('showtimeStartDay'));
    validateAttribute(document.getElementById('showtimeStartYear'));
    validateAttribute(document.getElementById('showtimeStartHour'));
    validateAttribute(document.getElementById('showtimeStartMinute'));
    validateAttribute(document.getElementById('showtimeStartSecond'));
    validateAttribute(document.getElementById('showtimeEndHour'));
    validateAttribute(document.getElementById('showtimeEndMinute'));
    validateAttribute(document.getElementById('showtimeEndSecond'));
    validateAttribute(updateShowtimeDataBtn, showtimeId);

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('showtimeStartMonth'),
        document.getElementById('showtimeStartDay'),
        document.getElementById('showtimeStartYear'),
        document.getElementById('showtimeStartHour'),
        document.getElementById('showtimeStartMinute'),
        document.getElementById('showtimeStartSecond'),
        document.getElementById('showtimeEndHour'),
        document.getElementById('showtimeEndMinute'),
        document.getElementById('showtimeEndSecond')
      );

      if (formStatus === 9) {
        const selectStartMonth = document.getElementById('showtimeStartMonth'),
          selectStartDay = document.getElementById('showtimeStartDay'),
          selectStartYear = document.getElementById('showtimeStartYear'),
          selectStartHour = document.getElementById('showtimeStartHour'),
          selectStartMinute = document.getElementById('showtimeStartMinute'),
          selectStartSecond = document.getElementById('showtimeStartSecond'),
          selectEndHour = document.getElementById('showtimeEndHour'),
          selectEndMinute = document.getElementById('showtimeEndMinute'),
          selectEndSecond = document.getElementById('showtimeEndSecond');

        const startMonth =
            selectStartMonth.options[selectStartMonth.selectedIndex].value,
          startDay = selectStartDay.options[selectStartDay.selectedIndex].value,
          startYear =
            selectStartYear.options[selectStartYear.selectedIndex].value,
          startHour =
            selectStartHour.options[selectStartHour.selectedIndex].value,
          startMinute =
            selectStartMinute.options[selectStartMinute.selectedIndex].value,
          startSecond =
            selectStartSecond.options[selectStartSecond.selectedIndex].value,
          endHour = selectEndHour.options[selectEndHour.selectedIndex].value,
          endMinute =
            selectEndMinute.options[selectEndMinute.selectedIndex].value,
          endSecond =
            selectEndSecond.options[selectEndSecond.selectedIndex].value;

        const startDateTime = new Date(
            `${startYear}-${startMonth}-${startDay} ${startHour}:${startMinute}:${startSecond}`
          ).toISOString(),
          endDateTime = new Date(
            `${startYear}-${startMonth}-${startDay} ${endHour}:${endMinute}:${endSecond}`
          ).toISOString();

        document.getElementById('btnUpdateShowtimeData').textContent =
          'Updating...';

        // await updateShowtimeSettings(
        //   { startDateTime, endDateTime },
        //   'data',
        //   showtimeId
        // );

        document.getElementById('btnUpdateShowtimeData').textContent = 'Update';
      }
    }
  });
}

if (updateShowtimeAddl) {
  updateShowtimeAddl.addEventListener('submit', async e => {
    e.preventDefault();

    const updateShowtimeAddlBtn = document.getElementById(
      'btnUpdateShowtimeAddl'
    );
    const { showtimeId } = updateShowtimeAddlBtn.dataset;

    validateAttribute(document.getElementById('showtimeShow'));
    validateAttribute(document.getElementById('showtimeTheater'));
    validateAttribute(updateShowtimeAddlBtn, showtimeId);

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('showtimeShow'),
        document.getElementById('showtimeTheater')
      );

      if (formStatus === 2) {
        const shows = document.getElementById('showtimeShow').value,
          theaters = document.getElementById('showtimeTheater').value;

        document.getElementById('btnUpdateShowtimeAddl').textContent =
          'Updating...';

        // await updateShowtimeSettings({ shows, theaters }, "add'l info", showtimeId);

        document.getElementById('btnUpdateShowtimeAddl').textContent = 'Update';
      }
    }
  });
}

if (updateCastCrewMainView) {
  updateCastCrewMainView.addEventListener('submit', async e => {
    e.preventDefault();

    const { castcrewId } = document.getElementById(
      'btnUpdateCastCrewData'
    ).dataset;

    validateAttribute(document.getElementById('name'));
    validateAttribute(document.getElementById('selectBirthMonth'));
    validateAttribute(document.getElementById('selectBirthDay'));
    validateAttribute(document.getElementById('selectBirthYear'));
    validateAttribute(
      document.getElementById('btnUpdateCastCrewData'),
      castcrewId
    );

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('name'),
        document.getElementById('selectBirthMonth'),
        document.getElementById('selectBirthDay'),
        document.getElementById('selectBirthYear')
      );

      if (formStatus === 4) {
        const form = new FormData();

        const name = document.getElementById('name').value;

        const birthMonth = document.getElementById('selectBirthMonth');
        const birthDay = document.getElementById('selectBirthDay');
        const birthYear = document.getElementById('selectBirthYear');

        const birthMonthVal =
          birthMonth.options[birthMonth.selectedIndex].value;
        const birthDayVal = birthDay.options[birthDay.selectedIndex].value;
        const birthYearVal = birthYear.options[birthYear.selectedIndex].value;

        const birthdate = birthYearVal.concat(
          '-',
          birthMonthVal,
          '-',
          birthDayVal
        );

        document.getElementById('btnUpdateCastCrewData').textContent =
          'Updating...';

        form.append('name', name);
        form.append('birthdate', birthdate);

        // await updateCastCrewSettings(form, 'data', castcrewId);

        document.getElementById('btnUpdateCastCrewData').textContent = 'Update';
      }
    }
  });
}

if (updateCastCrewPhoto) {
  updateCastCrewPhoto.addEventListener('submit', async e => {
    e.preventDefault();

    const { castcrewId } = document.getElementById(
      'btnUpdateCastCrewData'
    ).dataset;

    validateAttribute(document.getElementById('castcrewPhoto'));
    validateAttribute(
      document.getElementById('btnUpdateCastCrewData'),
      castcrewId
    );

    if (attributeStatus) {
      checkFormSubmit(document.getElementById('castcrewPhoto'));

      if (formStatus === 1) {
        const form = new FormData();

        const photo = document.getElementById('castcrewPhoto').files[0];

        const photoUrlArr = document
          .getElementById('photoSource')
          .src.split('/');
        const photoParams = photoUrlArr[photoUrlArr.length - 1];

        document.getElementById('btnUpdateCastCrewPhoto').textContent =
          'Updating...';

        form.append('photo', photo);

        // await updateCastCrewSettings(form, 'photo', castcrewId, photoParams);

        document.getElementById('btnUpdateCastCrewPhoto').textContent =
          'Update';
      }
    }
  });
}

if (updateCastCrewAddlForm) {
  updateCastCrewAddlForm.addEventListener('submit', async e => {
    e.preventDefault();

    const { castcrewId } = document.getElementById(
      'btnUpdateCastCrewData'
    ).dataset;

    validateAttribute(document.getElementById('biography'));
    validateAttribute(document.getElementById('castcrewRoles'));
    validateAttribute(
      document.getElementById('btnUpdateCastCrewData'),
      castcrewId
    );

    if (attributeStatus) {
      checkFormSubmit(
        document.getElementById('biography'),
        document.getElementById('castcrewRoles')
      );

      if (formStatus === 1) {
        const rolesVal = document.getElementById('castcrewRoles').value,
          biography = document.getElementById('biography').value;

        const roles = JSON.stringify(rolesVal.split(', '));

        document.getElementById('btnUpdateCastCrewAddl').textContent =
          'Updating...';

        // await updateCastCrewSettings(
        //   { biography, roles },
        //   "add'l info",
        //   castcrewId
        // );

        document.getElementById('btnUpdateCastCrewAddl').textContent = 'Update';
      }
    }
  });
}

if (deleteShowForm) {
  deleteShowForm.addEventListener('submit', async e => {
    e.preventDefault();

    const deleteShowBtn = document.getElementById('btnDeleteShowData');
    const { showId } = deleteShowBtn.dataset;

    validateAttribute(document.getElementById('password'));
    validateAttribute(deleteShowBtn, showId);

    if (attributeStatus) {
      checkFormSubmit(document.getElementById('password'));

      if (formStatus === 1) {
        const password = document.getElementById('password').value;

        document.getElementById('btnDeleteShowData').textContent =
          'Deleting...';

        // await deleteShow({ password }, showId);

        document.getElementById('btnDeleteShowData').textContent =
          'Delete Show';
      }
    }
  });
}

if (deleteReviewForm) {
  deleteReviewForm.addEventListener('submit', async e => {
    e.preventDefault();

    checkFormSubmit(document.getElementById('password'));

    if (formStatus === 1) {
      const password = document.getElementById('password').value,
        deleteReviewBtn = document.getElementById('btnDeleteReviewData');

      const { reviewId } = deleteReviewBtn.dataset;

      document.getElementById('btnDeleteReviewData').textContent =
        'Deleting...';

      await deleteReview({ password }, reviewId);

      document.getElementById('btnDeleteReviewData').textContent =
        'Delete Review';
    }
  });
}

if (deleteTheaterForm) {
  deleteTheaterForm.addEventListener('submit', async e => {
    e.preventDefault();

    const deleteTheaterBtn = document.getElementById('btnDeleteTheaterData');
    const { theaterId } = deleteTheaterBtn.dataset;

    validateAttribute(document.getElementById('password'));
    validateAttribute(deleteTheaterBtn, theaterId);

    if (validateAttribute) {
      checkFormSubmit(document.getElementById('password'));

      if (formStatus === 1) {
        const password = document.getElementById('password').value;

        document.getElementById('btnDeleteTheaterData').textContent =
          'Deleting...';

        // await deleteTheater({ password }, theaterId);

        document.getElementById('btnDeleteTheaterData').textContent =
          'Delete Theater';
      }
    }
  });
}

if (deleteShowtimeForm) {
  deleteShowtimeForm.addEventListener('submit', async e => {
    e.preventDefault();

    const deleteShowtimeBtn = document.getElementById('btnDeleteShowtimeData');
    const { showtimeId } = deleteShowtimeBtn.dataset;

    validateAttribute(document.getElementById('password'));
    validateAttribute(deleteShowtimeBtn, showtimeId);

    if (attributeStatus) {
      checkFormSubmit(document.getElementById('password'));

      if (formStatus === 1) {
        const password = document.getElementById('password').value;

        document.getElementById('btnDeleteShowtimeData').textContent =
          'Deleting...';

        // await deleteShowtime({ password }, showtimeId);

        document.getElementById('btnDeleteShowtimeData').textContent =
          'Delete Showtime';
      }
    }
  });
}

if (deleteCastCrewForm) {
  deleteCastCrewForm.addEventListener('submit', async e => {
    e.preventDefault();

    const deleteCastCrewBtn = document.getElementById('btnDeleteCastCrewData');
    const { castcrewId } = deleteCastCrewBtn.dataset;

    validateAttribute(document.getElementById('password'));
    validateAttribute(deleteCastCrewBtn, castcrewId);

    if (attributeStatus) {
      checkFormSubmit(document.getElementById('password'));

      if (formStatus === 1) {
        const password = document.getElementById('password').value;

        document.getElementById('btnDeleteCastCrewData').textContent =
          'Deleting...';

        // await deleteCastCrew({ password }, castcrewId);

        document.getElementById('btnDeleteCastCrewData').textContent =
          'Delete Cast | Crew';
      }
    }
  });
}
