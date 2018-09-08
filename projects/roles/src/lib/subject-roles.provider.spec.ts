import { inject, TestBed } from '@angular/core/testing';

import { SubjectRolesProvider } from './subject-roles.provider';

describe('SubjectRolesProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectRolesProvider]
    });
  });

  it('should be created', inject([SubjectRolesProvider], (service: SubjectRolesProvider) => {
    expect(service).toBeTruthy();
  }));
});
