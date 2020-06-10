/* eslint-disable */
// import gsap from 'gsap';

// var svg = document.getElementById('menu'),
//   items = svg.querySelectorAll('.item'),
//   trigger = document.getElementById('trigger'),
//   label = trigger.querySelectorAll('#label')[0],
//   open = false;

// gsap.set(items, { scale: 0, visibility: 'visible' });
// svg.style.pointerEvents = 'none';

// trigger.addEventListener('click', toggleMenu, false);

// const toggleMenu = e => {
//   if (!e) var e = window.event;
//   e.stopPropagation();
//   open = !open;

//   if (open) {
//     gsap.to(items, {
//       duration: 0.7,
//       scale: 1,
//       ease: Elastic.easeOut,
//       stagger: 0.05
//     });
//     label.innerHTML = '-';
//     svg.style.pointerEvents = 'auto';
//   } else {
//     gsap.to(items, {
//       duration: 0.3,
//       scale: 0,
//       ease: Back.easeIn,
//       stagger: 0.05
//     });
//     label.innerHTML = '+';
//     svg.style.pointerEvents = 'none';
//   }
// };

// svg.onclick = function(e) {
//   e.stopPropagation();
// };

// document.onclick = function() {
//   open = false;
//   gsap.to(items, {
//     duration: 0.3,
//     scale: 0,
//     ease: Back.easeIn,
//     stagger: 0.05
//   });
//   label.innerHTML = '+';
//   svg.style.pointerEvents = 'none';
// };
