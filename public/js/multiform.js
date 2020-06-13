/* eslint-disable */
import { formValidator } from './errorController';

class MultiForm {
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

export default class Form extends MultiForm {
  constructor(button, fieldset, percentage, input, type) {
    super();
    this.input = input;
    this.type = type;
  }

  formGetElements(DOM) {
    this.input = document.getElementById(`${DOM}`);
    return this.input;
  }

  formCheck() {
    formValidator(this.formGetElements, this.type);
  }

  formMulti() {
    if (this.button) {
      this.button.addEventListener('click', () => {
        this.formCheck();
      });
    }
  }
}
