describe('Game Component E2E Test', () => {
  it('Starts game, play for one round and restart, the game play the first round again',  () => {
    cy.visit('http://localhost:5173/');

    //Start game
    cy.get('.panel').contains('Start Game').click();
    cy.wait(2000);

    //Round one
    cy.get('.container-control .control-button.highlight').should('exist');
    cy.wait(2000);
    cy.get('.container-control .control-button.highlight').click();
    cy.wait(4000);

    //Restart game
    cy.get('.panel').contains('Start Game').click();

    //Round one 
    cy.get('.container-control .control-button.highlight').should('exist');
    cy.wait(3000);
    cy.get('.container-control .control-button.highlight').click();
  });
});