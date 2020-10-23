type Url = string;

describe("TrueCar flow", function () {
  it("select a new car and submit a lead", function () {
    const url: Url = "https://www.qa.truecardev.com/";
    const postalCode = "90401";
    const make = "Acura";

    cy.server();
    cy.route("POST", "abp/api/consumers/builds/**").as("builds");

    cy.visit(url);
    cy.get("[data-qa='Home']").should("be.visible");
    cy.get("[data-test='pageIsInteractive']");
    cy.get("[data-qa='Home']").should("be.visible");

    cy.get("[data-test='homepageHeroPanelShopNewButton']").click();
    cy.url().should("include", "/shop/new");
    cy.get("[data-test='modelSearchOptionBrand']").should(
      "have.class",
      "active"
    );
    cy.get("[data-test='modelSearchBrand']").contains(make).click();
    cy.get("[data-test='modelSelectItem']").click();
    cy.get("[data-test='zipCodeTextBox']")
      .should("not.have.value")
      .type("09401");
    cy.get("[data-test='nextButton']").click();
    cy.get("[data-test='vehicleHeaderTruepriceCtaButton]").click();

    registrationPage.fillOutRegistrationForm().as("testProfileData");
    cy.wait("@builds").its("status").should("eq", 200);

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
