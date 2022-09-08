Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    
    cy.get('#firstName').type('Testador')
    cy.get('#lastName').type('de sites')
    cy.get('#email').type('EMAILDETESTE@EXEMPLO.COM')
    cy.get('#open-text-area').type('teste escrito')
    cy.contains('button', 'Enviar').click()
        
})