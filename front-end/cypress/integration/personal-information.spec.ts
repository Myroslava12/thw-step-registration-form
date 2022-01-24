describe('PersonalInformationComponent', () => {
  it('Button has correct naming', () => {
    cy.visit('/personal-information');
    cy.get('.btn').should('contain', 'Continue');
  });

  it('Continue button is disabled when inputs is empty', () => {
    cy.get('.btn').should('have.attr', 'disabled');
  });

  it('Should display error message when firstName input and lastName input contains 1 letter long in the same time', () => {
    cy.get('#firstName')
      .type('T')
      .get('#lastName')
      .type('S')
      .get('.form')
      .should('have.class', 'ng-invalid')
  });

  it('Continue input is enabled when inputs is not empty', () => {
    cy.get('.btn')
      .should('have.attr', 'disabled')
      .get('#firstName')
      .type('John')
      .get('#lastName')
      .type('Smith')
      .get('.btn')
      .should('not.have.attr', 'disabled');
  });

  it('Submit form should redirect to Contact Information Form', () => {
    cy.get('.form')
      .submit()
      .url().should('contain', '/contact-information');
  });
});
