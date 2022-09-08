/// <reference types="Cypress" //>

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function (){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function (){
        const longText = 'ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA,'
        cy.get('#firstName').type('Testador')
        cy.get('#lastName').type('de sites')
        cy.get('#email').type('TESTE@EXEMPLO.COM')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function (){
        //const longText = 'ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA, ESCREVENDO NA CAIXA,'
        cy.get('#firstName').type('Testador')
        cy.get('#lastName').type('de sites')
        cy.get('#email').type('TESTE@EXEMPLO,COM')
        cy.get('#open-text-area').type('ESCREVENDO')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        
    })
    
    it  ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Testador')
        cy.get('#lastName').type('de sites')
        cy.get('#email').type('TESTE@EXEMPLO.COM')
        cy.get('#phone-checkbox').check()//antes era .CLICK, mas na aula 27 foi alterado para .CHECK
        cy.get('#open-text-area').type('ESCREVENDO')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')    
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Testador')
        .should('have.value', 'Testador')
        .clear()//interessante
        .should('have.value', '')
        cy.get('#lastName')
        .type('de sites')
        .should('have.value', 'de sites')
        .clear()//interessante
        .should('have.value', '')
        cy.get('#email')
        .type('TESTE@EXEMPLO.COM')
        .should('have.value', 'TESTE@EXEMPLO.COM')
        .clear()//interessante
        .should('have.value', '')
        cy.get('#phone')
        .type('11111112222233333')        
        .should('have.value', '11111112222233333')
        .clear()//interessante
        .should('have.value', '') 
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')// pode ser 'select' tbm quando se tem apenas um campo de selecionar
        .select('YouTube')//está selecionando pelo seu texto e não pela tag/valor
        .should('have.value', 'youtube')//continua sendo selecionado pelo valor
        //MAS está verificando PELO VALOR
    })

    it('seleciona um produto (Mentoria) pelo seu valor (value)', function(){
        cy.get('#product')// pode ser 'select' tbm quando se tem apenas um campo de selecionar
        .select('mentoria')//está selecionando pelo VALOR
        .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu ÍNDICE', function(){
                                        //É TIPO SELECIONAR PELA POSIÇÃO QUE ELE ESTÁ NA LISTA
    cy.get('#product')// pode ser 'select' tbm quando se tem apenas um campo de selecionar
    .select(1)//está selecionando pela posição que está na lista
    .should('have.value', 'blog')
})

  it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

  it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
            cy.wrap($radio).check() 
            cy.wrap($radio).should('be.checked')  })
        })

  it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo na pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')   })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')   })
          })
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')   })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    

})
