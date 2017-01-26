'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const tweetBank = require('../tweetBank');
const path = require('path');

let urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(io) {

  router.use('/stylesheets', express.static(path.join(__dirname, '../public/stylesheets')));
  router.use('/vendor', express.static(path.join(__dirname, '../node_modules')));

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets } );
  });

  router.get( '/users/:name', function (req, res) {
    let name = req.params.name;
    let tweets = tweetBank.find( { name: name } );
    console.log(name, tweets);
    res.render( 'index', { name: req.params.name, tweets, showForm: true } );
  });

  const tweets = require('./tweets')(io);
  router.get( '/tweets/:id', tweets.get);
  router.post('/tweets', urlencodedParser, tweets.post);

  router.get('/chat', require('./chat')(io));


  return router;
};

// module.exports = router;
