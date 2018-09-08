import { HasRolePipe } from './has-role.pipe';

describe('HasRolePipe', () => {
  it('create an instance', () => {
    const pipe = new HasRolePipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
