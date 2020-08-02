/* eslint-disable */
export const asideNav = (checkbox, navAside) => {
  checkbox.addEventListener('change', e => {
    if (e.target.checked) {
      // navAside.classList.remove('aside-close');
      navAside.classList.add('open');
    } else {
      navAside.classList.remove('open');
      // navAside.classList.add('aside-close');
    }
  });
};
