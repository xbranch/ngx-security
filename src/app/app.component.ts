import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { version } from './version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterLink,
    MatSidenavContent,
    RouterOutlet,
    AsyncPipe,
    MatIconButton,
    RouterLinkActive,
    MatListItemIcon,
    MatListItemTitle
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  version = version;
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
