const chalk = require('chalk');
const AppError = require('../utils/appError');
const { StatusCodes } = require('http-status-codes')

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleDuplicateFields = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleValidationError = (err) => new AppError(err.message, StatusCodes.BAD_REQUEST);

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', StatusCodes.UNAUTHORIZED);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', StatusCodes.UNAUTHORIZED);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(chalk.hex('#ff6188').bold('ERROR 💥', err));

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.OK;
  err.status = err.status || 'error';

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'development '
  )
    sendErrorDev(err, res);
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'production '
  ) {
    let error = Object.assign(err);

    if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(err, res);
  }
};