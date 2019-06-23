
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  /* istanbul ignore next: Only wiring with window methods */
  public location: any = {
    href: (url: string): string => {
      if (url) {
        window.location.href = url;
      } else {
        return window.location.href;
      }
    },
    setpathname: (url: string): string => {
      if (url) {
        window.location.pathname = url;
      } else {
        return window.location.pathname;
      }
    }
  };

  /* istanbul ignore next: Only wiring with window methods */
  public history: any = {
    back: (): void => {
      window.history.back();
    }
  };

}
