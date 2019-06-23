
import { TestBed, inject } from '@angular/core/testing';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { SafeHtml } from '@angular/platform-browser';

describe('shared > pipes', () => {
  describe('SanitizeHtmlPipe', () => {

    let pipe: SanitizeHtmlPipe;
    const mockTemplate: string = '<a href="#" (click)="someFunc">some text</a>';

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SanitizeHtmlPipe],
        providers: [SanitizeHtmlPipe]
      });
    });

    beforeEach(inject([SanitizeHtmlPipe], (sanitizeHtmlPipe: SanitizeHtmlPipe) => {
      pipe = sanitizeHtmlPipe;
    }));

    it('should sanitize the HTML and return the safe HTML', () => {

      spyOn(console, 'log');

      const returnedValue: SafeHtml = pipe.transform(mockTemplate);

      expect(returnedValue).toEqual('<a href="#">some text</a>');

    });

  });
});
