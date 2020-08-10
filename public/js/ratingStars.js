/* eslint-disable */
export const ratingStars = () => {
  var stars = document.querySelectorAll('.stars .star');

  stars.forEach(function(star) {
    star.addEventListener('click', setRating);
  });

  var rating = parseInt(
    document.querySelector('.stars').getAttribute('data-rating')
  );
  var target = stars[rating - 1];
  target.dispatchEvent(new MouseEvent('click'));
};

function setRating(e) {
  var span = e.currentTarget,
    stars = document.querySelectorAll('.stars .star'),
    match = false,
    num = 0;

  stars.forEach(function(star, index) {
    if (match) {
      star.classList.remove('rated');
    } else {
      star.classList.add('rated');
    }

    if (star === span) {
      match = true;
      num = index + 1;
    }
  });

  document.querySelector('.stars').setAttribute('data-rating', num);
}
