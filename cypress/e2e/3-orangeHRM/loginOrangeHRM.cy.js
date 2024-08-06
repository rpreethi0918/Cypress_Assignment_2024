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
    
        // Check the presence of the username field with placeholder text
        cy.get('input[name="username"]')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Username');
    
        // Check the presence of the password field with placeholder text
        cy.get('input[name="password"]')
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Password');
    
        // Check the presence of the login button with text
        cy.get('.orangehrm-login-button')
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

    it('Login with invalid credentials - Negative', function() {
        const invalidCredentials = this.credentials[1];

        cy.get('input[name="username"]').type(invalidCredentials.username);
        cy.get('input[name="password"]').type(invalidCredentials.password);
        cy.get('.orangehrm-login-button').click();

        // Check for error message or invalid credentials indication
        cy.get('.oxd-alert-content')
          .should('be.visible')
          .and('contain.text', invalidCredentials.expected);
    });

    it('Login with empty fields - Negative', function() {
        const emptyCredentials = this.credentials[2];

        cy.get('input[name="username"]').clear();
        cy.get('input[name="password"]').clear();
        cy.get('.orangehrm-login-button').click();
        
        // Check for error messages indicating empty fields
        cy.get('.oxd-input-field-error-message')
          .should('be.visible')
          .and('contain.text', emptyCredentials.expected);
    });
});
