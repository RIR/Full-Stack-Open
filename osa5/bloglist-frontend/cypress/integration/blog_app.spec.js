const initialUser = {
  password: 'pw12345',
  name: 'initial',
  username: 'initial',
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB(initialUser);
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(initialUser.name)
      cy.get('#password').type(initialUser.password)
      cy.get('#login-button').click()

      cy.get('.success')
        .should('contain', `user ${initialUser.name} logged in`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(initialUser.name)
      cy.get('#password').type("invalidPassword12345")
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })
});