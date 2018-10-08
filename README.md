# PostCSS Container

[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

[PostCSS] plugin that adds a user input scope to each selector.
for a command line interface.

[`poststylus`]: https://github.com/seaneking/poststylus
[PostCSS API]:  https://github.com/postcss/postcss/blob/master/docs/api.md
[Broccoli]:     https://github.com/jeffjewiss/broccoli-postcss
[CLI tool]:     https://github.com/code42day/postcss-cli
[webpack]:      https://github.com/postcss/postcss-loader
[Brunch]:       https://github.com/iamvdo/postcss-brunch
[Grunt]:        https://github.com/nDmitry/grunt-postcss
[Gulp]:         https://github.com/postcss/gulp-postcss
[ENB]:          https://github.com/theprotein/enb-postcss

[travis-image]: https://img.shields.io/travis/pazams/postcss-scopify.svg?style=flat-square
[travis-url]: https://travis-ci.org/pazams/postcss-scopify
[coveralls-image]: https://img.shields.io/coveralls/pazams/postcss-scopify.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/pazams/postcss-scopify
[downloads-image]: https://img.shields.io/npm/dm/postcss-scopify.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/postcss-scopify

[PostCSS]: https://github.com/postcss/postcss

__Example input__

```css
.foo, .boo h1 {
    /* declarations */
}

& {
    /* declarations */
}
```
__Example output__
`scopify('#scope')`
```css
#scope .foo, #scope .boo h1 {
    /* declarations */
}

#scope {
    /* declarations */
}
```

## Installation

```
npm install postcss-cotaniner
```

## Usage

```javascript
var fs                 = require('fs');
var postcss            = require('postcss');
var postcssContainer   = require('postcss-container');

var css = fs.readFileSync('css/my-file.css', 'utf8').toString();
var out = postcss()
          .use(postcssContainer('#scope'))
          .process(css)
          .css;
```

You can use PostCSS with your build tool.
Note there are plugins for [Grunt], [Gulp], [webpack], [Broccoli],
[Brunch] and [ENB]. 
See [PostCSS] docs for examples for your environment.
