/* eslint-disable */
export const circleNav = () => {
  var circleNavBtn = document.getElementById('circleNavBtn');
  var circleNavWrapper = document.getElementById('circleNavWrapper');
  var circleNavOverlay = document.getElementById('circleNavOverlay');

  var open = false;

  circleNavBtn.addEventListener('focus', handler, false);
  circleNavBtn.addEventListener('click', handler, false);
  circleNavWrapper.addEventListener('click', cnhandle, false);

  const cnhandle = e => {
    e.stopPropagation();
  };

  const handler = e => {
    if (!e) var e = window.event; // Check deprecation
    e.stopPropagation();

    if (!open) {
      openNav();
    } else {
      closeNav();
    }
  };

  const openNav = () => {
    open = true;
    circleNavBtn.innerHTML = '-';
    circleNavOverlay.classList.add('circlenav__overlay-on');
    circleNavWrapper.classList.add('circlenav__opened');
  };

  const closeNav = () => {
    open = false;
    circleNavBtn.innerHTML = '-';
    circleNavOverlay.classList.remove('circlenav__overlay-on');
    circleNavWrapper.classList.remove('circlenav__opened');
  };

  document.addEventListener('click', closeNav);
};
