import { User } from '../models/user.model';

export const user: User = {
  email: process.env.EMAIL || '[NOT SET]',
  password: process.env.PASSWORD || '[NOT SET]',
};
