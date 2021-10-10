describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB();
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });
});
