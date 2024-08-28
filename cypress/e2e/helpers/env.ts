// Define and export credentials array
export const credentials = [
  {
      username: "Admin",
      password: "admin123",
      expected: "Dashboard"
  },
  {
      username: "invalidUser",
      password: "invalidPass",
      expected: "Invalid credentials"
  },
  {
    username: " ",
    password: " ",
    expected: "Required"
  }
];
// Named exports for individual URLs
export const LOGIN_URL: string = 'https://opensource-demo.orangehrmlive.com/';
export const PIM_URL_PART: string = '/web/index.php/pim/viewEmployeeList';
export const ADD_EMPLOYEE_URL_PART: string = '/web/index.php/pim/addEmployee';
export const DIRECTORY_URL_PART: string = '/web/index.php/directory/viewDirectory';

// Default export for the URL object
const URLS = {
    BASE_URL: 'https://opensource-demo.orangehrmlive.com/',
   // PIM_URL_PART:'/web/index.php/pim/viewEmployeeList'
};

export default URLS;
