import { LazyLoadModule } from './lazy-load.module';

describe('LazyLoadModule', () => {
  let lazyLoadModule: LazyLoadModule;

  beforeEach(() => {
    lazyLoadModule = new LazyLoadModule();
  });

  it('should create an instance', () => {
    expect(lazyLoadModule).toBeTruthy();
  });
});
