const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PackageLocator } = require('../Locators/PackageLocator');
const { Keywords } = require('../utils/Keywords');

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
        patient
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
        packageOption
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

    async addActivatePackage(patientName,packageName) {

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

    async addActivateSchedulePackage(patientName,packageName) {

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

    // Same flow as addActivateSchedulePackage(), minus
    // searchPatient() - for when "Add New -> Add Package" is clicked
    // from the Patient Profile page rather than the Calendar. The
    // app already knows which patient it's for in that context
    // ("Book a suitable 'Packages' for <patient name>" - confirmed
    // from a real screenshot), so there's no search box to fill;
    // clickAddNew()/clickAddPackage()/selectPackage()/clickProceed()/
    // activateSchedulePackage() are reused as-is, unmodified.
    // addActivateSchedulePackage() itself is untouched - still used
    // by WF_CALADN_125/126 exactly as before.
    async addActivateSchedulePackageFromProfile(packageName) {

        await this.clickAddNew();

        await this.clickAddPackage();

        await this.selectPackage(
            packageName
        );

        await this.clickProceed();

        await this.activateSchedulePackage();
    }

    // Covers the three checks from Step 2 that were previously
    // unverified: the "Package is added" popup, the
    // Book Packages -> Patient -> Packages breadcrumb (redirect
    // confirmation), and the package name/status banner on the
    // "Services includes in package" screen (correct package
    // associated with the patient). Call right after
    // addActivateSchedulePackage(), before booking any session.
    async verifyPackageAddedAndAssociated(packageName) {

        // Poll instead of a single read - guards against reading
        // this before the "Package is added" toast has actually
        // mounted (same race-condition class as the Payment Due
        // Status fix). Manual loop, not expect().toHaveText(), to
        // avoid Playwright's auto-generated "Wait for selector"
        // report noise.
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

            await this.page.waitForTimeout(500);
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

    const serviceCount =
        await this.locator.pendingServiceCards.count();

    for (let i = 0; i < serviceCount; i++) {

        const pendingService =
            this.locator.pendingServiceCards.first();

        const addButton =
            pendingService.locator(
                'button:not(.status)'
            );

        await StepHelper.step(
            this.page,
            `Add Package Service - ${i + 1}`,
            async () => {
                await this.keywords.click(addButton);
            }
        );

        let slotCount =
            await this.locator.timeSlots.count();

        let dateChanged = 0;

        while (
            slotCount === 0 &&
            dateChanged < 7
        ) {

            await StepHelper.step(
                this.page,
                'No slots available - Move to next date',
                async () => {

                    const nextBtn =
                        this.locator.nextDateBtn.nth(i);

                    await this.keywords.click(nextBtn);
                }
            );

            await this.page.waitForTimeout(1000);

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

        await StepHelper.step(
            this.page,
            `Select Random Time Slot - ${randomIndex + 1}`,
            async () => {

                await this.keywords.click(
                    this.locator.timeSlots.nth(
                        randomIndex
                    )

                );
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


        await this.keywords.wait(
            this.page,
            1000
        );
    }
}

    async selectFirstAvailableSlot() {

        // Slots are finite per day, and repeated test runs consume
        // them - before falling back to "Add custom slots", try
        // clicking to the next day (up to 3 times) to see if a
        // later day has open slots instead.
        let availableSlotCount =
            await this.locator.slotButton.count();

        let daysAdvanced = 0;
        const maxDaysToTry = 3;

        while (availableSlotCount === 0 && daysAdvanced < maxDaysToTry) {

            await StepHelper.step(
                this.page,
                `No Slots Today - Click Next Day (attempt ${daysAdvanced + 1})`,
                async () => {

                    await this.keywords.click(
                        this.locator.nextDayBtn
                    );
                }
            );

            daysAdvanced++;

            availableSlotCount =
                await this.locator.slotButton.count();
        }

        if (availableSlotCount > 0) {

            await StepHelper.step(
                this.page,
                'Select First Available Slot',
                async () => {

                    await this.keywords.click(
                        this.locator.slotButton.first()
                    );
                }
            );

        } else {

            await StepHelper.step(
                this.page,
                'No Available Slots Found - Click Add Custom Slots',
                async () => {

                    await this.keywords.click(
                        this.locator.addCustomSlotsBtn
                    );
                }
            );

            await StepHelper.step(
                this.page,
                'Accept Default Custom Slot Time (Click Update)',
                async () => {

                    await this.keywords.click(
                        this.locator.customSlotUpdateBtn
                    );
                }
            );
        }

        return daysAdvanced;
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

    // For a package with a single session booked out of many (e.g.
    // Neuro PT 30 sessions, only 1 scheduled): click the "+" on the
    // pending card, pick whichever slot appears first regardless of
    // which location row it's in (they're all the same doctor), Next,
    // then Confirm. Kept separate from bookPackagefromAddPackage()/
    // addAllPackageServices() since that one loops and picks a random
    // slot across every pending card - this one is deliberately for
    // the single-session case only.
    async bookSingleSessionFromAddPackage() {

        await this.selectPendingServiceItem();

        const daysAdvanced = await this.selectFirstAvailableSlot();

        await this.clickNext();

        await this.clickConfirmPackageBooking();

        return daysAdvanced;
    }

    // "Services is Added" toast, shown after Confirm - confirmed
    // DOM from a real screenshot: same app-custom-toaster-message
    // structure as the earlier "Package is added" toast, title
    // "Services is Added", subtext "Your appointment have been
    // scheduled successfully". Read-only - does NOT click "Go to
    // appointment page" yet, since the Package Tag check (searching
    // via the Calendar bar) still needs to happen first while we're
    // on this screen. Call clickGoToAppointmentPage() separately
    // once ready to navigate.
    async verifyServicesAddedToast() {

        const actualTitle =
            (
                await this.keywords.getText(
                    this.locator.packageAddedToastTitle
                )
            ).trim();

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

    async clickGoToAppointmentPage() {
        await StepHelper.step(
            this.page,
            'Click Go To Appointment Page',
            async () => {
                // Bypassing the keyword wrapper to force the click instantly before the toast detaches
                await this.locator.goToAppointmentPageLink.click({ force: true });
            }
        );
    }

}

module.exports = { PackagePage };