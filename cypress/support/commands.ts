// cypress/support/commands.ts

// Define custom command to wait for text
Cypress.Commands.add('waitForText', (selector: string, text: string, timeout: number = 10000) => {
    cy.get(selector, { timeout }).should('be.visible').then(($element) => {
        cy.wrap($element).invoke('text').should('include', text);
    });
});

// Define custom command to wait until a condition is met
Cypress.Commands.add('waitUntil', (callback: () => Cypress.Chainable<any>, options: { timeout?: number; interval?: number } = {}) => {
    const { timeout = 10000, interval = 1000 } = options;
    const startTime = Date.now();

    function checkCondition(): Cypress.Chainable<any> {
        if (Date.now() - startTime >= timeout) {
            return Cypress.Promise.reject(new Error('Timed out waiting for condition'));
        }

        return Cypress.Promise.resolve(callback())
            .then(result => {
                if (result) {
                    return Cypress.Promise.resolve(); // Resolved successfully
                } else {
                    return Cypress.Promise.delay(interval).then(checkCondition); // Retry after delay
                }
            })
            .catch(() => {
                return Cypress.Promise.delay(interval).then(checkCondition); // Retry after delay on error
            });
    }

    return checkCondition();
});
