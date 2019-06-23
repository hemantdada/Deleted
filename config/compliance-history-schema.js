(function () {
  'use strict';

  const config = {
    lint: {
      animationEnabled: true,
      backgroundColor: '#fafad2',
      axisY: {
        title: 'count',
        lineColor: 'darkOrchid',
        includeZero: false
      },
      axisY2: {
        title: 'execution time (s)',
        lineColor: 'indigo',
        includeZero: false
      },
      height: 200,
      toolTip: {
        shared: true,
        contentFormatter: 'function (e) { var content = " "; for (var i = 0; i < e.entries.length; i++) { content += "<strong>" + e.entries[i].dataSeries.name + "</strong>" + ": " + e.entries[i].dataPoint.y; content += "<br/>"; } return content; }'
      },
      data: [
        {
          type: "line",
          color: 'darkOrchid',
          name: 'Lint error count',
          dataPoints: [{ y: 0 }],
        },
        {
          type: "line",
          axisYType: "secondary",
          color: 'transparent',
          name: 'execution time (s)',
          dataPoints: [{ y: 0 }],
        }
      ]
    },
    test: {
      lines: {
        animationEnabled: true,
        backgroundColor: '#fafad2',
        axisY: {
          title: 'line coverage',
          lineColor: 'darkOrchid',
          includeZero: false
        },
        axisY2: {
          title: 'execution time (s)',
          lineColor: 'indigo',
          includeZero: false
        },
        height: 200,
        toolTip: {
          shared: true,
          contentFormatter: 'function (e) { var content = " "; for (var i = 0; i < e.entries.length; i++) { content += "<strong>" + e.entries[i].dataSeries.name + "</strong>" + ": " + e.entries[i].dataPoint.y; content += "<br/>"; } return content; }'
        },
        data: [
          {
            type: "line",
            color: 'darkOrchid',
            name: 'line coverage',
            dataPoints: [{ y: 100 }],
          },
          {
            type: "line",
            axisYType: "secondary",
            color: 'transparent',
            name: 'execution time (s)',
            dataPoints: [{ y: 0 }],
          }
        ]
      },
      branches: {
        animationEnabled: true,
        backgroundColor: '#fafad2',
        axisY: {
          title: 'branch coverage',
          lineColor: 'darkOrchid',
          includeZero: false
        },
        axisY2: {
          title: 'execution time (s)',
          lineColor: 'indigo',
          includeZero: false
        },
        height: 200,
        toolTip: {
          shared: true,
          contentFormatter: 'function (e) { var content = " "; for (var i = 0; i < e.entries.length; i++) { content += "<strong>" + e.entries[i].dataSeries.name + "</strong>" + ": " + e.entries[i].dataPoint.y; content += "<br/>"; } return content; }'
        },
        data: [
          {
            type: "line",
            color: 'darkOrchid',
            name: 'branch coverage',
            dataPoints: [{ y: 100 }],
          },
          {
            type: "line",
            axisYType: "secondary",
            color: 'transparent',
            name: 'execution time (s)',
            dataPoints: [{ y: 0 }],
          }
        ]
      },
      functions: {
        animationEnabled: true,
        backgroundColor: '#fafad2',
        axisY: {
          title: 'function coverage',
          lineColor: 'darkOrchid',
          includeZero: false
        },
        axisY2: {
          title: 'execution time (s)',
          lineColor: 'indigo',
          includeZero: false
        },
        height: 200,
        toolTip: {
          shared: true,
          contentFormatter: 'function (e) { var content = " "; for (var i = 0; i < e.entries.length; i++) { content += "<strong>" + e.entries[i].dataSeries.name + "</strong>" + ": " + e.entries[i].dataPoint.y; content += "<br/>"; } return content; }'
        },
        data: [
          {
            type: "line",
            color: 'darkOrchid',
            name: 'function coverage',
            dataPoints: [{ y: 100 }],
          },
          {
            type: "line",
            axisYType: "secondary",
            color: 'transparent',
            name: 'execution time (s)',
            dataPoints: [{ y: 0 }],
          }
        ]
      },
      statements: {
        animationEnabled: true,
        backgroundColor: '#fafad2',
        axisY: {
          title: 'statement coverage',
          lineColor: 'darkOrchid',
          includeZero: false
        },
        axisY2: {
          title: 'execution time (s)',
          lineColor: 'indigo',
          includeZero: false
        },
        height: 200,
        toolTip: {
          shared: true,
          contentFormatter: 'function (e) { var content = " "; for (var i = 0; i < e.entries.length; i++) { content += "<strong>" + e.entries[i].dataSeries.name + "</strong>" + ": " + e.entries[i].dataPoint.y; content += "<br/>"; } return content; }'
        },
        data: [
          {
            type: "line",
            color: 'darkOrchid',
            name: 'statement coverage',
            dataPoints: [{ y: 100 }],
          },
          {
            type: "line",
            axisYType: "secondary",
            color: 'transparent',
            name: 'execution time (s)',
            dataPoints: [{ y: 0 }],
          }
        ]
      }
    },
    jscpd: {
      animationEnabled: true,
      backgroundColor: '#fafad2',
      axisY: {
        title: 'duplicity %',
        lineColor: 'darkOrchid',
        includeZero: false
      },
      axisY2: {
        title: 'execution time (s)',
        lineColor: 'indigo',
        includeZero: false
      },
      height: 200,
      toolTip: {
        shared: true,
        contentFormatter: 'function (e) { var content = " "; for (var i = 0; i < e.entries.length; i++) { content += "<strong>" + e.entries[i].dataSeries.name + "</strong>" + ": " + e.entries[i].dataPoint.y; content += "<br/>"; } return content; }'
      },
      data: [
        {
          type: "line",
          color: 'darkOrchid',
          name: 'code duplicity (%)',
          dataPoints: [{ y: 0 }],
        },
        {
          type: "line",
          axisYType: "secondary",
          color: 'transparent',
          name: 'execution time (s)',
          dataPoints: [{ y: 0 }],
        }
      ]
    },
    accessibility: {
      animationEnabled: true,
      backgroundColor: '#fafad2',
      axisY: {
        title: 'count',
        lineColor: 'darkOrchid',
        includeZero: false
      },
      axisY2: {
        title: 'execution time (s)',
        lineColor: 'indigo',
        includeZero: false
      },
      height: 200,
      toolTip: {
        shared: true,
        contentFormatter: 'function (e) { var content = " "; for (var i = 0; i < e.entries.length; i++) { content += "<strong>" + e.entries[i].dataSeries.name + "</strong>" + ": " + e.entries[i].dataPoint.y; content += "<br/>"; } return content; }'
      },
      data: [
        {
          type: "line",
          color: 'darkOrchid',
          name: 'accessibility error count',
          dataPoints: [{ y: 0 }],
        },
        {
          type: "line",
          axisYType: "secondary",
          color: 'transparent',
          name: 'execution time (s)',
          dataPoints: [{ y: 0 }],
        }
      ]
    },
    build: {
      animationEnabled: true,
      backgroundColor: '#fafad2',
      axisY: {
        title: 'build size',
        lineColor: 'darkOrchid',
        includeZero: false
      },
      axisY2: {
        title: 'execution time (s)',
        lineColor: 'indigo',
        includeZero: false
      },
      height: 200,
      toolTip: {
        shared: true,
        contentFormatter: 'function (e) { var content = " "; for (var i = 0; i < e.entries.length; i++) { content += "<strong>" + e.entries[i].dataSeries.name + "</strong>" + ": " + e.entries[i].dataPoint.y; content += "<br/>"; } return content; }'
      },
      data: [
        {
          type: "line",
          color: 'darkOrchid',
          name: 'build size (mb)',
          dataPoints: [{ y: 1 }],
        },
        {
          type: "line",
          axisYType: "secondary",
          color: 'transparent',
          name: 'execution time (s)',
          dataPoints: [{ y: 0 }],
        }
      ]
    }
  };

  module.exports = config;

}());