/* eslint-disable */
export const validateRegex = (e, test) => {
  var regexResult = true;
  // const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
  const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexName = /^[a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const regexUsername = /^(?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9}$/;
  const regexDateMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const regexDateDay = [...Array(32).keys()].splice(1);
  const now = new Date().getFullYear();
  const regexDateYear = Array(now - (now - 101))
    .fill('')
    .map((val, i) => now - i);
  const regexGender = ['f', 'm', 'p'];
  const regexPhoto = /^\b(jpeg|jpg|png)\b$/;
  const regexMpaa = [
    'G',
    'PG',
    'PG-13',
    'R',
    'NC-17',
    'NR',
    'Unrated',
    'TV-Y',
    'TV-Y7',
    'TV-G',
    'TV-PG',
    'TV-14',
    'TV-MA'
  ];
  const regexDuration = /^[1-9]{1}[0-9]{1,}$/;
  const regexContent = /^\b(Film|TV)\b$/;
  const regexPrice = /^(?!0*\.0+$)\d*(?:\.\d+)?$/;
  const regexSelect = /^\b(y|n)\b$/;
  const regexPhone = /[\(]\d{3}[\)]\s?\d{3}[\-]\d{4}/;
  const regexURL = /http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?/;
  const regexAddress = /^[A-Z0-9 ,#'\/.]{3,96}$/iu;
  const regexUnicode = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
  const regexState = /^(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*$/;
  const regexZipCode = /^[0-9]{5}$/;
  const regexLongitude = /^[+-]?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$/;
  const regexLatitude = /^[+-]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
  const regexTimeHour = [...Array(25).keys()].splice(0);
  const regexTimeMinSecs = [...Array(61).keys()].splice(0);
  const regexRating = /^[1-5]{1}$/;
  const regexMongo = /^[a-f\d]{24}$/i;
  const regexAttrName = [
    'password',
    'current-password',
    'email',
    'name',
    'username',
    'select-month',
    'select-day',
    'select-year',
    'select-gender',
    'photo',
    'poster',
    'theaterPhoto',
    'chainPhoto',
    'castcrew-photo',
    'select-mpaa',
    'show-duration',
    'select-contenttype',
    'show-price',
    'select-specialvenue',
    'select-privatevenue',
    'select-ticket',
    'select-showtimes',
    'hexadecimal',
    'hexadecimal-btn',
    'phone',
    'linkurl',
    'address',
    'city',
    'castcrew-name',
    'state',
    'zipcode',
    'geo-long',
    'geo-lat',
    'select-hour',
    'select-minute',
    'select-second',
    'review-rating',
    'starRating'
  ];

  if (e.name === 'password' || e.name === 'current-password') {
    regexResult = regexPass.test(test);
  } else if (e.name === 'email') {
    regexResult = regexEmail.test(test);
  } else if (e.name === 'name') {
    regexResult = regexName.test(test);
  } else if (e.name === 'username') {
    regexResult = regexUsername.test(test);
  } else if (e.name === 'select-month') {
    regexResult = regexDateMonth.includes(test);
  } else if (e.name === 'select-day') {
    regexResult = regexDateDay.includes(parseInt(test));
  } else if (e.name === 'select-year') {
    regexResult = regexDateYear.includes(parseInt(test));
  } else if (e.name === 'select-gender') {
    regexResult = regexGender.includes(test);
  } else if (
    e.name === 'photo' ||
    e.name === 'poster' ||
    e.name === 'theaterPhoto' ||
    e.name === 'chainPhoto' ||
    e.name === 'castcrew-photo'
  ) {
    regexResult = regexPhoto.test(
      test.type
        .split('/')
        .pop()
        .toLowerCase()
    );
  } else if (e.name === 'select-mpaa') {
    regexResult = regexMpaa.includes(test);
  } else if (e.name === 'show-duration') {
    regexResult = regexDuration.test(parseInt(test));
  } else if (e.name === 'select-contenttype') {
    regexResult = regexContent.test(test);
  } else if (e.name === 'show-price') {
    regexResult = regexPrice.test(parseFloat(test));
  } else if (
    e.name === 'select-specialvenue' ||
    e.name === 'select-privatevenue' ||
    e.name === 'select-ticket' ||
    e.name === 'select-showtimes'
  ) {
    regexResult = regexSelect.test(test);
  } else if (e.name === 'hexadecimal' || e === 'hexadecimal-btn') {
    regexResult = regexMongo.test(test);
  } else if (e.name === 'phone') {
    regexResult = regexPhone.test(test);
  } else if (e.name === 'linkurl') {
    regexResult = regexURL.test(test);
  } else if (e.name === 'address') {
    regexResult = regexAddress.test(test);
  } else if (e.name === 'city' || e.name === 'castcrew-name') {
    regexResult = regexUnicode.test(test);
  } else if (e.name === 'state') {
    regexResult = regexState.test(test);
  } else if (e.name === 'zipcode') {
    regexResult = regexZipCode.test(test);
  } else if (e.name === 'geo-long') {
    regexResult = regexLongitude.test(test);
  } else if (e.name === 'geo-lat') {
    regexResult = regexLatitude.test(test);
  } else if (e.name === 'select-hour') {
    regexResult = regexTimeHour.includes(parseInt(test));
  } else if (e.name === 'select-minute' || e.name === 'select-second') {
    regexResult = regexTimeMinSecs.includes(parseInt(test));
  } else if (e.name === 'review-rating') {
    regexResult = regexRating.test(test);
  } else if (e.id === 'starRating') {
    regexResult = regexRating.test(test);
  } else if (e === 'attribute-name') {
    regexResult = regexAttrName.includes(test);
  }

  return regexResult;
};

// function regexForm(e) {
//   var regexResult = true;
//   // const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
//   const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;
//   const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const regexName = /^[a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
//   const regexUsername = /^(?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9}$/;
//   const regexDateMonth = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//   ];
//   const regexDateDay = [...Array(32).keys()].splice(1);
//   const now = new Date().getFullYear();
//   const regexDateYear = Array(now - (now - 101))
//     .fill('')
//     .map((val, i) => now - i);
//   const regexGender = ['f', 'm', 'p'];
//   const regexPhoto = /^\b(jpeg|jpg|png)\b$/;
//   const regexMpaa = [
//     'G',
//     'PG',
//     'PG-13',
//     'R',
//     'NC-17',
//     'NR',
//     'Unrated',
//     'TV-Y',
//     'TV-Y7',
//     'TV-G',
//     'TV-PG',
//     'TV-14',
//     'TV-MA'
//   ];
//   const regexDuration = /^[1-9]{1}[0-9]{1,}$/;
//   const regexContent = /^\b(Film|TV)\b$/;
//   const regexPrice = /^(?!0*\.0+$)\d*(?:\.\d+)?$/;
//   const regexSelect = /^\b(y|n)\b$/;
//   const regexPhone = /[\(]\d{3}[\)]\s?\d{3}[\-]\d{4}/;
//   const regexURL = /http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?/;
//   const regexAddress = /^[A-Z0-9 ,#'\/.]{3,96}$/iu;
//   const regexUnicode = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
//   const regexState = /^(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*$/;
//   const regexZipCode = /^[0-9]{5}$/;
//   const regexLongitude = /^[+-]?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)$/;
//   const regexLatitude = /^[+-]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
//   const regexTimeHour = [...Array(25).keys()].splice(0);
//   const regexTimeMinSecs = [...Array(61).keys()].splice(0);
//   const regexRating = /^[1-5]{1}$/;
//   const regexMongo = /^[a-f\d]{24}$/i;

//   if (e.name === 'password' || e.name === 'current-password') {
//     regexResult = regexPass.test(e.value);
//   } else if (e.name === 'email') {
//     regexResult = regexEmail.test(e.value);
//   } else if (e.name === 'name') {
//     regexResult = regexName.test(e.value);
//   } else if (e.name === 'username') {
//     regexResult = regexUsername.test(e.value);
//   } else if (e.name === 'select-month') {
//     regexResult = regexDateMonth.includes(e.value);
//   } else if (e.name === 'select-day') {
//     regexResult = regexDateDay.includes(parseInt(e.value));
//   } else if (e.name === 'select-year') {
//     regexResult = regexDateYear.includes(parseInt(e.value));
//   } else if (e.name === 'select-gender') {
//     regexResult = regexGender.includes(e.value);
//   } else if (
//     e.name === 'photo' ||
//     e.name === 'poster' ||
//     e.name === 'theaterPhoto' ||
//     e.name === 'chainPhoto' ||
//     e.name === 'castcrew-photo'
//   ) {
//     regexResult = regexPhoto.test(
//       e.files[0].type
//         .split('/')
//         .pop()
//         .toLowerCase()
//     );
//   } else if (e.name === 'select-mpaa') {
//     regexResult = regexMpaa.includes(e.value);
//   } else if (e.name === 'show-duration') {
//     regexResult = regexDuration.test(parseInt(e.value));
//   } else if (e.name === 'select-contenttype') {
//     regexResult = regexContent.test(e.value);
//   } else if (e.name === 'show-price') {
//     regexResult = regexPrice.test(parseFloat(e.value));
//   } else if (
//     e.name === 'select-specialvenue' ||
//     e.name === 'select-privatevenue' ||
//     e.name === 'select-ticket' ||
//     e.name === 'select-showtimes'
//   ) {
//     regexResult = regexSelect.test(e.value);
//   } else if (e.name === 'hexadecimal') {
//     regexResult = regexMongo.test(e.value);
//   } else if (e.name === 'phone') {
//     regexResult = regexPhone.test(e.value);
//   } else if (e.name === 'linkurl') {
//     regexResult = regexURL.test(e.value);
//   } else if (e.name === 'address') {
//     regexResult = regexAddress.test(e.value);
//   } else if (e.name === 'city' || e.name === 'castcrew-name') {
//     regexResult = regexUnicode.test(e.value);
//   } else if (e.name === 'state') {
//     regexResult = regexState.test(e.value);
//   } else if (e.name === 'zipcode') {
//     regexResult = regexZipCode.test(e.value);
//   } else if (e.name === 'geo-long') {
//     regexResult = regexLongitude.test(e.value);
//   } else if (e.name === 'geo-lat') {
//     regexResult = regexLatitude.test(e.value);
//   } else if (e.name === 'select-hour') {
//     regexResult = regexTimeHour.includes(parseInt(e.value));
//   } else if (e.name === 'select-minute' || e.name === 'select-second') {
//     regexResult = regexTimeMinSecs.includes(parseInt(e.value));
//   } else if (e.name === 'review-rating') {
//     regexResult = regexRating.test(e.value);
//   } else if (e.id === 'starRating') {
//     regexResult = regexRating.test(e.dataset.rating);
//   }

//   return regexResult;
// }
