describe('My First Test', () => {
  // it('Adds name input to form state', () => {
  //   cy.visit('http://localhost:3000/#/')
  //
  //   cy.get('#name')
  //     .type('Roberto')
  //     .should('have.value', 'Roberto')
  // })
  //
  // it('Checks for submit error', () => {
  //   cy.visit('http://localhost:3000/#/')
  //
  //   cy.contains('Add New Patient').click()
  //   cy.contains('All fields need to be filled in.')
  // })

  it('Produces submit error when no name input', () => {
    cy.visit('http://localhost:3000/#/')

    cy.get('#gender')
      .select('male')

    cy.contains('Add New Patient').click()
    cy.contains('All fields need to be filled in.')
  })
})
