import { random } from 'lodash'

describe('Authentication', () => {
  const firstName = 'John'
  const lastName = 'Doe'

  beforeEach(() => {
    cy.visit('/')
  })

  it('opens the authentication modal when the auth button is clicked', () => {
    cy.get('#auth-btn').click()
    cy.get('.px-6').should('be.visible')
  })

  it('returns a 404 response status code for invalid credentials', () => {
    const email = 'invalid-email@example.com'
    const password = 'wrong-password'

    cy.intercept('POST', `${Cypress.env('API_URL')}/auth/signin`, req => {
      expect(req.body).to.deep.equal({ email, password })
      req.reply(res => {
        expect(res.statusCode).to.equal(404)
      })
    })

    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/auth/signin`,
      body: { email, password },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
    })
  })

  it('displays an error message when incorrect credentials are provided', () => {
    cy.get('#auth-btn').click()
    cy.get('#login-email').type('invalid-email@example.com')
    cy.get('#login-password').type('wrong-password')
    cy.get('#login-btn').click()

    cy.wait(5000)

    cy.get('#toast-warning').should('be.visible')
  })

  it('returns a 201 response status code when login or register', () => {
    const email = `${random(1e9)}@example.com`
    const password = '12345678'
    cy.intercept('POST', `${Cypress.env('API_URL')}/auth/signup`, req => {
      expect(req.body).to.deep.equal({ firstName, lastName, email, password })
      req.reply(res => {
        expect(res.statusCode).to.be.oneOf([200, 201])
      })
    })

    cy.intercept('POST', `${Cypress.env('API_URL')}/auth/signin`, req => {
      expect(req.body).to.deep.equal({ email, password })
      req.reply(res => {
        expect(res.statusCode).to.be.oneOf([200, 201])
      })
    })

    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/auth/signup`,
      body: { firstName, lastName, email, password },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.be.oneOf([200, 201])
    })

    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/auth/signin`,
      body: { email, password },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.be.oneOf([200, 201])
    })
  })

  it('shows successful login and registration', () => {
    const email = `${random(1e9)}@example.com`
    const password = '12345678'
    cy.get('#auth-btn').click()
    cy.get('#signup-textbtn').click()
    cy.get('#register-first-name').type(firstName)
    cy.get('#register-last-name').type(lastName)
    cy.get('#register-email').type(email)
    cy.get('#register-password').type(password)
    cy.get('#register-btn').click()

    cy.wait(5000)
    cy.get('#toast-warning').should('not.exist')

    cy.get('#login-textbtn').click()
    cy.get('#login-email').type(email)
    cy.get('#login-password').type(password)
    cy.get('#login-btn').click()

    cy.wait(5000)
    cy.contains('#full-name', `${firstName} ${lastName}`).should('be.visible')
    cy.contains('#user-email', email).should('be.visible')
    cy.get('#logout-btn').should('be.visible')
  })
})
