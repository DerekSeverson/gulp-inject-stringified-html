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
    .pipe(sourcemaps.init())
      .pipe(injectHtml())  // <--- gulp-inject-stringified-html here.
      .pipe(concat(filename))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

```



## License

The MIT License (MIT)

Copyright (c) 2015 Derek Severson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.