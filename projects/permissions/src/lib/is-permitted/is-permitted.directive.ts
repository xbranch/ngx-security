import { Directive, ElementRef, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SubjectPermissionsProvider } from '../subject-permissions.provider';

@Directive({selector: '[isPermitted]'})
export class IsPermittedDirective implements OnInit, OnDestroy {

  private permission: string = null;

  private sub: Subscription;
  private embeddedViewRef: EmbeddedViewRef<any> = null;

  @Input()
  set isPermitted(permission: string) {
    this.permission = permission;
    this.updateView();
  }

  constructor(private element: ElementRef, private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef, private subject: SubjectPermissionsProvider) {
  }

  ngOnInit(): void {
    this.sub = this.subject.permissions$.subscribe(() => this.updateView());
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private updateView() {
    if (!this.subject.isPermitted(this.permission)) {
      this.viewContainer.clear();
      this.embeddedViewRef = null;
    } else if (!this.embeddedViewRef) {
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
