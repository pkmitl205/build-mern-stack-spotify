const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app.js');

dotenv.config();

// Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  console.log(
    chalk.hex('#ff6188').bold('UNHANDLED EXCEPTION! 💥 Shutting down...'),
  );
  process.exit(1);
});

// Connect to database
mongoose
  .set('strictQuery', false)
  .connect(process.env.DATABASE_URL, {
    autoIndex: true,
    authMechanism: 'SCRAM-SHA-1',
    authSource: 'admin',
		forceServerObjectId: false,
  })
  .then(() =>
    console.log(chalk.hex('#78dce8').bold('DATABASE CONNECTION SUCCESSFUL')),
  )
  .catch((err) => console.log('error connecting to mongodb', err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(
    chalk.hex('#78dce8').bold(`LISTENING ON PORT ${process.env.PORT || 8000}`),
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(
    chalk.hex('#ff6188').bold('UNHANDLED REJECTION! 💥 Shutting down...'),
  );
  server.close(() => {
    process.exit(1);
  });
});
