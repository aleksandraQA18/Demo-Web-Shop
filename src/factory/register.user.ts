import { RegisterUser } from '../models/user.model';
import { faker } from '@faker-js/faker';

export function createRegisterData(): RegisterUser {
  const gender = faker.person.sexType();
  const registerData = {
    gender: gender,
    firstName: faker.person.firstName(gender),
    lastName: faker.person.lastName(gender),
    email: '',
    password: faker.internet.password(),
  };
  registerData.email = faker.internet.email({
    firstName: registerData.firstName,
    lastName: registerData.lastName,
  });
  return registerData;
}
