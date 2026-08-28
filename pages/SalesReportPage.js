import { expect } from '@playwright/test';
const { StepHelper } = require('../utils/StepHelper');

class SalesReportPage {

  constructor(page) {
    this.page = page;
  }

  async openSalesReport() {

    await StepHelper.step(this.page, 'Reload Application', async () => {
        await this.page.waitForTimeout(3000);
        await this.page.reload({ waitUntil: 'load' });
    });

    await StepHelper.step(this.page, 'Open Analytics Menu', async () => {
        await this.page.locator('#analytics-toggle').click();
    });

    await StepHelper.step(this.page, 'Reload Analytics Page', async () => {
        await this.page.reload({ waitUntil: 'load' });
    });

    await StepHelper.step(this.page, 'Open Sales Advanced Report', async () => {
        await this.page.getByText('Sales (Advanced)').click();
    });
}

  async getFrame() {

    const frame = this.page.locator('iframe').contentFrame();

    await StepHelper.step(this.page, 'Wait For Sales Report Frame', async () => {
        await frame.locator('body').waitFor();
    });

    return frame;
}

 async setDateRange(frame, fromDate, toDate) {

    const dateInput1 = frame.locator("(//input[@aria-description='Enter date in M/d/yyyy format'])[1]");

    await StepHelper.step(this.page, `Enter From Date - ${fromDate}`, async () => {
        await dateInput1.fill(fromDate);
    });

    const dateInput2 = frame.locator("(//input[@aria-description='Enter date in M/d/yyyy format'])[2]");

    await StepHelper.step(this.page, `Enter To Date - ${toDate}`, async () => {
        await dateInput2.fill(toDate);
    });
}
  async selectInvoiceStatus(frame, status) {

    const invoiceStatus = frame.locator("(//div[@class='slicer-dropdown-menu'])[2]");

    const currentValue = await invoiceStatus.textContent();

    if (!currentValue?.includes(status)) {

        await StepHelper.step(this.page, 'Open Invoice Status Dropdown', async () => {
            await invoiceStatus.click();
        });

        await StepHelper.step(this.page, `Select Invoice Status - ${status}`, async () => {
            await frame.locator(`//span[normalize-space()='${status}']`).click();
        });

        await StepHelper.step(this.page, 'Close Invoice Status Dropdown', async () => {
            await invoiceStatus.click();
        });
    }
}

 async selectInvoiceType(frame, type) {

    const invoiceType = frame.locator("(//div[@class='slicer-dropdown-menu'])[1]");

    const currentValue = await invoiceType.textContent();

    if (!currentValue?.includes(type)) {

        await StepHelper.step(this.page, 'Open Invoice Type Dropdown', async () => {
            await invoiceType.click();
        });

        await StepHelper.step(this.page, `Select Invoice Type - ${type}`, async () => {
            await frame.locator(`//span[normalize-space()='${type}']`).click();
        });

        await StepHelper.step(this.page, 'Close Invoice Type Dropdown', async () => {
            await invoiceType.click();
        });
    }
}

  async selectPatient(frame, patientName) {

    const patientDropdown = frame.locator("(//div[@class='slicer-dropdown-menu'])[3]");

    const patientValue = await patientDropdown.textContent();

    if (!patientValue?.includes(patientName)) {

        await StepHelper.step(this.page, 'Open Patient Dropdown', async () => {
            await patientDropdown.click();
        });

        await StepHelper.step(this.page, `Select Patient - ${patientName}`, async () => {
            await frame.locator(`//span[normalize-space()='${patientName}']`).click();
        });

        await StepHelper.step(this.page, 'Close Patient Dropdown', async () => {
            await patientDropdown.click();
        });
    }
}

  async getHoverDetails(frame) {

    await frame.locator(
      "(//div[@data-query-ref='views PatientProfileMaterialized.Patient_Display'])[2]"
    ).hover();

    await this.page.waitForTimeout(2000);

    await expect(frame.getByText('Patient_Display')).toBeVisible();
    await expect(frame.getByText('InvoiceNumber')).toBeVisible();
    await expect(frame.getByText('referrals')).toBeVisible();

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

    const amount1 = await frame
        .locator("(//div[@data-query-ref='Sum(views InvoiceViewMaterialized.Amount)'])[2]")
        .textContent();

    const amount2 = await frame
        .locator("(//h3[text()='Net Sales ₹']//following::div[@data-testid='visual-content-desc'])[1]")
        .textContent();

    const value1 = parseFloat(amount1.replace(/[₹,\s]/g, ''));
    const value2 = parseFloat(amount2.replace(/[₹,\s]/g, ''));

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

