'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const tweetBank = require('../tweetBank');
const path = require('path');

let urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(io) {
  console.log(io);
  router.use('/stylesheets', function(req, res, next) {
    console.log('/stylesheets');
    next();
  });

  router.use('/stylesheets', express.static(path.join(__dirname, '../public/stylesheets')));

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets } );
  });

  router.get( '/users/:name', function (req, res) {
    var name = req.params.name;
    var tweets = tweetBank.find( { name: name } );
    console.log(name, tweets);
    res.render( 'index', { name: req.params.name, tweets, showForm: true } );
  });

  router.get( '/tweets/:id', function (req, res) {
    var id = req.params.id * 1;
    var tweets = tweetBank.find( { id: id } );
    res.render( 'index', { tweets } );
  });

  router.post('/tweets', urlencodedParser, function(req, res) {
    if (req.body) {
      console.log(req.body);
    } else {
      console.log(req);
    }
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    // res.redirect('/');
    io.sockets.emit('newTweet', { name, text });

  });

  return router;
};

// module.exports = router;
