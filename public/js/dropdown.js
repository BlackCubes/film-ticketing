/* eslint-disable */
export const asideNav = (checkbox, navAside, navButton) => {
  checkbox.addEventListener('change', e => {
    if (e.target.checked) {
      // navAside.classList.remove('aside-close');
      navAside.classList.add('open');
      navButton.classList.add('open');
    } else {
      navAside.classList.remove('open');
      navButton.classList.remove('open');
      // navAside.classList.add('aside-close');
    }
  });
};
