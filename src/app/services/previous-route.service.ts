import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PreviousRouteService {

  private previousUrl: string | undefined;

  constructor(private router: Router) {
  }

  initialize(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((routesRecognized: RoutesRecognized[]) => {
        const previousRoute = routesRecognized[0];
        this.previousUrl = previousRoute.urlAfterRedirects;
      });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
