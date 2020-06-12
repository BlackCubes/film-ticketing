/* eslint-disable */
export default class MultiForm {
  constructor(button, fieldset) {
    this.button = button;
    this.fieldset = fieldset;
  }

  formSlide(percentage) {
    this.button.addEventListener('click', () => {
      this.fieldset.style.marginLeft = percentage;
    });
  }
}
