export {}
describe('Visit Website Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the website', () => {
    cy.title().should('include', 'Leviathan')
  })
})
