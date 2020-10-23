import { fakeConsumerProfile } from "../fixtures/user";

const registrationPage = {
  fillOutRegistrationForm() {
    const testProfileData = fakeConsumerProfile();
    cy.get("[data-test='registrationEmailFormEmailInput']").type(
      testProfileData.email_address
    );
    cy.get("[data-test='registrationEmailFormNextButton']").click();
    cy.get("[data-test='registrationCreatePasswordPasswordInput']").type(
      testProfileData.password
    );

    cy.get("[data-test='registrationCreatePasswordConfirmInput']").type(
      testProfileData.password
    );
    cy.get("[data-test='registrationCreatePasswordButton']").click();
    cy.get("[data-test='registrationNameFormInputField']").type(
      testProfileData.first_name + " " + testProfileData.last_name
    );

    cy.get("[data-test='registrationPhoneFormNext']").click();
    cy.get("[data-test='registrationAddressFormAddressField']").type(
      testProfileData.street1
    );
    cy.get("[data-test='registrationAddressFormNextButton']").click();

    return cy.wrap(testProfileData);
  },
};

export default registrationPage;
