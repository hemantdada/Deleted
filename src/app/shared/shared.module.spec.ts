import { SharedModule } from './shared.module';

describe('shared', () => {
  describe('SharedModule', () => {
    let sharedModule: SharedModule;

    beforeEach(() => {
      sharedModule = new SharedModule();
    });

    it('should create an instance', () => {
      expect(sharedModule).toBeTruthy();
    });
  });
});
