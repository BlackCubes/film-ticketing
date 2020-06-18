/* eslint-disable */
import '@babel/polyfill';
require('./modernizr');
import gsap from 'gsap';
import { displayMap } from './mapbox';
import CircleNav from './circleNav';
import { MultiForm } from './multiForm';
import { login, logout, register, forgotPassword, createShow } from './login';
import { updateSettings, updateShowSettings } from './updateSettings';

// MODERNIZR TEST
// if (Modernizr.csstransforms)
//   alert('CSSTransforms is available and Modernizr works!');

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const circleNavTrigger = document.getElementById('trigger');
const loginForm = document.getElementById('loginForm');
// Possibly change class selector to an id selector for all logout's to use
const logoutBtn = document.querySelector('.nav__profile--logout');
const registerForm = document.getElementById('registerForm');
const forgotPassForm = document.getElementById('forgotPassform');
const updatePersonalForm = document.getElementById('updatePersonalForm');
const updateEmailUsernameForm = document.getElementById(
  'updateEmailUsernameForm'
);
const updatePassForm = document.getElementById('updatePassForm');
const eoCreateShowForm = document.getElementById('eoCreateShowForm'),
  eoFieldlist1 = document.getElementById('eoFieldlist1');
const updateShowMainView = document.getElementById('updateShowMainView'),
  updateShowPlot = document.getElementById('updateShowPlot'),
  updateShowAddl = document.getElementById('updateShowAddl'),
  updateShowPrice = document.getElementById('updateShowPrice');

// VALUES (nothing, yet)

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
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

if (registerForm) {
  registerForm.addEventListener('submit', e => {
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

    register(
      email,
      username,
      password,
      passwordConfirm,
      name,
      birthdate,
      gender
    );
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

    form.append('name', name);
    form.append('birthdate', birthdate);
    form.append('gender', gender);
    form.append('photo', photo);

    await updateSettings(form, 'data');

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

    await createShow(form, 'event-owner');

    document.getElementById('btnCreateShow').textContent = 'Create';
  });
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
      poster = document.getElementById('showPhoto').files[0];

    const posterUrlArr = document.getElementById('posterSource').src.split('/');
    const posterParams = posterUrlArr[posterUrlArr.length - 1];

    document.getElementById('btnUpdateShowData').textContent = 'Updating...';

    form.append('title', title);
    form.append('duration', duration);
    form.append('mpaaRating', mpaaRating);
    form.append('originalReleaseDate', originalReleaseDate);
    form.append('poster', poster);

    await updateShowSettings(form, 'setting', posterParams);

    document.getElementById('btnUpdateShowData').textContent =
      'Update Show Settings';
  });
}

if (updateShowPlot) {
  updateShowPlot.addEventListener('submit', async e => {
    e.preventDefault();

    const overview = document.getElementById('showOverview').value,
      synopsis = document.getElementById('showSynopsis').value;

    document.getElementById('btnUpdateShowPlot').textContent = 'Updating...';

    await updateShowSettings({ overview, synopsis }, 'plot');

    document.getElementById('btnUpdateShowPlot').textContent = 'Update Plot';
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
      subtitles = document.getElementById('showSubtitles').value;

    document.getElementById('btnUpdateShowAddl').textContent = 'Updating...';

    await updateShowSettings(
      { genres, language, subtitles, contentType },
      "add'l info"
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

    const price = document.getElementById('showPrice').value;

    document.getElementById('btnUpdateShowPrice').textContent = 'Updating';

    await updateShowSettings({ price, specialVenue }, 'pricing');

    document.getElementById('btnUpdateShowPrice').textContent =
      'Update Pricing';
  });
}
