var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

const { Pool } = require('pg');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const openApiSpecification = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Highscore',
      version: '1.0.0',
    },
  },
  apis: ['./routes/api/*.js'],
});

// const openApiSpecification = swaggerJSDoc({
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Swagger API Tutorial - Poopcode.com",
//       version: "1.0.0",
//       description:
//         "A sample project to understand how easy it is to document and Express API",
//     },
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           in: "header",
//           bearerFormat: "JWT"
//         },
//       }
//     },
//     security: [{
//       bearerAuth: []
//     }],
//   },
//   apis: ['./routes/api/*.js']
// });

const session = require('express-session');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var gamesRouter = require('./routes/games');
var scoreAdminRouter = require('./routes/admin/score');
var gamesAdminRouter = require('./routes/admin/games');
var app = express();

// API
var gamesApiRouter = require('./routes/api/games');
var scoresApiRouter = require('./routes/api/scores');

app.locals.db = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'secretpassword',
  database: 'highscore',
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'shared/layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/games', gamesRouter);
app.use('/admin/score', scoreAdminRouter);
app.use('/admin/games', gamesAdminRouter);

// API (Application Programming Interface)
app.use('/api/games', gamesApiRouter);
app.use('/api/scores', scoresApiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
