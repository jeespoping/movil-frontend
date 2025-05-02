describe("Movil", () => {
  it("can login,list, show, create and delete Moviles", () => {
    cy.visit("/").get(".sixteen > .ui > .item").click();

    cy.get(".form > :nth-child(1) > .ui > input")
      .type("jeespoping@gmail.com")
      .get(".form > :nth-child(2) > .ui > input")
      .type("nik.2000")
      .get(".actions > div > .ui")
      .click();

    // Create Moviles
    cy.get('[href="/crear"] > .item')
      .click()
      .get("[data-cy=input-miniature]")
      .attachFile("test-image.png")
      .get(".form > :nth-child(2) > .ui > input")
      .type("Prueba 1")
      .get(":nth-child(3) > .ui > input")
      .type("prueba-1")
      .get("textarea")
      .type("Pruebas y de mas")
      .get(":nth-child(5) > .ui > input")
      .type("20000")
      .get(":nth-child(6) > .ui > input")
      .type("3")
      .get(".fluid > .search")
      .click()
      .get('[aria-checked="false"]')
      .last()
      .click()
      .get(".button")
      .click()
      .get(":nth-child(1) > .movil-item__info > div > p")
      .contains("Samsung Galaxy Z Fold 4 (2023)")
      .get('[aria-current="false"][type="pageItem"]')
      .last()
      .click()
      .get(".movil-item__info > div > p")
      .last()
      .contains("Prueba 1");

    //delete
    cy.get(".red").last().click().get(".primary").click();
    // Delete
  });
});
