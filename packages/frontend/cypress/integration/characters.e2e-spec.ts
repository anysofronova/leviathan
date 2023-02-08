describe('Characters', () => {
  const rootUrl = '/characters';

  beforeEach(() => {
    cy.visit(rootUrl);
  });

  after(() => {
    cy.visit(rootUrl);
  });

  describe('Characters title', () => {
    it('should be visible', () => {
      cy.get('.characters-title').should('be.visible');
    });

    it('should display current number of cards', () => {
      cy.get('.character-card').then(cards => {
        cy.contains('Characters:').should('contain.text', cards.length);
      });
    });
  });

  describe('Character card', () => {
    it('should show card caption on hover', () => {
      cy.get('.character-card')
        .first()
        .realHover()
        .then(() => {
          cy.get(':nth-child(1) > .character-card__caption').should('be.visible');
        });
    });

    it('should navigate to the /character/:id page via card link', () => {
      cy.get('a[href*="characters"i]')
        .not(':last-child')
        .each(link => {
          cy.visit(link.prop('href'))
            .location('pathname')
            .should('match', /characters\/\d+/i);
        });
    });

    it('should have visible image', () => {
      cy.get('.character-card__content > .chakra-avatar > .chakra-avatar__img').should(
        'be.visible',
      );
    });

    it('should have visible title', () => {
      cy.get('.character-card__content > .chakra-text').should('be.visible');
    });
  });
});
