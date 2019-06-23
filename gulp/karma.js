
(function () {

  'use strict';

  const gulp = require('gulp');
  const Server = require('karma').Server;
  const path = require('path');
  const runSequence = require('run-sequence');

  let failed = false;

  gulp.task('karma', (done) => {

    const karma = new Server({
      configFile: path.resolve(__dirname, '..', 'karma.conf.js'),
    }, (exitCode) => {
      if (exitCode !== 0) {
        failed = true;
      }
      done();
    });

    karma.start();
  });

  gulp.task('test', (done) => {
    runSequence('karma', 'threshold', () => {
      if (failed) {
        process.exit(1);
      }
      done();
    });
  });

})();
