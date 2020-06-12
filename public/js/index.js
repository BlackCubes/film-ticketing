/* eslint-disable */
import '@babel/polyfill';
require('./modernizr');
import gsap from 'gsap';
import { displayMap } from './mapbox';
import CircleNav from './circleNav';
import MultiForm from './multiForm';
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
const eoCreateShowForm = document.forms.eoCreateShowForm,
  eoFieldlist1 = eoCreateShowForm.elements.eoFieldlist1;

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

    await updateSettings({ name, birthdate, gender }, 'data');

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
  const eoFieldlist2 = eoCreateShowForm.elements.eoFieldlist2,
    eoFieldlist3 = eoCreateShowForm.elements.eoFieldlist3,
    eoFieldlist4 = eoCreateShowForm.elements.eoFieldlist4;

  const firstNextBtn = eoFieldlist1.elements.btnNext1,
    secondNextBtn = eoFieldlist2.elements.btnNext2,
    thirdNextBtn = eoFieldlist3.elements.btnNext3;

  const firstPreviousBtn = eoFieldlist2.elements.btnPrev1,
    secondPreviousBtn = eoFieldlist3.elements.btnPrev2,
    thirdPreviousBtn = eoFieldlist4.elements.btnPrev3;

  // Create multiform slide UI
  let firstForwardSlide = new MultiForm(firstNextBtn, eoFieldlist1, '-25%'),
    secondForwardSlide = new MultiForm(secondNextBtn, eoFieldlist1, '-50%'),
    thirdForwardSlide = new MultiForm(thirdNextBtn, eoFieldlist1, '-75%');

  let firstBackSlide = new MultiForm(firstPreviousBtn, eoFieldlist1, '0%'),
    secondBackSlide = new MultiForm(secondPreviousBtn, eoFieldlist1, '-25%'),
    thirdBackSlide = new MultiForm(thirdPreviousBtn, eoFieldlist1, '-50%');

  // Initialize all previous buttons
  firstBackSlide.formSlide();
  secondBackSlide.formSlide();
  thirdBackSlide.formSlide();

  // Form Validations before preceding to the next Fieldlist
  // -- gather DOM elements in fieldset
  const title = eoFieldlist1.elements.showTitle.value,
    duration = eoFieldlist1.elements.showDuration.value;

  const selectOriginalMonth = eoFieldlist1.elements.selectOriginalMonth,
    selectOriginalDay = eoFieldlist1.elements.selectOriginalDay,
    selectOriginalYear = eoFieldlist1.elements.selectOriginalYear,
    selectContentType = eoFieldlist1.elements.selectContentType,
    selectMpaa = eoFieldlist1.elements.selectMpaa;

  const originalMonth =
      selectOriginalMonth.options[selectOriginalMonth.selectedIndex].value,
    originalDay =
      selectOriginalDay.options[selectOriginalDay.selectedIndex].value,
    originalYear =
      selectOriginalYear.options[selectOriginalYear.selectedIndex].value;

  const originalReleaseDate = [
      originalYear.concat('-', originalMonth, '-', originalDay)
    ],
    mpaaRating = selectMpaa.options[selectMpaa.selectedIndex].value,
    contentType =
      selectContentType.options[selectContentType.selectedIndex].value;

  // -- validate
  if (firstNextBtn) {
    firstForwardSlide.formSlide();
  }

  // -- initiate next slide

  // -- repeat
  const overview = eoFieldlist2.elements.textareaOverview.value,
    synopsis = eoFieldlist2.elements.textareaSynopsis.value;

  if (secondNextBtn) {
    secondForwardSlide.formSlide();
  }

  const language = eoFieldlist3.elements.showLanguage.value,
    subtitles = eoFieldlist3.elements.showSubtitles.value,
    genres = eoFieldlist3.elements.showGenre.value;

  if (thirdNextBtn) {
    thirdForwardSlide.formSlide();
  }

  const selectSpecialVenue = eoFieldlist4.elements.selectSpecialVenue;

  const specialVenue = selectSpecialVenue === 'y' ? true : false,
    price = eoFieldlist4.elements.showPrice.value;

  const createShowBtn = eoFieldlist4.elements.btnCreateShow;

  if (createShowBtn) {
    eoCreateShowForm.addEventListener('submit', async e => {
      e.preventDefault();

      document.getElementById('btnCreateShow').textContent = 'Creating...';

      await createShow(
        {
          title,
          duration,
          originalReleaseDate,
          mpaaRating,
          contentType,
          overview,
          synopsis,
          language,
          subtitles,
          genres,
          specialVenue,
          price
        },
        'event-owner'
      );

      document.getElementById('btnCreateShow').textContent = 'Create';
    });
  }
}
