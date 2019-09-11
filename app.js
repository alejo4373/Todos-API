var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('./auth/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');
var journalRouter = require('./routes/journal');
var tagsRouter = require('./routes/tags');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "new york city",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);
app.use('/api/journal', journalRouter);
app.use('/api/tag', tagsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
   res.status(404).json({
    payload: "What you were looking for was not found. The endpoint or method is unhandled by the Server",
    err: true
  }) 
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    payload: {
      err: err,
      errStack: err.stack
    },
    err: true
  });
});

module.exports = app;
