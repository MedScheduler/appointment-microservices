import User from './user';

describe('[Domain/Models] - user', () => {
  it('should create an instance of user', () => {
    const data = {
      id: 1,
      name: 'Fulano da Silva',
      email: 'email@example3.com',
      role: {
        id: 1,
        description: 'admin',
      },
    };

    const user = new User(data);

    expect(user).toBeTruthy();
    expect(user.name).toBe(data.name);
  });

  it('hide user password in json parse', () => {
    const data = {
      id: 1,
      name: 'Fulano da Silva',
      email: 'email@example3.com',
      password: 'password',
      role: {
        id: 1,
        description: 'admin',
      },
    };

    const user = new User(data);

    expect(JSON.parse(JSON.stringify(user)).password).toBeFalsy();
  });
});
