'use strict';

var chai = require('chai');
var assert = chai.assert;

var concatStream = require('concat-stream');
var fs = require('fs');
var File = require('vinyl');
var injectStringifiedHtml = require('../index.js');

describe ('gulp-inject-stringified-html', function () {

  it ('should replace gulp_inject object on a stream', function (done) {

    var file = new File({
      path: 'test/fixtures/subject.js',
      cwd: 'test',
      base: 'fixtures',
      contents: fs.createReadStream('test/fixtures/subject.js') // stream
    });

    var stream = injectStringifiedHtml();

    stream.on('data', function (newFile) {

      assert(newFile);
      assert(newFile.contents);

      newFile.contents.pipe(concatStream({ encoding: 'string' }, function (data) {

        var expectedString = fs.readFileSync('test/fixtures/expected.js', 'utf8');

        assert.equal(data, expectedString);

        done();
      }));
    });

    stream.write(file);
    stream.end();

  });

  it ('should replace gulp_inject object on a buffer', function (done) {

    var file = new File({
      path: 'test/fixtures/subject.js',
      cwd: 'test',
      base: 'fixtures',
      contents: fs.readFileSync('test/fixtures/subject.js') // buffer
    });

    var stream = injectStringifiedHtml();

    stream.on('data', function (newFile) {

      assert(newFile);
      assert(newFile.contents);

      var expectedString = fs.readFileSync('test/fixtures/expected.js', 'utf8');
      var contentsString = newFile.contents.toString();

      assert.equal(String(contentsString), expectedString);

      done();
    });

    stream.write(file);
    stream.end();

  });
});
