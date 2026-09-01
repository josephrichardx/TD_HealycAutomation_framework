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


// async addAllPackageServices() {

//     const serviceCount =
//         await this.locator.pendingServiceCards.count();

//     for (let i = 0; i < serviceCount; i++) {

//         const pendingService =
//             this.locator.pendingServiceCards.first();

//         // const addButton =
//         //     pendingService.locator(
//         //         'button:not(.status)'
//         //     );

//         const addButton = pendingService.locator(
//     "button:has(i.fa-regular.fa-plus)"
// );

//         await StepHelper.step(
//             this.page,
//             `Add Package Service - ${i + 1}`,
//             async () => {
//                 await this.keywords.click(addButton);
//             }
//         );

//         let slotCount =
//             await this.locator.timeSlots.count();

//         let dateChanged = 0;

//         while (
//             slotCount === 0 &&
//             dateChanged < 7
//         ) {

//             await StepHelper.step(
//                 this.page,
//                 'No slots available - Move to next date',
//                 async () => {

//                     const nextBtn =
//                         this.locator.nextDateBtn.nth(i);

//                     await this.keywords.click(nextBtn);
//                 }
//             );

//             await this.page.waitForTimeout(1000);

//             slotCount =
//                 await this.locator.timeSlots.count();

//             dateChanged++;
//         }

//         if (slotCount === 0) {
//             throw new Error(
//                 `No available time slots found for Package Service ${i + 1} after checking ${dateChanged + 1} dates.`
//             );
//         }

//         const randomIndex =
//             Math.floor(
//                 Math.random() * slotCount
//             );

//         await StepHelper.step(
//             this.page,
//             `Select Random Time Slot - ${randomIndex + 1}`,
//             async () => {

//                 await this.keywords.click(
//                     this.locator.timeSlots.nth(
//                         randomIndex
//                     )

//                 );
//             }
//         );

//          await StepHelper.step(
//             this.page,
//             'Click Next',
//             async () => {

//                 await this.keywords.click(
//                     this.locator.nextBtn
//                 );
//             }
//         );


//         await this.keywords.wait(
//             this.page,
//             1000
//         );
//     }
// }

async addAllPackageServices() {

    // Wait until package service card is loaded
    await this.locator.packageItemCard.first().waitFor({
        state: 'visible',
        timeout: 60000
    });

    let serviceCount =
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
            timeout: 60000
        });

        const addButton =
            pendingService.locator(
                "button:has(i.fa-regular.fa-plus)"
            );

        await StepHelper.step(
            this.page,
            `Add Package Service - ${i + 1}`,
            async () => {

                await addButton.waitFor({
                    state: 'visible',
                    timeout: 60000
                });

                await this.keywords.click(
                    addButton
                );
            }
        );

        // Wait for slots to load
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

                    await this.keywords.click(
                        this.locator.nextDateBtn.first()
                    );
                }
            );

            // Wait for slots after changing date
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

        // Wait for UI update after selecting service
        await this.keywords.wait(
            this.page,
            1000
        );
    }
}

    async selectFirstAvailableSlot() {

        await StepHelper.step(
            this.page,
            'Select First Available Slot',
            async () => {

                await this.keywords.click(
                    this.locator.slotButton.first()
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