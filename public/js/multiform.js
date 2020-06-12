/* eslint-disable */
export const multiForm = (buttons, fieldset, ward) => {
  let count = 1,
    percentage = 25;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (ward === 'forward') {
        fieldset.style.marginLeft = `-${percentage * count}`;
        count++;
      } else if (ward === 'backward') {
        count--;
        fieldset.style.marginLeft = `${percentage * count}`;
      }
    });
  });
};
