/// <reference types="cypress" />
import '../../support/index';

// Define the PositionType type
type PositionType =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'left'
  | 'center'
  | 'right'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | { x: number; y: number }; // To handle coordinates as well

export abstract class BaseEyes {
  seesTextWithId(id: string, text: string) {
    cy.get(`#${id}`).should('have.text', text);
    return this;
  }

  doesNotSeesTextWithId(id: string, text: string) {
    cy.get(`#${id}`).should('not.have.text', text);
    return this;
  }

  seesIdVisible(id: string) {
    cy.get(`#${id}`).should('be.visible');
    return this;
  }

  doesNotSeesIdVisible(id: string) {
    cy.get(`#${id}`).should('not.be.visible');
    return this;
  }

  seesTextWithClass(domClass: string, text: string) {
    cy.get(`.${domClass}`).should('have.text', text);
    return this;
  }

  seesDomVisibleWithCustomMatcher(domLabel: string, matcher: string) {
    cy.get(`[${domLabel}=${matcher}]`).should('be.visible');
    return this;
  }

  seesDomVisible(domLabel: string) {
    cy.get(domLabel).should('be.visible');
    return this;
  }

  seesTextInChildDom(parentDom: string, childDom: string, text: string) {
    cy.get(`${parentDom} ${childDom}`).should('contain', text);
    return this;
  }

  seesTextWithClassAndIndex(domClass: string, index: number, text: string) {
    cy.get(`.${domClass}`).eq(index).should('have.text', text);
    return this;
  }

  hasLengthForDomWithClass(domClass: string, length: number) {
    cy.get(`.${domClass}`).should('have.length', length);
    return this;
  }

  hasLengthForDom(parentDomClass: string, childDom: string, length: number) {
    cy.get(parentDomClass).find(childDom).should('have.length', length);
    return this;
  }

  seesDomContainText(dom: string, text: string) {
    cy.get(dom).should('contain', text);
    return this;
  }

  doesNotSeesDom(dom: string) {
    cy.get(dom).should('not.be.visible');
    return this;
  }

  seesTextInAgGridCell(rowId: string, colId: string, text: string) {
    cy.get(`[row-id=${rowId}]`).find(`[col-id=${colId}]`).should('have.text', text);
    return this;
  }

  seesAgGridColumnSelected(rowId: string, colId: string) {
    cy.get(`[row-id=${rowId}]`).find(`[col-id=${colId}]`).should('have.class', 'ag-cell-range-selected');
    return this;
  }

  seesAgGridRowSelected(rowIndexId: string) {
    cy.get(`[aria-rowindex=${rowIndexId}]`).should('have.class', 'ag-row-selected');
    return this;
  }

  seesMinimumNumberOfElementsInDom(dom: string, childDomClass: string, minimumLength: number) {
    cy.get(dom).find(`.${childDomClass}`).should('have.length.greaterThan', minimumLength);
    return this;
  }

  seesNumberOfElementsInDom(dom: string, childDomClass: string, length: number) {
    cy.get(dom).find(`.${childDomClass}`).should('have.length', length);
    return this;
  }

  seesPathNameInUrl(expectedpath: string) {
    cy.location('pathname').should('eq', expectedpath);
    return this;
  }

  seesFullPathNameWithQueryParams(path: string) {
    const HOST = Cypress.config('baseUrl'); // Use Cypress.config for environment variables
    cy.location('href').should('eq', `${HOST}/${path}`);
    return this;
  }

  seesDomDisabled(dom: string) {
    cy.get(dom).should('be.disabled');
    return this;
  }

  seesDomEnabled(dom: string) {
    cy.get(dom).should('not.be.disabled');
    return this;
  }

  findTextInputBox(dom: string, placeholder: string) {
    cy.get(dom)
      .should('be.visible')
      .and('have.attr', 'placeholder', placeholder)
      .then($el => {
        console.log('Found input box with placeholder:', placeholder);
      });
    return this;
  }

  verifyText(selector: string, expectedText: string) {
    cy.get(selector).should('be.visible').and('have.text', expectedText);
  }
}

export class BaseHands {
  clickOnId(id: string) {
    cy.get(`#${id}`).click();
    return this;
  }

  doubleClickOnId(id: string) {
    cy.get(`#${id}`).dblclick();
    return this;
  }

  clickOnContainElement(element: string) {
    cy.contains(element).click({ force: true });
    return this;
  }

  doubleClickAndDragOnAgGrid(rowId: string, colId: string) {
    cy.get(`[row-id=${rowId}]`)
      .find(`[col-id=${colId}]`)
      .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
      .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
      .trigger('mouseup', { which: 1, pageX: 600, pageY: 6000 });
    return this;
  }

  clickOnDomElement(dom: string) {
    cy.get(dom).click();
    return this;
  }

  clickOnDomElementWithIndex(dom: string, index: number) {
    cy.get(dom).eq(index).click();
    return this;
  }

  clickOnDomElementWithText(dom: string, text: string) {
    cy.get(dom).contains(text).click();
    return this;
  }

  typeTextOnDom(locatorName: string, locatorValue: string, text: string) {
    cy.get(`[${locatorName}="${locatorValue}"]`).type(text, { force: true });
    return this;
  }

  typeTextOnId(id: string, text: string) {
    cy.get(`#${id}`).type(text, { force: true });
    return this;
  }

  clickOnChildDom(parentId: string, dom: string, index: number) {
    cy.get(`#${parentId} ${dom}`).eq(index).click();
    return this;
  }

  clickOnTextWithClassAndIndex(domClass: string, index: number) {
    cy.get(`.${domClass}`).eq(index).click();
    return this;
  }

  scrollToWithClassName(domClass: string, direction: PositionType) {
    cy.get(`.${domClass}`).scrollTo(direction as Cypress.ScrollToPosition);
    return this;
  }

  clickOnAgGridRow(rowId: string) {
    cy.get(`[row-id=${rowId}]`).find('.ag-selection-checkbox').click();
    return this;
  }

  wait(milliSecs: number) {
    cy.wait(milliSecs);
    return this;
  }

  enterText(selector: string, text: string) {
    cy.get(selector).type(text);
    return this;
  }

  clearAndEnterText(selector: string, text: string) {
    cy.get(selector).clear().type(text);
    return this;
  }

  selectFromDropdown(selector: string, optionText: string) {
    cy.get(selector).click();
    cy.contains(optionText).click();
  }


}

export class BaseDependencies {
  visitUrl(url: string) {
    const HOST = Cypress.config('baseUrl'); // Use Cypress.config for environment variables
    cy.visit(`${HOST}${url}`);
    return this;
  }

  accessUrl(url: string) {
    cy.visit(url);
    return this;
  }

  login() {
    cy.get('#email').type(Cypress.config('userName'));
    cy.get('#password').type(Cypress.config('password'));
    cy.get('#login_submit').click();
    return this;
  }

}

export class BaseRobot extends BaseEyes {
  protected hands: BaseHands;
  protected dependencies: BaseDependencies;

  constructor() {
    super();
    this.hands = new BaseHands();
    this.dependencies = new BaseDependencies();
  }

  visit(url: string) {
    this.dependencies.visitUrl(url);
    return this;
  }

  login(username: string, password: string) {
    this.hands.typeTextOnId('email', username);
    this.hands.typeTextOnId('password', password);
    this.hands.clickOnId('login_submit');
    this.seesIdVisible('main-menu');
    return this;
  }

  clickElement(selector: string) {
    this.hands.clickOnDomElement(selector);
    return this;
  }

  typeInElement(selector: string, text: string) {
    this.hands.typeTextOnDom('data-cy', selector, text);
    return this;
  }

  clearAndTypeInElement(selector: string, text: string) {
    this.hands.clickOnDomElement(selector);
    this.hands.typeTextOnDom('data-cy', selector, text);
    return this;
  }

  waitForElement(selector: string, timeout: number = 6000) {
    this.seesDomVisible(selector);
    return this;
  }

  assertUrlContains(part: string) {
    cy.url().should('include', part);
    return this;
  }

  assertElementContainsText(selector: string, text: string) {
    this.seesDomContainText(selector, text);
    return this;
  }

  assertElementHasText(selector: string, text: string) {
    this.seesTextWithClass(selector, text);
    return this;
  }

}