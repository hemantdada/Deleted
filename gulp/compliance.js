
(function () {

  'use strict';

  const fs = require('fs');
  const path = require('path');
  const clc = require('cli-color');
  const gulp = require('gulp');
  const async = require('async');

  const basePath = path.resolve(__dirname, '..');

  const complianceHistory = require('./compliance-history');
  const complianceDetails = require('../config/compliance-report-schema');

  function logStatus(key) {
    const report = {lint: 'TSLint Report', test: 'Unit Test', jscpd: 'Code Duplicity', 'accessibility': 'Accessibility', 'build': 'Build Status'}
    let message = clc.cyanBright('\t\t' + report[key] + ' \t\t ');
    if (complianceDetails[key].status === 'Pass') {
      message += clc.greenBright(complianceDetails[key].status) + ' \t\t ' + clc.greenBright(complianceDetails[key].comments);
    } else if (complianceDetails[key].status === 'Fail') {
      message += clc.redBright(complianceDetails[key].status) + ' \t\t ' + clc.redBright(complianceDetails[key].comments);
    } else {
      message += clc.yellowBright(complianceDetails[key].status) + ' \t ' + clc.yellowBright(complianceDetails[key].comments);
    }
    console.info(message);
  }

  function buildCompliance(done) {
    let totalSize = 0, fileCount = 0;
    if (fs.existsSync(path.resolve(basePath, 'dist')) && fs.existsSync(path.resolve(basePath, 'dist', 'my-app'))) {
      fs.readdir(path.resolve(basePath, 'dist', 'my-app'), (error, fileList) => {
        fileCount = fileList.length;
        async.forEach(fileList, (file, done) => {
          fs.stat(path.resolve(basePath, 'dist', 'my-app', file), (error, stats) => {
            totalSize += (file !== 'stats.json') ? stats.size : 0;
            done();
          });
        }, () => {
          complianceDetails.build.statistics.totalSize = (totalSize/1000000);
          complianceDetails.build.statistics.fileCount = fileCount;
          complianceDetails.build.status = (5 - complianceDetails.build.statistics.totalSize) < 0 ? 'Fail' : 'Pass';
          complianceDetails.build.comments = complianceDetails.build.status === 'Fail' ? 'Bundle size too large' : 'All good';
          done();
        });
      });
    } else {
      complianceDetails.build.comments = 'Could not find report file';
      done();
    }
  }

  function accessibilityCompliance(done) {

    const filePath = path.resolve(basePath, 'reports', 'accessibility', 'accessibility-report.json');
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, 'utf8', (error, contents) => {
        if (contents) {
          const data = JSON.parse(contents);
          complianceDetails.accessibility.status = data.errors < 100 ? 'Pass' : 'Fail';
          complianceDetails.accessibility.comments = complianceDetails.accessibility.status === 'Fail' ? 'Failed to meet the accessibility error threshold' : 'All good';
          complianceDetails.accessibility.statistics.total = data.errors + data.warnings + data.notices;
          complianceDetails.accessibility.statistics.errors = data.errors;
          complianceDetails.accessibility.statistics.warnings = data.warnings;
          complianceDetails.accessibility.statistics.notices = data.notices;
        }
        done();
      });
    } else {
      complianceDetails.accessibility.comments = 'Could not find report file';
      done();
    }

  }

  function jscpdCompliance(done) {

    const filePath = path.resolve(basePath, 'reports', 'code-duplicity', 'jscpd.json');
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, 'utf8', (error, contents) => {
        if (contents) {
          const data = JSON.parse(contents);
          complianceDetails.jscpd.status = parseFloat(data.statistics.percentage) < 5.00 ? 'Pass' : 'Fail';
          complianceDetails.jscpd.comments = complianceDetails.jscpd.status === 'Fail' ? 'Failed to meet the code duplicity threshold' : 'All good';
          complianceDetails.jscpd.statistics = data.statistics;
        }
        done();
      });
    } else {
      complianceDetails.jscpd.comments = 'Could not find report file';
      done();
    }

  }

  function testCompliance(done) {

    let coverageData, summaryData;

    const summaryFilePath = path.resolve(basePath, 'reports', 'spec-tally-report', 'spec-tally-report.json');
    if (fs.existsSync(summaryFilePath)) {
      summaryData = JSON.parse(fs.readFileSync(summaryFilePath, 'utf8'));
      complianceDetails.test.status = (summaryData.statistics.failed === 0 && summaryData.statistics.didNotExecute === 0) ?
        'Pass' : 'Fail';
      if (complianceDetails.test.status === 'Fail') {
        complianceDetails.test.comments = summaryData.statistics.failed !== 0 ?
        'Failing test cases found' : 'All tests did not execute';  
      } else {
        complianceDetails.test.comments = 'All good';
      }

      complianceDetails.test.statistics.summary = summaryData.statistics;
    }

    const coverageFilePath = path.resolve(basePath, 'reports', 'coverage', 'coverage.json');
    if (fs.existsSync(coverageFilePath)) {
      coverageData = JSON.parse(fs.readFileSync(coverageFilePath, 'utf8'));
      if (complianceDetails.test.status !== 'Fail') {
        complianceDetails.test.status = !coverageData.global.failed ? 'Pass' : 'Fail';
        complianceDetails.test.comments = complianceDetails.test.status === 'Fail' ?
          'Failed to meet the coverage threshold' : 'All good';
      }
      complianceDetails.test.statistics.coverage = coverageData.global.coverage;
    }

    if (!coverageData || !summaryData) {
      complianceDetails.test.status = 'Unsure';
      complianceDetails.test.comments = 'Could not find report file'
    }

    done();

  }

  function tslintCompliance(done) {

    const filePath = path.resolve(basePath, 'reports', 'tslint-html-report', 'tslint-report.json');
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, 'utf8', (error, contents) => {
        if (contents) {
          const data = JSON.parse(contents);
          complianceDetails.lint.status = data.length < 100 ? 'Pass' : 'Fail';
          complianceDetails.lint.comments = complianceDetails.lint.status === 'Fail' ? 'Failed to meet the lint error threshold' : 'All good';
          complianceDetails.lint.statistics.count = data.length;
        }
        done();
      });
    } else {
      complianceDetails.lint.comments = 'Could not find report file';
      done();
    }

  }

  function executionTimeDetails(done) {
    if (fs.existsSync(path.resolve(basePath, 'reports', 'compliance', 'execution-time.json'))) {
      fs.readFile(path.resolve(basePath, 'reports', 'compliance', 'execution-time.json'), 'utf8', (error, data) => {
        if (data) {
          const executionDetails = JSON.parse(data);
          Object.keys(executionDetails).forEach((key) => {
            complianceDetails[key].executionTime = executionDetails[key];
          });
        }
        done();
      });
    } else {
      done();
    }
  }

  function postProcessing(done) {
    console.info(clc.magentaBright('\n\tCode Compliance Status: \n'));
    console.info('\t\tReport type \t\t Status \t Comments\n');
    logStatus('lint');
    logStatus('test');
    logStatus('jscpd');
    logStatus('accessibility');
    logStatus('build');
    console.info('\n');
    if (!fs.existsSync(path.resolve(basePath, 'reports', 'compliance'))) {
      fs.mkdirSync(path.resolve(basePath, 'reports', 'compliance')); 
    }
    fs.writeFile(path.resolve(basePath, 'reports', 'compliance', 'compliance.json'), JSON.stringify(complianceDetails, null, 2), 'utf8', () => {
      done();
    });
  }

  gulp.task('compliance', ['reports'], (done) => {
    async.parallel([
      testCompliance, executionTimeDetails, tslintCompliance,
      jscpdCompliance, buildCompliance, accessibilityCompliance
    ], () => {
      postProcessing(() => {
        complianceHistory(() => {
          done();
        });
      });
    });
  });

}());
