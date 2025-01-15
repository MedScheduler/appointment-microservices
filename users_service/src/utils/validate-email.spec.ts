import { validateEmail } from './validate-email';

describe('[Utils] - validate email', () => {
  it('should return true if email is valid', () => {
    expect(validateEmail('valid@email.com')).toBe(true);
  });

  it.each(['aaa', 'invalid@@@email...', '12345', 'invalid@@@email...com'])(
    'should return false if email is invalid',
    (email) => {
      expect(validateEmail(email)).toBe(false);
    },
  );
});
