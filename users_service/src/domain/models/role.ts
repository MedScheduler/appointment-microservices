import { ClassAttributes } from '../../utils/class-attributes';

export default class Role {
  id: number;
  description: string;

  constructor(attrs: ClassAttributes<Role>) {
    Object.assign(this, attrs);
  }
}
