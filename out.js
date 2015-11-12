function helloTemplate() {
  return {
    template: "<h1>Hello, World!</h1>",
  };
}

function hello2Template() {
  return "<h2 class=\"hello\" ng-bind=\"ctrl.data | is_empty: \'Hello!\'\">\n    Hello, <span>{{ ctrl.who() }}</span>!\n</h2>";
}