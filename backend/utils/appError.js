class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    if (process.env.NODE_ENV === 'development') {
      this.stack = new Error().stack;
    } else {
      this.stack = '';
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
