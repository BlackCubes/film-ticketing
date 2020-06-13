/* eslint-disable */
import { formValidator } from './errorController';

class MultiForm {
  count = 0;

  constructor(button, fieldset) {
    this.button = button;
    this.fieldset = fieldset;
  }

  formSlide(factor) {
    return (this.fieldset.style.marginLeft = `-${25 * factor}%`);
  }

  buttonBack() {
    this.formSlide(this.count);
    this.count++;
  }

  buttonNext() {
    let multiFormVal = true,
      multiFormFieldset = document.querySelectorAll('fieldset')[this.count];

    let inputCount = 0 + multiFormFieldset.querySelectorAll('input').length,
      selectCount = 0 + multiFormFieldset.querySelectorAll('select').length,
      textareaCount = 0 + multiFormFieldset.querySelectorAll('textarea').length;

    let fieldsetElementsCount = inputCount + selectCount + textareaCount;

    for (var i = 0; i < fieldsetElementsCount; ++i) {
      let multiFormInputs, multiFormSelects, multiFormTextareas;

      if (multiFormFieldset.querySelectorAll('input'))
        multiFormInputs = multiFormFieldset.querySelectorAll('input')[i];

      if (multiFormFieldset.querySelectorAll('select'))
        multiFormSelects = multiFormFieldset.querySelectorAll('select')[i];

      if (multiFormFieldset.querySelectorAll('textarea'))
        multiFormTextareas = multiFormFieldset.querySelectorAll('textarea');

      formValidator(multiFormInputs, 'input', multiFormVal);
      formValidator(multiFormSelects, 'select', multiFormVal);
      formValidator(multiFormTextareas, 'textarea', multiFormVal);
    }

    if (multiFormVal === true) {
      this.count++;
      this.formSlide(this.count);
    }
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
