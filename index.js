/* eslint-env node */
var path = require('path');

var createRedirectPage = function(destination) {
  // Make sure path is absolute
  var href = destination[0] === '/' ? destination : '/' + destination;

  // Minimal, but valid, HTML
  return `<!doctype html><meta http-equiv=refresh content="0; url=${href}"><link rel=canonical href="${href}"><title>Page Moved</title>New location: <a href="${href}">${href}</a>`;
};

module.exports = function() {
  return function(files, metalsmith, done) {
    for (let file in files) {
      const data = files[file];

      if (!('alias' in data)) {
        continue;
      }

      const redirectPage = {
        contents: new Buffer(
          createRedirectPage('path' in data ? data.path : file),
        ),
      };

      data.alias.forEach(alias => {
        if (!path.extname(alias)) {
          alias = path.join(alias, 'index.html');
        }

        // Don't overwrite if already exists
        if (!(alias in files)) {
          files[alias] = Object.assign(
            {
              path: alias,
            },
            redirectPage,
          );
        }
      });
    }

    setImmediate(done);
  };
};
