import faker from "faker";

export interface ConsumerProfileData {
  email_address?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  street1?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  password?: string;
}

export const fakeConsumerProfile = (): ConsumerProfileData => {
  return {
    first_name: faker.name.lastName(),
    last_name: faker.name.firstName(),
    phone_number: "310338" + faker.phone.phoneNumber("####"),
    email_address: faker.internet.email(),
    street1: faker.address.streetAddress(),
    postal_code: "90401",
    city: faker.address.city(),
    state: faker.address.state(),
    password: "interview123",
  };
};
