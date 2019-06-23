
import 'jest-preset-angular';
import './jest-global-mocks';

global['CSS'] = null;

// tslint:disable-next-line:no-global-variables
Object.defineProperty(document.body.style, 'transform', {
  value: (): any => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
