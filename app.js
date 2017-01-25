const express = require('express');
const app = express();
const chalk = require('chalk');

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.status(200);
  console.log(chalk.magenta(req.method), chalk.bold(req.url), res.statusCode);
  next();
});

app.get('/', (req, res) => {
  res.send('I\'m the homepage');
});

app.listen(port, () => {
  console.log(chalk.yellow(chalk.bold(`Server is listening on port ${port}`)));
});
