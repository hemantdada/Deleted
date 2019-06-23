
(function () {

  'use strict';

  const gulp = require('gulp');
  const accessibilityHtmlReporter = require('accessibility-html-reporter');

  const config = {
    srcFiles: ['src/**/*.html'], // array of files to test

    accessibilityLevel: 'WCAG2AAA', // one of WCAG2A, WCAG2AA, WCAG2AAA, and Section508
    ignore: ['WCAG2AAA.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',
      'WCAG2AAA.Principle3.Guideline3_1.3_1_1.H57.2'], // rules to ignore eg. ['WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2']
    verbose: false, // Verbose output
    force: true, // do not throw an error if errors found
    browser: false, // false = jsdom, true = phantomJS
    maxBuffer: 500 * 1024, // set buffer size

    fileName: 'accessibility-report', // name of json and html file generated
    reportLocation: 'reports/accessibility' // folder where report should be written
  }

  gulp.task('accessibility:html', (done) => {
    accessibilityHtmlReporter(config, () => {
      done();
    });
  });

}());
