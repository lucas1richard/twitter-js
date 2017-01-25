'use strict';

const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');
const path = require('path');

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
  res.render( 'index', { tweets } );
});

router.get( '/tweets/:id', function (req, res) {
  var id = req.params.id * 1;
  var tweets = tweetBank.find( { id: id } );
  res.render( 'index', { tweets } );
});


module.exports = router;
