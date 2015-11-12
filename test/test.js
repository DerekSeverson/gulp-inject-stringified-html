/* jshint mocha: true */
/* jshint node: true */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var concatStream = require('concat-stream');
var fs = require('fs');
var File = require('vinyl');
var injectStringifiedHtml = require('../index.js');

describe ('gulp-inject-stringified-html', function () {

  it ('should replace gulp_inject object on a stream', function (done) {

    var file = new File({
      path: 'data/subject.js',
      cwd: 'test',
      base: 'data',
      contents: fs.createReadStream('data/subject.js') // stream
    });

    var stream = injectStringifiedHtml();

    stream.on('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      newFile.pipe(concatStream({encoding: 'string'}, function (data) {
        var expectedString = fs.readFileSync('data/expected.js', 'utf8');

        data.should.equal(expectedString);

        done();
      }));
    });

    stream.write(file);
    stream.end();

  });

  it ('should replace gulp_inject object on a buffer', function (done) {

    var file = new File({
      path: 'data/subject.js',
      cwd: 'test',
      base: 'data',
      contents: fs.readFileSync('data/subject.js') // buffer
    });

    var stream = injectStringifiedHtml();

    stream.on('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      var expectedString = fs.readFileSync('data/expected.js', 'utf8');
      var contentsString = newFile.contents.toString();

      String(contentsString).should.equal(expectedString);

      done();
    });

    stream.write(file);
    stream.end();

  });
});
