// Used as initial and logged in user
const userA = {
  password: 'pw12345',
  name: 'initial',
  username: 'initial',
};

const testBlogA = {
  title: 'This is a new blog by A',
  author: 'Test author',
  url: 'http://www.mooc.fi',
};

const userB = {
  password: 'pw12345',
  name: 'User B',
  username: 'userB',
};

const testBlogB = {
  title: 'This is a new blog B',
  author: 'Test author',
  url: 'http://www.mooc.fi',
};

const testBlogC = {
  title: 'This is a new blog C',
  author: 'Test author',
  url: 'http://www.mooc.fi',
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB(userA);
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(userA.name);
      cy.get('#password').type(userA.password);
      cy.get('#login-button').click();

      cy.get('.success').should('contain', `user ${userA.name} logged in`).and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type(userA.name);
      cy.get('#password').type('invalidPassword12345');
      cy.get('#login-button').click();

      cy.get('.error').should('contain', 'wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: userA.username, password: userA.password });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type(testBlogA.title);
      cy.get('#author').type(testBlogA.author);
      cy.get('#url').type(testBlogA.url);
      cy.get('#create-blog-button').click();

      cy.contains(`${testBlogA.title} ${testBlogA.author}`);
      cy.get('.blog-view-button').contains('view');
    });

    describe('and blog exists', function () {
      beforeEach(function () {
        cy.createBlog(testBlogA);
      });

      it('it can be liked', function () {
        cy.get('.blog-view-button').click();
        cy.get('.blog-like-button').click();
        cy.get('.likes').contains('1');
        cy.get('.blog-like-button').click();
        cy.get('.likes').contains('2');
      });

      it('it can be removed by a user who created it', function () {
        cy.get('.blog-view-button').click();
        cy.get('.blog-remove-button').click();

        cy.contains(`${testBlogA.title} ${testBlogA.author}`).should('not.exist');
        cy.contains('view').should('not.exist');
      });

      it("it can' be removed by a user who didn't create it", function () {
        // Create blog with another user
        cy.createBlogWithAnotherUser(userB, testBlogB);
        cy.reload();

        // Blog can be viewed
        cy.get('#1').find('.blog-view-button').click();

        // Blog can be liked
        cy.get('.blog-like-button').click();
        cy.get('.likes').contains('1').click();

        // But it can't be removed
        cy.contains('.blog-remove-button').should('not.exist');
      });
    });

    describe('When multiple blogs exist', function () {
      it('One with the most likes is placed first on the list', function () {
        cy.createAndAddLikesForBlog(testBlogA, 1);
        cy.createAndAddLikesForBlog(testBlogB, 3);
        cy.createAndAddLikesForBlog(testBlogC, 5);

        cy.reload();

        cy.get('li').then((items) => {
        expect(items[0]).to.contain.text(`${testBlogC.title}`);
        expect(items[1]).to.contain.text(`${testBlogB.title}`);
        expect(items[2]).to.contain.text(`${testBlogA.title}`);
        });
      });
    });
  });
});
