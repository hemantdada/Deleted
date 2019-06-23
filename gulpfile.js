
(function() {

  'use strict';

  const gulp = require('gulp');
  const requireDir = require('require-dir');

  requireDir('./gulp');

  gulp.task('default', ['serve']);
  
}());
