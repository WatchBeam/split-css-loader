# split-css-loader [![Build Status](https://travis-ci.org/WatchBeam/split-css-loader.svg?branch=master)](https://travis-ci.org/WatchBeam/split-css-loader)

`split-css-loader` is a webpack loader that allows conditional compilation of CSS via media queries. For example, you can have split styling for a "desktop" and "xbox" build:

```css
body {
    background-color: #000;
    color: #fff;
}

@media (platform: desktop) {
    div:before {
        content: "This is the desktop build!";
    }
}

@media (platform: xbox) {
    div:before {
        content: "This is the XBOX build!";
    }
}

@media (platform: not-xbox) {
    div:after {
        content: "This is not the XBOX build!";
    }
}
```

### Usage

Your `webpack.config.js` might look something like this:

```js
module.exports = {
  // ...
  module: {
    preLoaders: [
      { test: /\.css$/, loader: 'split-css?target=platform&value=xbox' },
    ],
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
    ]
  }
};
```

The loader takes two parameters, the `target` specifying the media query key you want to compile against, and the `value` you want that key to be. In this case, we specified that we only want to compiled `@media (platform: xbox)` and want everything else to be stripped out.



### Programmatic API

You can also use this module natively, in Node. The options are the same, you simply pass in a CSS string you want to parse:

```js
const split = require('split-css-loader');

fs.writeFileSync('./style.css', split.string(myStyle, {
  target: 'platform',
  value: 'xbox'
}));
```

