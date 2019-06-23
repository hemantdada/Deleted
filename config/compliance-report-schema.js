(function () {

  "use strict";

  module.exports = {
    lint: {
      status: "Unsure",
      comments: "",
      statistics: {
        count: 0
      },
      executionTime: {
        start: "",
        end: "",
        total: ""
      }
    },
    test: {
      status: "Unsure",
      comments: "",
      statistics: {
        coverage: {
          statements: {
            percentage: 0,
            covered: 0,
            total: 0,
            skipped: 0
          },
          branches: {
            percentage: 0,
            covered: 0,
            total: 0,
            skipped: 0
          },
          functions: {
            percentage: 0,
            covered: 0,
            total: 0,
            skipped: 0
          },
          lines: {
            percentage: 0,
            covered: 0,
            total: 0,
            skipped: 0
          }
        },
        summary: {
          success: 0,
          failed: 0,
          skipped: 0,
          total: 0,
          didNotExecute: 0
        }
      },
      executionTime: {
        start: "",
        end: "",
        total: ""
      }
    },
    jscpd: {
      status: "Unsure",
      comments: "",
      statistics: {
        clones: 0,
        duplications: 0,
        files: 0,
        percentage: 0,
        totalLines: 0
      },
      executionTime: {
        start: "",
        end: "",
        total: ""
      }
    },
    accessibility: {
      status: "Unsure",
      comments: "",
      statistics: {
        total: 0,
        errors: 0,
        warnings: 0,
        notices: 0
      },
      executionTime: {
        start: "",
        end: "",
        total: ""
      }
    },
    build: {
      status: "Unsure",
      comments: "",
      statistics: {
        fileCount: 0,
        totalSize: 0
      },
      executionTime: {
        start: "",
        end: "",
        total: ""
      }
    }
  };
})();
