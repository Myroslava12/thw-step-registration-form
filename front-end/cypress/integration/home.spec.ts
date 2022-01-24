describe('app-home', () => {
  it('should redirect to personal-information form', () => {
    cy.visit('/');

    cy.get('a.btn').contains('Registration Form').click();
    cy.url().should('contain', '/personal-information')
  });
});
