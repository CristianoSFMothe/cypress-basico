/// <reference types="Cypress" />
describe('testar a página de privasidade', () => {
  it('testa a página de política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })
})