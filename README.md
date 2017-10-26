# metalsmith-alias [![build status](https://travis-ci.org/fortes/metalsmith-alias.svg?branch=master)](https://travis-ci.org/fortes/metalsmith-alias)

[![Greenkeeper badge](https://badges.greenkeeper.io/fortes/metalsmith-alias.svg)](https://greenkeeper.io/)

Create aliases for a pages with automatic redirection.

```
alias:
- alternate-name
- other/url
- somepage/that/used/to/be/here.html
```

## Usage

```js
const alias = require('metalsmith-alias');

Metalsmith()
  // Other plugins and configuration
  .use(alias({netlify: true}))
  // More plugins and configuration
```

Options:

* `netlify`: Whether a [Netlify `_redirects`](https://www.netlify.com/docs/redirects/) file should be created (default `false`).

## Changelog

* `0.1.2`: Don't overwrite existing `_redirects`.
* `0.1.1`: Generate extra redirects without `index.html`.
* `0.1.0`: Add ability to create `_redirects` file for Netlify.
* `0.0.3`: Use `path` member if set on the file object.

## Alternatives

* [metalsmith-redirect](https://github.com/aymericbeaumet/metalsmith-redirect): Setup site-wide redirects
