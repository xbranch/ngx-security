import { HasAnyRolePipe } from './has-any-role.pipe';

describe('HasAnyRolePipe', () => {
  it('create an instance', () => {
    const pipe = new HasAnyRolePipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
