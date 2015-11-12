function helloTemplate() {
  return {
    template: { gulp_inject: './html/index.html'},
  };
}

function hello2Template() {
  return {
    gulp_inject: './html/subdir/index.html'
  };
}