
import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@myApp/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private routingService: RoutingService) { }

  public ngOnInit(): void {
    this.routingService.monitorRoutes();
  }

}
