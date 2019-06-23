
const mock: Function = (): any => {
  let storage: Object = {};
  return {
    getItem: (key: string): string => key in storage ? storage[key] : null,
    setItem: (key: string, value: string): string => storage[key] = value || '',
    // tslint:disable-next-line:no-dynamic-delete
    removeItem: (key: string): boolean => delete storage[key],
    clear: (): Object => storage = {},
  };
};

const mockMatchMedia: Function = (media: string): {matches: boolean} => {

  if (media === '(max-width : 767px)') {
    return { matches: true };
  } else if (media === '(min-width : 768px) and (max-width : 979px)') {
    return { matches: true };
  } else if (media === '(min-width : 980px)') {
    return { matches: true };
  }
};

const mockConsole: any = {
  log: (data: any): void => { return; },
  error: (data: any): void => { return; },
  warn: (data: any): void => { return; },
  debug: (data: any): void => { return; }
};

Object.defineProperty(window, 'open', { value: (data: any): void => { return; } });
Object.defineProperty(window, 'print', { value: (data: any): void => { return; } });
Object.defineProperty(window, 'console', { value: mockConsole });
Object.defineProperty(window, 'alert', { value: (data: any): void => { return; } });
Object.defineProperty(window, 'scrollTo', { value: (x?: number, y?: number): void => { return; } });
Object.defineProperty(window, 'matchMedia', { value: mockMatchMedia });
Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: (): Array<string> => ['-webkit-appearance']
});
