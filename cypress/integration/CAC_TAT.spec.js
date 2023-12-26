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
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com email com incorreto", () => {
    cy.get("#firstName").type("Cristiano");
    cy.get("#lastName").type("Ferreira");
    cy.get("#email").type("cristiano@email,com");
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quanto preenchido com valor não numerico", () => {
    cy.get("#phone").type("abctdfasf").should("have.value", "");
  });

  it("exibe mensagem de erro quanto o telefone se tornar obrigatório mas não é preenchido", () => {
    cy.get("#firstName").type("Cristiano");
    cy.get("#lastName").type("Ferreira");
    cy.get("#email").type("cristiano@email.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpaos campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Cristiano")
      .should("have.value", "Cristiano")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Ferreira")
      .should("have.value", "Ferreira")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("cristiano@email.com")
      .should("have.value", "cristiano@email.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("21988776655")
      .should("have.value", "21988776655")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("enviar formulário com sucesso usando um comando customizado", () => {
    cy.fillMandotoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("selecionar um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("selecionar um produto (Mentoria) por seu valor (value)", () => {
    const selectValue = "mentoria";

    cy.get("#product").select(selectValue).should("have.value", selectValue);
  });

  it("selecionar um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(($radio) => {
      cy.wrap($radio).check();
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marcar ambos checkboxs, depois desmarcar o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixture', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })       
  })

  it('seleciona um arquivo da pasta fixture', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })       
  })

  it('seleciona um arquivo utililizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      }) 
  })

  it('verifica que a política de privacidade aber em outra aba sema a necessidade de clicar', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  
  it('acessa a página de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target') 
    .click() 

    cy.contains('Talking About Testing').should('be.visible')
  })
});
