Cypress.Commands.add('fillMandotoryFieldsAndSubmit', () => {
  cy.get("#firstName").type("Cristiano");
  cy.get("#lastName").type("Ferreira");
  cy.get("#email").type("cristiano@email.com");
  cy.get("#open-text-area").type("teste");
  cy.contains('button', 'Enviar').click();
})


// 875,97