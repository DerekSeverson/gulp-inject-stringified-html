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
      path: 'test/subject.js',
      cwd: 'test',
      base: 'test',
      contents: fs.createReadStream('test/subject.js') // stream
    });

    var stream = injectStringifiedHtml();

    stream.on('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      newFile.contents.pipe(concatStream({encoding: 'string'}), function (data) {
        data.should.equal(fs.readFileSync('test/expected.js'), 'utf8');
        done();
      });
    });

    stream.write(file);
    stream.end();

  });

  it ('should replace gulp_inject object on a buffer', function (done) {

    var file = new File({
      path: 'test/subject.js',
      cwd: 'test',
      base: 'test',
      contents: fs.readFileSync('test/subject.js') // buffer
    });

    var stream = injectStringifiedHtml();

    stream.on('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(fs.readFileSync('test/expected.js'), 'utf8');
      done();
    });

    stream.write(file);
    stream.end();

  });
});
