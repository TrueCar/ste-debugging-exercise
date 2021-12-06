type Url = string;

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})

describe("TrueCar flow", function () {
  it("select a new car and submit a lead", function () {
    const url: Url = "https://www.qa.truecardev.com/";
    const postalCode = "90401";
    const make = "Acura";

    cy.visit(url);
    cy.get("[data-test='homepage']").should("be.visible");
    cy.get("[data-test='pageIsInteractive']");
    cy.get("[data-test='homepageHeroPanelShopNewButton']").click();
    cy.url().should("include", "/shop/new");
    cy.get("[data-test='modelSearchOptionBrand']").should(
      "have.class",
      "switch-active"
    );
    cy.get("[data-test='modelSearchBrand']").contains(make).click();
    cy.get("[data-test='modelSelectItem']").click();
    cy.get("[data-test='zipCodeTextBox']")
      .should("not.have.value")
      .type("09401");
    cy.get("[data-test='nextButton']").click();
    cy.get("[data-test='defaultBuildCard']").click();
    cy.get("[data-test='pageIsInteractive']");
    cy.get("[data-test='nextCta']").click();

    cy.get("[data-test='bxReviewVehicleImageTablet]").find("[data-test='vehicleHeaderTruepriceCtaButton']", {timeout: 20000}).click();

    registrationPage.fillOutRegistrationForm().as("testProfileData");
    cy.intercept("POST", "abp/api/consumers/builds/**", {statusCode: 200});

    cy.get("[data-test='nextButton']").click();
    cy.get("[data-test='skipUnlockLink']").click();

    cy.url().should("contain", "/dashboard/");

    cy.get("[data-test='newOptionVehicleCard']")
      .first()
      .then((el) => {
        expect(el.text()).to.contain(make);
      });
  });
});
