'use strict';

const express = require('express');
const app = express();
const chalk = require('chalk');
const nunjucks = require('nunjucks');

// console.log(nunjucks);

const port = process.env.PORT || 3000;

let locals = {
  title: 'An Example',
  people: [
    { name: 'Gandalf' },
    { name: 'Frodo' },
    { name: 'Hermione' },
  ]
};

// nunjucks.render('index.html', locals, (err, output) => {
//   if (err) {
//     console.log(chalk.red(err));
//   } else {
//     console.log(output);
//   }
// });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use((req, res, next) => {
  res.status(200);
  console.log(chalk.magenta(req.method), chalk.bold(req.url), res.statusCode);
  next();
});
app.get('/', (req, res) => {
  const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render( 'index', {title: 'Hall of Fame', people: people} );

});

app.listen(port, () => {
  console.log(chalk.yellow(chalk.bold(`Server is listening on port ${port}`)));
});
