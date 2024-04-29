describe("tic-tac-toe game e2e test", () => {
  it("Game renders correctly", () => {
    cy.visit("http://localhost:3000");
  });

  it("Board renders correctly", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="board"]').as("boardElement"); // using aliases
    cy.get("@boardElement").should("exist");
    cy.get("@boardElement").find("button").should("have.length", 9);
    cy.get("@boardElement").find(".square").should("have.length", 9);
  });

  it("each square renders correctly", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="square"]').as("squareElement");
    cy.get("@squareElement").eq(1).click();
    cy.get("@squareElement").eq(1).should("have.text", "X");
  });

  it("game info renders correctly", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="game-info"]').as("gameInfoElement");
    cy.get("@gameInfoElement")
      .find("li")
      .eq(0)
      .should("have.text", "GO TO SATRT");
  });

  it("player should be able to make moves", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="square"]').as("squareElement");
    cy.get("@squareElement").eq(1).click();
    cy.get("@squareElement").eq(3).click();
    cy.get("@squareElement").eq(6).click();

    cy.get("@squareElement").eq(1).should("have.text", "X");
    cy.get("@squareElement").eq(3).should("have.text", "O");
    cy.get("@squareElement").eq(6).should("have.text", "X");
  });

  it("Next Player is displayed correctly", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="square"]').as("squareElement");
    cy.get("@squareElement").eq(1).click();
    cy.contains("Next Player : O").should("exist");
    cy.get("@squareElement").eq(3).click();
    cy.contains("Next Player : X").should("exist");
    cy.get("@squareElement").eq(6).click();
    cy.contains("Next Player : O").should("exist");
  });

  it("Move History us displayed correctly", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="game-info"]').as("gameInfoElement");
    cy.get('[data-testid="square"]').as("squareElement");

    cy.get("@squareElement").eq(1).click();
    cy.get("@squareElement").eq(3).click();
    cy.get("@squareElement").eq(6).click();

    cy.get("@gameInfoElement").find("li").as("listItems");
    cy.get("@listItems").eq(1).should("have.text", "GO TO MOVE #1");
    cy.get("@listItems").eq(2).should("have.text", "GO TO MOVE #2");
    cy.get("@listItems").eq(3).should("have.text", "GO TO MOVE #3");
  });

  it("Winner is displayed correctly", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="square"]').as("squareElement");
    cy.get("@squareElement").eq(0).click();
    cy.get("@squareElement").eq(3).click();
    cy.get("@squareElement").eq(1).click();
    cy.get("@squareElement").eq(6).click();
    cy.get("@squareElement").eq(2).click();

    cy.contains("Winner:X").should("exist");
  });

  it("Time travel is working correctly", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="square"]').as("squareElement");
    cy.get('[data-testid="game-info"]').as("gameInfoElement");

    cy.get("@squareElement").eq(0).click();
    cy.get("@squareElement").eq(3).click();
    cy.get("@squareElement").eq(1).click();
    cy.get("@squareElement").eq(6).click();

    cy.get("@gameInfoElement").find("li").as("listItems");
    cy.get("@listItems").eq(3).click();

    cy.get("@squareElement").eq(0).should("have.text", "X");
    cy.get("@squareElement").eq(3).should("have.text", "O");
    cy.get("@squareElement").eq(1).should("have.text", "X");
    cy.get("@squareElement").eq(6).should("have.text", "");
  });
});
