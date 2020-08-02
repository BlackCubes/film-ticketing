/* eslint-disable */
export const asideNav = (checkbox, navAside) => {
  checkbox.addEventListener('change', () => {
    if (this.checked) {
      navAside.classList.remove('aside-close');
      navAside.classList.add('aside-open');
    } else {
      navAside.classList.remove('aside-open');
      navAside.classList.add('aside-close');
    }
  });
};
