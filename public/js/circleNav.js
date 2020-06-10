/* eslint-disable */
export default class CircleNav {
  constructor(open, gsap, items, label, svg) {
    this.open = open;
    this.gsap = gsap;
    this.items = items;
    this.label = label;
    this.svg = svg;
  }

  displayCircleNav() {
    this.open = !this.open;

    if (this.open) {
      this.gsap.to(this.items, {
        duration: 0.7,
        scale: 1,
        ease: 'elastic.out(0.05)'
      });

      this.label.innerHTML = '-';

      this.svg.style.pointerEvents = 'auto';
    } else {
      this.gsap.to(this.items, {
        duration: 0.3,
        scale: 0,
        ease: 'back.in(0.05)'
      });

      this.label.innerHTML = 'My Menu';

      this.svg.style.pointerEvents = 'none';
    }
  }

  documentClick() {
    this.open = false;

    this.gsap.to(this.items, {
      duration: 0.3,
      scale: 0,
      ease: 'back.in(0.05)'
    });

    this.label.innerHTML = 'My Menu';

    this.svg.style.pointerEvents = 'none';
  }
}
