const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const validator = require('./../utils/validate');

const errMessage = errObj => {
  let message = '';
  Object.values(errObj).forEach(err => {
    message += `${err[0]} `;
  });

  return message.slice(0, -1);
};

exports.insertPasswordConfirm = (req, res, next) => {
  req.body.password_confirmation = req.body.passwordConfirm;
  next();
};

exports.insertParamsId = (req, res, next) => {
  req.body.paramsId = req.params.id;
  next();
};

exports.signup = catchAsync(async (req, res, next) => {
  const validationRule = {
    name: 'required|string|min:2|max:70|regexName',
    username: 'required|string|min:3|max:9|regexUsername',
    email: 'required|email',
    password: 'required|string|min:8|max:60|confirmed|regexPass',
    passwordConfirm: 'required|string',
    birthdate: 'required|date',
    gender: 'required|string|max:1|regexGender'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const validationRule = {
    email: 'required|email',
    password: 'required|string|min:8|max:60|regexPass'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.forgotPass = catchAsync(async (req, res, next) => {
  const validationRule = {
    email: 'required|email'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.resetPass = catchAsync(async (req, res, next) => {
  const validationRule = {
    password: 'required|string|min:8|max:60|confirmed|regexPass',
    passwordConfirm: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.updatePass = catchAsync(async (req, res, next) => {
  const validationRule = {
    passwordCurrent: 'required|string|min:8|max:60|regexPass',
    password: 'required|string|min:8|max:60|confirmed|regexPass',
    passwordConfirm: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const validationRule = {
    name: 'string|max:70|regexNameOpt',
    username: 'string|max:9|regexUsernameOpt',
    email: 'email',
    birthdate: 'date',
    gender: 'string|max:1|regexGenderOpt'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.createShow = catchAsync(async (req, res, next) => {
  let validationRule;

  if (req.user && req.user.role === 'event-owner') {
    validationRule = {
      title: 'required|string|max:100',
      originalReleaseDate: 'required|date',
      duration: 'required|numeric|min:10',
      mpaaRating: 'required|string|regexMpaa',
      overview: 'required|string|max:183',
      synopsis: 'string|max:1100',
      language: 'string|min:3',
      subtitles: 'string|min:3',
      contentType: 'required|string|regexContent',
      price: 'required|numeric|min:5|regexPrice',
      genres: 'string|min:3',
      specialVenue: 'string|max:1|regexSelectOpt'
    };
  } else if (req.user && req.user.role === 'admin') {
    validationRule = {
      title: 'required|string|max:100',
      originalReleaseDate: 'required|date',
      duration: 'required|numeric|min:10',
      mpaaRating: 'required|string|regexMpaa',
      overview: 'required|string|max:183',
      synopsis: 'string|max:1100',
      language: 'string|min:3',
      subtitles: 'string|min:3',
      contentType: 'required|string|regexContent',
      price: 'required|numeric|min:5|regexPrice',
      genres: 'string|min:3',
      specialVenue: 'string|max:1|regexSelectOpt',
      secretShow: 'string|max:1|regexSelectOpt',
      eventOrganizer: 'required|hex|regexMongo'
    };
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.updateShow = catchAsync(async (req, res, next) => {
  let validationRule;

  if (req.user && req.user.role === 'event-owner') {
    validationRule = {
      title: 'string|max:100',
      originalReleaseDate: 'date',
      duration: 'numeric|regexDurationOpt',
      mpaaRating: 'string|regexMpaaOpt',
      overview: 'string|max:183',
      synopsis: 'string|max:1100',
      language: 'string|min:3',
      subtitles: 'string|min:3',
      contentType: 'string|regexContentOpt',
      price: 'numeric|min:5|regexPrice',
      genres: 'string|min:3',
      specialVenue: 'string|max:1|regexSelectOpt',
      paramsId: 'required|hex|regexMongo'
    };
  } else if (req.user && req.user.role === 'admin') {
    validationRule = {
      title: 'string|max:100',
      originalReleaseDate: 'date',
      duration: 'numeric|regexDurationOpt',
      mpaaRating: 'string|regexMpaaOpt',
      overview: 'string|max:183',
      synopsis: 'string|max:1100',
      language: 'string|min:3',
      subtitles: 'string|min:3',
      contentType: 'string|regexContentOpt',
      price: 'numeric|min:5|regexPrice',
      genres: 'string|min:3',
      specialVenue: 'string|max:1|regexSelectOpt',
      secretShow: 'string|max:1|regexSelectOpt',
      eventOrganizer: 'hex|regexMongoOpt',
      paramsId: 'required|hex|regexMongo'
    };
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.createTheater = catchAsync(async (req, res, next) => {
  const validationRule = {
    name: 'required|string|min:7|max:100',
    phone: 'required|string|regexPhone',
    linkUrl: 'url',
    address: 'required|string|min:3|max:96|regexAddress',
    city: 'required|string|min:3|max:50|regexCity',
    state: 'required|string|min:2|max:2|regexState',
    zipCode: 'required|string|min:5|max:5|regexZipCode',
    description: 'string|max:3900',
    chainName: 'string|min:7|max:80',
    geo: {
      coordinates: 'required|array|regexGeo'
    }
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});

exports.updateTheater = catchAsync(async (req, res, next) => {
  const validationRule = {
    name: 'string|min:7|max:100',
    phone: 'string|regexPhoneOpt',
    linkUrl: 'url',
    address: 'string|min:3|max:96|regexAddressOpt',
    city: 'string|min:3|max:50|regexCityOpt',
    state: 'string|min:2|max:2|regexState',
    zipCode: 'string|min:5|max:5|regexZipCodeOpt',
    description: 'string|max:3900',
    chainName: 'string|min:7|max:80',
    geo: {
      coordinates: 'array|regexGeo'
    }
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) return next(new AppError(`${errMessage(err.errors)}`, 401));

    next();
  });
});
