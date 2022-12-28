// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {        
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste  teste teste teste teste teste teste teste teste' 
        cy.get('#firstName').type('Rô')
        cy.get('#lastName').type('Medeiros')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone').type('110000-0000')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    }) 
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Rô')
        cy.get('#lastName').type('Medeiros')
        cy.get('#email').type('teste@teste,com')        
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico for digitado, seu valor continuará vazio.', function() {
        cy.get('#phone')
        .type('abcdefgh')
        .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Rô')
        cy.get('#lastName').type('Medeiros')
        cy.get('#email').type('teste@teste.com') 
        cy.get('#phone-checkbox').click()       
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Rô')
          .should('have.value', 'Rô') 
          .clear()
          .should('have.value', '')

        cy.get('#lastName')
         .type('Medeiros')
         .should('have.value', 'Medeiros') 
         .clear()
         .should('have.value', '')

        cy.get('#email')
         .type('teste@teste.com')
         .should('have.value', 'teste@teste.com') 
         .clear()
         .should('have.value', '')

        cy.get('#phone')
         .type('1234567890')
         .should('have.value', '1234567890') 
         .clear()
         .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube') //Seleção pelo texto
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        const longText = 'mentoria'
        cy.get('#product')
        .select('mentoria') //Seleção pelo value
        .should('have.value', longText)
    })

    it.only('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1) //Seleção pelo índice
        .should('have.value', 'blog')

    })
})       
  
    

