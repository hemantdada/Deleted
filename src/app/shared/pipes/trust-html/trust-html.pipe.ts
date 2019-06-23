
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'trustHTML' })
export class TrustHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  public transform(htmlToTrust: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(htmlToTrust);
  }

}
