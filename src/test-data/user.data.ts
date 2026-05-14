import { USER_EMAIL, USER_PASSWORD } from '@_config/env.config';
import { LoginUser } from '@_src/models/user.model';

export const user: LoginUser = {
  email: USER_EMAIL,
  password: USER_PASSWORD,
};
