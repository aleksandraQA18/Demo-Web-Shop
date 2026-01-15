import { User } from '../models/user.model';

export const user: User = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};
