var path = require('path');

var createRedirectPage = function(destination) {
  // Make sure path is absolute
  var href = destination[0] === '/' ? destination : '/' + destination;

  return '<!doctype html><html><head><meta http-equiv="refresh" ' +
  'content="1,url=' + href + '"><link rel="canonical" href="' +
  href + '"></head>' + '<body>New location: <a href="' + href +
  '">' + href + '</a>' + '</body></html>';
};

module.exports = function(options) {
  /**
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  return function(files, metalsmith, done) {
    var file, redirectPage;

    for (file in files) {
      if (files[file].alias) {
        redirectPage = {
          contents: new Buffer(createRedirectPage(files[file].path))
        };

        files[file].alias.forEach(function(alias) {
          var aliasPath = alias;

          if (!path.extname(alias)) {
            alias = path.join(alias, 'index.html');
          }

          // Don't overwrite if already exists
          if (!(alias in files)) {
            files[alias] = redirectPage;
          }
        });
      }
    }

    setImmediate(done);
  };
};
