/* eslint-disable */
import { formValidator } from './errorController';

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

  buttonNext(e, input = false, select = false, textarea = false) {
    e.preventDefault();
    let multiFormFieldset = document.querySelectorAll('fieldset')[this.count],
      multiFormVal = true;

    let multiFormInputs, multiFormSelects, multiFormTextareas;

    if (input === true) {
      multiFormInputs = multiFormFieldset.querySelectorAll('input');

      multiFormInputs.forEach(element => {
        if (element.required)
          multiFormVal = formValidator(element.value, 'input', multiFormVal);
      });
    }

    if (select === true) {
      multiFormSelects = multiFormFieldset.querySelectorAll('select');

      multiFormSelects.forEach(element => {
        if (element.required) {
          let option = element.options[element.selectedIndex];
          multiFormVal = formValidator(option.value, 'select', multiFormVal);
        }
      });
    }

    if (textarea === true) {
      multiFormTextareas = multiFormFieldset.querySelectorAll('textarea');

      multiFormTextareas.forEach(element => {
        if (element.required)
          multiFormVal = formValidator(element.value, 'textarea', multiFormVal);
      });
    }

    if (multiFormVal === true) {
      this.count++;
      this.formSlide(this.count);
    }
  }
}
