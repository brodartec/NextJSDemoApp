// cypress/integration/app.spec.js

describe("PageB", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://swapi.dev/api/people?*", {
      fixture: "swPeople.json",
    }).as("getPeople");
  });
  it("Should fetch and render results from SWAPI's people endpoint", () => {
    cy.visit("/PageB");
    // swPeople.json is a response to a query w/ searchTerm = "da"
    cy.get("input").type("da");
    cy.wait(["@getPeople"]);
    cy.fixture("swPeople.json").then((swPeople) => {
      // check each person in the response is rendered into the list
      const names = swPeople.results.map((p) => p.name.toLowerCase());
      cy.get("li")
        .should("have.length", 6)
        .each((result, idx) => {
          cy.wrap(result)
            .invoke("text")
            .then((text) => {
              const _text = text.toLowerCase();
              expect(_text).to.equal(names[idx]);
            });
        });
    });
  });
});
