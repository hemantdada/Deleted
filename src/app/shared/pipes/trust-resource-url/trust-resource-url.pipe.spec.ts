
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TrustResourceURLPipe } from './trust-resource-url.pipe';

describe('shared > pipes', () => {
  describe('TrustResourceURLPipe', () => {

    @Component({
      selector: 'app-test',
      template: '<iframe id="testTemplate1" [src]="mockTemplate | trustResourceURL"><iframe>'
    })
    class TestComponent {
      public mockUrl: string = 'assets/mock/test-resource.html';
    }

    let fixture: ComponentFixture<TestComponent>;
    let testElement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TrustResourceURLPipe, TestComponent],
        providers: [TrustResourceURLPipe],
      });
      fixture = TestBed.createComponent(TestComponent);
    });

    it('should trust the given resource url and convert it to SafeResourceUrl', () => {

      fixture.detectChanges();
      testElement = fixture.debugElement.query(By.css('#testTemplate1'));

      expect(testElement.nativeElement.contentWindow.document.body)
        .toBeDefined();

    });

  });
});
