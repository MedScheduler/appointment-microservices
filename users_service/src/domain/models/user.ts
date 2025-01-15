import { ClassAttributes } from '../../utils/class-attributes';
import Role from './role';

export default class User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;

  constructor(attrs: ClassAttributes<User>) {
    Object.assign(this, attrs);

    if (!attrs.createdAt) this.createdAt = new Date();
    if (!attrs.updatedAt) this.updatedAt = new Date();
  }

  toJSON() {
    const { id, name, email, role } = this;

    return {
      id,
      name,
      email,
      role,
    };
  }
}
