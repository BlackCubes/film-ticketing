/* eslint-disable */
import { formValidator } from './errorController';

export class MultiForm {
  count = 0;

  constructor(button, fieldset) {
    this.button = button;
    this.fieldset = fieldset;
  }

  // For forward, margin-left values start at -25% and are every -25%: -25%, -50%, -75%, etc.
  // For backward, margin-left values start at 0% and are every -25%: 0%, -25%, -50%, etc.
  formSlide(factor) {
    return (this.fieldset.style.marginLeft = `-${25 * factor}%`);
  }

  buttonBack() {
    this.count--;
    this.formSlide(this.count);
  }

  consoleDebug() {
    let ans = false;
    if (
      document.querySelectorAll('fieldset')[1].querySelectorAll('input') !== []
    )
      ans = true;
    console.log('Fieldlist input: ', document.querySelectorAll('fieldset')[1]);
  }

  buttonNext() {
    let multiFormVal = true,
      multiFormFieldset = document.querySelectorAll('fieldset')[this.count];

    let inputCount = 0,
      selectCount = 0,
      textareaCount = 0;

    if (multiFormFieldset.querySelectorAll('input') != null)
      inputCount += multiFormFieldset.querySelectorAll('input').length;
    if (multiFormFieldset.querySelectorAll('select') != null)
      selectCount += multiFormFieldset.querySelectorAll('select').length;
    if (multiFormFieldset.querySelectorAll('textarea') != null)
      textareaCount += multiFormFieldset.querySelectorAll('textarea').length;

    let fieldsetElementsCount = inputCount + selectCount + textareaCount;

    for (var i = 0; i < fieldsetElementsCount; ++i) {
      let multiFormInputs, multiFormSelects, multiFormTextareas;

      if (multiFormFieldset.querySelectorAll('input') != null)
        multiFormInputs = multiFormFieldset.querySelectorAll('input')[i];

      if (multiFormFieldset.querySelectorAll('select') != null)
        multiFormSelects = multiFormFieldset.querySelectorAll('select')[i];

      if (multiFormFieldset.querySelectorAll('textarea') != null)
        multiFormTextareas = multiFormFieldset.querySelectorAll('textarea')[i];

      formValidator(multiFormInputs, 'input', multiFormVal);
      formValidator(multiFormSelects, 'select', multiFormVal);
      formValidator(multiFormTextareas, 'textarea', multiFormVal);
    }

    if (multiFormVal === true) {
      console.log('Count: ', this.count);
      this.count++;
      console.log('Count increment: ', this.count);
      this.formSlide(this.count);
    }
  }
}

// export default class Form extends MultiForm {
//   constructor(button, fieldset, percentage, input, type) {
//     super();
//     this.input = input;
//     this.type = type;
//   }

//   formGetElements(DOM) {
//     this.input = document.getElementById(`${DOM}`);
//     return this.input;
//   }

//   formCheck() {
//     formValidator(this.formGetElements, this.type);
//   }

//   formMulti() {
//     if (this.button) {
//       this.button.addEventListener('click', () => {
//         this.formCheck();
//       });
//     }
//   }
// }
