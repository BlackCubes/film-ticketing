/* eslint-disable */
export const parentNode = (element, target) => {
  element = element.parentElement;

  while (element) {
    if (element.classList.contains(target)) return element;

    element = element.parentElement;
  }

  return -1;
};
