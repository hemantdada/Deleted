# Angular-6-Starter with code quality reports

This is a customized Angular 6 project starter with which includes the following features:
* Hot module Replacement
* Ahead-of-Time Compilation
* Lazy Loading
* Webpack Bundle Analyzer
* TSLint Html report
* Accessibility Html report
* Code Duplicity Html report (with git integration)
* Unit test with Jest as well as Karma
* A custimized integrated dashboard of above mentioned reports

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.0.

## Development server

Run `npm run start` for a dev server(with AoT). Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run hmr` for a dev server(with AoT and HMR). Navigate to `http://localhost:4200/`. Hot Module Reload is the ability of the application to update itself when the source code is changed — without full page reload.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.  
Run `npm run build:prod` to build the project for production(AoT and build optimizer enabled).  

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).  
Run `npm run jest` to execute the unit tests via [Jest](https://github.com/facebook/jest).  


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Code Quality Reports

Run `npm run build:html` to generate a static webpack bundle analyzer report.  
Report location: `reports/build`  

Run `npm run lint:html` to generate a json and html lint report.  
Report location: `reports/tslint-html-report`  
  
Run `npm run jscpd:html` to generate a json and html duplicity report.  
Report location: `reports/code-duplicity`  
  
Run `npm run accessibility:html` to generate a json and html accessibility report.  
Report location: `reports/accessibility`  
  
Run `npm run test` or `npm run jest` to generate unit test coverage report.  
Report location: `reports/coverage` or `reports/jest` 
   
  
Run `npm run compliance` to execute all quality reports and create a dashboard.  
Report Location: `reports/compliance`  
  
## Lazy Loading
The stater contains a sample lazy loaded module with a component showing the compliance script in action.  
Run `npm run start`, navigate to `http://localhost:4200` and click on Lazy loaded in navbar to see it in action.
  
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
