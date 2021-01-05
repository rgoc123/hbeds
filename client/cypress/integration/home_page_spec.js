describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.request('/v1/floors')
  })
})
