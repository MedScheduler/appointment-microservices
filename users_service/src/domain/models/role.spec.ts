import Role from './role';

describe('[Domain/Models] - role', () => {
  it('should create an instance of role', () => {
    const data = {
      id: 1,
      description: 'admin',
    };

    const role = new Role(data);

    expect(role).toBeTruthy();
    expect(role.id).toBe(data.id);
    expect(role.description).toBe(data.description);
  });
});
