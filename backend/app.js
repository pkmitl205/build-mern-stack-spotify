const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const dotenv = require("dotenv");
const prefix = require("./configs/prefix");
const globalErrorHandler = require('./controllers/error');


dotenv.config();

const app = express();

app.use(cors({
	origin: 'http://localhost',
	credentials: true
}));
app.use(helmet({
	crossOriginResourcePolicy: false
}));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({ extended : true, limit: '1mb' }))

app.use('/public', express.static('public'));

app.use(`${prefix}/songs`, require('./routes/song'));
app.use(`${prefix}/users`, require('./routes/user'));
app.use(`${prefix}/playlists`, require('./routes/playlist'));
app.use(`${prefix}/search`, require('./routes/search'));

// Global error handler
app.use(globalErrorHandler);

module.exports = app