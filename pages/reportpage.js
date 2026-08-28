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

 async resetInvoiceStatus(frame) {

    const invoiceStatus = frame.locator("(//div[@class='slicer-dropdown-menu'])[2]");

    // Read the current dropdown value
    const currentStatus = (await invoiceStatus.textContent())?.trim();

    // If "All" is selected, do nothing
    if (currentStatus === "All") {
        return;
    }

    // Open the dropdown
    await StepHelper.step(this.page, 'Open Invoice Status Dropdown', async () => {
        await invoiceStatus.click();
    });

    // Click the currently selected status to unselect it
    await StepHelper.step(this.page, `Unselect Invoice Status - ${currentStatus}`, async () => {
        await frame.locator(`//span[normalize-space()='${currentStatus}']`).click();
    });

    // Dropdown closes automatically after the click
     await StepHelper.step(this.page, 'Close Invoice Status Dropdown', async () => {
        await invoiceStatus.click();
    });
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

    const patientRows = frame.locator(
        "//div[@data-query-ref='views PatientProfileMaterialized.Patient_Display']"
    );

    // Wait until elements are available
    await patientRows.first().waitFor({
        state: 'visible',
        timeout: 30000
    });

    const count = await patientRows.count();

    console.log(`Total Elements: ${count}`);
    console.log(`Total Details: ${count - 1}`);

    const allHoverDetails = [];

    // i = 1 means XPath [2]
    // Header (nth(0) / XPath [1]) is skipped
    for (let i = 1; i < count; i++) {

        const row = patientRows.nth(i);

        console.log(`Hovering Detail ${i}...`);

        await row.scrollIntoViewIfNeeded();
        await row.hover();

        await this.page.waitForTimeout(1500);

        // Wait for hover popup
        await expect(
            frame.getByText('Patient_Display')
        ).toBeVisible();

        await expect(
            frame.getByText('InvoiceNumber')
        ).toBeVisible();

        await expect(
            frame.getByText('referrals')
        ).toBeVisible();

        // Get popup values
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

        console.log(`Detail ${i}:`);
        console.log(popupText1);
        console.log(popupText2);
        console.log(popupText3);

        allHoverDetails.push({
            detail: i,
            popupText1,
            popupText2,
            popupText3
        });
    }

    return allHoverDetails;
}

async compareNetSalesAmount(frame) {

    return await StepHelper.step(
        this.page,
        'Compare Total Amount with Net Sales',
        async () => {

            const amounts = frame.locator(
                "//div[@data-query-ref='Sum(views InvoiceViewMaterialized.Amount)']"
            );

            // Wait until amount elements are available
            await amounts.first().waitFor({
                state: 'visible',
                timeout: 30000
            });

            const count = await amounts.count();

            console.log('Total Amount Elements:', count);

            // Expected: Net Sales + minimum 1 other amount
            expect(count).toBeGreaterThan(1);

            let totalAmount = 0;
            const individualAmounts = [];

            // Index 0 = Net Sales, so skip it
            for (let i = 1; i < count; i++) {

                const amountText = await amounts.nth(i).innerText();

                console.log(`Index ${i} Raw Amount:`, amountText);

                const amount = parseFloat(
                    amountText.replace(/[₹,\s]/g, '')
                );

                expect(Number.isNaN(amount)).toBe(false);

                individualAmounts.push(amount);
                totalAmount += amount;
            }

            // Net Sales
            const netSalesLocator = frame.locator(
                "(//h3[normalize-space()='Net Sales ₹']//following::div[@data-testid='visual-content-desc'])[1]"
            );

            await netSalesLocator.waitFor({
                state: 'visible',
                timeout: 30000
            });

            const netSalesText = await netSalesLocator.innerText();

            const netSales = parseFloat(
                netSalesText.replace(/[₹,\s]/g, '')
            );

            console.log('Individual Amounts:', individualAmounts);
            console.log('Calculated Total:', totalAmount);
            console.log('Net Sales:', netSales);

            expect(totalAmount).toBeCloseTo(netSales, 2);

            return {
                individualAmounts,
                totalAmount,
                netSales
            };
        }
    );
}}
module.exports = { SalesReportPage };

