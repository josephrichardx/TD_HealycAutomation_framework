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

            const addButton =
                pendingService.locator(
                    'button:has(i.fa-regular.fa-plus)'
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

                await StepHelper.step(
                    this.page,
                    'No slots available - Move to next date',
                    async () => {

                        const nextDateButton =
                            this.locator.nextDateBtn.first();

                        await nextDateButton.waitFor({
                            state: 'visible',
                            timeout: timeout.elementTimeout
                        });

                        await this.keywords.click(
                            nextDateButton
                        );
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

            await StepHelper.step(
                this.page,
                `Select Random Time Slot - ${randomIndex + 1}`,
                async () => {

                    const selectedSlot =
                        this.locator.timeSlots.nth(
                            randomIndex
                        );

                    await selectedSlot.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    await this.keywords.click(
                        selectedSlot
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
}

module.exports = { PackagePage };