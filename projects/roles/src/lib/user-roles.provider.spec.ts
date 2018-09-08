import { inject, TestBed } from '@angular/core/testing';

import { UserRolesProvider } from './user-roles.provider';

describe('UserRolesProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRolesProvider]
    });
  });

  it('should be created', inject([UserRolesProvider], (service: UserRolesProvider) => {
    expect(service).toBeTruthy();
  }));
});
