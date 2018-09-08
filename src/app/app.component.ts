import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pageInfo$: Observable<any>;

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    this.pageInfo$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => activatedRoute),
      map(route => route.firstChild || route),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
      map(data => data || {})
    );
  }
}
