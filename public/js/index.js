/* eslint-disable */
import '@babel/polyfill';
require('./modernizr');
import gsap from 'gsap';
import { displayMap } from './mapbox';
import { ticketShow } from './stripe';
import CircleNav from './circleNav';
import { MultiForm } from './multiForm';
import { login, logout, register, forgotPassword, createShow } from './login';
import {
  updateSettings,
  updateShowSettings,
  updateReviewSettings
} from './updateSettings';
import { deleteShow, deleteReview } from './deleteSettings';

// MODERNIZR TEST
// if (Modernizr.csstransforms)
//   alert('CSSTransforms is available and Modernizr works!');

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const ticketBtn = document.getElementById('ticketShow');
const circleNavTrigger = document.getElementById('trigger');
const loginForm = document.getElementById('loginForm');
// Possibly change class selector to an id selector for all logout's to use
const logoutBtn = document.querySelector('.nav__profile--logout');
const registerForm = document.getElementById('registerForm'),
  registerFieldlist1 = document.getElementById('registerFieldlist1');
const forgotPassForm = document.getElementById('forgotPassform');
const updatePersonalForm = document.getElementById('updatePersonalForm');
const updateEmailUsernameForm = document.getElementById(
  'updateEmailUsernameForm'
);
const updatePassForm = document.getElementById('updatePassForm');
const eoCreateShowForm = document.getElementById('eoCreateShowForm'),
  eoFieldlist1 = document.getElementById('eoFieldlist1');
const adCreateTheaterForm = document.getElementById('adCreateTheaterForm'),
  adFieldlist1 = document.getElementById('adFieldlist1');
const updateShowMainView = document.getElementById('updateShowMainView'),
  updateShowPlot = document.getElementById('updateShowPlot'),
  updateShowCastCrewForm = document.getElementById('updateShowCastCrewForm'),
  updateShowAddl = document.getElementById('updateShowAddl'),
  updateShowPrice = document.getElementById('updateShowPrice'),
  deleteShowForm = document.getElementById('deleteShowForm');
const updateReview = document.getElementById('updateReview'),
  deleteReviewForm = document.getElementById('deleteReviewForm');

// VALUES (nothing, yet)

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (ticketBtn) {
  ticketBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { showId } = e.target.dataset;
    ticketShow(showId);
  });
}

if (circleNavTrigger) {
  var svg = document.getElementById('menu'),
    items = svg.querySelectorAll('.item'),
    label = circleNavTrigger.querySelectorAll('#label')[0],
    open = false;

  let circleNav = new CircleNav(open, gsap, items, label, svg);

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

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (registerFieldlist1) {
  const firstNextBtn = document.getElementById('btnNext-1'),
    firstPreviousBtn = document.getElementById('btnPrev-1');

  let multiForm = new MultiForm(firstNextBtn, registerFieldlist1);

  firstNextBtn.addEventListener('click', e =>
    multiForm.buttonNext(e, true, true)
  );

  firstPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));

  const createAccountBtn = document.getElementById('btnCreateAccount');

  registerForm.addEventListener('submit', async e => {
    e.preventDefault();

    const genderSelect = document.getElementById('selectGender');

    const birthMonth = document.getElementById('selectBirthMonth');
    const birthDay = document.getElementById('selectBirthDay');
    const birthYear = document.getElementById('selectBirthYear');

    const birthMonthVal = birthMonth.options[birthMonth.selectedIndex].value;
    const birthDayVal = birthDay.options[birthDay.selectedIndex].value;
    const birthYearVal = birthYear.options[birthYear.selectedIndex].value;

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const name = document.getElementById('name').value;
    const birthdate = birthYearVal.concat('-', birthMonthVal, '-', birthDayVal);
    const gender = genderSelect.options[genderSelect.selectedIndex].value;

    document.getElementById('btnCreateAccount').textContent = 'Creating...';

    await register(
      email,
      username,
      password,
      passwordConfirm,
      name,
      birthdate,
      gender
    );

    document.getElementById('btnCreateAccount').textContent = 'Continue';
  });
}

if (forgotPassForm) {
  forgotPassForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });
}

if (updatePersonalForm) {
  updatePersonalForm.addEventListener('submit', async e => {
    e.preventDefault();

    const form = new FormData();

    document.getElementById('btnUpdateData').textContent = 'Updating...';

    const selectBirthMonth = document.getElementById('selectBirthMonth'),
      selectBirthDay = document.getElementById('selectBirthDay'),
      selectBirthYear = document.getElementById('selectBirthYear');

    const birthMonth =
        selectBirthMonth.options[selectBirthMonth.selectedIndex].value,
      birthDay = selectBirthDay.options[selectBirthDay.selectedIndex].value,
      birthYear = selectBirthYear.options[selectBirthYear.selectedIndex].value;

    const selectGender = document.getElementById('selectGender');

    const birthdate = birthYear.concat('-', birthMonth, '-', birthDay),
      name = document.getElementById('name').value,
      gender = selectGender.options[selectGender.selectedIndex].value;

    const photo = document.getElementById('userPhoto').files[0];

    const photoUrlArr = document.getElementById('photoSource').src.split('/');
    let photoParams = photoUrlArr[photoUrlArr.length - 1];

    if (!photo) photoParams = '';

    form.append('name', name);
    form.append('birthdate', birthdate);
    form.append('gender', gender);
    form.append('photo', photo);

    await updateSettings(form, 'data', photoParams);

    document.getElementById('btnUpdateData').textContent = 'Update Settings';
    document.getElementById('name').value = '';
    selectBirthMonth.options[selectBirthMonth.selectedIndex].value = '';
    selectBirthDay.options[selectBirthDay.selectedIndex].value = '';
    selectBirthYear.options[selectBirthYear.selectedIndex].value = '';
    selectGender.options[selectGender.selectedIndex].value = '';
  });
}

if (updateEmailUsernameForm) {
  updateEmailUsernameForm.addEventListener('submit', async e => {
    e.preventDefault();

    document.getElementById('btnUpdateEmailUsername').textContent =
      'Updating...';

    const email = document.getElementById('email').value,
      username = document.getElementById('username').value;

    await updateSettings({ email, username }, 'email/username');

    document.getElementById('btnUpdateEmailUsername').textContent =
      'Update Email/Username';
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
  });
}

if (updatePassForm) {
  updatePassForm.addEventListener('submit', async e => {
    e.preventDefault();

    document.getElementById('btnUpdatePass').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('currentPass').value,
      password = document.getElementById('newPass').value,
      passwordConfirm = document.getElementById('confirmNewPass').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.getElementById('btnUpdatePass').textContent = 'Update Password';
    document.getElementById('currentPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmNewPass').value = '';
  });
}

if (eoFieldlist1) {
  // Gather the button DOM elements
  const firstNextBtn = document.getElementById('btnNext-1'),
    secondNextBtn = document.getElementById('btnNext-2'),
    thirdNextBtn = document.getElementById('btnNext-3'),
    fourthNextBtn = document.getElementById('btnNext-4');

  const firstPreviousBtn = document.getElementById('btnPrev-1'),
    secondPreviousBtn = document.getElementById('btnPrev-2'),
    thirdPreviousBtn = document.getElementById('btnPrev-3'),
    fourthPreviousBtn = document.getElementById('btnPrev-4');

  let multiForm = new MultiForm(firstNextBtn, eoFieldlist1);

  // Initiate click event listeners for multiform with specific elements
  firstNextBtn.addEventListener('click', e =>
    multiForm.buttonNext(e, true, true)
  );
  secondNextBtn.addEventListener('click', e => {
    multiForm.buttonNext(e, true);
  });
  thirdNextBtn.addEventListener('click', e =>
    multiForm.buttonNext(e, false, false, true)
  );
  fourthNextBtn.addEventListener('click', e => multiForm.buttonNext(e, true));

  // Initiate previous buttons
  firstPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  secondPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  thirdPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  fourthPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));

  const createShowBtn = document.getElementById('btnCreateShow');

  // eoCreateShowForm.addEventListener('submit', async e => {
  //   e.preventDefault();
  eoCreateShowForm.addEventListener('submit', async e => {
    e.preventDefault();

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

    const { roleType } = createShowBtn.dataset;

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

      const eventOrganizer = [document.getElementById('showEventOwner').value];

      form.append('secretShow', secretShow);
      form.append('eventOrganizer', eventOrganizer);
    }

    await createShow(form, roleType);

    document.getElementById('btnCreateShow').textContent = 'Create';
  });
}

if (adFieldlist1) {
  const firstNextBtn = document.getElementById('btnNext-1'),
    secondNextBtn = document.getElementById('btnNext-2'),
    thirdNextBtn = document.getElementById('btnNext-3');

  const firstPreviousBtn = document.getElementById('btnPrev-1'),
    secondPreviousBtn = document.getElementById('btnPrev-2'),
    thirdPreviousBtn = document.getElementById('btnPrev-3');

  let multiForm = new MultiForm(firstNextBtn, adFieldlist1);

  firstNextBtn.addEventListener('click', e => multiForm.buttonNext(e, true));
  secondNextBtn.addEventListener('click', e => {
    multiForm.buttonNext(e, true);
  });
  thirdNextBtn.addEventListener('click', e =>
    multiForm.buttonNext(e, true, false, true)
  );

  firstPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  secondPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  thirdPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));

  const createTheaterBtn = document.getElementById('btnCreateTheater');
}

if (updateShowMainView) {
  updateShowMainView.addEventListener('submit', async e => {
    e.preventDefault();

    const form = new FormData();

    const selectMpaa = document.getElementById('selectMpaa'),
      selectOriginalMonth = document.getElementById('showOriginalMonth'),
      selectOriginalDay = document.getElementById('showOriginalDay'),
      selectOriginalYear = document.getElementById('showOriginalYear');

    const originalMonth =
        selectOriginalMonth.options[selectOriginalMonth.selectedIndex].value,
      originalDay =
        selectOriginalDay.options[selectOriginalDay.selectedIndex].value,
      originalYear =
        selectOriginalYear.options[selectOriginalYear.selectedIndex].value;

    const mpaaRating = selectMpaa.options[selectMpaa.selectedIndex].value,
      originalReleaseDate = [
        originalYear.concat('-', originalMonth, '-', originalDay)
      ];

    const title = document.getElementById('showTitle').value,
      duration = document.getElementById('showDuration').value,
      updateShowDataBtn = document.getElementById('btnUpdateShowData'),
      poster = document.getElementById('showPhoto').files[0];

    const posterUrlArr = document.getElementById('posterSource').src.split('/');
    const posterParams = posterUrlArr[posterUrlArr.length - 1];

    const { showId, roleType } = updateShowDataBtn.dataset;

    document.getElementById('btnUpdateShowData').textContent = 'Updating...';

    form.append('title', title);
    form.append('duration', duration);
    form.append('mpaaRating', mpaaRating);
    form.append('originalReleaseDate', originalReleaseDate);
    form.append('poster', poster);

    if (roleType === 'admin') {
      const eventOrganizer = [document.getElementById('showEventOwner').value];

      form.append('eventOrganizer', eventOrganizer);
    }

    await updateShowSettings(form, 'setting', showId, roleType, posterParams);

    document.getElementById('btnUpdateShowData').textContent =
      'Update Show Settings';
  });
}

if (updateShowPlot) {
  updateShowPlot.addEventListener('submit', async e => {
    e.preventDefault();

    const overview = document.getElementById('showOverview').value,
      synopsis = document.getElementById('showSynopsis').value,
      updateShowPlotBtn = document.getElementById('btnUpdateShowPlot');

    const { showId, roleType } = updateShowPlotBtn.dataset;

    document.getElementById('btnUpdateShowPlot').textContent = 'Updating...';

    await updateShowSettings({ overview, synopsis }, 'plot', showId, roleType);

    document.getElementById('btnUpdateShowPlot').textContent = 'Update Plot';
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

    await updateShowSettings({ castcrew }, 'casts/crews', showId, roleType);

    document.getElementById('btnUpdateShowCastCrew').textContent =
      'Update Casts | Crews';
  });
}

if (updateShowAddl) {
  updateShowAddl.addEventListener('submit', async e => {
    e.preventDefault();

    const selectContentType = document.getElementById('showContentType');

    const contentType =
      selectContentType.options[selectContentType.selectedIndex].value;

    const genres = document.getElementById('showGenre').value,
      language = document.getElementById('showLanguage').value,
      subtitles = document.getElementById('showSubtitles').value,
      updateShowAddlBtn = document.getElementById('btnUpdateShowAddl');

    const { showId, roleType } = updateShowAddlBtn.dataset;

    document.getElementById('btnUpdateShowAddl').textContent = 'Updating...';

    await updateShowSettings(
      { genres, language, subtitles, contentType },
      "add'l info",
      showId,
      roleType
    );

    document.getElementById('btnUpdateShowAddl').textContent =
      "Update Add'l Info";
  });
}

if (updateShowPrice) {
  updateShowPrice.addEventListener('submit', async e => {
    e.preventDefault();

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
      const selectPrivateVenue = document.getElementById('showPrivateVenue');

      const privateVenueValue =
        selectPrivateVenue.options[selectPrivateVenue.selectedIndex].value;

      const secretShow = privateVenueValue === 'y' ? true : false;

      data.secretShow = secretShow;
    }

    document.getElementById('btnUpdateShowPrice').textContent = 'Updating';

    await updateShowSettings(data, 'pricing', showId, roleType);

    document.getElementById('btnUpdateShowPrice').textContent =
      'Update Pricing';
  });
}

if (updateReview) {
  updateReview.addEventListener('submit', async e => {
    e.preventDefault();

    const showTitle = document
      .getElementById('reviewShowTitle')
      .placeholder.split(' ')[2];

    const rating = document.getElementById('reviewRating').value,
      review = document.getElementById('review').value,
      updateReviewBtn = document.getElementById('btnUpdateReviewData');

    const { showId } = updateReviewBtn.dataset;

    document.getElementById('btnUpdateReviewData').textContent = 'Updating...';

    await updateReviewSettings({ review, rating }, showId, showTitle);

    document.getElementById('btnUpdateReviewData').textContent =
      'Update Review Settings';
  });
}

if (deleteShowForm) {
  deleteShowForm.addEventListener('submit', async e => {
    e.preventDefault();

    const password = document.getElementById('password').value,
      deleteShowBtn = document.getElementById('btnDeleteShowData');

    const { showId } = deleteShowBtn.dataset;

    document.getElementById('btnDeleteShowData').textContent = 'Deleting...';

    await deleteShow({ password }, showId);

    document.getElementById('btnDeleteShowData').textContent = 'Delete Show';
  });
}

if (deleteReviewForm) {
  deleteReviewForm.addEventListener('submit', async e => {
    e.preventDefault();

    const password = document.getElementById('password').value,
      deleteReviewBtn = document.getElementById('btnDeleteReviewData');

    const { reviewId } = deleteReviewBtn.dataset;

    document.getElementById('btnDeleteReviewData').textContent = 'Deleting...';

    await deleteReview({ password }, reviewId);

    document.getElementById('btnDeleteReviewData').textContent =
      'Delete Review';
  });
}
