'use strict';

module.exports = function(io) {

  let chat = io.of('/chat');
  chat.on('connection', socket => {
    socket.on('sendNewMessage', msg => {
      console.log('new message received: ', msg);
      chat.emit('newMsg', msg);
    });
    socket.on('newName', name => {
      console.log(`${name} joined the chat`);
      socket.userName = name;
      chat.emit('nameAdded', name);
    });
    socket.on('disconnect', () => {
      if (socket.userName) {
        chat.emit('userLeft', socket.userName);
      }
    });
  });

  return (req, res) => {
    res.render( 'chat', { showForm: true });
  };

};
