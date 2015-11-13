# gulp-inject-stringified-html

> Gulp Plugin to inject HTML templates into Javascript files.


## Why?

When building single page web applications (SPAs), the `View` logic needs to know the "template" to be rendered.  

For example, when using [AngularJS Directives](https://docs.angularjs.org/guide/directive), either a `template` or `templateUrl` property can be given so the directive knows what html to render when compiled.  

**_Pain Points_** with _Directives_ and _Templates_: 

1. **BAD** - `templateUrl` creates dependency between View logic and template's URL location
2. **UGLY** - `template` forces developer to manually escape html string _(tedious, unreadable)_

In a perfect world... 

+ Templates should be readable.
+ View logic should be _orthogonal_ to template URL location.

A Solution...

+ **GOOD** - embed template in View logic at build time _(automation! DRY!)_.

The `gulp-inject-stringified-html` gulp plugin does just that :)


## Usage

First, install `gulp-inject-stringified-html` as a development dependency:

```
npm install --save-dev gulp-inject-stringified-html
```

Then, add it to your gulpfile.js:

### Basics

+ Put `{ gulp_inject: './path/to/your/file.html' }` inside your javascript file.
+ Use `gulp-inject-stringified-html` in your Javascript gulp tasks. 
+ _That's It!_

Below is example code and its expected output.

```javascript
// gulpfile.js

var injectHtml = require('gulp-inject-stringified-html');

gulp.task('js', function () {
  return gulp.src(['src/views/hello.js'])
    .pipe(injectHtml())                    // <--- this!
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
  return { gulp_inject: './hello.html' };  // <-- and this!
}
```

_Result..._
```javascript
// public/hello.js

function sayHello() {
  return "<h2>Hello, World!</h2>";        // <-- turns into this!
}
```

### JS Gulp Task Example

A more complex javascript gulp task using `gulp-inject-stringified-html` plugin.

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

### Customize!  

You provide custom `pre` and `post` escape tags to change what the plugin looks for. 

```javascript
// gulpfile.js

var injectHtml = require('gulp-inject-stringified-html');

gulp.task('js', function () {
  return gulp.src(['src/views/hello.js'])
    .pipe(injectHtml({
      pre: '!!![[[',                  // <-- custom beginning tag!
      post: ']]]'                     // <-- and custom end tag!!
    }))
    .pipe(gulp.dest('public/hello.js'));
```

```javascript
// src/views/hello.js

function sayHello() {
  return !!![[[ 'hello.html' ]]];    // <-- Usage of custom tags!!!
}
```

### Path Syntax

##### Relative Paths

All examples above use relative paths to inject the corresponding template.

Often single page apps put templates and view logic in the same directory. Using relative paths with `gulp-inject-stringified-html` are usually best for this.

```
// Common Directory Structure

project/
   gulpfile.js
   src/
      views/
         hello/
            hello.js   <-- JS View
            hello.html <-- HTML Template
         login/
            login.js
            login.html
         goodbye/
            goodbye.js 
      models/...
      styles/...
      vendor/...
   public/...
```

Furthermore, to demonstrate the flexibility of file paths in `gulp-inject-stringify-html` plugin...

...let's just say we want the `goodbye.js` view to utilize the `hello.html` template. We can actually put in a `..` within the path to get into the `views/` directory.  See the `goodbye.js` example code below.

```javascript
// src/views/goodbye.js

function sayGoodbye() {
  return { gulp_inject: '../views/hello/hello.html' };
  //  or  './../views/hello/hello.html' --^
}
```

##### Absolute Paths

But sometimes projects have one directory holding all the templates.  Using the _absolute path_ syntax may work best here. 

For absolute paths, the `gulp-inject-stringify-html` plugin joins the given path with the `gulpfile.js` location (ex: `project/` directory).

```
// Alternative Common Directory Structure

project/
   gulpfile.js
   src/
      js/
         views/
            hello.js
            login.js
            goodbye.js
         models/...
         vendor/...
      templates/
         hello.html
         login.html
      styles/...
```

Below is an example using absolute path syntax.

```javascript
// src/js/views/hello.js

function sayHello() {
  return { gulp_inject: '/src/templates/hello.html' };
}
```

And that's it!  **Enjoy!**



---

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