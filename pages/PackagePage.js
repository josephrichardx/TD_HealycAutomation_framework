const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PackageLocator } = require('../Locators/PackageLocator');
const { Keywords } = require('../utils/Keywords');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class PackagePage {

    constructor(page) {
        this.page = page;
        this.locator = new PackageLocator(page);
        this.keywords = new Keywords();
    }

    async clickAddNew() {

        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {

                await this.keywords.click(
                    this.locator.addNewBtn
                );
            }
        );
    }

    async clickAddPackage() {

        await StepHelper.step(
            this.page,
            'Click Add Package Button',
            async () => {

                await this.keywords.click(
                    this.locator.addPackageBtn
                );
            }
        );
    }

    async searchPatient(patientName) {

        await StepHelper.step(
            this.page,
            `Search Patient - ${patientName}`,
            async () => {

                await this.keywords.fill(
                    this.locator.patientSearchTxt,
                    patientName
                );
            }
        );

        const patient =
            this.locator.getPatient(
                patientName
            );

        await this.keywords.waitForElement(
            patient,
            timeout.elementTimeout
        );

        await StepHelper.step(
            this.page,
            `Select Patient - ${patientName}`,
            async () => {

                await this.keywords.click(
                    patient
                );
            }
        );
    }

    async selectPackage(packageName) {

        const packageOption =
            this.locator.getPackage(
                packageName
            );

        await this.keywords.waitForElement(
            packageOption,
            timeout.elementTimeout
        );

        await StepHelper.step(
            this.page,
            `Select Package - ${packageName}`,
            async () => {

                await this.keywords.click(
                    packageOption
                );
            }
        );
    }

    async clickProceed() {

        await StepHelper.step(
            this.page,
            'Click Proceed',
            async () => {

                await this.keywords.click(
                    this.locator.proceedBtn
                );
            }
        );
    }

    async activatePackage() {

        await StepHelper.step(
            this.page,
            'Activate Package',
            async () => {

                await this.keywords.click(
                    this.locator.activatePackageBtn
                );
            }
        );
    }

    async activateSchedulePackage() {

        await StepHelper.step(
            this.page,
            'Activate & Schedule Package',
            async () => {

                await this.keywords.click(
                    this.locator.activateSchedulePackageBtn
                );
            }
        );
    }

    async addActivatePackage(patientName, packageName) {

        await this.clickAddNew();

        await this.clickAddPackage();

        await this.searchPatient(
            patientName
        );

        await this.selectPackage(
            packageName
        );

        await this.clickProceed();

        await this.activatePackage();
    }

    async addActivateSchedulePackage(patientName, packageName) {

        await this.clickAddNew();

        await this.clickAddPackage();

        await this.searchPatient(
            patientName
        );

        await this.selectPackage(
            packageName
        );

        await this.clickProceed();

        await this.activateSchedulePackage();
    }

    async clickBookNow() {

        await StepHelper.step(
            this.page,
            'Click Book Now',
            async () => {

                await this.keywords.click(
                    this.locator.bookNowBtn
                );
            }
        );
    }

    async selectPackageItem() {

        const packageItemButton =
            this.locator.packageItemCard
                .getByRole('button')
                .filter({ hasText: /^$/ });

        await StepHelper.step(
            this.page,
            'Select Package Item',
            async () => {

                await this.keywords.click(
                    packageItemButton
                );
            }
        );
    }

    async addAllPackageServices() {

        // Wait until package service card is loaded
        await this.locator.packageItemCard.first().waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        const serviceCount =
            await this.locator.pendingServiceCards.count();

        if (serviceCount === 0) {
            throw new Error(
                'No Pending Package Services found. Package service section may not be loaded correctly.'
            );
        }

        for (let i = 0; i < serviceCount; i++) {

            // Always get the current first Pending service
            const pendingService =
                this.locator.pendingServiceCards.first();

            await pendingService.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // const addButton =
            //     pendingService.locator(
            //         'button:has(i.fa-regular.fa-plus)'
            //     );

            const addButton = pendingService.locator(
                this.locator.addServiceButton
            );

            await StepHelper.step(
                this.page,
                `Add Package Service - ${i + 1}`,
                async () => {

                    await addButton.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    await this.keywords.click(
                        addButton
                    );
                }
            );

            let slotCount =
                await this.locator.timeSlots.count();

            let dateChanged = 0;

            while (
                slotCount === 0 &&
                dateChanged < 7
            ) {

                // await StepHelper.step(
                //     this.page,
                //     'No slots available - Move to next date',
                //     async () => {

                //         // const nextDateButton =
                //         //     this.locator.nextDateBtn.first();

                //         // await nextDateButton.waitFor({
                //         //     state: 'visible',
                //         //     timeout: timeout.elementTimeout
                //         // });

                //         // await this.keywords.click(
                //         //     nextDateButton
                //         // );

                //         await this.locator.nextDateBtn.first().waitFor({
                //             state: 'visible',
                //             timeout: timeout.elementTimeout
                //         });

                //         await this.keywords.click(
                //             this.locator.nextDateBtn.first()
                //         );
                //     }
                // );

                    await StepHelper.step(
                    this.page,
                    'No slots available - Move to next date',
                    async () => {

                        try {
                            const nextDateButton =
                                this.locator.nextDateBtn.first();

                            await nextDateButton.waitFor({
                                state: 'visible',
                                timeout: timeout.elementTimeout
                            });

                            await this.keywords.click(nextDateButton);

                        } catch (error) {

                            if (
                                error.message.includes(
                                    'Element is not attached to the DOM'
                                )
                            ) {
                                const refreshedNextDateButton =
                                    this.locator.nextDateBtn.first();

                                await refreshedNextDateButton.waitFor({
                                    state: 'visible',
                                    timeout: timeout.elementTimeout
                                });

                                await this.keywords.click(
                                    refreshedNextDateButton
                                );

                            } else {
                                throw error;
                            }
                        }
                    }
                );

                // Wait for available slots after changing date.
                // This is condition-based, not a fixed sleep.
                await this.locator.nextDateBtn.first().waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                slotCount =
                    await this.locator.timeSlots.count();

                dateChanged++;
            }

            if (slotCount === 0) {
                throw new Error(
                    `No available time slots found for Package Service ${i + 1} after checking ${dateChanged + 1} dates.`
                );
            }

            const randomIndex =
                Math.floor(
                    Math.random() * slotCount
                );

            // await StepHelper.step(
            //     this.page,
            //     `Select Random Time Slot - ${randomIndex + 1}`,
            //     async () => {

            //         const selectedSlot =
            //             this.locator.timeSlots.nth(
            //                 randomIndex
            //             );

            //         await selectedSlot.waitFor({
            //             state: 'visible',
            //             timeout: timeout.elementTimeout
            //         });

            //         await this.keywords.click(
            //             selectedSlot
            //         );
            //     }
            // );

            await StepHelper.step(
            this.page,
            `Select Random Time Slot - ${randomIndex + 1}`,
            async () => {

                const selectedSlot =
                    this.locator.timeSlots.nth(randomIndex);

                await selectedSlot.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await selectedSlot.click({
                    timeout: timeout.actionTimeout
                });
            }
        );

            await StepHelper.step(
                this.page,
                'Click Next',
                async () => {

                    await this.keywords.click(
                        this.locator.nextBtn
                    );
                }
            );

            // Wait for the next package service to become available
            // instead of using a fixed wait.
            if (i < serviceCount - 1) {
                await this.locator.pendingServiceCards.first().waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });
            }
        }
    }

    async selectFirstAvailableSlot() {

        await StepHelper.step(
            this.page,
            'Select First Available Slot',
            async () => {

                const firstSlot =
                    this.locator.slotButton.first();

                await firstSlot.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    firstSlot
                );
            }
        );
    }

    async clickNext() {

        await StepHelper.step(
            this.page,
            'Click Next',
            async () => {

                await this.keywords.click(
                    this.locator.nextBtn
                );
            }
        );
    }

    async clickConfirm() {

        await StepHelper.step(
            this.page,
            'Click Confirm Button',
            async () => {

                await this.keywords.click(
                    this.locator.confirmBtn
                );
            }
        );
    }

    async bookPackagefromcalendar() {

        await this.clickBookNow();

        await this.addAllPackageServices();

        await this.clickConfirm();
    }

    async bookPackagefromAddPackage() {

        await this.addAllPackageServices();

        await this.clickConfirm();
    }

     async verifyPackageAddedAndAssociated(packageName) {
    
            const deadline = Date.now() + 15000;
            let actualToastTitle = '';
    
            while (Date.now() < deadline) {
    
                actualToastTitle =
                    (
                        await this.keywords.getText(
                            this.locator.packageAddedToastTitle
                        )
                    ).trim();
    
                if (actualToastTitle === 'Package is added') {
    
                    break;
                }
    
                await this.page.waitForTimeout(timeout.testTimeout);
            }
    
            await StepHelper.step(
                this.page,
                `Verify "Package is added" Popup | Expected: Package is added | Actual: ${actualToastTitle}`,
                async () => {
    
                    expect(actualToastTitle).toBe(
                        'Package is added'
                    );
                }
            );
    
            const actualBreadcrumb =
                (
                    await this.keywords.getText(
                        this.locator.packageBreadcrumb
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Redirect Breadcrumb | Expected to contain: Book Packages, Patient, Packages | Actual: ${actualBreadcrumb}`,
                async () => {
    
                    expect(actualBreadcrumb).toContain('Book Packages');
                    expect(actualBreadcrumb).toContain('Patient');
                    expect(actualBreadcrumb).toContain('Packages');
                }
            );
    
            const actualBannerName =
                (
                    await this.keywords.getText(
                        this.locator.packageBannerName
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Package Associated With Patient | Expected: ${packageName} | Actual: ${actualBannerName}`,
                async () => {
    
                    expect(actualBannerName).toContain(
                        packageName
                    );
                }
            );
    
            const actualActiveStatus =
                (
                    await this.keywords.getText(
                        this.locator.packageActiveStatusBtn
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Package Status | Expected: Active | Actual: ${actualActiveStatus}`,
                async () => {
    
                    expect(actualActiveStatus).toBe('Active');
                }
            );
        }

    async bookSingleSessionFromAddPackage() {

    await this.selectPendingServiceItem();

    const {
        selectedSlotDate,
        daysAdvanced
    } = await this.selectAvailableSlot();

    await this.clickNext();
    await this.clickConfirmPackageBooking();

    return {
        selectedSlotDate,
        daysAdvanced
    };
}

async selectPendingServiceItem() {

        const pendingService =
            this.locator.pendingServiceCards.first();

        const addButton =
            pendingService.locator(
                'button:not(.status)'
            );

        await StepHelper.step(
            this.page,
            'Click Add Service (+) on Pending Package Card',
            async () => {

                await this.keywords.click(
                    addButton
                );
            }
        );
    }

      async selectAvailableSlot() {
       
        const maxDaysToSearch = 30;
        let daysSearched = 0;
        let daysAdvanced = 0;
 
        await StepHelper.step(
            this.page,
            'Select First Available Slot',
            async () => {
 
                // 1. RESTORED: Wait for the page network to settle BEFORE checking slots
                await this.page
                    .waitForLoadState('networkidle', { timeout: timeout.elementTimeout })
                    .catch(() => {});
 
                while (daysSearched < maxDaysToSearch) {
 
                    await this.locator.slotButton.first()
                        .waitFor({ state: 'visible', timeout: timeout.networkIdleTimeoutMs  })
                        .catch(() => {});
 
                    const slotCount = await this.locator.slotButton.count();
 
                    console.log(`Available Slots: ${slotCount}`);
 
                    if (slotCount > 0) {
 
                        const firstSlot = this.locator.slotButton.first();
                       
                        const appointmentCard = this.locator.slotAppointmentCard(firstSlot);
 
                        const cardText = await this.keywords.getText(appointmentCard);
 
                        console.log(`Appointment Card Text: ${cardText}`);
 
                        const dateMatch = cardText.match(/\d{1,2}\s+[A-Za-z]{3},\s+\d{4}/);
 
                        if (!dateMatch) {
                            throw new Error(
                                `Unable to read slot date from appointment card: ${cardText}`
                            );
                        }
 
                        this.selectedSlotDate = dateMatch[0];
 
                        console.log(`Selected Slot Date: ${this.selectedSlotDate}`);
 
                        const deadline = Date.now() + 15000;
                        let clicked = false;
                        let lastError;
 
                        while (Date.now() < deadline) {
                            try {
                                await this.keywords.click(firstSlot);
                                clicked = true;
                                break;
                            } catch (error) {
                                lastError = error;
                                if (!/not attached|not stable|detached/i.test(error.message || '')) {
                                    throw error;
                                }
                                await this.page.waitForTimeout(timeout.testTimeout);
                            }
                        }
 
                        if (!clicked) {
                            throw lastError;
                        }
 
                        break;
                    }
 
                    await StepHelper.step(
                        this.page,
                        'Move To Next Available Date',
                        async () => {
                            await this.keywords.click(this.locator.nextDayBtn);
                        }
                    );
 
                    daysSearched++;
                    daysAdvanced++;
 
                    await this.page
                        .waitForLoadState('networkidle', { timeout: timeout.elementTimeout })
                        .catch(() => {});
                }
 
                if (daysSearched >= maxDaysToSearch) {
                    throw new Error(`No available slots found after searching ${maxDaysToSearch} days forward.`);
                }
            }
        );
 
        return {
    selectedSlotDate: this.selectedSlotDate,
    daysAdvanced
};

}
 
  async clickConfirmPackageBooking() {

        await StepHelper.step(
            this.page,
            'Click Confirm Package Booking',
            async () => {

                await this.keywords.click(
                    this.locator.confirmPackageBookingBtn
                );
            }
        );
    }

   async verifyServicesAddedToast() {

        // Same shared toast DOM node as the earlier "Package is added"
        // check in verifyPackageAddedAndAssociated(), which polls for this
        // exact reason: without it, a single immediate read can catch that
        // toast's leftover text before this one has replaced it. Mirrors
        // that method's proven pattern rather than reading once and hoping.
        const deadline = Date.now() + 15000;
        let actualTitle = '';

        while (Date.now() < deadline) {

            actualTitle =
                (
                    await this.keywords.getText(
                        this.locator.packageAddedToastTitle
                    )
                ).trim();

            if (actualTitle === 'Services is Added') {

                break;
            }

            await this.page.waitForTimeout(timeout.testTimeout);
        }

        await StepHelper.step(
            this.page,
            `Verify "Services is Added" Toast | Expected: Services is Added | Actual: ${actualTitle}`,
            async () => {

                expect(actualTitle).toBe('Services is Added');
            }
        );

        const actualSubtext =
            (
                await this.keywords.getText(
                    this.locator.packageToastSubtext
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Toast Subtext | Expected: Your appointment have been scheduled successfully | Actual: ${actualSubtext}`,
            async () => {

                expect(actualSubtext).toBe(
                    'Your appointment have been scheduled successfully'
                );
            }
        );
    }

    async verifyPackageTag(
        patientName,
        expectedPackageShortName,
        expectedDateOptions
    ) {

        const actualTag =
            (
                await this.keywords.getText(
                    this.locator.patientSearchResultTag(
                        patientName
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Package Tag Contains Package Name | Expected to contain: ${expectedPackageShortName} | Actual: ${actualTag}`,
            async () => {

                expect(actualTag).toContain(
                    expectedPackageShortName
                );
            }
        );

        const dateOptionsList = Array.isArray(expectedDateOptions)
            ? expectedDateOptions
            : [expectedDateOptions];

        await StepHelper.step(
            this.page,
            `Verify Package Tag Date | Expected to contain one of: ${dateOptionsList.join(' or ')} | Actual: ${actualTag}`,
            async () => {

                const matchesAny = dateOptionsList.some(
                    (d) => actualTag.includes(d)
                );

                expect(matchesAny).toBe(true);
            }
        );
    }


     async verifyPackageNameAndRefundAmount(
        expectedPackageName,
        expectedPaidAmount
    ) {

        await StepHelper.step(
            this.page,
            `Verify Package Name on Cancel Modal | Expected: ${expectedPackageName}`,
            async () => {

                await expect(
                    this.locator.cancelModalPackageName(
                        expectedPackageName
                    )
                ).toBeVisible();
            }
        );

        const actualAmountAlreadyPaid =
            (
                await this.keywords.getText(
                    this.locator.amountAlreadyPaidValue
                )
            ).trim();

        const expectedAmountText =
            `₹ ${parseFloat(expectedPaidAmount).toFixed(0)}`;

        await StepHelper.step(
            this.page,
            `Verify Total Refund Amount == Paid Amount | Expected: ${expectedAmountText} | Actual: ${actualAmountAlreadyPaid}`,
            async () => {

                expect(actualAmountAlreadyPaid).toContain(
                    parseFloat(expectedPaidAmount).toFixed(0)
                );
            }
        );
    }

     async attemptOverRefundAndVerifyBlocked(paidAmount) {
    
            const overLimitAmount = (
                parseFloat(paidAmount) + 1000
            ).toFixed(2);
    
            await StepHelper.step(
                this.page,
                `Enter Over-Limit Refund Amount - ${overLimitAmount}`,
                async () => {
    
                    await this.keywords.fill(
                        this.locator.amountTxt,
                        overLimitAmount
                    );
                }
            );
    
            await StepHelper.step(
                this.page,
                'Click Review & Confirm (expecting a rejected/Abandoned outcome)',
                async () => {
    
                    await this.keywords.click(
                        this.locator.reviewConfirmBtn
                    );
                }
            );
    
            const actualStatus =
                (
                    await this.keywords.getText(
                        this.locator.newPackageStatusValue
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Over-Refund Amount Was Rejected | Expected: New Package Status shows Abandoned (not Cancelled) | Actual: ${actualStatus}`,
                async () => {
    
                    expect(actualStatus).toBe('Abandoned');
                }
            );
    
            await StepHelper.step(
                this.page,
                'Click Back to Recover From Invalid Amount',
                async () => {
    
                    await this.keywords.click(
                        this.locator.reviewScreenBackBtn
                    );
                }
            );
    
            await StepHelper.step(
                this.page,
                'Clear Over-Limit Amount',
                async () => {
    
                    await this.locator.amountTxt.fill('');
                }
            );
        }


}

module.exports = { PackagePage };