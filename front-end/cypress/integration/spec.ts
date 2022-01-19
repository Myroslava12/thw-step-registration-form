describe('The Home Page', () => {
  it('Visits the initial project page', () => {
    cy.visit('http://localhost:4200')
    cy.contains('Welcome')
  })
})
