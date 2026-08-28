const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper.js');
const { AppointmentLocator } = require('../Locators/AppointmentLocator.js');
const { addNewMenuItems } = require('../testdata/appointmentData.json');
 
class AppointmentPage {
    constructor(page) {
        this.page = page;
        this.locator = new AppointmentLocator(page);
    }
 
    async clickPatientNameInAppointmentPanel(patientName) {
        await StepHelper.step(
            this.page,
            `Click patient name in appointment panel to expand full screen: '${patientName}'`,
            async () => {
                const patientNameInPanel = this.page
                    .locator('app-appointment-details')
                    .locator('.name-edit')
                    .filter({ hasText: patientName })
                    .first();
 
                await patientNameInPanel.waitFor({
                    state: 'visible',
                    timeout: 10000
                });
 
                await patientNameInPanel.scrollIntoViewIfNeeded();
                await patientNameInPanel.click({ force: true });
            }
        );
    }
 
    async clickAddNewButton() {
        await StepHelper.step(
            this.page,
            'Click Add New Button to open dropdown menu',
            async () => {
                await this.locator.addNewBtn.click();
            }
        );
    }
 
    async verifyAddNewMenuItems() {
 
        for (const menuItem of addNewMenuItems) {
 
            let actualText;
 
            await StepHelper.step(
                this.page,
                `Get Add New Menu Item - ${menuItem}`,
                async () => {
                    const menuItemLocator = this.page
                        .locator('app-patient-profile')
                        .getByText(menuItem, { exact: true })
                        .first();
 
                    await menuItemLocator.waitFor({
                        state: 'visible',
                        timeout: 10000
                    });
 
                    actualText = (
                        await menuItemLocator.innerText()
                    ).trim();
                }
            );
 
            await StepHelper.step(
                this.page,
                `Verify Add New Menu Item | Expected: ${menuItem} | Actual: ${actualText}`,
                async () => {
                    expect(actualText).toBe(menuItem);
                }
            );
        }
    }
 
    async closeAddNewDropdown() {
        await StepHelper.step(
            this.page,
            'Close Add New dropdown (Escape)',
            async () => {
                await this.page.keyboard.press('Escape');
            }
        );
    }
 
    async openTypeDropdown(currentTypeLabel) {
        await StepHelper.step(
            this.page,
            `Open Type dropdown on appointment page: '${currentTypeLabel}'`,
            async () => {
                const typeDropdown = this.locator.typeDropdownBtn(
                    currentTypeLabel
                );
 
                await typeDropdown.waitFor({
                    state: 'visible',
                    timeout: 10000
                });
 
                await typeDropdown.click();
            }
        );
    }
 
    async openCurrentTypeDropdown(currentTypeLabel = 'Consult') {
        await StepHelper.step(
            this.page,
            `Open current Type dropdown after changing it to '${currentTypeLabel}'`,
            async () => {
                const currentTypeDropdown = this.locator.currentTypeDropdown(
                    currentTypeLabel
                );
 
                await currentTypeDropdown.waitFor({
                    state: 'visible',
                    timeout: 10000
                });
 
                await currentTypeDropdown.click();
            }
        );
    }
 
    // async selectType(type) {
    //     await StepHelper.step(
    //         this.page,
    //         `Select ${type} from the Type dropdown`,
    //         async () => {
    //             await this.locator.typeOption(type).click();
    //         }
    //     );
    // }

    async selectType(type) {
    await StepHelper.step(
        this.page,
        `Select ${type} from the Type dropdown`,
        async () => {
            await this.locator.typeOption(type).click();

            await this.page.waitForTimeout(1000);

            console.log(
                'AFTER TYPE SELECTED:',
                await this.page.locator('body').innerText()
            );
        }
    );
}

 
    // async verifyDoctorAndService(
    //     type,
    //     storedDoctorName,
    //     storedTypeValue,
    //     storedServiceName
    // ) {
    //     const profileContainer =
    //         this.page.locator('app-patient-profile');
 
    //     let profileText;
 
    //     await StepHelper.step(
    //         this.page,
    //         `Get ${type} Appointment Details From Profile Panel`,
    //         async () => {
    //             await profileContainer.waitFor({
    //                 state: 'visible',
    //                 timeout: 10000
    //             });
 
    //             profileText = await profileContainer.innerText();
    //         }
    //     );
 
    //     const matchedOrNotFound = (expectedValue) =>
    //         profileText.includes(expectedValue)
    //             ? expectedValue
    //             : 'not found';
 
    //     await StepHelper.step(
    //         this.page,
    //         `${type} Type - Doctor Name | Expected: ${storedDoctorName} | Actual: ${matchedOrNotFound(storedDoctorName)}`,
    //         async () => {
    //             expect(profileText).toContain(storedDoctorName);
    //         }
    //     );
 
    //     if (type === 'Consult') {
    //         await StepHelper.step(
    //             this.page,
    //             `${type} Type - Consult Slot | Expected: ${storedTypeValue} | Actual: ${matchedOrNotFound(storedTypeValue)}`,
    //             async () => {
    //                 expect(profileText).toContain(storedTypeValue);
    //             }
    //         );
    //     } else if (type === 'Service') {
    //         await StepHelper.step(
    //             this.page,
    //             `${type} Type - Service Name | Expected: ${storedServiceName} | Actual: ${matchedOrNotFound(storedServiceName)}`,
    //             async () => {
    //                 expect(profileText).toContain(storedServiceName);
    //             }
    //         );
    //     }
    // }

    async verifyDoctorAndService(
    type,
    storedDoctorName,
    storedTypeValue,
    storedServiceName
) {
    await StepHelper.step(
        this.page,
        `${type} Type - Doctor Name | Expected: ${storedDoctorName}`,
        async () => {
            const doctorLocator = this.page.getByText(
                storedDoctorName,
                { exact: true }
            ).first();

            await doctorLocator.waitFor({
                state: 'visible',
                timeout: 15000
            });

            await expect(doctorLocator).toBeVisible();
        }
    );

    if (type === 'Consult') {
        await StepHelper.step(
            this.page,
            `${type} Type - Consult Slot | Expected: ${storedTypeValue}`,
            async () => {
                const consultLocator = this.page.getByText(
                    storedTypeValue,
                    { exact: true }
                ).first();

                await consultLocator.waitFor({
                    state: 'visible',
                    timeout: 15000
                });

                await expect(consultLocator).toBeVisible();
            }
        );
    } else if (type === 'Service') {
        await StepHelper.step(
            this.page,
            `${type} Type - Service Name | Expected: ${storedServiceName}`,
            async () => {
                const serviceLocator = this.page.getByText(
                    storedServiceName,
                    { exact: true }
                ).first();

                await serviceLocator.waitFor({
                    state: 'visible',
                    timeout: 15000
                });

                await expect(serviceLocator).toBeVisible();
            }
        );
    }
}

 
    async clickAddNewForWaitlist() {
        await StepHelper.step(
            this.page,
            'Click Add New Button for Waitlist consult booking',
            async () => {
                await this.page
                    .locator('app-patient-profile')
                    .getByRole('button', { name: 'Add New' })
                    .click();
            }
        );
    }
 
    async clickAddConsult() {
        await StepHelper.step(
            this.page,
            'Select Add Consult from the dropdown',
            async () => {
                await this.page
                    .getByRole('button', { name: 'Add Consult' })
                    .click();
            }
        );
    }
 
    async enterConsultSlot(consultSlot) {
        await StepHelper.step(
            this.page,
            `Type Consult Slot name: ${consultSlot}`,
            async () => {
                const consultInput = this.page.locator(
                    "xpath=//div[@class='search-icon']//following::input[@type='text']"
                );
 
                await consultInput.click();
                await consultInput.fill(consultSlot);
            }
        );
    }
 
    async selectConsultOption(consultSlot) {
        const consultOptionLocator = this.page.locator(
            `xpath=(//div[normalize-space()='${consultSlot}'])[1]`
        );
 
        await consultOptionLocator.waitFor({
            state: 'visible',
            timeout: 5000
        });
 
        await StepHelper.step(
            this.page,
            `Select Consult Option: ${consultSlot}`,
            async () => {
                await consultOptionLocator.click();
            }
        );
    }
 
    async closeProviderDropdown() {
        await StepHelper.step(
            this.page,
            'Close Provider dropdown (Escape)',
            async () => {
                await this.page.keyboard.press('Escape');
            }
        );
    }
 
    async openBookingDatePicker() {
        await StepHelper.step(
            this.page,
            'Open Booking Date picker',
            async () => {
                await this.page
                    .locator("//div[@class='range-date-container']")
                    .click();
            }
        );
    }
 
    async selectBookingDate(bookingDate) {
        await StepHelper.step(
            this.page,
            `Select Booking Date: ${bookingDate}`,
            async () => {
                await this.page
                    .locator('#currentMonth')
                    .getByText(bookingDate, { exact: true })
                    .click();
            }
        );
    }
 
    async applyBookingDate() {
        await StepHelper.step(
            this.page,
            'Apply the selected Booking Date',
            async () => {
                await this.page.getByText('Apply').nth(1).click();
            }
        );
    }
 
    async verifyConfirmedAppointment(patientName) {
 
        let actualStatusText;
 
        await StepHelper.step(
            this.page,
            `Get Appointment Status - ${patientName}`,
            async () => {
                const profileContainer = this.page.locator(
                    'app-appointment-details, app-patient-profile'
                ).first();
 
                await profileContainer.waitFor({
                    state: 'visible',
                    timeout: 15000
                });
 
                const statusBadge = profileContainer.getByText(
                    /confirmed/i
                ).first();
 
                await statusBadge.waitFor({
                    state: 'attached',
                    timeout: 15000
                });
 
                actualStatusText = (
                    await statusBadge.innerText()
                ).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Confirmed Appointment - ${patientName} | Expected: Confirmed | Actual: ${actualStatusText}`,
            async () => {
 
                expect(actualStatusText.toLowerCase()).toContain(
                    'confirmed'
                );
            }
        );
    }
}
 
module.exports = { AppointmentPage };
 