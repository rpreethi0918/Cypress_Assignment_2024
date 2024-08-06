/// <reference types="cypress" />

describe('Validate Login Credentials with Positive and Negative Test case', () => {
    before(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
    });

    beforeEach(() => {
        // Ensure we start from the login page before each test
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.fixture('credentials').as('credentials');
    });

    it('Validate Login Page', () => {    
        cy.title().should('include', 'OrangeHRM');
        // Check the presence of the login title
        cy.get('.orangehrm-login-title')
          .should('be.visible')
          .and('contain.text', 'Login');
    
    });

    it('Validate Login credentials', function() {
        const validCredentials = this.credentials[0];
        
        cy.get('input[name="username"]').type(validCredentials.username);
        cy.get('input[name="password"]').type(validCredentials.password);
        cy.get('.orangehrm-login-button').click();
    
        // Wait for dashboard element or text to be visible
        // Assert that the user is successfully logged in by checking the presence of the Dashboard text
        cy.get('h6')
          .contains(validCredentials.expected, { timeout: 10000 })
          .should('be.visible')
          .then(() => {
            cy.log('User successfully logged in!!');
        });
    });

    


});
