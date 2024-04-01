describe('Game Component E2E Test', () => {
  it('Starts game, waits for flash color, and clicks corresponding button, open modal and play again',  () => {
    cy.visit('http://localhost:5173/');

    //Panel rules
    cy.get('.panel').should('exist')
    cy.get('.rules-section').should('exist')
    cy.wait(1000)

    //Start game
    cy.get('.panel .animated-button').should('exist')
    cy.wait(2000);
    cy.get('.panel .animated-button').click();
    cy.wait(2000);

    //Round one
    cy.get('.container-control .control-button.highlight').should('exist');
    cy.get('.container-control .control-button.highlight').click();

    //Round two
    cy.wait(4000)
    cy.get('.container-control .control-button.highlight').click();

    //Game over
    cy.get('.modal-title').should('exist');
    cy.get('.modal-content').should('exist');
    cy.get('.modal-container').contains('Play Again').should('exist');

    //play again
    cy.wait(3000)
    cy.get('.modal-container .animated-button').click();

  });
});