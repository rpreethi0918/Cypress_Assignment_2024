import { takeScreenshot, loginAndVerifyByIndex, logout } from '../helpers/utils';
import { RobotEyes, RobotHands, Dependencies } from '../robot/loginRobotFunctions';
import SELECTORS from '../helpers/loginSelectors';
import STATIC_VALUES from '../helpers/loginSelectors';
import { credentials } from '../helpers/env';
const dependencies = new Dependencies();
const robotEyes = new RobotEyes();
const robotHands = new RobotHands();
import ms from '../helpers/loginSelectors';

describe('Login and Dashboard Tests', () => {
  beforeEach(function () {
    dependencies.visitLoginPage();   
  });

  it('should verify login page elements. 1. Visit the login page. 2. Check visibility of the username field, password field, and login button. 3.Capture a screenshot of the login page.', () => {
    robotEyes.verifyUsernameField()
    .verifyPasswordField()
    .verifyLoginButton();
    takeScreenshot('validate-login-page');
  });

  it('should login with valid credentials. 1.Perform login using valid credentials.2.Verify successful login by checking for the presence of the dashboard.3.Log out of the application.', function () {
    loginAndVerifyByIndex(0); 
    takeScreenshot('login-valid-credentials');
    logout();
  });

  it('should handle login with invalid credentials. Attempt to log in with invalid credentials.2. Verify the error message displayed.3.Capture a screenshot of the error state.', function () {
    loginAndVerifyByIndex(1);
    takeScreenshot('login-invalid-credentials');
    });

  it('should handle login with empty fields. 1.Attempt to log in with empty username and password fields.2.Verify that the appropriate error message for empty fields is shown.3.Take a screenshot of the empty fields error state.', function () {
    loginAndVerifyByIndex(2);
    takeScreenshot('login-empty-fields');
  });
});