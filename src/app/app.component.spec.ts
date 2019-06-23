
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule, RoutingService } from '@myApp/shared';
import { CoreModule } from '@myApp/core';

describe('AppComponent', () => {

  // let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        SharedModule, CoreModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(inject([RoutingService], (routingInject: RoutingService) => {
    routingService = routingInject;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    // component = fixture.componentInstance;
  });

  it('should invoke routingService.monitorRoutes', () => {

    spyOn(routingService, 'monitorRoutes').and.stub();

    fixture.detectChanges();

    expect(routingService.monitorRoutes).toHaveBeenCalled();

  });

});
