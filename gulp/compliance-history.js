(function() {
  "use strict";

  const fs = require("fs");
  const path = require("path");
  const complianceHistorySchema = require("../config/compliance-history-schema");

  const basePath = path.resolve(__dirname, "..");

  let complianceHistory;

  function updateTSLintData(data) {
    if (data.status === "Unsure") {
      complianceHistory.lint.data[0].dataPoints.push({
        y:
          complianceHistory.lint.data[0].dataPoints[
            complianceHistory.lint.data[0].dataPoints.length - 1
          ].y,
        indexLabel: "Failed",
        markerColor: "red",
        markerType: "cross"
      });
      complianceHistory.lint.data[1].dataPoints.push({
        y:
          complianceHistory.lint.data[1].dataPoints[
            complianceHistory.lint.data[1].dataPoints.length - 1
          ].y
      });
    } else {
      complianceHistory.lint.data[0].dataPoints.push({
        y: data.statistics.count
      });
      complianceHistory.lint.data[1].dataPoints.push({
        y: data.executionTime.total
      });
    }
  }

  function updateUnitTestData(data) {
    if (data.status === "Unsure") {
      complianceHistory.test.lines.data[0].dataPoints.push({
        y:
          complianceHistory.test.lines.data[0].dataPoints[
            complianceHistory.test.lines.data[0].dataPoints.length - 1
          ].y,
        indexLabel: "Failed",
        markerColor: "red",
        markerType: "cross"
      });
      complianceHistory.test.lines.data[1].dataPoints.push({
        y:
          complianceHistory.test.lines.data[1].dataPoints[
            complianceHistory.test.lines.data[1].dataPoints.length - 1
          ].y
      });

      complianceHistory.test.branches.data[0].dataPoints.push({
        y:
          complianceHistory.test.branches.data[0].dataPoints[
            complianceHistory.test.branches.data[0].dataPoints.length - 1
          ].y,
        indexLabel: "Failed",
        markerColor: "red",
        markerType: "cross"
      });
      complianceHistory.test.branches.data[1].dataPoints.push({
        y:
          complianceHistory.test.branches.data[1].dataPoints[
            complianceHistory.test.branches.data[1].dataPoints.length - 1
          ].y
      });

      complianceHistory.test.statements.data[0].dataPoints.push({
        y:
          complianceHistory.test.statements.data[0].dataPoints[
            complianceHistory.test.statements.data[0].dataPoints.length - 1
          ].y,
        indexLabel: "Failed",
        markerColor: "red",
        markerType: "cross"
      });
      complianceHistory.test.statements.data[1].dataPoints.push({
        y:
          complianceHistory.test.statements.data[1].dataPoints[
            complianceHistory.test.statements.data[1].dataPoints.length - 1
          ].y
      });

      complianceHistory.test.functions.data[0].dataPoints.push({
        y:
          complianceHistory.test.functions.data[0].dataPoints[
            complianceHistory.test.functions.data[0].dataPoints.length - 1
          ].y,
        indexLabel: "Failed",
        markerColor: "red",
        markerType: "cross"
      });
      complianceHistory.test.functions.data[1].dataPoints.push({
        y:
          complianceHistory.test.functions.data[1].dataPoints[
            complianceHistory.test.functions.data[1].dataPoints.length - 1
          ].y
      });
    } else {
      complianceHistory.test.lines.data[0].dataPoints.push({
        y: data.statistics.coverage.lines.percentage
      });
      complianceHistory.test.lines.data[1].dataPoints.push({
        y: data.executionTime.total
      });

      complianceHistory.test.branches.data[0].dataPoints.push({
        y: data.statistics.coverage.branches.percentage
      });
      complianceHistory.test.branches.data[1].dataPoints.push({
        y: data.executionTime.total
      });

      complianceHistory.test.functions.data[0].dataPoints.push({
        y: data.statistics.coverage.functions.percentage
      });
      complianceHistory.test.functions.data[1].dataPoints.push({
        y: data.executionTime.total
      });

      complianceHistory.test.statements.data[0].dataPoints.push({
        y: data.statistics.coverage.statements.percentage
      });
      complianceHistory.test.statements.data[1].dataPoints.push({
        y: data.executionTime.total
      });
    }
  }

  function updateJSCPDData(data) {
    if (data.status === "Unsure") {
      complianceHistory.jscpd.data[0].dataPoints.push({
        y:
          complianceHistory.jscpd.data[0].dataPoints[
            complianceHistory.jscpd.data[0].dataPoints.length - 1
          ].y,
        indexLabel: "Failed",
        markerColor: "red",
        markerType: "cross"
      });
      complianceHistory.jscpd.data[1].dataPoints.push({
        y:
          complianceHistory.jscpd.data[1].dataPoints[
            complianceHistory.jscpd.data[1].dataPoints.length - 1
          ].y
      });
    } else {
      complianceHistory.jscpd.data[0].dataPoints.push({
        y: parseFloat(data.statistics.percentage)
      });
      complianceHistory.jscpd.data[1].dataPoints.push({
        y: data.executionTime.total
      });
    }
  }

  function updateAccessibilityData(data) {
    if (data.status === "Unsure") {
      complianceHistory.accessibility.data[0].dataPoints.push({
        y:
          complianceHistory.accessibility.data[0].dataPoints[
            complianceHistory.accessibility.data[0].dataPoints.length - 1
          ].y,
        indexLabel: "Failed",
        markerColor: "red",
        markerType: "cross"
      });
      complianceHistory.accessibility.data[1].dataPoints.push({
        y:
          complianceHistory.accessibility.data[1].dataPoints[
            complianceHistory.accessibility.data[1].dataPoints.length - 1
          ].y
      });
    } else {
      complianceHistory.accessibility.data[0].dataPoints.push({
        y: data.statistics.total
      });
      complianceHistory.accessibility.data[1].dataPoints.push({
        y: data.executionTime.total
      });
    }
  }

  function updateBuildData(data) {
    if (data.status === "Unsure") {
      complianceHistory.build.data[0].dataPoints.push({
        y:
          complianceHistory.build.data[0].dataPoints[
            complianceHistory.build.data[0].dataPoints.length - 1
          ].y,
        indexLabel: "Failed",
        markerColor: "red",
        markerType: "cross"
      });
      complianceHistory.build.data[1].dataPoints.push({
        y:
          complianceHistory.build.data[1].dataPoints[
            complianceHistory.build.data[1].dataPoints.length - 1
          ].y
      });
    } else {
      complianceHistory.build.data[0].dataPoints.push({
        y: data.statistics.totalSize
      });
      complianceHistory.build.data[1].dataPoints.push({
        y: data.executionTime.total
      });
    }
  }

  function generateComplianceHistoryConfig(done) {
    fs.readFile(
      path.resolve(basePath, "reports", "compliance", "compliance.json"),
      "utf8",
      (error, data) => {
        if (error) {
          console.error(error);
        } else {
          const complianceData = JSON.parse(data);
          updateTSLintData(complianceData.lint);
          updateUnitTestData(complianceData.test);
          updateJSCPDData(complianceData.jscpd);
          updateAccessibilityData(complianceData.accessibility);
          updateBuildData(complianceData.build);
        }
        fs.writeFile(
          path.resolve(basePath, "compliance-history.json"),
          JSON.stringify(complianceHistory),
          "utf8",
          error => {
            if (error) {
              console.error(error);
            }
            done();
          }
        );
      }
    );
  }

  function updateComplianceHistory(done) {
    if (fs.existsSync(path.resolve(basePath, "compliance-history.json"))) {
      fs.readFile(
        path.resolve(basePath, "compliance-history.json"), "utf8", (error, data) => {
          if (error) {
            console.error(error);
          } else {
            complianceHistory = JSON.parse(data);
            generateComplianceHistoryConfig(done);
          }
        }
      );
    } else {
      complianceHistory = complianceHistorySchema;
      generateComplianceHistoryConfig(done);
    }
  }

  module.exports = updateComplianceHistory;
})();
