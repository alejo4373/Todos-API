var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sixRouter = require('./routes/six');
var todosRouter = require('./routes/todos');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/api/6', sixRouter)
app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);


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
