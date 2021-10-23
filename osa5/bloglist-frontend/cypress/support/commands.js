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

Cypress.Commands.add('createBlogWithAnotherUser', (user, blog) => {
  const { username, password } = user;

  // Add user
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/users',
    body: { ...user },
  });

  // Log in User
  // cy.login({ username: user.username, password: user.password });
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    // Create a blog with the user
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: blog,
      headers: {
        Authorization: `bearer ${body.token}`,
      },
    });
  });
});

Cypress.Commands.add('createAndAddLikesForBlog', (blog, likes) => {
  // Create...
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`,
    },
  }).then(({ body }) => {
    // and add likes
    cy.request({
      url: `http://localhost:3001/api/blogs/${body.id}`,
      method: 'PUT',
      body: { ...blog, likes },
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`,
      },
    });
  });
});
