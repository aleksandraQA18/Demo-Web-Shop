export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address1: string;
  zip: string;
  phone: string;
}
