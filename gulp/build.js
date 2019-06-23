
(function () {

  'use strict';

  const gulp = require('gulp');
  const shell = require('gulp-shell');

  gulp.task('build', shell.task('ng build --build-optimizer --aot --prod --stats-json'));

})();
