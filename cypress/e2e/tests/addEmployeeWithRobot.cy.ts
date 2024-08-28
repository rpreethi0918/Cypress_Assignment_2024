/// <reference types="cypress" />
import { RobotEyes, RobotHands, Dependencies } from '../robot/addEmployeeRobotFunctions';
import { takeScreenshot,loginAndVerifyByIndex,verifyEmployeeInDirectory } from '../helpers/utils';
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
import {
    LOGIN_URL,
    PIM_URL_PART,
    ADD_EMPLOYEE_URL_PART,
    DIRECTORY_URL_PART
} from '../helpers/env';
import {
    firstName,
    lastName,
    emp2,
    jobLocation
} from '../data/testData';

import STATIC_VALUES from '../helpers/addEmployeeSelectors';
import SELECTORS from '../helpers/addEmployeeSelectors';
import { expect } from 'chai';
import URLS from '../helpers/env';
import { credentials } from '../helpers/env';

const dependencies = new Dependencies();
const robotEyes = new RobotEyes();
const robotHands = new RobotHands();
describe('Add Employee Tests using Robot Functions', () => {
    before(() => {
        dependencies.visitLoginPage();
        loginAndVerifyByIndex(0); 
        takeScreenshot('login-valid-credentials');
    });

    it('Navigate to PIM Screen', () => {
        robotHands.clickPIM();
        robotHands.wait(ms);
        robotEyes.verifyScreen(PIM_URL_PART);
        robotEyes.verifyText(PIM_HEADER, 'PIM');
        takeScreenshot('pim-page');
    });

    it('Add Employee Details', () => {
        robotHands.clickAddEmployee();
        robotHands.wait(ms);
        robotEyes.verifyScreen(ADD_EMPLOYEE_URL_PART);
        takeScreenshot('add-employee-page');

        robotEyes.addEmployeeFormExisting(FORM_SELECTOR)
        robotHands.wait(ms);
        robotEyes.checkFirstNameField(FIRSTNAME_INPUT, STATIC_VALUES.FIRSTNAME_PLACEHOLDER)
            .checkLastNameField(LASTNAME_INPUT,STATIC_VALUES.LASTNAME_PLACEHOLDER);
        robotHands.typeFirstName(FIRSTNAME_INPUT, firstName)
            .typeLastName(LASTNAME_INPUT, lastName)
            .typeEmployeeID(EMPLOYEE_ID_INPUT, emp2)
            .clickSave()
            .wait(ms);

        robotEyes.verifyAddedEmpDetails(EMPLOYEE_NAME_HEADER, `${firstName} ${lastName}`);
        takeScreenshot('employee-added');

        robotHands.clickJob()
            .wait(ms);
        robotEyes.seesDomVisible(FORM_SELECTOR);
        robotHands.selectJobLocationFromDropDown(LOCATION_DROPDOWN, jobLocation);
        robotHands.saveLocation()
            .wait(ms);
            takeScreenshot('job-location-updated');
    });

    it('Verify Employee is Added', () => {
        robotHands.clickEmployeeList()
            .wait(ms);
        robotEyes.verifyEmployeeInformation(EMPLOYEE_INFORMATION_HEADER, 'Employee Information');
        takeScreenshot('before-search-employee');
        robotHands.searchByFirstName(`${SEARCH_INPUT}:eq(0)`, firstName);
        robotHands.clickSearchByName()
            .wait(ms);
        robotEyes.verifyUserByFirstName(firstName);
        takeScreenshot('employee-search-result');
    });

    it('Search for an Employee in the Directory', () => {
        robotHands.clickDirectoryTab()
            .wait(ms);
        robotEyes.verifyScreen(DIRECTORY_URL_PART);
        takeScreenshot('directory-page');
        robotHands.selectJobLocationFromDropDown(LOCATION_DROPDOWN_ICON, jobLocation);
        robotHands.wait(ms);
        robotHands.clickSearchByLocation();
        robotHands.wait(ms);
        takeScreenshot('directory-search-result');
        verifyEmployeeInDirectory(firstName,lastName);
        takeScreenshot('employee-detail-found');
    });

});