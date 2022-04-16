// cypress/integration/app.spec.js

describe("PageA", () => {
  it("Should save lines of text and update average word count", () => {
    cy.visit("/PageA");
    cy.get("input").type("Hello there, one two three!");
    // test using the submit button
    cy.get("button[type=submit]").click();
    cy.get("p")
      .invoke("text")
      .then((text) => {
        // avg of one line is just the WC of that one line
        expect(text).to.contain(5);
      });
    // test submitting by hitting enter while focused on input
    cy.get("input").type("Another line").type("{enter}");
    cy.get("p")
      .invoke("text")
      .then((text) => {
        const expectedAvg = Math.round((5 + 2) / 2);
        expect(text).to.contain(expectedAvg);
      });

    //test trying to enter more than 200 chars, input should not
    // allow anything more than 200
    cy.get("input").type(new Array(300).fill("a").join(""));
    cy.get("button[type=submit]").click();
    /* structure of each li is 
    <li> 
      <div>
        <div>[TEXT]</div>
        <div>[TIMESTAMP]</div>
      </div>
    </li>
    */
    cy.get("li")
      .last()
      .find("div")
      .children()
      .first()
      .invoke("text")
      .then((text) => {
        expect(text.length).to.equal(200);
      });
  });
});
