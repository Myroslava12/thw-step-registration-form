describe('The Home Page', () => {
  it('Visits the initial project page', () => {
    cy.visit('http://localhost:4200')
    cy.get('a.logo').contains('CompanyTestName').click();
  });
});
