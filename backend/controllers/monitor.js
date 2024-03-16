const { StatusCodes } = require('http-status-codes');

exports.healthCheck = async (req, res) => {
  try {
    return res.status(StatusCodes.OK).json({ message: 'OK' });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
