describe('Character', () => {
  const rootUrl = '/characters';

  beforeEach(() => {
    cy.visit(rootUrl);
  });

  after(() => {
    cy.visit(rootUrl);
  });

  describe('Character title', () => {
    it('should be visible', () => {
      cy.get('a[href*="characters"i]')
        .not(':last-child')
        .each(link => {
          cy.visit(link.prop('href'));
          cy.get('.character-title').should('be.visible');
        });
    });

    it('should render title with `#id` that matches `/characters/:id`', () => {
      cy.get('a[href*="characters"i]')
        .not(':last-child')
        .each(link => {
          cy.visit(link.prop('href'));
          cy.location('pathname').invoke('split', '/').its(2).as('characterId');

          cy.get('@characterId').then(id => {
            cy.get('.character-title').should('contain', `#${id}`);
          });
        });
    });
  });

  describe('Character description', () => {
    it('should be visible', () => {
      cy.get('a[href*="characters"i]')
        .not(':last-child')
        .each(link => {
          cy.visit(link.prop('href'));
          cy.get('.character-description').should('be.visible');
        });
    });
  });

  describe('Character action buttons', () => {
    it('should be visible', () => {
      cy.get('a[href*="characters"i]')
        .not(':last-child')
        .each(link => {
          cy.visit(link.prop('href'));

          cy.get('.character-delete-btn').should('be.visible');
          cy.get('.character-edit-btn').should('be.visible');
        });
    });

    it('should redirect to the `/characters/edit/:id` when edit button clicked', () => {
      cy.get('a[href*="characters"i]')
        .not(':last-child')
        .each(link => {
          cy.visit(link.prop('href'));

          cy.location('pathname').invoke('split', '/').its(2).as('characterId');
          cy.get('.character-edit-btn').click();

          cy.location('pathname').invoke('split', '/').its(3).as('characterEditId');

          cy.get('@characterEditId').then(characterEditId => {
            cy.get('@characterId').then(characterId => {
              expect(characterId).eq(characterEditId);
            });
          });
        });
    });

    it('should show modal when delete button clicked', () => {
      cy.get('a[href*="characters"i]')
        .not(':last-child')
        .each(link => {
          cy.visit(link.prop('href'));

          cy.get('.character-delete-btn').click();
          cy.get('.chakra-modal__content').should('be.visible');
        });
    });
  });
});
