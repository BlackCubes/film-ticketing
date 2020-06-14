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

  buttonBack(e) {
    e.preventDefault();
    this.count--;
    this.formSlide(this.count);
  }

  buttonNext(
    e,
    submit = false,
    input = false,
    select = false,
    textarea = false
  ) {
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
        let option = element.options[element.selectedIndex];
        multiFormVal = formValidator(option.value, 'select', multiFormVal);
      });
      console.log('Multiform Selects', multiFormSelects);
    }

    if (textarea === true) {
      multiFormTextareas = multiFormFieldset.querySelectorAll('textarea');

      multiFormTextareas.forEach(element => {
        if (element.required)
          multiFormVal = formValidator(element.value, 'textarea', multiFormVal);
      });
      console.log('Multiform Textareas: ', multiFormTextareas);
    }

    if (multiFormVal === true) {
      console.log('Count: ', this.count);
      this.count++;
      console.log('Count increment: ', this.count);
      this.formSlide(this.count);
    } else if (multiFormVal === true && submit === true) {
      return true;
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
