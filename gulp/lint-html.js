
(function() {

  'use strict';

  const gulp = require('gulp');
  const tslintHtmlReport = require('tslint-html-report');

  const config = {
    tslint: 'tslint.json', // path to tslint.json
    srcFiles: 'src/**/*.ts', // files to lint
    outDir: 'reports/tslint-html-report', // output folder to write the report to.
    html: 'tslint-report.html', // name of the html report generated
    breakOnError: true, // Should it throw an error in tslint errors are found.
    typeCheck: true,
    tsconfig: 'tsconfig.json'
  }

  gulp.task('lint:html', (done) => {
    tslintHtmlReport(config, () => {
      done();
    });
  });

}());
