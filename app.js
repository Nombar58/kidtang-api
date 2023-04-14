const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cors = require('cors');

//require config
const config = require('./config/index');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const staffRouter = require('./routes/staff');
const shopRouter = require('./routes/shop');
const portfolioRouter = require('./routes/portfolio');
const calendarRouter = require('./routes/calendar');
const invoiceRouter = require('./routes/invoice');
const workRouter = require('./routes/work');
const roomRouter = require('./routes/room');
const jobRouter = require('./routes/job');
const styleRouter = require('./routes/style');
const roomTypeRouter = require('./routes/room_type');

//import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
 
const limiter = rateLimit({
    windowMs: 10 * 1000, // 10 วินาที
    max: 5 // limit each IP to 100 requests per windowMs
});
   
//  apply to all requests
app.use(limiter);

app.use(helmet());

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//init passport
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', companyRouter);
app.use('/staff' ,staffRouter);
app.use('/shop', shopRouter);
app.use('/portfolio', portfolioRouter);
app.use('/calendar', calendarRouter);
app.use('/invoice', invoiceRouter);
app.use('/work', workRouter);
app.use('/room', roomRouter);
app.use('/job', jobRouter);
app.use('/style', styleRouter);
app.use('/roomtype', roomTypeRouter);

app.use(errorHandler);

module.exports = app;
