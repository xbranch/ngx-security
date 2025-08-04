import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SharedModule } from '../shared/shared.module';
import { SecurityRolesModule } from '../../../projects/roles/src/lib/roles.module';
import { SubjectRolesProvider, UpdatableSubjectRolesProvider } from '../../../projects/roles/src/lib/subject-roles.provider';

const hasRoleStructuralDirective = `<p *hasRole="'ROLE_1'">This should see users with ROLE_1</p>`;
const hasAnyRoleStructuralDirective = `<p *hasAnyRole="['ROLE_1','ROLE_2']">This should see users with ROLE_1 or ROLE_2</p>`;
const hasRolesStructuralDirective = `<p *hasRoles="['ROLE_1','ROLE_2']">This should see users with ROLE_1 and ROLE_2</p>`;

const hasRolePipe = `<p *ngIf="'ROLE_1' | hasRole">This should see users with ROLE_1</p>`;
const hasAnyRolePipe = `<p *ngIf="['ROLE_1','ROLE_2'] | hasAnyRole">This should see users with ROLE_1 or ROLE_2</p>`;
const hasRolesPipe = `<p *ngIf="['ROLE_1','ROLE_2'] | hasRoles">This should see users with ROLE_1 and ROLE_2</p>`;

const hasRolePipePoetry = `<p *ngIf="'user' | hasRole:'ROLE_1'">This should see users with ROLE_1</p>`;
const hasAnyRolePipePoetry = `<p *ngIf="'user' | hasAnyRole:['ROLE_1','ROLE_2']">This should see users with ROLE_1 or ROLE_2</p>`;
const hasRolesPipePoetry = `<p *ngIf="'user' | hasRoles:['ROLE_1','ROLE_2']">This should see users with ROLE_1 and ROLE_2</p>`;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  imports: [SharedModule, SecurityRolesModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent {

  rolesCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  roles: string[] = [];
  allRoles: string[] = ['ROLE_1', 'ROLE_2'];

  @ViewChild('rolesInput', {static: true}) rolesInput: ElementRef<HTMLInputElement>;

  hasRoleStructuralDirective = hasRoleStructuralDirective;
  hasAnyRoleStructuralDirective = hasAnyRoleStructuralDirective;
  hasRolesStructuralDirective = hasRolesStructuralDirective;

  hasRolePipe = hasRolePipe;
  hasAnyRolePipe = hasAnyRolePipe;
  hasRolesPipe = hasRolesPipe;

  hasRolePipePoetry = hasRolePipePoetry;
  hasAnyRolePipePoetry = hasAnyRolePipePoetry;
  hasRolesPipePoetry = hasRolesPipePoetry;

  constructor(private subjectRolesProvider: SubjectRolesProvider) {
    this.filteredRoles = this.rolesCtrl.valueChanges.pipe(
      startWith(null as string),
      map((role: string | null) => role ? this.filter(role) : this.allRoles.slice())
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.roles.push(value.trim());
      this.update(this.roles.slice());
    }

    if (input) {
      input.value = '';
    }

    this.rolesCtrl.setValue(null);
  }

  remove(role: string): void {
    const index = this.roles.indexOf(role);

    if (index >= 0) {
      this.roles.splice(index, 1);
      this.update(this.roles.slice());
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.viewValue);
    this.update(this.roles.slice());
    this.rolesInput.nativeElement.value = '';
    this.rolesCtrl.setValue(null);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allRoles.filter(role => role.toLowerCase().indexOf(filterValue) === 0);
  }

  private update(authorities: string[]): void {
    (this.subjectRolesProvider as UpdatableSubjectRolesProvider).update(authorities);
  }
}
