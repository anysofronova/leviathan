describe('Home', () => {
  const rootUrl = '/';

  beforeEach(() => {
    cy.visit(rootUrl);
  });

  after(() => {
    cy.visit(rootUrl);
  });

  describe('Home title', () => {
    it('should be visible', () => {
      cy.contains('Home').should('be.visible');
    });
  });

  describe('Home navigation menu', () => {
    it('should highlight active/current link', () => {
      cy.get('a').contains('Home').should('have.class', 'active');
    });

    it('should navigate to the page via navigation link', () => {
      cy.get('.navigation-menu')
        .children()
        .each(link => cy.request(link.prop('href')));
    });
  });
});
