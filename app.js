'use strict';

const express = require('express');
const app = express();
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const socketio = require('socket.io');

const port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log(chalk.yellow(chalk.bold(`Server is listening on port ${port}`)));
});

let io = socketio.listen(server);
app.use('/', routes(io));
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });


// Handle Server Error
app.use((err, req, res, next) => {
  console.log(chalk.red(chalk.bold(err.stack)));
  console.log(chalk.yellow(req.method), chalk.red(chalk.bold(req.url)), chalk.red(500));
});

// Handle Not Found
app.use((req, res, next) => {
  console.log(chalk.yellow(req.method), chalk.red(chalk.bold(req.url)), chalk.red(404));
  next();
});
