const initialUser = {
  password: 'pw12345',
  name: 'initial',
  username: 'initial',
};

const testBlog = {
  title: 'This is a new blog',
  author: 'Test author',
  url: 'http://www.mooc.fi',
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB(initialUser);
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(initialUser.name);
      cy.get('#password').type(initialUser.password);
      cy.get('#login-button').click();

      cy.get('.success')
        .should('contain', `user ${initialUser.name} logged in`)
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type(initialUser.name);
      cy.get('#password').type('invalidPassword12345');
      cy.get('#login-button').click();

      cy.get('.error').should('contain', 'wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: initialUser.username, password: initialUser.password });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type(testBlog.title);
      cy.get('#author').type(testBlog.author);
      cy.get('#url').type(testBlog.url);
      cy.get('#create-blog-button').click();

      cy.contains(`${testBlog.title} ${testBlog.author}`);
      cy.get('#view-blog-button').contains('view');
    });
  });
});
