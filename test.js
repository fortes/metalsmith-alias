const assert = require('assert');

const alias = require('./index')();

const files = {
  'about/index.html': {
    alias: ['foo', 'bar', 'baz'],
  },
  'baz/index.html': {
    original: true,
  },
  'has/path.html': {
    path: 'real_path',
    alias: ['old/path.jpg'],
  },
};

alias(files, {}, () => {
  assert('foo/index.html' in files);
  assert('bar/index.html' in files);

  assert(files['baz/index.html'].original, 'Page not overwritten by alias');

  assert('old/path.jpg' in files, 'extension not appended if present in alias');
  assert(
    /real_path/.test(files['old/path.jpg'].contents.toString()),
    '.path used if present',
  );
});
