import { USER_EMAIL, USER_PASSWORD } from '../global-setup';
import { LoginUser } from '../models/user.model';

export const user: LoginUser = {
  email: USER_EMAIL,
  password: USER_PASSWORD,
};
