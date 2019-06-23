
(function () {
  'use strict';

  const gulp = require('gulp');
  const webpack = require('webpack');
  const path = require('path');
  const shell = require('gulp-shell');

  gulp.task('build:stats', shell.task('ng build --build-optimizer --aot --prod --stats-json'));

  gulp.task('build:html', ['build:stats'],
    shell.task('webpack-bundle-analyzer dist/my-app/stats.json --mode static --report reports/build/statistics.html --no-open')
  );

}());
