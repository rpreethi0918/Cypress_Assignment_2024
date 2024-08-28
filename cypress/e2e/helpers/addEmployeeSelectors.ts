// cypress/support/selectors.ts

// Define the types for selectors
export const USERNAME_INPUT: string = 'input[name="username"]';
export const PASSWORD_INPUT: string = 'input[name="password"]';
export const LOGIN_BUTTON: string = '.orangehrm-login-button';
export const ERROR_MESSAGE: string = '.oxd-alert-content'; 
export const INPUT_FIELD_ERROR: string = '.oxd-input-field-error-message'; 
export const EMPTY_FIELD_ERROR: string = '.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message';

export const MAIN_MENU: string = '.oxd-main-menu';
export const PIM_MENU_ITEM: string = 'li.oxd-main-menu-item-wrapper';
export const PIM_HEADER: string = `li.oxd-main-menu-item-wrapper a:contains('PIM')`;
export const ADD_BUTTON: string = 'button:contains("Add")';
export const FORM_SELECTOR: string = 'form.oxd-form';
export const INPUT_FIELD: string = 'input.oxd-input';
export const FIRSTNAME_INPUT: string = '.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input';
export const LASTNAME_INPUT: string = ':nth-child(3) > :nth-child(2) > .oxd-input';
export const EMPLOYEE_ID_INPUT: string = '.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input';
export const SAVE_BUTTON: string = 'button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space:contains("Save")';
export const EMPLOYEE_NAME_HEADER: string = 'h6.oxd-text.oxd-text--h6.--strong';
export const JOB_TAB: string = 'div.orangehrm-tabs-wrapper a:contains("Job")';
export const LOCATION_DROPDOWN: string = '.oxd-grid-3 > :nth-child(6) .oxd-select-text--after .oxd-icon';
export const LOCATION_DROPDOWN_LIST: string = '.oxd-select-dropdown';
export const EMPLOYEE_LIST_TAB: string = 'a.oxd-topbar-body-nav-tab-item:contains("Employee List")';
export const EMPLOYEE_INFORMATION_HEADER: string = 'h5.oxd-text.oxd-text--h5.oxd-table-filter-title';
export const SEARCH_INPUT: string = 'input[placeholder="Type for hints..."]';
export const SEARCH_BUTTON: string = 'button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space:contains("Search")';
export const RECORD_FOUND_SPAN: string = '.oxd-table-card > .oxd-table-row > :nth-child(3) > div';
export const DIRECTORY_MENU_ITEM: string = 'span.oxd-main-menu-item--name:contains("Directory")';
export const DIRECTORY_CARD_HEADER: string = '.orangehrm-directory-card-header';
export const DIRECTORY_CONTAINER: string = '.orangehrm-container';
export const LOCATION_DROPDOWN_ICON: string = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon';
export const ms: number = 4000;


// Static values
const SELECTORS = {
    LOGIN_TITLE: '.orangehrm-login-title',
    USERNAME_FIELD: 'input[name="username"]',
    PASSWORD_FIELD: 'input[name="password"]',
    LOGIN_BUTTON: '.orangehrm-login-button',
    DASHBOARD_TEXT: 'h6',
    ERROR_MESSAGE: '.oxd-alert-content',
    EMPTY_FIELD_ERROR: '.oxd-input-field-error-message',
};

// Define static values for login page validation
const STATIC_VALUES = {
    PAGE_TITLE: 'OrangeHRM',
    USERNAME_PLACEHOLDER: 'Username',
    PASSWORD_PLACEHOLDER: 'Password',
    LOGIN_BUTTON_TEXT: 'Login',
    FIRSTNAME_PLACEHOLDER: 'First Name',
    LASTNAME_PLACEHOLDER: 'Last Name'
};

export default { ...SELECTORS, ...STATIC_VALUES };
