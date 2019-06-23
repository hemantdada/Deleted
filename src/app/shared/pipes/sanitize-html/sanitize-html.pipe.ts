
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe ({ name: 'sanitizeHTML' })
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  public transform(html: string): SafeHtml {
    return this._sanitizer.sanitize(SecurityContext.HTML, html);
  }

}
