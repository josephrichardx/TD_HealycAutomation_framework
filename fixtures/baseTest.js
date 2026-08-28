import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

import users from '../testdata/users.json' with { type: 'json' };
const { loginData } = users;

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {

    const apiFailures = [];
    

    page.on('response', async (response) => {
      if (response.status() >= 400) {
        apiFailures.push({
          url: response.url(),
          method: response.request().method(),
          status: response.status()
        });
      }
    });

    // Reuse the saved session if present; otherwise fall back to the normal login flow.
    const loginPage = new LoginPage(page);

    await loginPage.login(
      loginData.username,
      loginData.password,
      { skipIfAuthenticated: true, waitForSuccess: true }
    );

    await use(page);

    if (apiFailures.length > 0) {
      await testInfo.attach('API Failures', {
        body: JSON.stringify(apiFailures, null, 2),
        contentType: 'application/json'
      });
    }
  }
});