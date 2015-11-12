# gulp-inject-stringified-html

> Gulp Plugin to inject HTML templates into Javascript files.

## Usage

First, install `gulp-inject-stringified-html` as a development dependency:

```
npm install --save-dev gulp-inject-stringified-html
```

Then, add it to your gulpfile.js:

### Simple Example 

Simple Example:

```javascript
// gulpfile.js

var injectHtml = require('gulp-inject-stringified-html');

gulp.task('js', function () {
  return gulp.src(['src/views/hello.js'])
    .pipe(injectHtml())
    .pipe(gulp.dest('public/hello.js'));
});
```

```html
// src/views/hello.html

<p>Hello, World!</p>
```

```javascript
// src/views/hello.js

function sayHello() {
  return {
    gulp_inject: './hello.html'
  };
}

```

Result:
```javascript
// public/hello.js

function sayHello() {
  return "<h2>Hello, World!</h2>"
}

```

