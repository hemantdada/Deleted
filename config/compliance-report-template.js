(function () {
  
  'use strict';

  module.exports = `
  <!doctype html>
  <html>
    
    <head>
      <link type="text/css" rel="stylesheet" href="./bootstrap.min.css">
      <script src="./canvasjs.min.js"></script>
      <script src="./gauge.min.js"></script>
      <title>Compliance Report</title>
    </head>

    <style>
      body {
        background-color: lightcyan;
        ;
      }
    </style>
    
    <body>
      <div class="container" style="background-color: lightgoldenrodyellow; padding-top: 10px; padding-bottom: 30px;">
        <div class="col-lg-12" style="text-align: center">
          <h1>Code Compliance report</h1>
          <div id="allHistoryLink" style="text-align: right;"><a onclick="showAllHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
          <div id="lastAllLink" style="text-align: right; display: none;"><a onclick="showLastAll()" href="javascript: void(0)">Show Latest build</a></div>
        </div>
        <hr style="border: 1px black solid; clear:both; display:block; width: 100%; height: 1px;">
        <div class="col-lg-12" style="border: 1px black solid; margin: 0px; padding: 0px">
    
          <div class="col-lg-12">
            <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px;">
              <div class="col-lg-12" style="text-align: center; margin: 0px; padding: 0px;">
                <h2>
                  <a href="@complianceBuildLink">Build Details</a>
                </h2>
                <div id="buildHistoryLink" style="text-align: right;"><a onclick="showBuildHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
                <div id="lastBuildLink" style="text-align: right; display: none;"><a onclick="showLastBuild()" href="javascript: void(0)">Show Latest build</a></div>
              </div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div id="lastBuild" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px;">
                <div class="col-lg-6" style="border-right: 1px black solid; text-align: center;">
                  <canvas style="height: 150px !important; width: 200px !important;" id="build"></canvas>
                </div>
                <div class="col-lg-6">
                  <div>
                    <strong>Files: @buildFiles</strong>
                  </div>
                  <div>
                    <strong>Size: @buildSize</strong>
                  </div>
                  <div>
                    <strong>Threshold: @buildThreshold</strong>
                  </div>
                  <br>
                  <div>
                    <strong>Start: @buildStartTime</strong>
                  </div>
                  <div>
                    <strong>End: @buildEndTime</strong>
                  </div>
                  <div>
                    <strong>Execution Time: @buildExecutionTime</strong>
                  </div>
                </div>
              </div>
              <div id="buildHistory" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px; display: none;">
                <div id="buildChartContainer" style="height: 200px; width: 96%;"></div>
              </div>
            </div>
    
            <div class="col-lg-6" style="margin-bottom: 20px;">
              <div class="col-lg-12" style="text-align: center; margin: 0px; padding: 0px;">
                <h2>
                  <a href="@complianceAccessibilityLink">Accessibility Report</a>
                </h2>
                <div id="accessibilityHistoryLink" style="text-align: right;"><a onclick="showAccessibilityHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
                <div id="lastAccessibilityLink" style="text-align: right; display: none;"><a onclick="showLastAccessibility()" href="javascript: void(0)">Show Latest report</a></div>
              </div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div id="lastAccessibility" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px;">
                <div class="col-lg-6" style="border-right: 1px black solid; text-align: center;">
                  <canvas style="height: 150px !important; width: 200px !important;" id="accessibility"></canvas>
                </div>
                <div class="col-lg-6">
                  <div>
                    <strong>Total: @accessibilityTotal</strong>
                  </div>
                  <div>
                    <strong>Errors: @accessibilityErrors</strong>
                  </div>
                  <div>
                    <strong>Warnings: @accessibilityWarnings</strong>
                  </div>
                  <div>
                    <strong>Notices: @accessibilityNotices</strong>
                  </div>
                  <div>
                    <strong>Threshold: @accessibilityThreshold</strong>
                  </div>
                  <br>
                  <div>
                    <strong>Start: @accessibilityStartTime</strong>
                  </div>
                  <div>
                    <strong>End: @accessibilityEndTime</strong>
                  </div>
                  <div>
                    <strong>Execution Time: @accessibilityExecutionTime</strong>
                  </div>
                </div>
              </div>
              <div id="accessibilityHistory" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px; display: none;">
                <div id="accessibilityChartContainer" style="height: 200px; width: 96%;"></div>
              </div>
            </div>
          </div>
    
          <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
    
          <div class="col-lg-12">
            <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px;">
              <div class="col-lg-12" style="text-align: center; margin: 0px; padding: 0px;">
                <h2>
                  <a href="@complianceTSLintLink">TSLint Report</a>
                </h2>
                <div id="tslintHistoryLink" style="text-align: right;"><a onclick="showTslintHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
                <div id="lastTslintLink" style="text-align: right; display: none;"><a onclick="showLastTslint()" href="javascript: void(0)">Show Latest report</a></div>
              </div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div id="lastTslint" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px;">
                <div class="col-lg-6" style="border-right: 1px black solid; text-align: center;">
                  <canvas style="height: 150px !important; width: 200px !important;" id="tslint"></canvas>
                </div>
                <div class="col-lg-6">
                  <div>
                    <strong>Count: @tslintCount</strong>
                  </div>
                  <div>
                    <strong>Threshold: @tslintThreshold</strong>
                  </div>
                  <br>
                  <div>
                    <strong>Start: @tslintStartTime</strong>
                  </div>
                  <div>
                    <strong>End: @tslintEndTime</strong>
                  </div>
                  <div>
                    <strong>Execution Time: @tslintExecutionTime</strong>
                  </div>
                </div>
              </div>
              <div id="tslintHistory" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px; display: none;">
                <div id="tslintChartContainer" style="height: 200px; width: 96%;"></div>
              </div>
            </div>
            <div class="col-lg-6" style="margin-bottom: 20px;">
              <div class="col-lg-12" style="text-align: center; margin: 0px; padding: 0px;">
                <h2>
                  <a href="@complianceJscpdLink">Code Duplicity Report</a>
                </h2>
                <div id="jscpdHistoryLink" style="text-align: right;"><a onclick="showJscpdHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
                <div id="lastJscpdLink" style="text-align: right; display: none;"><a onclick="showLastJscpd()" href="javascript: void(0)">Show Latest report</a></div>
              </div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div id="lastJscpd" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px;">
                <div class="col-lg-6" style="border-right: 1px black solid; text-align: center;">
                  <canvas style="height: 150px !important; width: 200px !important;" id="jscpd"></canvas>
                </div>
                <div class="col-lg-6">
                  <div>
                    <strong>duplicity(%): @jscpdPercentage</strong>
                  </div>
                  <div>
                    <strong>duplicates: @jscpdDuplicates</strong>
                  </div>
                  <div>
                    <strong>files: @jscpdFiles</strong>
                  </div>
                  <br>
                  <div>
                    <strong>Start: @jscpdStartTime</strong>
                  </div>
                  <div>
                    <strong>End: @jscpdEndTime</strong>
                  </div>
                  <div>
                    <strong>Execution Time: @jscpdExecutionTime</strong>
                  </div>
                </div>
              </div>
              <div id="jscpdHistory" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px; display: none;">
                <div id="jscpdChartContainer" style="height: 200px; width: 96%;"></div>
              </div>
            </div>
          </div>
    
          <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
    
          <div class="col-lg-12">
            <div class="col-lg-12" style="text-align: center;">
              <h2>
                <a href="@complianceUnitTestLink">Unit test coverage</a>
              </h2>
            </div>
            <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
            <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px;">
              <div style="text-align: center;">
                <strong>Test Execution Summary</strong>
              </div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div style="padding-left: 30px;">
                <div>
                  <strong>Total: @unitTestTotal</strong>
                </div>
                <div>
                  <strong>Success: @unitTestSuccess</strong>
                </div>
                <div>
                  <strong>Failed: @unitTestFailed</strong>
                </div>
                <div>
                  <strong>Skipped: @unitTestSkipped</strong>
                </div>
                <div>
                  <strong>Did not execute: @unitTestDNE</strong>
                </div>
              </div>
            </div>
            <div class="col-lg-6" style="margin-bottom: 20px;">
              <div style="text-align: center;">
                <strong>Execution time Details</strong>
              </div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div style="padding-left: 30px;">
                <div>
                  <strong>Start: @unitTestStartTime</strong>
                </div>
                <div>
                  <strong>End: @unitTestEndTime</strong>
                </div>
                <div>
                  <strong>Execution Time: @unitTestExecutionTime</strong>
                </div>
              </div>
            </div>
            <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
            <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px; text-align: center;">
              <h3>Lines: @lineCoverageTitle</h4>
              <div id="lineHistoryLink" style="text-align: right;"><a onclick="showLineHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
              <div id="lastLineLink" style="text-align: right; display: none;"><a onclick="showLastLine()" href="javascript: void(0)">Show Latest report</a></div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div id="lastLine" class="col-lg-12" style="padding: 0px; margin: 0px;">
                <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px; text-align: center;">
                  <canvas style="height: 150px !important; width: 200px !important;" id="lines"></canvas>
                </div>
                <div class="col-lg-6" style="text-align: left;">
                  <div>
                    <strong>Total: @lineCoverageTotal</strong>
                  </div>
                  <div>
                    <strong>Covered: @lineCoverageCovered</strong>
                  </div>
                  <div>
                    <strong>Skipped: @lineCoverageSkipped</strong>
                  </div>
                </div>
              </div>
              <div id="lineHistory" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px; display: none;">
                <div id="lineChartContainer" style="height: 200px; width: 96%;"></div>
              </div>
            </div>
            <div class="col-lg-6" style="margin-bottom: 20px; text-align: center;">
              <h3>Branches: @branchCoverageTitle</h4>
              <div id="branchHistoryLink" style="text-align: right;"><a onclick="showBranchHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
              <div id="lastBranchLink" style="text-align: right; display: none;"><a onclick="showLastBranch()" href="javascript: void(0)">Show Latest report</a></div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div id="lastBranch" class="col-lg-12" style="padding: 0px; margin: 0px;">
                <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px; text-align: center;">
                  <canvas style="height: 150px !important; width: 200px !important;" id="branches"></canvas>
                </div>
                <div class="col-lg-6" style="text-align: left;">
                  <div>
                    <strong>Total: @branchCoverageTotal</strong>
                  </div>
                  <div>
                    <strong>Covered: @branchCoverageCovered</strong>
                  </div>
                  <div>
                    <strong>Skipped: @branchCoverageSkipped</strong>
                  </div>
                </div>
              </div>
              <div id="branchHistory" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px; display: none;">
                <div id="branchChartContainer" style="height: 200px; width: 96%;"></div>
              </div>
            </div>
            <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
            <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px; text-align: center;">
              <h3>Functions: @functionCoverageTitle</h4>
              <div id="functionHistoryLink" style="text-align: right;"><a onclick="showFunctionHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
              <div id="lastFunctionLink" style="text-align: right; display: none;"><a onclick="showLastFunction()" href="javascript: void(0)">Show Latest report</a></div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div id="lastFunction" class="col-lg-12" style="padding: 0px; margin: 0px;">
                <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px; text-align: center;">
                  <canvas style="height: 150px !important; width: 200px !important;" id="functions"></canvas>
                </div>
                <div class="col-lg-6" style="text-align: left;">
                  <div>
                    <strong>Total: @functionCoverageTotal</strong>
                  </div>
                  <div>
                    <strong>Covered: @functionCoverageCovered</strong>
                  </div>
                  <div>
                    <strong>Skipped: @functionCoverageSkipped</strong>
                  </div>
                </div>
              </div>
              <div id="functionHistory" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px; display: none;">
                <div id="functionChartContainer" style="height: 200px; width: 96%;"></div>
              </div>
            </div>
            <div class="col-lg-6" style="margin-bottom: 20px; text-align: center;">
              <h3>Statements: @statementCoverageTitle</h4>
              <div id="statementHistoryLink" style="text-align: right;"><a onclick="showStatementHistoricalData()" href="javascript: void(0)">Show historical data</a></div>
              <div id="lastStatementLink" style="text-align: right; display: none;"><a onclick="showLastStatement()" href="javascript: void(0)">Show Latest report</a></div>
              <hr style="border-bottom: 1px black solid; clear:both; display:block; width: 96%; height: 1px;">
              <div id="lastStatement" class="col-lg-12" style="padding: 0px; margin: 0px;">
                <div class="col-lg-6" style="border-right: 1px black solid; margin-bottom: 20px; text-align: center;">
                  <canvas style="height: 150px !important; width: 200px !important;" id="statements"></canvas>
                </div>
                <div class="col-lg-6" style="text-align: left;">
                  <div>
                    <strong>Total: @statementCoverageTotal</strong>
                  </div>
                  <div>
                    <strong>Covered: @statementCoverageCovered</strong>
                  </div>
                  <div>
                    <strong>Skipped: @statementCoverageSkipped</strong>
                  </div>
                </div>
              </div>
              <div id="statementHistory" class="col-lg-12" style="margin: 0px; padding: 0px; margin-bottom: 20px; display: none;">
                <div id="statementChartContainer" style="height: 200px; width: 96%;"></div>
              </div>
            </div>
    
          </div>
    
        </div>
      </div>
    </body>
    
    <script>
      var opts = {
        lines: 12, // The number of lines to draw
        angle: -0.2, // The span of the gauge arc
        lineWidth: 0.15, // The line thickness
        pointer: {
          length: 0.7, // The radius of the inner circle
          strokeWidth: 0.025, // The thickness
          color: '#000000' // Fill color
        },
        radiusScale: 1,
        radius: 1,
        limitMax: false, // If true, the pointer will not go past the end of the gauge
        colorStart: '#6F6EA0', // Colors
        colorStop: '#ff0000', // just experiment with them
        strokeColor: '#EEEEEE', // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,
        percentColors: [
          [0.0, "#8B0000"],
          [0.1, "#ff0000"],
          [0.2, "#ff4500"],
          [0.4, "#ffa500"],
          [0.6, "#ADFF2F"],
          [0.8, "#00ff00"],
          [1.0, "#006400"]
        ],
        staticLabels: {
          font: "10px sans-serif", // Specifies font
          labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // Print labels at these values
          fractionDigits: 0.5 // Optional: Numerical precision. 0=round off.
        },
        staticZones: [
          {
            strokeStyle: "#8B0000",
            min: 0,
            max: 10
          },
          {
            strokeStyle: "#ff0000",
            min: 10,
            max: 20
          },
          {
            strokeStyle: "#ff4500",
            min: 20,
            max: 40
          },
          {
            strokeStyle: "#ffa500",
            min: 40,
            max: 60
          },
          {
            strokeStyle: "#ADFF2F",
            min: 60,
            max: 80
          },
          {
            strokeStyle: "#00ff00",
            min: 80,
            max: 90
          },
          {
            strokeStyle: "#006400",
            min: 90,
            max: 100
          }
        ]
      };
    
      var buildReport = new Gauge(document.getElementById('build')).setOptions(opts);
      buildReport.maxValue = 100;
      buildReport.setMinValue(0);
      buildReport.animationSpeed = 100; // set animation speed (32 is default value)
      buildReport.set(@buildCoverage);
    
      var accessibilityReport = new Gauge(document.getElementById('accessibility')).setOptions(opts);
      accessibilityReport.maxValue = 100;
      accessibilityReport.setMinValue(0);
      accessibilityReport.animationSpeed = 100; // set animation speed (32 is default value)
      accessibilityReport.set(@accessibilityCoverage);
  
      var tslintReport = new Gauge(document.getElementById('tslint')).setOptions(opts);
      tslintReport.maxValue = 100;
      tslintReport.setMinValue(0);
      tslintReport.animationSpeed = 100; // set animation speed (32 is default value)
      tslintReport.set(@tslintCoverage);
    
      var jscpdReport = new Gauge(document.getElementById('jscpd')).setOptions(opts);
      jscpdReport.maxValue = 100;
      jscpdReport.setMinValue(0);
      jscpdReport.animationSpeed = 100; // set animation speed (32 is default value)
      jscpdReport.set(@jscpdCoverage);
  
      var lineCoverage = new Gauge(document.getElementById('lines')).setOptions(opts);
      lineCoverage.maxValue = 100;
      lineCoverage.setMinValue(0);
      lineCoverage.animationSpeed = 100; // set animation speed (32 is default value)
      lineCoverage.set(@lineCoverage);
    
      var branchCoverage = new Gauge(document.getElementById('branches')).setOptions(opts);
      branchCoverage.maxValue = 100;
      branchCoverage.setMinValue(0);
      branchCoverage.animationSpeed = 100; // set animation speed (32 is default value)
      branchCoverage.set(@branchCoverage);
    
      var functionCoverage = new Gauge(document.getElementById('functions')).setOptions(opts);
      functionCoverage.maxValue = 100;
      functionCoverage.setMinValue(0);
      functionCoverage.animationSpeed = 100; // set animation speed (32 is default value)
      functionCoverage.set(@functionCoverage);
    
      var statementCoverage = new Gauge(document.getElementById('statements')).setOptions(opts);
      statementCoverage.maxValue = 100;
      statementCoverage.setMinValue(0);
      statementCoverage.animationSpeed = 100; // set animation speed (32 is default value)
      statementCoverage.set(@statementCoverage);
    
    </script>
  
    <script>
  
      var buildChartContainer = new CanvasJS.Chart("buildChartContainer", @buildChartContainer);
      buildChartContainer.render();
  
      var accessibilityChartContainer = new CanvasJS.Chart("accessibilityChartContainer", @accessibilityChartContainer);
      accessibilityChartContainer.render();
  
      var tslintChartContainer = new CanvasJS.Chart("tslintChartContainer", @tslintChartContainer);
      tslintChartContainer.render();
  
      var jscpdChartContainer = new CanvasJS.Chart("jscpdChartContainer", @jscpdChartContainer);
      jscpdChartContainer.render();
  
      var lineChartContainer = new CanvasJS.Chart("lineChartContainer", @lineChartContainer);
      lineChartContainer.render();
  
      var branchChartContainer = new CanvasJS.Chart("branchChartContainer", @branchChartContainer);
      branchChartContainer.render();
  
      var functionChartContainer = new CanvasJS.Chart("functionChartContainer", @functionChartContainer);
      functionChartContainer.render();
  
      var statementChartContainer = new CanvasJS.Chart("statementChartContainer", @statementChartContainer);
      statementChartContainer.render();
  
    </script>

<script>
    function showBuildHistoricalData() {
      document.getElementById('lastBuild').style.display = 'none';
      document.getElementById('buildHistoryLink').style.display = 'none';
      document.getElementById('buildHistory').style.display = 'block';
      document.getElementById('lastBuildLink').style.display = 'block';
    }

    function showLastBuild() {
      document.getElementById('lastBuild').style.display = 'block';
      document.getElementById('buildHistoryLink').style.display = 'block';
      document.getElementById('buildHistory').style.display = 'none';
      document.getElementById('lastBuildLink').style.display = 'none';
    }

    function showAccessibilityHistoricalData() {
      document.getElementById('lastAccessibility').style.display = 'none';
      document.getElementById('accessibilityHistoryLink').style.display = 'none';
      document.getElementById('accessibilityHistory').style.display = 'block';
      document.getElementById('lastAccessibilityLink').style.display = 'block';
    }

    function showLastAccessibility() {
      document.getElementById('lastAccessibility').style.display = 'block';
      document.getElementById('accessibilityHistoryLink').style.display = 'block';
      document.getElementById('accessibilityHistory').style.display = 'none';
      document.getElementById('lastAccessibilityLink').style.display = 'none';
    }

    function showTslintHistoricalData() {
      document.getElementById('lastTslint').style.display = 'none';
      document.getElementById('tslintHistoryLink').style.display = 'none';
      document.getElementById('tslintHistory').style.display = 'block';
      document.getElementById('lastTslintLink').style.display = 'block';
    }

    function showLastTslint() {
      document.getElementById('lastTslint').style.display = 'block';
      document.getElementById('tslintHistoryLink').style.display = 'block';
      document.getElementById('tslintHistory').style.display = 'none';
      document.getElementById('lastTslintLink').style.display = 'none';
    }

    function showJscpdHistoricalData() {
      document.getElementById('lastJscpd').style.display = 'none';
      document.getElementById('jscpdHistoryLink').style.display = 'none';
      document.getElementById('jscpdHistory').style.display = 'block';
      document.getElementById('lastJscpdLink').style.display = 'block';
    }

    function showLastJscpd() {
      document.getElementById('lastJscpd').style.display = 'block';
      document.getElementById('jscpdHistoryLink').style.display = 'block';
      document.getElementById('jscpdHistory').style.display = 'none';
      document.getElementById('lastJscpdLink').style.display = 'none';
    }

    function showLineHistoricalData() {
      document.getElementById('lastLine').style.display = 'none';
      document.getElementById('lineHistoryLink').style.display = 'none';
      document.getElementById('lineHistory').style.display = 'block';
      document.getElementById('lastLineLink').style.display = 'block';
    }

    function showLastLine() {
      document.getElementById('lastLine').style.display = 'block';
      document.getElementById('lineHistoryLink').style.display = 'block';
      document.getElementById('lineHistory').style.display = 'none';
      document.getElementById('lastLineLink').style.display = 'none';
    }

    function showBranchHistoricalData() {
      document.getElementById('lastBranch').style.display = 'none';
      document.getElementById('branchHistoryLink').style.display = 'none';
      document.getElementById('branchHistory').style.display = 'block';
      document.getElementById('lastBranchLink').style.display = 'block';
    }

    function showLastBranch() {
      document.getElementById('lastBranch').style.display = 'block';
      document.getElementById('branchHistoryLink').style.display = 'block';
      document.getElementById('branchHistory').style.display = 'none';
      document.getElementById('lastBranchLink').style.display = 'none';
    }

    function showFunctionHistoricalData() {
      document.getElementById('lastFunction').style.display = 'none';
      document.getElementById('functionHistoryLink').style.display = 'none';
      document.getElementById('functionHistory').style.display = 'block';
      document.getElementById('lastFunctionLink').style.display = 'block';
    }

    function showLastFunction() {
      document.getElementById('lastFunction').style.display = 'block';
      document.getElementById('functionHistoryLink').style.display = 'block';
      document.getElementById('functionHistory').style.display = 'none';
      document.getElementById('lastFunctionLink').style.display = 'none';
    }

    function showStatementHistoricalData() {
      document.getElementById('lastStatement').style.display = 'none';
      document.getElementById('statementHistoryLink').style.display = 'none';
      document.getElementById('statementHistory').style.display = 'block';
      document.getElementById('lastStatementLink').style.display = 'block';
    }

    function showLastStatement() {
      document.getElementById('lastStatement').style.display = 'block';
      document.getElementById('statementHistoryLink').style.display = 'block';
      document.getElementById('statementHistory').style.display = 'none';
      document.getElementById('lastStatementLink').style.display = 'none';
    }

    function showAllHistoricalData() {
      document.getElementById('allHistoryLink').style.display = 'none';
      document.getElementById('lastAllLink').style.display = 'block';
      showBuildHistoricalData();
      showAccessibilityHistoricalData();
      showTslintHistoricalData();
      showJscpdHistoricalData();
      showLineHistoricalData();
      showBranchHistoricalData();
      showFunctionHistoricalData();
      showStatementHistoricalData();
    }

    function showLastAll() {
      document.getElementById('allHistoryLink').style.display = 'block';
      document.getElementById('lastAllLink').style.display = 'none';
      showLastBuild();
      showLastAccessibility();
      showLastTslint();
      showLastJscpd();
      showLastLine();
      showLastBranch();
      showLastFunction();
      showLastStatement();
    }

  </script>
    
  </html>
`;

})();
