export {}
describe('Authentication', () => {
  const firstName = 'firstName'
  const lastName = 'lastName'
  const email = `${Math.random().toString(36).substring(2, 15)}@example.com`
  const password = '12345678'

  beforeEach(() => {
    cy.visit('/')
  })

  it('should open the auth modal when the auth button is clicked', () => {
    cy.get('#auth-btn').click()
    cy.get('.px-6').should('be.visible')
  })

  it('should display an error message when providing incorrect credentials', () => {
    cy.get('#auth-btn').click()
    cy.get('#login-email').type('invalid-email@example.com')
    cy.get('#login-password').type('wrong-password')
    cy.get('#login-btn').click()
    cy.wait(5000)
    cy.get('#toast-warning').should('be.visible')
  })

  it('should allow user to register and login', () => {
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
