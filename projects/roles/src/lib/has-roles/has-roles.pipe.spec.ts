import { HasRolesPipe } from './has-roles.pipe';

describe('IsPermittedPipe', () => {
  it('create an instance', () => {
    const pipe = new HasRolesPipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
