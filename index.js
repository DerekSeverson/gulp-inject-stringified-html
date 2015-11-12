'use strict';

var _ = require('lodash');
var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');
var fs = require('fs');
var htmlJsStr = require('js-string-escape');
var concatStream = require('concat-stream');


var PluginError = gutil.PluginError;
var regex = /\{\s*gulp_inject:\s(?:'|")([^'"]*)(?:'|")\s*\}/gm;

var PLUGIN_NAME = 'gulp-inject-stringified-html';



// gulp plugin
function gulpInjectStringifiedHtml() {

  // create and return a stream through which each file will pass
  return through.obj(function (file, enc, cb) {
    var contents;

    //if (gutil.isStream(file)) {
    //  file.contents = file.contents.pipe(concatStream(function (buffer,) {
    //
    //  }));
    //}
    //
    //if (gutil.isBuffer(file)) {
    //  file.contents = doInjectHtml(file.contents, file.base);
    //}

    file.pipe(concatStream({encoding: 'string'},function (data) {
      file.contents = doInjectHtml(data, file.base);
      cb(null, file);
    }));

  });
}

function doInjectHtml(contents, relpath) {
  var result;
  var found = [];

  // Nothing to do here.
  //if (!regex.test(contents)) return contents;

  // Do replacement!

  while (_.isArray((result = regex.exec(contents)))) {
    found.push({
      replacee: result[0], // matching string !!!('./index.html')
      filepath: result[1]  // matching group  './index.html'
    });
  }

  found.forEach(function (o) {
    var htmlFilePath = path.resolve(relpath, o.filepath);
    var htmlContent = read(htmlFilePath);

    htmlContent = htmlJsStr(htmlContent);
    htmlContent = ['"', htmlContent, '"'].join('');

    contents = contents.replace(o.replacee, htmlContent);
  });

  return new Buffer(contents);
}

function read(filepath) {
  return fs.readFileSync(filepath, 'utf8');
}











module.exports = gulpInjectStringifiedHtml;
