/* jshint node: yes */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var htmlJsStr = require('js-string-escape');



//var regex = /!!!!\(\s*(?:'|")([^\v'"]*)(?:'|")\s*\)/g;

var regex = /\{\s*gulp_inject:\s*(?:'|")([^'"]*)(?:'|")\s*\}/g;
var content = read('test/subject.js');

//console.log('Before: ', content);

var matches = content.match(regex);

//console.log('Matches: ', matches);

var result;
var found = [];

while (_.isArray((result = regex.exec(content)))) {
  found.push({
    replacee: result[0],
    filepath: result[1]
  });
}

//console.log('FOUND: ', found);

found.forEach(function (o) {

  //console.log('FILE: ', o.filepath);
  var html = read(getFilePath(o.filepath));
  //console.log('  HTML: ', html);
  var escHtml = htmlJsStr(html);
  //console.log('  JS-HTML: ', escHtml);

  escHtml = ['"', escHtml, '"'].join('');

  content = content.replace(o.replacee, escHtml);

  console.log(content);
});

console.log('DONE: ', content);

fs.writeFile('test/expected.js', content);



////////////////////////////////////////////

function read(filename) {
  return fs.readFileSync(filename, 'utf8');
}

function getFilePath(relpath) {
  return path.resolve('test', relpath);
}