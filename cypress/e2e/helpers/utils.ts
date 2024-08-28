// cypress/support/utils.ts
import URLS from './env';
import { RobotEyes, RobotHands, Dependencies } from '../robot/robotFunctions';
import {
  USERNAME_INPUT,
  PASSWORD_INPUT,
  LOGIN_BUTTON,
  ms
}
  from './loginSelectors';
import { credentials } from './env';

import {
  DIRECTORY_CONTAINER,
  DIRECTORY_CARD_HEADER
}
  from './addEmployeeSelectors';
import { expect } from 'chai';

const dependencies = new Dependencies();
const robotEyes = new RobotEyes();
const robotHands = new RobotHands();

// Utility function to visit the login page
export const visitLoginPage = (): void => {
  cy.visit(URLS.BASE_URL);
};

// Utility function to take a screenshot
export const takeScreenshot = (name: string): void => {
  cy.screenshot(name);
};

// Utility function to verify a field's placeholder
export const verifyField = (selector: string, placeholder: string): void => {
  cy.get(selector)
    .should('be.visible')
    .and('have.attr', 'placeholder', placeholder);
};

export const logout = () => {
  // Click on the user dropdown to reveal the options
  cy.get('.oxd-userdropdown-tab').click();

  // Click on the "Logout" option in the dropdown menu
  cy.get('.oxd-dropdown-menu')
    .contains('Logout')
    .click();
};

export const loginAndVerifyByIndex = (index: number) => {
  const { username, password, expected } = credentials[index];

  if (index === 2) {
    // Handle empty fields case
    robotHands.clearText(USERNAME_INPUT)
      .clearText(PASSWORD_INPUT)
      .clickButton(LOGIN_BUTTON)
      .wait(ms);
    robotEyes.verifyEmptyErrorMessage(expected);
    takeScreenshot('login-empty-fields');
  } else {
    // Handle other cases
    robotHands.clearAndEnterText(USERNAME_INPUT, username)
      .clearAndEnterText(PASSWORD_INPUT, password)
      .clickButton(LOGIN_BUTTON)
      .wait(ms);

    if (expected === 'Dashboard') {
      robotEyes.verifyDashboard(expected);
    } else {
      robotEyes.verifyErrorMessage(expected);
    }
  }
};




export const verifyEmployeeInDirectory = (firstName: string, lastName: string) => {
  let employeeFound = false;

  cy.get(DIRECTORY_CONTAINER).within(() => {
    cy.contains(DIRECTORY_CARD_HEADER, `${firstName} ${lastName}`)
      .should('be.visible')
      .then(() => {
        employeeFound = true;
        cy.log(`Found a card with name: ${firstName} ${lastName}`);
      });
  }).then(() => {
    if (!employeeFound) {
      takeScreenshot('employee-not-found');
    }
    expect(employeeFound, 'Employee record Present in the directory').to.be.true;
  });
};