/* eslint-disable */
export default class MultiForm {
  constructor(button, fieldset, percentage) {
    this.button = button;
    this.fieldset = fieldset;
    this.percentage = percentage;
  }

  formSlide() {
    return this.button.addEventListener('click', () => {
      this.fieldset.style.marginLeft = this.percentage;
    });
  }
}
