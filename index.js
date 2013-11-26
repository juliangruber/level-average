var MapReduce = require('map-reduce');
var Emitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var acc = JSON.stringify({ length: 0, mean: undefined });

module.exports = Avg;

function Avg(db) {
  if (!(this instanceof Avg)) return new Avg(db);
  Emitter.call(this);
  this.db = db;
  this.reduced = MapReduce(db, 'reduced', map, reduce, acc);
  this.methods = {
    get: { type: 'async' },
    push: { type: 'async' }
  };
}

inherits(Avg, Emitter);

function map(key, value, emit) {
  var prefix = key.split('!')[0];
  value = JSON.stringify({ mean: value });
  emit(prefix, value);
}

function reduce(acc, add) {
  add = JSON.parse(add);
  acc = JSON.parse(acc);

  if (add.length === acc.length)
    return JSON.stringify(acc);

  var i = ++acc.length;
  var x = add.mean || 0;
  var m = acc.mean || 0;
  acc.mean = m - m / i + x / i;

  return JSON.stringify(acc);
}

Avg.prototype.get = function(prefix, fn) {
  var self = this;
  this.reduced.get([prefix], function(err, value) {
    fn(err, value && JSON.parse(value).mean);
  });
};

Avg.prototype.push = function(prefix, id, weight, fn) {
  var self = this;
  if (arguments.length == 2
    || arguments.length == 3 && typeof weight == 'function'
  ) {
    fn = weight;
    weight = id;
    id = Date.now() + '!' + Math.random().toString(16).slice(2);
  }
  fn = fn || function(err) { if (err) self.emit('error', err) };
  self.db.put(prefix + '!' + id, weight, fn);
  return self;
};
