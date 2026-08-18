import { BillingAddress, RegisterUser } from '@_src/models/user.model';
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

export function generateBillingAddressData(): BillingAddress {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    company: faker.company.name(),
    country: faker.location.country(),
    state: faker.location.state(),
    city: faker.location.city(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    zip: faker.location.zipCode(),
    phone: faker.phone.number(),
    fax: faker.phone.number(),
  };
}
