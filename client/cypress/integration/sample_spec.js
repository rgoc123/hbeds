describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('http://localhost:3000/#/')

    cy.get('#name')
      .type('Roberto')
      .should('have.value', 'Roberto')
  })

  it('Checks for submit error', () => {
    cy.visit('http://localhost:3000/#/')

    cy.contains('Add New Patient').click()
    cy.contains('All fields need to be filled in.')
  })
})
