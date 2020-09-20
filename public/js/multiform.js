/* eslint-disable */
// import { formValidator } from './errorController';

export class MultiForm {
  count = 0;
  fieldsetsTotal = document.querySelectorAll('fieldset').length;

  constructor(button, fieldset) {
    this.button = button;
    this.fieldset = fieldset;
  }

  formSlide(factor) {
    return (this.fieldset.style.marginLeft = `-${factor *
      (40 - 5 * (this.fieldsetsTotal - 1))}%`);
  }

  buttonBack(e) {
    e.preventDefault();
    this.count--;
    this.formSlide(this.count);
  }

  buttonNext() {
    // e.preventDefault();
    this.count++;
    this.formSlide(this.count);
  }
}
