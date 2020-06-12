/* eslint-disable */
import { formValidator } from './errorController';

export default class Form {
  constructor(...inputs) {
    this.inputs = inputs;
  }
}

export class MultiForm {
  constructor(button, fieldset, percentage) {
    this.button = button;
    this.fieldset = fieldset;
    this.percentage = percentage;
  }

  // formSlide() {
  //   return this.button.addEventListener('click', () => {
  //     this.fieldset.style.marginLeft = this.percentage;
  //   });
  // }

  formSlide() {
    return (this.fieldset.style.marginLeft = this.percentage);
  }
}
