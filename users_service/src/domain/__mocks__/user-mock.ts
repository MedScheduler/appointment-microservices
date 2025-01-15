import User from '../models/user';

export const mockedUser: User = new User({
  id: 1,
  name: 'Fulano da Silva',
  email: 'email@example3.com',
  role: {
    id: 1,
    description: 'admin',
  },
});
