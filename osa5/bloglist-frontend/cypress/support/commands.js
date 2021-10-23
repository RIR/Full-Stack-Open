// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Reset database and add initial user
Cypress.Commands.add('resetDB', (initialUser) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/testing/reset',
  });
  console.log('Database was reset');

  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/users',
    body: { ...initialUser },
  });
  console.log('Initial user was added');

  cy.visit('http://localhost:3000');
});

// Log in user
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

// Create a blog

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`,
    },
  });

  cy.visit('http://localhost:3000');
});
