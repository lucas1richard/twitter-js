'use strict';

const express = require('express');
const app = express();
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 3000;

app.use('/', routes);
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });



// Handle Server Error
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(chalk.yellow(req.method), chalk.red(chalk.bold(req.url)), chalk.red(500));
  next();
});

// Handle Not Found
app.use((req, res, next) => {
  console.log(chalk.yellow(req.method), chalk.red(chalk.bold(req.url)), chalk.red(404));
  next();
});
app.listen(port, () => {
  console.log(chalk.yellow(chalk.bold(`Server is listening on port ${port}`)));
});
