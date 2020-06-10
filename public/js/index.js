/* eslint-disable */
import '@babel/polyfill';
require('./modernizr');
import gsap from 'gsap';
import { displayMap } from './mapbox';
import { login, logout, register, forgotPassword } from './login';
import CircleNav from './circleNav';

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

// VALUES (nothing, yet)

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
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
