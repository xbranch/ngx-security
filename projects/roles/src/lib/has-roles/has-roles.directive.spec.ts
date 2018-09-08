import { HasRolesDirective } from './has-roles.directive';

describe('IsPermittedDirective', () => {
  it('should create an instance', () => {
    const directive = new HasRolesDirective(null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
