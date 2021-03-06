const path = require('path');
const http = require('http');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('server');
const nunjucks = require('nunjucks');


const index = require('./routes/index');
const getData = require('./routes/get-data');

// ======================================
// start express app
//
const app = express();

// ======================================
// view engine setup
//
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');


// ======================================
// general setup
//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// ======================================
// middlewares
//


// ======================================
// routes
//
app.use('/', index);
app.use('/get-data', getData);


// ======================================
// catch 404 and forward to error handler
//
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// ======================================
// error handlers
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ======================================
// create server

const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


// ======================================
// connect to mongodb


// ======================================
// functions

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const portNormalized = parseInt(val, 10);

  if (isNaN(portNormalized)) {
    // named pipe
    return val;
  }

  if (portNormalized >= 0) {
    // port number
    return portNormalized;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

