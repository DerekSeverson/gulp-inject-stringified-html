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

### More Robust Example

```javascript
// gulpfile.js

var path = require('path');
var gulp = require('gulp');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var injectHtml = require('gulp-inject-stringified-html');

gulp.task('js', function () {
  var dest = './public';
  var filename = 'app.js'
  
  return gulp.src(['src/**/*.js')
    .pipe(newer(path.join(dest, filename)))
    .pipe(injectHtml())  // <--- gulp-inject-stringified-html here.
    .pipe(sourcemaps.init())
        .pipe(concat(filename))
        .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

```
