const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');
const filterObj = require('./../utils/filterObject');
const sanitize = require('./../utils/sanitize');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // REMOVE PASSWORD FROM OUTPUT
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  let filteredBody = filterObj(
    req.body,
    'name',
    'username',
    'email',
    'password',
    'passwordConfirm',
    'birthdate',
    'gender'
  );

  filteredBody = sanitize(filteredBody);

  const newUser = await User.create(filteredBody);

  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  let filteredBody = filterObj(req.body, 'email', 'password');
  filteredBody = sanitize(filteredBody);
  const { email, password } = filteredBody;

  if (!email || !password) {
    return next(new AppError('Please provide an email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does not exist!', 401)
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again!', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors (Non-API)!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // Check if user exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // Check if user recently changed password
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // Logged in user exists
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      // No logged in user
      return next();
    }
  }
  // No logged in user
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );
    }

    next();
  };
};

exports.checkLogin = (req, res, next) => {
  if (req.cookies.jwt) {
    return next(new AppError('You are still logged in!', 403));
  }

  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  let filteredBody = filterObj(req.body, 'email');
  filteredBody = sanitize(filteredBody);
  const user = await User.findOne({ email: filteredBody.email });

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const userAgent = `${req.useragent.browser} browser, ${req.useragent.os} operating system`;

  if (!user) {
    try {
      const forgotURL =
        req.user && req.user.role === 'admin'
          ? `${req.protocol}://${req.get('host')}/api/v1/users/forgotPassword`
          : `${req.protocol}://${req.get('host')}/forgotPassword`;

      await new Email(filteredBody.email, forgotURL).sendPasswordResetHelp(
        ip,
        userAgent,
        filteredBody.email
      );

      res.status(202).json({
        status: 'success',
        message: 'An email has been sent to the provided address!'
      });

      // next();
    } catch (err) {
      return next(
        new AppError(
          'There was an error sending the provided email! Try again later!',
          500
        )
      );
    }
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL =
      req.user && req.user.role === 'admin'
        ? `${req.protocol}://${req.get(
            'host'
          )}/api/v1/users/resetPassword/${resetToken}`
        : `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset(ip, userAgent);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to provided email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the provided email! Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token is either invalid or expired!', 400));
  }

  let filteredBody = filterObj(req.body, 'password', 'passwordConfirm');
  filteredBody = sanitize(filteredBody);

  user.password = filteredBody.password;
  user.passwordConfirm = filteredBody.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  let filteredBody = filterObj(
    req.body,
    'password',
    'passwordConfirm',
    'passwordCurrent'
  );
  filteredBody = sanitize(filteredBody);
  const user = await User.findById(req.user.id).select('+password');

  if (
    !(await user.correctPassword(filteredBody.passwordCurrent, user.password))
  ) {
    return next(new AppError('Your current password is wrong!', 401));
  }

  user.password = filteredBody.password;
  user.passwordConfirm = filteredBody.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

exports.verifyPassword = catchAsync(async (req, res, next) => {
  let filteredBody = filterObj(req.body, 'password');
  filteredBody = sanitize(filteredBody);
  const { password } = filteredBody;

  if (!password) return next(new AppError('Please provide a password!', 400));

  const user = await User.findById(req.user.id).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect password!', 401));
  }

  next();
});
