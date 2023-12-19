/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verificar o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preencher os campos obrigatórios e envia o formulário", () => {
    const longTest =
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s";

    cy.get("#firstName").type("Cristiano");
    cy.get("#lastName").type("Ferreira");
    cy.get("#email").type("cristiano@email.com");
    cy.get("#open-text-area").type(longTest, { delay: 0 });
    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com email com incorreto", () => {
    cy.get("#firstName").type("Cristiano");
    cy.get("#lastName").type("Ferreira");
    cy.get("#email").type("cristiano@email,com");
    cy.get("#open-text-area").type("teste");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it.only("campo telefone continua vazio quanto preenchido com valor não numerico", () => {
    cy.get("#phone").type("abctdfasf").should("have.value", "");
  });
});
