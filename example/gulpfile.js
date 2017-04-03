'use strict';

var injectHtml = require('../');
var gulp = require('gulp');

gulp.task('default', function () {
  return gulp.src(['src/hello.js'])
    .pipe(injectHtml())
    .pipe(gulp.dest('dist'));
});
