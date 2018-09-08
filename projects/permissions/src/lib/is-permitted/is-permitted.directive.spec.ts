import { IsPermittedDirective } from './is-permitted.directive';

describe('IsPermittedDirective', () => {
  it('should create an instance', () => {
    const directive = new IsPermittedDirective(null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
