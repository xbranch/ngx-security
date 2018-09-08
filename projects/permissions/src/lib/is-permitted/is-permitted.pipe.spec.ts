import { IsPermittedPipe } from './is-permitted.pipe';

describe('IsPermittedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsPermittedPipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
