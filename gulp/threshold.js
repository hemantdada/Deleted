
(function() {
  
  'use strict';

  const gulp = require('gulp');
  const fs = require('fs');
  const path = require('path')
  const minimatch = require('minimatch');
  const clc = require('cli-color');

  const TYPES = ['statements', 'branches', 'functions', 'lines'];
  const basePath = path.resolve(__dirname, '..');
  
  const result = {};
  let failed = false;

  const config = {
    src: path.resolve(basePath, 'reports', 'coverage', 'json', 'json-summary'),
    dest: path.resolve(basePath, 'reports', 'coverage', 'coverage.json'),
    excludes: ['**/*.js'],
    thresholds: {
      global: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95
      },
      files: {
        statements: 95,
        branches: 95,
        lines: 95,
        functions: 95,
      }
    }
  };

  function removeExcludedFiles(coverage) {
    config.excludes.forEach((exclude) => {
      Object.keys(coverage).forEach((key) => {
        if (minimatch(key, exclude)) {
          delete coverage[key];
        }
      });
    });
    
  }

  function verifyGlobalThresholds(coverage, thresholds) {

    result.global = {
      coverage: {},
      failed: false
    };
    
    const summary = coverage.total;
    console.log('\n');

    TYPES.forEach((type) => {
      result.global.coverage[type] = {
        percentage: summary[type].pct,
        covered: summary[type].covered,
        total: summary[type].total,
        skipped: summary[type].skipped
      };
      if (summary[type].pct < thresholds[type]) {
        failed = true;
        result.global.failed = true;
        let message = clc.redBright('GLOBAL:\t');
        message = message + clc.magentaBright(type + ':\t');
        message = (type === 'lines') ? message + '\t' : message;
        message = message + clc.yellowBright(summary[type].pct + '% (' + summary[type].covered + '/' + summary[type].total + ' )');
        message = message + clc.redBright(' Does not meet the GLOBAL threshold of ');
        message = message + clc.yellowBright(thresholds[type] + '%.');
        console.log(message);
      }
    });

    delete coverage.total;

  }

  function verifyFileThresholds(coverage, thresholds) {

    result.files = [];

    console.log('\n');
    Object.keys(coverage).forEach((fileName) => {

      const name = fileName.replace(basePath, '').replace(/\\/g, '/');
      const resultObject = {
        name: name,
        failed: false,
        coverage: {}
      };
      const summary = coverage[fileName];

      TYPES.forEach((type) => {
        resultObject.coverage[type] = {
          percentage: summary[type].pct,
          covered: summary[type].covered,
          total: summary[type].total
        };
        if (summary[type].pct < thresholds[type]) {
          failed = true;
          resultObject.failed = true;
          let message = clc.redBright('Low Coverage:\t') + clc.magentaBright(type + ':\t');
          message = (type === 'lines') ? message + '\t' : message;
          message = message + clc.cyanBright(name + ': ')
          message = message + clc.yellowBright(summary[type].pct + '% (' + summary[type].covered + '/' + summary[type].total + ' )');
          message = message + clc.redBright(' Does not meet the file threshold of ');
          message = message + clc.yellowBright(thresholds[type] + '%.');
          console.log(message);
        }
      });

      result.files.push(resultObject);

    });
    console.log('\n');

  }

  function generateReport(done) {

    console.log('Reading summary report...');
    fs.readFile(config.src, 'utf-8', (error, rawData) => {
      if (error) {
        console.log('Error reading file for threshold: ', error);
        done();
      } else {
        console.log('Summary report read. Generating report...');
        const coverageData = JSON.parse(rawData);
        removeExcludedFiles(coverageData);
        verifyGlobalThresholds(coverageData, config.thresholds.global);
        verifyFileThresholds(coverageData, config.thresholds.files);
        console.log('Writing coverage report to json');
        fs.writeFile(config.dest, JSON.stringify(result, null, 2), 'utf8', (error) => {
          if (error) {
            console.log('Error writing threshold report: ', error);
          } else {
            console.log('Coverage report written to file');
          }
          done()
        });
      }

    });
  }

  gulp.task('threshold', (done) => {
    generateReport(() => {
      if (failed) {
        process.exit(1);
      }
      done();
    });
  });

})();
