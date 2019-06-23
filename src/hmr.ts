
import { NgModuleRef, ApplicationRef, ComponentRef } from '@angular/core';
import { createNewHosts, removeNgStyles } from '@angularclass/hmr';

export const hmrBootstrap: Function = (module: any, bootstrap: () => Promise<NgModuleRef<any>>): void => {

  let ngModule: NgModuleRef<any>;
  module.hot.accept();

  bootstrap()
    .then((mod: NgModuleRef<any>): NgModuleRef<any> => ngModule = mod);

  module.hot.dispose((): void => {

    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements: any = appRef.components.map((c: ComponentRef<any>): any => c.location.nativeElement);
    const makeVisible: Function = createNewHosts(elements);

    removeNgStyles();
    ngModule.destroy();

    makeVisible();

  });

};
