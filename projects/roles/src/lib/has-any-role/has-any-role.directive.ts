import { Directive, ElementRef, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SubjectRolesProvider } from '../subject-roles.provider';

@Directive({selector: '[hasAnyRole]'})
export class HasAnyRoleDirective implements OnInit, OnDestroy {

  private roles: string[] = null;

  private sub: Subscription;
  private embeddedViewRef: EmbeddedViewRef<any> = null;

  @Input()
  set hasAnyRole(roles: string[]) {
    this.roles = roles;
    this.updateView();
  }

  constructor(private element: ElementRef, private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef, private subject: SubjectRolesProvider) {
  }

  ngOnInit(): void {
    this.sub = this.subject.roles$.subscribe(() => this.updateView());
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private updateView() {
    if (!this.subject.hasAnyRole(this.roles)) {
      this.viewContainer.clear();
      this.embeddedViewRef = null;
    } else if (!this.embeddedViewRef) {
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
