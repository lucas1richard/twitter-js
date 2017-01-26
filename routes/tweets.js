'use strict';
const tweetBank = require('../tweetBank');

module.exports = function(io) {

  return {
    get: function (req, res) {
      var id = req.params.id * 1;
      var tweets = tweetBank.find( { id: id } );
      res.render( 'index', { tweets } );
    },
    post: function(req) {
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
    }
  };

};
