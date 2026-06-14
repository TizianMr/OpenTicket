import { EnumTransformPipe } from './enum-transform-pipe';

describe('EnumTransformPipe', () => {
  let pipe: EnumTransformPipe;

  beforeEach(() => {
    pipe = new EnumTransformPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform enum value', () => {
    expect(pipe.transform('MY_ENUM_VALUE')).toBe('My enum value');
  });

  it('should return null for null value', () => {
    expect(pipe.transform(null)).toBeNull();
  });
});
