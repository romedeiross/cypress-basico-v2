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

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1) //Seleção pelo índice
          .should('have.value', 'blog')
    })

    it('marca cada tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3) // verifica o tamando (quantidade) do radio
          .each(function($radio) { // .aech passa por cada elemento, o .each recebe uma função
            cy.wrap($radio).check() // Essa função recebe como argumento cada um dos elementos ($radio)
            cy.wrap($radio) // cy.wrap empacota po elemento e poder enviar comandos do cypress (ex .check)
              .should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]') //Pega todos os inputs com "type checkbox"
          .check() //da um check em cada type
          .should('be.checked') //verifica que ambos checkbox estão marcados
          .last() // dos types que retornaram o "last" pegar apenas o ultimo
          .uncheck() //desmarca o ultimo type checkbox
          .should('not.be.checked') //Verifica se realmente não está selecionado
        })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Rô')
        cy.get('#lastName').type('Medeiros')
        cy.get('#email').type('teste@teste.com') 
        cy.get('#phone-checkbox').check()       
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
            
        cy.get('.error').should('be.visible')

    })    
    
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload') //Pega o input do tipo "file"
          .should('not.have.value') //Verifica que nã tem nenhum valor
          .selectFile('cypress/fixtures/example.json') //".selectFile" faz upload de arquivos no cypress
          .should(function($input){ //".should" recebeu uma função
            expect($input[0].files[0].name).to.equal('example.json') //"expect" verifica o indice do imput (0)
          })                                                         //Verifica se o "file" indice [0] é igual ao nome do arquivo selecionado
    }) 

    it('seleciona um arquivo simulando um drag-and-drop', function() {
      cy.get('input[type="file"]#file-upload') //Pega o input do tipo "file"
      .should('not.have.value') //Verifica que nã tem nenhum valor
      .selectFile('cypress/fixtures/example.json') //".selectFile" faz upload de arquivos no cypress
      .should(function($input){ //".should" recebeu uma função
        expect($input[0].files[0].name).to.equal('example.json', {action: 'drag-drop'}) /*"action: 'drag-drop'"sinula como se o usuário 
        estivesse arrastando o arquivo de um determinado lugar para sima do campo de carregamento de arquivo*/
      })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture("example.json").as('sampleFile') /*Um alias é um nick/apelido que damos para um determinado 
      comando, representado por ".as", assim fica mais fácil fazer a chamada do mesmo.*/
      cy.get('input[type="file"]#file-upload')
        .selectFile('@sampleFile') // fazer a chamada do alias utilizamos um '@' antes do alias criado e o chamamos no selecFile
        .should(function($input){ //".should" recebeu uma função
          expect($input[0].files[0].name).to.equal('example.json') //"expect" verifica o indice do imput (0)
        })   
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr','target','_blank') //.attr é abreviação de "atributo" em inglês e dentro do attr temos o valor "_blank"
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target') //.invoke invoca o "removeAttr" e taributo "target"
        .click()

      cy.contains('Talking About Testing')
      .should('be.visible')  
    })    
})
       
  
    

