describe('ContactInformationComponent', () => {
  it('Button has correct naming', () => {
    cy.visit('/contact-information');
    cy.get('.contact-link').should('contain', 'Back');
  });

  it('Back link should redirect to Personal Information Form Page', () => {
    cy.get('.contact-link').click();
    cy.url().should('contain', '/personal-information');
  });

  it('Button has correct naming', () => {
    cy.visit('/contact-information');
    cy.get('.form .btn').should('contain', 'Continue');
  });

  it('Form button should be disabled when inputs is empty', () => {
    cy.get('.form .btn').should('have.attr', 'disabled');
  });

  it('PhoneNumber input should be disabled when country input is empty', () => {
    cy.get('#phoneNumber').should('have.attr', 'disabled');
  });

  it('PhoneNumber input should be enabled when country input is not empty', () => {
    cy.get('#country')
      .select('Poland')
      .get('#phoneNumber')
      .should('not.have.attr', 'disabled');
  });

  it('Phone number span should has correct dial_code', () => {
    cy.get('.dial_code').should('contain', '+48');
  });

  it('Phone number input should be invalid when enter incorrect value', () => {
    cy.get('#phoneNumber')
      .type('89789789')
      .blur()
      .should('have.class', 'is-invalid')
  });

  it('Phone number input should be valid', () => {
    cy.get('#phoneNumber')
      .clear()
      .type('777888777')
      .blur()
      .should('not.have.class', 'is-invalid');
  });

  it('Form button should be clicked and open Review Dialog', () => {
    cy.get('.form .btn')
      .click()
      .get('app-review-dialog')
      .should('be.visible', true);
  });

  it('Review Dialog button should be submited and redirect6 to Home page', () => {
    cy.get('app-review-dialog .btn.btn-primary')
      .click()
      .url().should('contain', '/');
  });
});
