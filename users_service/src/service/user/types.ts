export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
  birthDate?: string;
  role: 'doctor' | 'patient' | 'admin';
};

export type UpdateUserParams = {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  birthDate?: string;
};

export type GetUsersFilters = {
  role: 'doctor' | 'patient' | 'admin';
  ids?: number[];
};
