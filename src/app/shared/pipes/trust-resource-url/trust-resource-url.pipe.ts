
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'trustResourceURL' })
export class TrustResourceURLPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  public transform(resourceUrlToTrust: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(resourceUrlToTrust);
  }

}
