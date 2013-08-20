var MemDB = require('memdb');
var SubLevel = require('level-sublevel');
var Avg = require('./');

var db = SubLevel(MemDB());
var avg = Avg(db);

avg.push('rating', 2).push('rating', 4);

setTimeout(function() {
  avg.get('rating', function(err, value) {
    console.log('rating: %s', value);
  });

  avg.push('user', 'julian', 2).push('user', 'julian', 4);
  setTimeout(function() {
    avg.get('user', function(err, value) {
      console.log('user: %s', value);
    });
  }, 500);
}, 500);