import { expect } from '@playwright/test';
const { StepHelper } = require('../utils/StepHelper');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class SalesReportPage {

  constructor(page) {
    this.page = page;
  }

  async openSalesReport() {

    await StepHelper.step(this.page, 'Reload Application', async () => {
      await this.page.reload({
        waitUntil: 'load',
        timeout: timeout.navigationTimeout
      });
    });

    await StepHelper.step(this.page, 'Open Analytics Menu', async () => {
      await this.page.locator('#analytics-toggle').click();
    });

    await StepHelper.step(this.page, 'Reload Analytics Page', async () => {
      await this.page.reload({
        waitUntil: 'load',
        timeout: timeout.navigationTimeout
      });
    });

    await StepHelper.step(
      this.page,
      'Open Sales Advanced Report',
      async () => {
        await this.page.getByText('Sales (Advanced)').click();
      }
    );
  }

  async getFrame() {

    const frame = this.page.locator('iframe').contentFrame();

    await StepHelper.step(
      this.page,
      'Wait For Sales Report Frame',
      async () => {
        await frame.locator('body').waitFor({
          state: 'visible',
          timeout: timeout.elementTimeout
        });
      }
    );

    return frame;
  }

  async setDateRange(frame, fromDate, toDate) {

    const dateInput1 = frame.locator(
      "(//input[@aria-description='Enter date in M/d/yyyy format'])[1]"
    );

    await StepHelper.step(
      this.page,
      `Enter From Date - ${fromDate}`,
      async () => {
        await dateInput1.fill(fromDate);
      }
    );

    const dateInput2 = frame.locator(
      "(//input[@aria-description='Enter date in M/d/yyyy format'])[2]"
    );

    await StepHelper.step(
      this.page,
      `Enter To Date - ${toDate}`,
      async () => {
        await dateInput2.fill(toDate);
      }
    );
  }

  async selectInvoiceStatus(frame, status) {

    const invoiceStatus = frame.locator(
      "(//div[@class='slicer-dropdown-menu'])[2]"
    );

    const currentValue = await invoiceStatus.textContent();

    if (!currentValue?.includes(status)) {

      await StepHelper.step(
        this.page,
        'Open Invoice Status Dropdown',
        async () => {
          await invoiceStatus.click();
        }
      );

      await StepHelper.step(
        this.page,
        `Select Invoice Status - ${status}`,
        async () => {

          const statusOption = frame.locator(
            `//span[normalize-space()='${status}']`
          );

          await statusOption.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
          });

          await statusOption.click();
        }
      );

      await StepHelper.step(
        this.page,
        'Close Invoice Status Dropdown',
        async () => {
          await invoiceStatus.click();
        }
      );
    }
  }

  async selectInvoiceType(frame, type) {

    const invoiceType = frame.locator(
      "(//div[@class='slicer-dropdown-menu'])[1]"
    );

    const currentValue = await invoiceType.textContent();

    if (!currentValue?.includes(type)) {

      await StepHelper.step(
        this.page,
        'Open Invoice Type Dropdown',
        async () => {
          await invoiceType.click();
        }
      );

      await StepHelper.step(
        this.page,
        `Select Invoice Type - ${type}`,
        async () => {

          const typeOption = frame.locator(
            `//span[normalize-space()='${type}']`
          );

          await typeOption.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
          });

          await typeOption.click();
        }
      );

      await StepHelper.step(
        this.page,
        'Close Invoice Type Dropdown',
        async () => {
          await invoiceType.click();
        }
      );
    }
  }

  async selectPatient(frame, patientName) {

    const patientDropdown = frame.locator(
      "(//div[@class='slicer-dropdown-menu'])[3]"
    );

    const patientValue = await patientDropdown.textContent();

    if (!patientValue?.includes(patientName)) {

      await StepHelper.step(
        this.page,
        'Open Patient Dropdown',
        async () => {
          await patientDropdown.click();
        }
      );

      await StepHelper.step(
        this.page,
        `Select Patient - ${patientName}`,
        async () => {

          const patientOption = frame.locator(
            `//span[normalize-space()='${patientName}']`
          );

          await patientOption.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
          });

          await patientOption.click();
        }
      );

      await StepHelper.step(
        this.page,
        'Close Patient Dropdown',
        async () => {
          await patientDropdown.click();
        }
      );
    }
  }

  async getHoverDetails(frame) {

    const patientRow = frame.locator(
      "(//div[@data-query-ref='views PatientProfileMaterialized.Patient_Display'])[2]"
    );

    await patientRow.waitFor({
      state: 'visible',
      timeout: timeout.elementTimeout
    });

    await patientRow.hover();

    // Wait for hover popup instead of fixed 2000ms
    await expect(
      frame.getByText('Patient_Display')
    ).toBeVisible({
      timeout: timeout.expectTimeout
    });

    await expect(
      frame.getByText('InvoiceNumber')
    ).toBeVisible({
      timeout: timeout.expectTimeout
    });

    await expect(
      frame.getByText('referrals')
    ).toBeVisible({
      timeout: timeout.expectTimeout
    });

    const popupText1 = await frame
      .getByText('Patient_Display')
      .locator('..')
      .innerText();

    const popupText2 = await frame
      .getByText('InvoiceNumber')
      .locator('..')
      .innerText();

    const popupText3 = await frame
      .getByText('referrals')
      .locator('..')
      .innerText();

    return {
      popupText1,
      popupText2,
      popupText3
    };
  }

  async compareNetSalesAmount(frame) {

    const amountLocator = frame.locator(
      "(//div[@data-query-ref='Sum(views InvoiceViewMaterialized.Amount)'])[2]"
    );

    await amountLocator.waitFor({
      state: 'visible',
      timeout: timeout.elementTimeout
    });

    const amount1 = await amountLocator.textContent();

    const netSalesLocator = frame.locator(
      "(//h3[text()='Net Sales ₹']//following::div[@data-testid='visual-content-desc'])[1]"
    );

    await netSalesLocator.waitFor({
      state: 'visible',
      timeout: timeout.elementTimeout
    });

    const amount2 = await netSalesLocator.textContent();

    const value1 = parseFloat(
      amount1.replace(/[₹,\s]/g, '')
    );

    const value2 = parseFloat(
      amount2.replace(/[₹,\s]/g, '')
    );

    expect(value1).toBe(value2);

    console.log(`Expected NetSales : ${value1}`);
    console.log(`Actual Sales : ${value2}`);

    return {
      invoiceAmount: value1,
      netSales: value2
    };
  }
}

module.exports = { SalesReportPage };