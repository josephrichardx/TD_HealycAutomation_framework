const { chromium } = require('@playwright/test');
 
const path = require('path');
 
const { loginData } = require('./testdata/users');
const { LoginPage } = require('./pages/LoginPage');
 
async function globalSetup() {
 
  const browser = await chromium.launch({
    headless: true
  });
 
  const context = await browser.newContext();
 
  const page = await context.newPage();
 
  const loginPage = new LoginPage(page);
 
  // Always perform a fresh login during global setup
  await loginPage.login(
    loginData.username,
    loginData.password,
    {
      skipIfAuthenticated: false,
      waitForSuccess: true
    }
  );
 
  // Save the fresh authenticated session
  await context.storageState({
    path: path.resolve(__dirname, 'auth.json')
  });
 
  await browser.close();
}
 
module.exports = globalSetup;