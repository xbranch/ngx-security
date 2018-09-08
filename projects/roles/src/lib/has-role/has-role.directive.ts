import { Directive, ElementRef, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserRolesProvider } from '../user-roles.provider';

@Directive({selector: '[hasRole]'})
export class HasRoleDirective implements OnInit, OnDestroy {

  private role: string = null;

  private sub: Subscription;
  private embeddedViewRef: EmbeddedViewRef<any> = null;

  @Input()
  set hasRole(role: string) {
    this.role = role;
    this.updateView();
  }

  constructor(private element: ElementRef, private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef, private user: UserRolesProvider) {
  }

  ngOnInit(): void {
    this.sub = this.user.roles$.subscribe(() => this.updateView());
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private updateView() {
    if (!this.user.hasRole(this.role)) {
      this.viewContainer.clear();
      this.embeddedViewRef = null;
    } else if (!this.embeddedViewRef) {
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
