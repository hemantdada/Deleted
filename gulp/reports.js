
(function () {

  'use strict';

  const gulp = require('gulp');
  const spawn = require('child_process').spawn;
  const async = require('async');
  const path = require('path');
  const fs = require('fs');
  const clc = require('cli-color');
  const basePath = path.resolve(__dirname, '..');

  const taskList = require('../config/compliance-task-list');
  const executionDetails = {
    test: {
      start: "",
      end: "",
      total: ""
    },
    lint: {
      start: "",
      end: "",
      total: ""
    },
    jscpd: {
      start: "",
      end: "",
      total: ""
    },
    accessibility: {
      start: "",
      end: "",
      total: ""
    },
    build: {
      start: "",
      end: "",
      total: ""
    }
  };

  function generateReport(done) {

    const asyncArray = [];
    Object.keys(taskList).forEach((key) => {
      asyncArray.push(
        function (cb) {

          executionDetails[key].start = new Date();
          const child = spawn('node ./node_modules/gulp/bin/gulp.js ' + taskList[key].name, { shell: true, detached: false });

          child.on('error', (err) => {
            console.log('Failed to start child process: ', err);
          });

          child.stdout.on('data', (data) => {
            process.stdout.write(data);
          });

          child.stderr.on('data', (data) => {
            process.stdout.write(data);
          });

          child.on('exit', () => {
            executionDetails[key].end = new Date();
            executionDetails[key].total = (executionDetails[key].end.getTime() - executionDetails[key].start.getTime()) / 1000;
            executionDetails[key].end = executionDetails[key].end.toLocaleString();
            executionDetails[key].start = executionDetails[key].start.toLocaleString();
            cb();
          });

        }
      );
    });

    let startTime = new Date();
    async.parallelLimit(asyncArray, 5, () => {
      let endTime = new Date();
      console.info(clc.magentaBright('\nReports task started at: '), clc.cyanBright(startTime.toLocaleString()));
      console.info(clc.magentaBright('Reports task ended at: '), clc.cyanBright(endTime.toLocaleString()));
      console.info(clc.magentaBright('Total time taken for all tasks: '), clc.cyanBright((endTime.getTime() - startTime.getTime()) / 1000));
      console.info('\n');
      done();
    });

  }

  function writeReport(done) {
    if (!fs.existsSync(path.resolve(basePath, 'reports', 'compliance'))) {
      fs.mkdirSync(path.resolve(basePath, 'reports', 'compliance'));
    }
    fs.writeFile(path.resolve(basePath, 'reports', 'compliance', 'execution-time.json'), JSON.stringify(executionDetails, null, 2), 'utf8', (error) => {
      if (error) {
        console.log(error);
      }
      done();
    });
  }

  gulp.task('reports', ['clean:all'], (done) => {
    generateReport(() => {
      writeReport(() => {
        done();
      });
    });
  });

}());
