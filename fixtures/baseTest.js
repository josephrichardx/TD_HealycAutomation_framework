import { test as base } from '@playwright/test';
 
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
 
    // Open application using saved authentication state
    await page.goto('http://release-uat.healync.com.s3-website.ap-south-1.amazonaws.com');
    await page.waitForLoadState('domcontentloaded');
 
    await use(page);
 
    if (apiFailures.length > 0) {
      await testInfo.attach('API Failures', {
        body: JSON.stringify(apiFailures, null, 2),
        contentType: 'application/json'
      });
    }
  }
});
 