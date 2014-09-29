var assert = require('assert');

var plugin = require('./index');

var alias = plugin({});

var files = {
  'about/index.html': {
    alias: ['foo', 'bar', 'baz']
  },
  'baz/index.html': {
    original: true
  }
};

alias(files, {}, function(err) {
  assert('foo/index.html' in files);
  assert('bar/index.html' in files);

  assert(files['baz/index.html'].original, 'Page not overwritten by alias');

  console.log('All tests passed.');
});
