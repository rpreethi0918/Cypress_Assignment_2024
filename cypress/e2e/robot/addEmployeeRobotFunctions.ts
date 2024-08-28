import { BaseEyes, BaseHands, BaseDependencies } from './BaseRobot';
import SELECTORS from '../helpers/addEmployeeSelectors';
import STATIC_VALUES from '../helpers/addEmployeeSelectors';
import URLS, { PIM_URL_PART } from '../helpers/env';
import {
  PIM_HEADER,
  ADD_BUTTON,
  FORM_SELECTOR,
  FIRSTNAME_INPUT,
  LASTNAME_INPUT,
  EMPLOYEE_ID_INPUT,
  SAVE_BUTTON,
  EMPLOYEE_NAME_HEADER,
  JOB_TAB,
  LOCATION_DROPDOWN,
  EMPLOYEE_LIST_TAB,
  EMPLOYEE_INFORMATION_HEADER,
  SEARCH_INPUT,
  SEARCH_BUTTON,
  RECORD_FOUND_SPAN,
  DIRECTORY_MENU_ITEM,
  DIRECTORY_CARD_HEADER,
  DIRECTORY_CONTAINER,
  LOCATION_DROPDOWN_ICON,
  ms
} from '../helpers/addEmployeeSelectors';
import { Url } from 'url';
import exp from 'constants';
import { firstName,lastName,emp2,jobLocation } from '../data/testData';

// Extend BaseDependencies to include visitLoginPage method
export class Dependencies extends BaseDependencies {
  visit(path: string) {
    cy.url().should('include', path);
  }
  visitLoginPage() {
    this.accessUrl(URLS.BASE_URL);
    return this;
  }
}

// Extend BaseHands to include specific methods for interaction
export class RobotHands extends BaseHands {
  selectIfText: any;

  clickLoginButton() {
    this.clickOnDomElement(SELECTORS.LOGIN_BUTTON);
    return this;
  }

  clickPIM(){
    this.clickOnDomElement(PIM_HEADER);
    return this;
  }

  clickAddEmployee() {
    this.clickOnDomElement(ADD_BUTTON);
    return this;
  }
  clickSave(){
    this.clickOnDomElement(SAVE_BUTTON);
    return this;
  }

  clickJob(){
    this.clickOnDomElement(JOB_TAB);
    return this;
  }
  saveLocation(){
    this.clickOnDomElement(SAVE_BUTTON);
    return this;
  }
  clickEmployeeList(){
    this.clickOnDomElement(EMPLOYEE_LIST_TAB);
    return this;
  }
  clickSearchByName(){
    this.clickOnDomElement(SEARCH_BUTTON);
    return this;
  }
  clickDirectoryTab(){
    this.clickOnDomElement(DIRECTORY_MENU_ITEM);
    return this;
  }
  clickSearchByLocation(){
    this.clickOnDomElement(SEARCH_BUTTON);
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
  typeEmployeeID(selector:string, text:string){
    this.clearAndEnterText(EMPLOYEE_ID_INPUT, emp2);
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

  typeFirstName(selector: string, text:string){
    this.enterText(FIRSTNAME_INPUT, text);
    return this;
  }
  typeLastName(selector: string, text:string){
    this.enterText(LASTNAME_INPUT, text);
    return this;
  }

  selectJobLocationFromDropDown(selector: string, text:string){
    this.selectFromDropdown(selector, text);
    return this;
  }
  searchByFirstName(selector: string, text:string){
    this.enterText(selector, text);
    return this;
  }


}

// Extend BaseEyes to include specific methods for verification
export class RobotEyes extends BaseEyes {
  takeScreenshot: any;

  verifyPageTitle(expectedTitle: string) {
    cy.title().should('include', expectedTitle);
    return this;
  }

  verifyUsernameField(selector: string, text: string) {
    this.seesTextWithId(SELECTORS.USERNAME_FIELD, STATIC_VALUES.USERNAME_PLACEHOLDER);
    return this;
  }
  checkFirstNameField(selector: string, text: string) {
    this.findTextInputBox(FIRSTNAME_INPUT, STATIC_VALUES.FIRSTNAME_PLACEHOLDER);
    return this;
  }

  checkLastNameField(selector: string, text: string) {
    this.findTextInputBox(LASTNAME_INPUT, STATIC_VALUES.LASTNAME_PLACEHOLDER);
    return this;
  }
  verifyPasswordField(selector: string, text: string) {
    this.seesTextWithId(SELECTORS.PASSWORD_FIELD, STATIC_VALUES.PASSWORD_PLACEHOLDER);
    return this;
  }

  verifyLoginButton(selector: string, text: string) {
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

  verifyScreen(expectedpath: string) {
    this.seesPathNameInUrl(expectedpath);
    return this;
  }

  // verifyAddEmployeeScreen(expectedpath: string) {
  //   this.seesPathNameInUrl(expectedpath);
  //   return this;
  // }

  addEmployeeFormExisting(formDom: string){
    this.seesDomVisible(formDom);
    return this;
  }

  verifyAddedEmpDetails(selector: string, expectedText: string) {
    this.verifyText(EMPLOYEE_NAME_HEADER, expectedText);
  }
  verifyEmployeeInformation(selector: string, expectedText: string) {
    this.verifyText(EMPLOYEE_INFORMATION_HEADER, expectedText);
  }

  verifyUserByFirstName(expectedName: string) {
    this.seesDomContainText(RECORD_FOUND_SPAN, expectedName);
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
