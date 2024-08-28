import { BaseEyes, BaseHands, BaseDependencies } from './BaseRobot';
import SELECTORS from '../helpers/loginSelectors';
import URLS from '../helpers/env';


// Extend BaseDependencies to include visitLoginPage method
export class Dependencies extends BaseDependencies {
  visit(path: string) {
    cy.url().should('include', path);
  }
  visitLoginPage() {
    cy.visit(URLS.BASE_URL);
    return this;
  }
}

// Extend BaseHands to include specific methods for interaction
export class RobotHands extends BaseHands {
  selectIfText: any;
    clickAddEmployee: any;
  clickButton(selector: string) {
    cy.get(selector).click();
    return this;
  }
  selectFromDropdown(selector: string, optionText: string) {
    cy.get(selector).click();
    cy.contains(optionText).click();
  }
  enterText(selector: string, text: string) {
    cy.get(selector).type(text);
    return this;
  }

  clickLoginButton() {
    this.clickOnDomElement(SELECTORS.LOGIN_BUTTON);
    return this;
  }

  enterUsername(username: string) {
    this.typeTextOnId(SELECTORS.USERNAME_FIELD, username);
    return this;
  }

  enterPassword(password: string) {
    this.typeTextOnId(SELECTORS.PASSWORD_FIELD, password);
    return this;
  }

  submitLoginForm() {
    this.clickOnDomElement(SELECTORS.LOGIN_BUTTON);
    return this;
  }

  clickOnField(fieldId: string) {
    this.clickOnId(fieldId);
    return this;
  }
  clearAndEnterText(selector: string, text: string) {
    cy.get(selector).clear().type(text);
    return this;
  }

  clearText(selector: string) {
    cy.get(selector).clear();
    return this;
  }

  takeScreenshot(name: string) {
    cy.screenshot(name);
    return this;
  }
}

// Extend BaseEyes to include specific methods for verification
export class RobotEyes extends BaseEyes {
  takeScreenshot: any;
  findButton(selector: string, buttonText: string) {
    cy.get(selector)
      .should('be.visible')
      .and('contain.text', buttonText);
    return this;
  }
  verifyText(selector: string, expectedText: string) {
    cy.get(selector).should('be.visible').and('have.text', expectedText);
  }

  findTextInputBox(selector: string, placeholder: string) {
    cy.get(selector)
        .should('be.visible')
        .and('have.attr', 'placeholder', placeholder)
        .then($el => {
            console.log('Found input box with placeholder:', placeholder);
        });
    return this;
}

  verifyPageTitle(expectedTitle: string) {
    cy.title().should('include', expectedTitle);
    return this;
  }

  verifyUsernameField() {
    this.seesTextWithId(SELECTORS.USERNAME_FIELD, SELECTORS.USERNAME_PLACEHOLDER);
    return this;
  }

  verifyPasswordField() {
    this.seesTextWithId(SELECTORS.PASSWORD_FIELD, SELECTORS.PASSWORD_PLACEHOLDER);
    return this;
  }

  verifyLoginButton() {
    this.seesTextWithId(SELECTORS.LOGIN_BUTTON, SELECTORS.LOGIN_BUTTON_TEXT);
    return this;
  }

  verifyErrorMessage(expectedError: string) {
    this.seesDomContainText(SELECTORS.ERROR_MESSAGE, expectedError);
    return this;
  }

  verifyDashboard(expectedTitle: string) {
    this.seesDomContainText(SELECTORS.DASHBOARD_TEXT, expectedTitle);
    return this;
  }
  verifyEmptyErrorMessage(expectedEmptyError: string) {
    this.seesDomContainText(SELECTORS.EMPTY_FIELD_ERROR, expectedEmptyError);
    return this;
  }
 
}

// Main RobotFunctions class that uses the extended classes
export class RobotFunctions {
  private dependencies: Dependencies;
  private hands: RobotHands;
  private eyes: RobotEyes;

  constructor(private cy: Cypress.Chainable) {
    this.dependencies = new Dependencies();
    this.hands = new RobotHands();
    this.eyes = new RobotEyes();
  }

  visit(url: string) {
    this.dependencies.visit(url);
    return this;
  }

  login(username: string, password: string) {
    this.hands.enterUsername(username);
    this.hands.enterPassword(password);
    this.hands.submitLoginForm();
    return this;
  }

  getElement(selector: string) {
    return cy.get(selector);
  }

  waitForElement(selector: string, timeout: number = 6000) {
    cy.get(selector, { timeout }).should('be.visible');
    return this;
  }

  assertElementHasText(selector: string, text: string) {
    this.eyes.seesDomContainText(selector, text);
    return this;
  }

  addEmployee(firstName: string, lastName: string, empId: string, jobLocation: string) {
    // Implement this method based on your application's needs
    return this;
  }

  verifyEmployeeIsAdded(name: string) {
    // Implement this method based on your application's needs
    return this;
  }

  searchEmployeeInDirectory(firstName: string, lastName: string) {
    // Implement this method based on your application's needs
    return this;
  }

  
}
