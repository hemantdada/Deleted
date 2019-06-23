(function () {

  'use strict';

  const fs = require('fs');
  const path = require('path');
  const gulp = require('gulp');
  let template = require('../config/compliance-report-template');

  const basePath = path.resolve(__dirname, '..');

  function complianceReport(done) {
    fs.readFile(path.resolve(basePath, 'reports', 'compliance', 'compliance.json'), 'utf8', (error, contents) => {
    
      const chartConfig = JSON.parse(fs.readFileSync(path.resolve(basePath, 'compliance-history.json'), 'utf8'));
      console.info('Compliance file read. Generating report.');
      const data = JSON.parse(contents);
  
      // Build
      template = template.replace('@complianceBuildLink', '../build/statistics.html');
      template = template.replace('@buildChartContainer', JSON.stringify(chartConfig.build));
      template = template.replace('@buildFiles', data.build.statistics.fileCount);
      template = template.replace('@buildSize', data.build.statistics.totalSize + ' Mb');
      template = template.replace('@buildThreshold', '5 Mb');
      template = template.replace('@buildStartTime', data.build.executionTime.start);
      template = template.replace('@buildEndTime', data.build.executionTime.end);
      template = template.replace('@buildExecutionTime', data.build.executionTime.total + 's');
      template = template.replace('@buildCoverage', (5 - data.build.statistics.totalSize) < 0 ? 0.1 : (5 - data.build.statistics.totalSize)/0.05);

      // Acceccibility
      template = template.replace('@accessibilityChartContainer', JSON.stringify(chartConfig.accessibility));
      template = template.replace('@complianceAccessibilityLink', '../accessibility/accessibility-report.html');
      template = template.replace('@accessibilityTotal', data.accessibility.statistics.total);
      template = template.replace('@accessibilityErrors', data.accessibility.statistics.errors);
      template = template.replace('@accessibilityWarnings', data.accessibility.statistics.warnings);
      template = template.replace('@accessibilityNotices', data.accessibility.statistics.notices);
      template = template.replace('@accessibilityThreshold', 100);
      template = template.replace('@accessibilityStartTime', data.accessibility.executionTime.start);
      template = template.replace('@accessibilityEndTime', data.accessibility.executionTime.end);
      template = template.replace('@accessibilityExecutionTime', data.accessibility.executionTime.total + 's');
      template = template.replace('@accessibilityCoverage', (100 - data.accessibility.statistics.total) < 0 ? 0.1 : (100 - data.accessibility.statistics.total));

      // TSLint
      template = template.replace('@tslintChartContainer', JSON.stringify(chartConfig.lint));
      template = template.replace('@complianceTSLintLink', '../tslint-html-report/tslint-report.html');
      template = template.replace('@tslintCount', data.lint.statistics.count);
      template = template.replace('@tslintThreshold', 100);
      template = template.replace('@tslintStartTime', data.lint.executionTime.start);
      template = template.replace('@tslintEndTime', data.lint.executionTime.end);
      template = template.replace('@tslintExecutionTime', data.lint.executionTime.total + 's');
      template = template.replace('@tslintCoverage', (100 - data.lint.statistics.count) < 0 ? 0.1 : (100 - data.lint.statistics.count));
  
      // JSCPD
      template = template.replace('@jscpdChartContainer', JSON.stringify(chartConfig.jscpd));
      template = template.replace('@complianceJscpdLink', '../code-duplicity/jscpd-report.html');
      template = template.replace('@jscpdPercentage', data.jscpd.statistics.percentage);
      template = template.replace('@jscpdDuplicates', data.jscpd.statistics.duplications);
      template = template.replace('@jscpdFiles', data.jscpd.statistics.files);
      template = template.replace('@jscpdStartTime', data.jscpd.executionTime.start);
      template = template.replace('@jscpdEndTime', data.jscpd.executionTime.end);
      template = template.replace('@jscpdExecutionTime', data.jscpd.executionTime.total + 's');
      template = template.replace('@jscpdCoverage', 100 - data.jscpd.statistics.percentage);

      //unit tests
      template = template.replace('@complianceUnitTestLink', '../coverage/html/html/index.html');

      template = template.replace('@unitTestStartTime', data.test.executionTime.start);
      template = template.replace('@unitTestEndTime', data.test.executionTime.end);
      template = template.replace('@unitTestExecutionTime', data.test.executionTime.total + 's');

      template = template.replace('@unitTestTotal', data.test.statistics.summary.total);
      template = template.replace('@unitTestSuccess', data.test.statistics.summary.success);
      template = template.replace('@unitTestFailed', data.test.statistics.summary.failed);
      template = template.replace('@unitTestSkipped', data.test.statistics.summary.skipped);
      template = template.replace('@unitTestDNE', data.test.statistics.summary.didNotExecute);

      template = template.replace('@lineChartContainer', JSON.stringify(chartConfig.test.lines));
      template = template.replace('@lineCoverageTitle', data.test.statistics.coverage.lines.percentage + '%');
      template = template.replace('@lineCoverageTotal', data.test.statistics.coverage.lines.total);
      template = template.replace('@lineCoverageCovered', data.test.statistics.coverage.lines.covered);
      template = template.replace('@lineCoverageSkipped', data.test.statistics.coverage.lines.skipped);

      template = template.replace('@branchChartContainer', JSON.stringify(chartConfig.test.branches));
      template = template.replace('@branchCoverageTitle', data.test.statistics.coverage.branches.percentage + '%');
      template = template.replace('@branchCoverageTotal', data.test.statistics.coverage.branches.total);
      template = template.replace('@branchCoverageCovered', data.test.statistics.coverage.branches.covered);
      template = template.replace('@branchCoverageSkipped', data.test.statistics.coverage.branches.skipped);

      template = template.replace('@functionChartContainer', JSON.stringify(chartConfig.test.functions));
      template = template.replace('@functionCoverageTitle', data.test.statistics.coverage.functions.percentage + '%');
      template = template.replace('@functionCoverageTotal', data.test.statistics.coverage.functions.total);
      template = template.replace('@functionCoverageCovered', data.test.statistics.coverage.functions.covered);
      template = template.replace('@functionCoverageSkipped', data.test.statistics.coverage.functions.skipped);

      template = template.replace('@statementChartContainer', JSON.stringify(chartConfig.test.statements));
      template = template.replace('@statementCoverageTitle', data.test.statistics.coverage.statements.percentage + '%');
      template = template.replace('@statementCoverageTotal', data.test.statistics.coverage.statements.total);
      template = template.replace('@statementCoverageCovered', data.test.statistics.coverage.statements.covered);
      template = template.replace('@statementCoverageSkipped', data.test.statistics.coverage.statements.skipped);

      template = template.replace('@lineCoverage', data.test.statistics.coverage.lines.percentage || 0.1);
      template = template.replace('@branchCoverage', data.test.statistics.coverage.branches.percentage || 0.1);
      template = template.replace('@functionCoverage', data.test.statistics.coverage.functions.percentage || 0.1);
      template = template.replace('@statementCoverage', data.test.statistics.coverage.statements.percentage || 0.1);
  
  
      template = template.replace(/\"contentFormatter\":\"/g, '"contentFormatter": ');
      template = template.replace(/}\"},"data\"/g, '} },"data"');
      template = template.replace(/\\\"/g, '"');

      fs.writeFile(path.resolve(basePath, 'reports', 'compliance', 'compliance-report.html'), template, 'utf8', () => {
        console.info('Compliance html report written to file');
        done();
      });
  
    });
  }

  gulp.task('copyDeps', () => {
    return gulp.src(path.resolve(basePath, 'config', 'compliance-dependencies', '*'))
      .pipe(gulp.dest(path.resolve(basePath, 'reports', 'compliance')));
  });

  gulp.task('compliance:html', ['compliance'], (done) => {
    gulp.start('copyDeps');
    complianceReport(() => {
      done();
    });
  });

})();