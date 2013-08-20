var MemDB = require('memdb');
var SubLevel = require('level-sublevel');
var Avg = require('..');
var test = require('tape');

test('unique', function(t) {
  t.plan(2);
  var db = SubLevel(MemDB());
  var avg = Avg(db);

  avg.push('user', 'julian', 2).push('user', 'julian', 4);

  var got = false;
  avg.reduced.on('reduce', function(key, value) {
    value = JSON.parse(value);
    if (value.mean == 4 && !got) {
      got = true;
      avg.get('user', function(err, value) {
        t.error(err);
        t.equal(value, 4);
      });
    }
  });
});