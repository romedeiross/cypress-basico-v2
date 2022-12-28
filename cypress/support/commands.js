Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Rô')
    cy.get('#lastName').type('Medeiros')
    cy.get('#email').type('teste@teste.com')
    cy.get('#phone').type('110000-0000')
    cy.get('#open-text-area').type('Testando')
    cy.get('button[type="submit"]').click()
})
