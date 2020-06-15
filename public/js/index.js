/* eslint-disable */
import '@babel/polyfill';
require('./modernizr');
import gsap from 'gsap';
import { displayMap } from './mapbox';
import CircleNav from './circleNav';
import { MultiForm } from './multiForm';
import { login, logout, register, forgotPassword, createShow } from './login';
import { updateSettings } from './updateSettings';

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
  // Gather fieldlist and button DOM elements
  const eoFieldlist2 = document.getElementById('eoFieldlist2'),
    eoFieldlist3 = document.getElementById('eoFieldlist3'),
    eoFieldlist4 = document.getElementById('eoFieldlist4'),
    eoFieldlist5 = document.getElementById('eoFieldlist5');

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
    multiForm.buttonNext(e, false, true, true)
  );
  secondNextBtn.addEventListener('click', e =>
    multiForm.buttonNext(e, false, false, false, true)
  );
  thirdNextBtn.addEventListener('click', e =>
    multiForm.buttonNext(e, false, true)
  );
  fourthNextBtn.addEventListener('click', e => {
    multiForm.buttonNext(e, false, true);
  });

  // Initiate previous buttons
  firstPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  secondPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  thirdPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));
  fourthPreviousBtn.addEventListener('click', e => multiForm.buttonBack(e));

  const createShowBtn = document.getElementById('btnCreateShow');

  // eoCreateShowForm.addEventListener('submit', async e => {
  //   e.preventDefault();
  createShowBtn.addEventListener('click', async e => {
    multiForm.buttonNext(e, true, true, true);

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

    console.log('Title: ', title);
    console.log('Duration: ', duration);
    console.log('OriginalRelase: ', originalReleaseDate);
    console.log('MPAA: ', mpaaRating);
    console.log('Content: ', contentType);
    console.log('Overview: ', overview);
    console.log('Synopsis: ', synopsis);
    console.log('Language: ', language);
    console.log('Subtitles: ', subtitles);
    console.log('Genres: ', genres);
    console.log('Special Venue', specialVenue);
    console.log('Price: ', price);

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
