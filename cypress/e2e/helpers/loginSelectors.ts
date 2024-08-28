// cypress/support/selectors.ts

// Define the types for selectors
export const USERNAME_INPUT: string = 'input[name="username"]';
export const PASSWORD_INPUT: string = 'input[name="password"]';
export const LOGIN_BUTTON: string = '.orangehrm-login-button';
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

//Define static values for login page validation
const STATIC_VALUES = {
    PAGE_TITLE: 'OrangeHRM',
    USERNAME_PLACEHOLDER: 'Username',
    PASSWORD_PLACEHOLDER: 'Password',
    LOGIN_BUTTON_TEXT: 'Login'
};

 export default { ...SELECTORS, ...STATIC_VALUES };
