/* jshint mocha: true */
/* jshint node: true */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var concatStream = require('concat-stream');
var fs = require('fs');
var File = require('vinyl');
var injectStringifiedHtml = require('./index.js');



(function runStreamTest() {

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

    newFile.pipe(concatStream({encoding: 'string'}, function (data) {
      var expectedString = fs.readFileSync('test/expected.js', 'utf8');

      data.should.equal(expectedString);
    }));
  });

  stream.write(file);
  stream.end();
}());


(function runBufferTest() {

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

    var expectedString = fs.readFileSync('test/expected.js', 'utf8');
    var contentsString = newFile.contents.toString();

    String(contentsString).should.equal(expectedString);
  });

  stream.write(file);
  stream.end();

}());
