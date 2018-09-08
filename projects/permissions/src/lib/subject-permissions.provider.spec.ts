import { inject, TestBed } from '@angular/core/testing';

import { SubjectPermissionsProvider } from './subject-permissions.provider';

describe('SubjectPermissionsProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectPermissionsProvider]
    });
  });

  it('should be created', inject([SubjectPermissionsProvider], (service: SubjectPermissionsProvider) => {
    expect(service).toBeTruthy();
  }));
});
