
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TrustHtmlPipe } from './trust-html.pipe';


describe('shared > pipes', () => {
  describe('SanitizeHtmlPipe', () => {

    @Component({
      selector: 'app-test',
      template: '<div id="testTemplate1" [innerHTML]="mockTemplate | trustHTML"></div>',
    })
    class TestComponent {
      public mockTemplate: string = '<a href="#">some text</a>';
    }

    let fixture: ComponentFixture<TestComponent>;
    let testElement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TrustHtmlPipe, TestComponent],
        providers: [TrustHtmlPipe],
      });
      fixture = TestBed.createComponent(TestComponent);
    });

    it('should sanitize the HTML and convert to safe HTML', () => {

      fixture.detectChanges();
      testElement = fixture.debugElement.query(By.css('#testTemplate1'));

      expect(testElement.nativeElement.innerHTML).toEqual('<a href="#">some text</a>');

    });

  });
});
