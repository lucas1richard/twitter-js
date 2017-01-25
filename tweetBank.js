'use strict';

const _ = require('lodash');

let data = [];

function add(name, content) {
  let maxID = data.reduce((max, tweet) => {
    if (tweet.id * 1 > max) max = tweet.id * 1;
    return max;
  }, 0);

  data.push({ name: name, content: content, id: ++maxID });
}

function list() {
  return _.cloneDeep(data);
}

function find(properties) {
  return _.cloneDeep(_.filter(data, properties));
}

module.exports = { add, list, find };

const randArrayEl = arr => arr[Math.floor(Math.random() * arr.length)];

const getFakeName = () => {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + ' ' + randArrayEl(fakeLasts);
};

const getFakeTweet = () => {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return 'Fullstack Academy is ' + randArrayEl(awesome_adj) + '! The instructors are just so ' + randArrayEl(awesome_adj) + '. #fullstacklove #codedreams';
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

data = data.map((tweet, index) => {
  tweet.id = index + 1;
  return tweet;
});

console.log(data);
