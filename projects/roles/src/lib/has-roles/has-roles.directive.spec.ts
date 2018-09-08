import { HasRolesDirective } from './has-roles.directive';

describe('HasRolesDirective', () => {
  it('should create an instance', () => {
    const directive = new HasRolesDirective(null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
