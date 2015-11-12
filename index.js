'use strict';

var _ = require('lodash');
var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');
var fs = require('fs');

var PluginError = gutil.PluginError;
var regex = /!!!!\(\s*(?:'|")([^\v'"]*)(?:'|")\s*\)/g;
var defaults = {
  begin: '!!!!(',
  end: ')'
};

const PLUGIN_NAME = 'gulp-inject-stringified-html';



function escapeForRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



// gulp plugin
function gulpInjectStringifiedHtml(params) {
  params = processParameters(params);


  // create and return a stream through which each file will pass
  return through.obj(function (file, enc, cb) {

    if (file.isBuffer()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
      return cb();
    }

    if (file.isStream()) {

      



    }


    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });
}

function processParameters(params) {
  // @todo: process/normalize parameters

  return params;
}













module.exports = gulpInjectStringifiedHtml;
