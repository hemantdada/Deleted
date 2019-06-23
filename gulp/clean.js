
(function () {

  'use strict';

  const gulp = require('gulp');
  const del = require('del');
  const clc = require('cli-color');
  const path = require('path');

  const basePath = path.resolve(__dirname, '..')

  const logDeletedPaths = (paths) => {
    console.log(clc.cyanBright('Deleted paths: '));
    paths.forEach((path) => {
      console.log(clc.magentaBright(path));
    });
  };

  gulp.task('clean:all', ['clean:dist', 'clean:reports'], function (done) {
    done();
  });

  gulp.task('clean:dist', function () {
    return del([
      path.resolve(basePath, 'dist')
    ]).then(logDeletedPaths);;
  });

  gulp.task('clean:reports', function () {
    return del([
      path.resolve(basePath, 'reports')
    ]).then(logDeletedPaths);
  });

}());
