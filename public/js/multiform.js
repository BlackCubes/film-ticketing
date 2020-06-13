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

  consoleDebug() {
    let ans = false;
    if (
      document.querySelectorAll('fieldset')[1].querySelectorAll('input') !== []
    )
      ans = true;
    console.log('Fieldlist input: ', document.querySelectorAll('fieldset'));
  }

  buttonNext(e, input = false, select = false, textarea = false) {
    e.preventDefault();
    let multiFormVal = true,
      multiFormFieldset = document.querySelectorAll('fieldset')[this.count];

    let inputCount = 0,
      selectCount = 0,
      textareaCount = 0,
      multiFormInputs,
      multiFormSelects,
      multiFormTextareas;

    let fieldsetElementsCount = inputCount + selectCount + textareaCount;

    if (input === true) {
      multiFormInputs = multiFormFieldset.querySelectorAll('input');

      inputCount += multiFormFieldset.querySelectorAll('input').length;

      multiFormInputs.forEach(element => {
        console.log('Multiform Element: ', element);
        multiFormVal = formValidator(element.value, 'input', multiFormVal);
      });
    }

    // if (select === true)
    //   multiFormSelects = multiFormFieldset.querySelectorAll('select');
    // selectCount += multiFormFieldset.querySelectorAll('select').length;
    // if (textarea === true)
    //   textareaCount += multiFormFieldset.querySelectorAll('textarea').length;

    // console.log(
    //   'Non-iterable inputs: ',
    //   multiFormFieldset.querySelectorAll('input')
    // );

    // console.log('MultiformInputs: ', multiFormInputs);

    // console.log('Elements count: ', fieldsetElementsCount);

    // for (var i = 0; i < fieldsetElementsCount; ++i) {
    //   // if (input === true) {
    //   //   multiFormVal = formValidator(multiFormInputs[i], 'input', multiFormVal);
    //   // }

    //   if (select === true) {
    //     multiFormSelects =
    //       multiFormSelects[i].options[multiFormSelects[i].selectedIndex].value;
    //     multiFormVal = formValidator(multiFormSelects, 'select', multiFormVal);
    //   }

    //   if (textarea === true) {
    //     multiFormTextareas = multiFormFieldset.querySelectorAll('textarea')[i]
    //       .value;
    //     multiFormVal = formValidator(
    //       multiFormTextareas,
    //       'textarea',
    //       multiFormVal
    //     );
    //   }
    // }

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
