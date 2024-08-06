/// <reference types="cypress" />

describe('Quick Login and Navigate to PIM Screen', () => {
    before(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
    });

    it('Quick Login and Navigate to PIM screen', function () {
        // Use fixture for credentials (assuming valid credentials are stored in 'credentials.json')
        cy.fixture('credentials').then((credentials) => {
            cy.get('input[name="username"]').type(credentials[0].username); // Replace with actual index or data
            cy.get('input[name="password"]').type(credentials[0].password); // Replace with actual index or data
            cy.get('.orangehrm-login-button').click();
            // Verify that the main menu is visible
            cy.get('.oxd-main-menu').should('be.visible');
            cy.get('li.oxd-main-menu-item-wrapper')
                .contains('PIM')
                .click();

            // Assert that the PIM screen is successfully loaded
            cy.url().should('contain', '/web/index.php/pim/viewEmployeeList');
            cy.get('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module')
                .should('have.text', 'PIM');
        });
    });

    it('Add Employee Details', () => {
        // Assuming login is successful and PIM screen is loaded from previous test

        // Click on the "Add" button to add a new employee
        cy.contains('button', 'Add')
            .should('be.visible')
            .click();

        cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title')
            .should('be.visible')
            .and('have.text', 'Add Employee');

        // Check that the form is present, with input fields
        cy.get('form.oxd-form')
            .should('be.visible')
            .find('input.oxd-input')
            .should('have.length.greaterThan', 0); 

        // Fill in employee details
        cy.get('input[name="firstName"]').type('Sheldon');
        cy.get('input[name="middleName"]').type('Lee');
        cy.get('input[name="lastName"]').type('Cooper');
        cy.get('input.oxd-input.oxd-input--active')
        .eq(3) // Select the fourth element (index starts at 0)
        .clear()
        .type('0584');
    });
});
