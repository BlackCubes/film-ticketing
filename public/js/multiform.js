/* eslint-disable */
import { formValidator } from './errorController';

const multiContructor = (obj, ...inputs) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    newObj[el] = obj[el];
  });

  return newObj;
};

// export default class Form {
//   constructor() {

//   }
// }

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
