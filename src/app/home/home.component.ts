import { Component } from '@angular/core';
import { PreviousRouteService } from '../services/previous-route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private _previousRouteService: PreviousRouteService) {
  }

}
