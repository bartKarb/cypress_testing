describe('Practice', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });
  it('It should login and add products to the cart', () => {
    // Login
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verify login was successful
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');

    // Add products to the cart
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#add-to-cart-sauce-labs-bike-light').click();
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // Navigate to the cart
    cy.get('.shopping_cart_link').click();
    cy.url().should('eq', 'https://www.saucedemo.com/cart.html');

    // Check if products are added
    cy.contains('Sauce Labs Backpack').should('be.visible');
    cy.contains('Sauce Labs Bike Light').should('be.visible');

    // Test Checkout
    cy.get('#checkout').click();
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html');
    cy.get('#first-name').type('first name');
    cy.get('#last-name').type('last name');
    cy.get('#postal-code').type('52-131');
    cy.get('#continue').click();
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html');
    cy.contains('Total: $43.18').should('be.visible');
    cy.get('#finish').click();
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html');
    cy.contains('Thank you for your order!').should('be.visible');
  });
});