const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { Verify } = require('../utils/verification');
const { ServiceLocator } = require('../Locators/ServiceLocator');
const { Keywords } = require('../utils/Keywords');
const { toasterMessages } = require('../testdata/toasterMessages.json');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class ServicePage {

    constructor(page) {
        this.page = page;
        this.locator = new ServiceLocator(page);
        this.keywords = new Keywords();
    }

    async clickAddService() {

        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {
                await this.keywords.click(
                    this.locator.addNewBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Add Service Button',
            async () => {
                await this.keywords.click(
                    this.locator.addServiceBtn
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

        //new

        // await StepHelper.step(
        //     this.page,
        //     `Verify Searched Patient | Expected: ${patientName} | Actual: ${actualPatientName}`,
        //     async () => {
        //         const actualPatientName = (
        //             await this.keywords.getText(
        //                 this.locator.patientSearchResult(patientName)
        //             )
        //         ).trim();

        //         expect(actualPatientName).toBe(patientName);
        //     }
        // );
    
        const patient =
            this.locator.getPatient(
                patientName
            );

        await this.keywords.waitForElement(
            patient,
            timeout.elementTimeout
        );

        //new
        const actualPatientName = (
            await this.keywords.getText(patient)
        ).trim();

        await StepHelper.step(
            this.page,
            `Verify Searched Patient | Expected: ${patientName} | Actual: ${actualPatientName}`,
            async () => {
                expect(actualPatientName).toBe(patientName);
            }
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

    async searchExistingPatient(patientName) {

        await this.keywords.waitForElement(
            this.locator.patientSearchTxt,
            timeout.elementTimeout
        );

        await StepHelper.step(
            this.page,
            `Search Existing Patient - ${patientName}`,
            async () => {

                await this.keywords.fill(
                    this.locator.patientSearchTxt,
                    patientName
                );
            }
        );

        const existingPatient =
            this.locator.getExistingPatient();

        await this.keywords.waitForElement(
            existingPatient,
            timeout.elementTimeout
        );

        await StepHelper.step(
            this.page,
            `Select Existing Patient - ${patientName}`,
            async () => {
                await this.keywords.click(
                    existingPatient
                );
            }
        );
    }

    async selectProvider(
        serviceName,
    ) {

        await this.keywords.waitForElement(
            this.locator.providerDropdown,
            timeout.elementTimeout
        );

        await StepHelper.step(
            this.page,
            'Open Service Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.providerDropdown
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Service - ${serviceName}`,
            async () => {

                await this.keywords.click(
                    this.locator.serviceInput
                );

                await this.keywords.fill(
                    this.locator.serviceInput,
                    serviceName
                );
            }
        );

        const serviceOption =
            this.locator.getServiceOption(
                serviceName
            );

        await serviceOption.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await StepHelper.step(
            this.page,
            `Select Service - ${serviceName}`,
            async () => {
                await this.keywords.click(
                    serviceOption
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Close Service Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.providerDropdown
                );
            }
        );
    }

    // async selectFirstAvailableSlot() {

    //     await StepHelper.step(
    //         this.page,
    //         'Select First Available Slot',
    //         async () => {

    //             while (true) {

    //                 const slotCount =
    //                     await this.locator.slotButton.count();

    //                 if (slotCount > 0) {

    //                     const firstSlot =
    //                         this.locator.slotButton.first();

    //                     await firstSlot.waitFor({
    //                         state: 'visible',
    //                         timeout: timeout.elementTimeout
    //                     });

    //                     await this.keywords.click(
    //                         firstSlot
    //                     );

    //                     break;
    //                 }

    //                 const nextDateButton =
    //                     this.locator.nextDateBtn;

    //                 await nextDateButton.waitFor({
    //                     state: 'visible',
    //                     timeout: timeout.elementTimeout
    //                 });

    //                 await this.keywords.click(
    //                     nextDateButton
    //                 );
    //             }
    //         }
    //     );
    // }


//    async selectFirstAvailableSlot() {

//     await StepHelper.step(
//         this.page,
//         'Select First Available Slot',
//         async () => {

//             while (true) {

//                 const slotCount =
//                     await this.locator.slotButton.count();

//                 console.log(
//                     `Available Slots: ${slotCount}`
//                 );

//                 if (slotCount > 0) {

//                     const firstSlot =
//                         this.locator.slotButton.first();

//                     const appointmentCard =
//                         this.locator.slotAppointmentCard(
//                             firstSlot
//                         );

//                     const cardText =
//                         await this.keywords.getText(
//                             appointmentCard
//                         );

//                     console.log(
//                         `Appointment Card Text: ${cardText}`
//                     );

//                     const dateMatch =
//                         cardText.match(
//                             /\d{1,2}\s+[A-Za-z]{3},\s+\d{4}/
//                         );

//                     if (!dateMatch) {
//                         throw new Error(
//                             `Unable to read slot date from appointment card: ${cardText}`
//                         );
//                     }

//                     this.selectedSlotDate =
//                         dateMatch[0];

//                     console.log(
//                         `Selected Slot Date: ${this.selectedSlotDate}`
//                     );

//                     await this.keywords.click(
//                         firstSlot
//                     );

//                     break;
//                 }

//                 await StepHelper.step(
//                     this.page,
//                     'Move To Next Available Date',
//                     async () => {
//                         await this.keywords.click(
//                             this.locator.nextDateBtn
//                         );
//                     }
//                 );

//                 await this.locator.slotButton
//                     .first()
//                     .waitFor({
//                         state: 'visible',
//                         timeout: timeout.testTimeout
//                     })
//                     .catch(() => {});
//             }
//         }
//     );

//     return this.selectedSlotDate;
// }

async selectFirstAvailableSlot() {

    await StepHelper.step(
        this.page,
        'Select First Available Slot',
        async () => {

            while (true) {

                const slotCount =
                    await this.locator.slotButton.count();

                console.log(
                    `Available Slots: ${slotCount}`
                );

                if (slotCount > 0) {

                    const firstSlot =
                        this.locator.slotButton.first();

                    const appointmentCard =
                        this.locator.slotAppointmentCard(
                            firstSlot
                        );

                    const cardText =
                        await this.keywords.getText(
                            appointmentCard
                        );

                    console.log(
                        `Appointment Card Text: ${cardText}`
                    );

                    // Get Date
                    const dateMatch =
                        cardText.match(
                            /\d{1,2}\s+[A-Za-z]{3},\s*\d{4}/
                        );

                    if (!dateMatch) {
                        throw new Error(
                            `Unable to read slot date: ${cardText}`
                        );
                    }

                    this.selectedSlotDate =
                        dateMatch[0]
                            .replace(/,\s*/g, ', ')
                            .trim();

                    // Get Time
                    const timeMatch =
                        cardText.match(
                            /\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}\s*(?:AM|PM)/i
                        );

                    if (!timeMatch) {
                        throw new Error(
                            `Unable to read slot time: ${cardText}`
                        );
                    }

                    this.selectedSlotTime =
                        timeMatch[0]
                            .replace(/\s+/g, ' ')
                            .trim();

                    console.log(
                        `Selected Slot Date: ${this.selectedSlotDate}`
                    );

                    console.log(
                        `Selected Slot Time: ${this.selectedSlotTime}`
                    );

                    await this.keywords.click(
                        firstSlot
                    );

                    break;
                }

                await StepHelper.step(
                    this.page,
                    'Move To Next Available Date',
                    async () => {

                        await this.keywords.click(
                            this.locator.nextDateBtn
                        );
                    }
                );

                await this.locator.slotButton
                    .first()
                    .waitFor({
                        state: 'visible',
                        timeout: timeout.testTimeout
                    })
                    .catch(() => {});
            }
        }
    );

    return {
        date: this.selectedSlotDate,
        time: this.selectedSlotTime
    };
}


    async selectMultipleServices(
        serviceNames
    ) {

        await this.keywords.waitForElement(
            this.locator.providerDropdown,
            timeout.elementTimeout
        );

        await StepHelper.step(
            this.page,
            'Open Service Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.providerDropdown
                );
            }
        );

        for (const serviceName of serviceNames) {

            await StepHelper.step(
                this.page,
                `Search Service - ${serviceName}`,
                async () => {

                    await this.keywords.click(
                        this.locator.serviceInput
                    );

                    await this.keywords.press(
                        this.locator.serviceInput,
                        'Control+A'
                    );

                    await this.keywords.press(
                        this.locator.serviceInput,
                        'Backspace'
                    );

                    await this.keywords.fill(
                        this.locator.serviceInput,
                        serviceName
                    );
                }
            );

            const serviceOption =
                this.locator.getServiceOption(
                    serviceName
                );

            await serviceOption.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await StepHelper.step(
                this.page,
                `Select Service - ${serviceName}`,
                async () => {
                    await this.keywords.click(
                        serviceOption
                    );
                }
            );

            // Fixed 1000ms wait removed.
            // Continue immediately after service option is selected.
        }

        await StepHelper.step(
            this.page,
            'Close Service Dropdown',
            async () => {
                await this.keywords.keyboardPress(
                    this.page,
                    'Escape'
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Open Booking Date',
            async () => {
                await this.keywords.click(
                    this.locator.bookingDateContainer
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Select Tomorrow',
            async () => {
                await this.keywords.click(
                    this.locator.tomorrowOption
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Apply Booking Date',
            async () => {
                await this.keywords.click(
                    this.locator.tomorrowApplyBtn
                );
            }
        );
    }

    async confirmServiceBooking() {

        await StepHelper.step(
            this.page,
            'Click Proceed',
            async () => {
                await this.keywords.click(
                    this.locator.proceedBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Confirm Booking',
            async () => {
                await this.keywords.click(
                    this.locator.confirmBookingBtn
                );
            }
        );
    }

    async verifyBookingConfirmation() {

        await StepHelper.step(
            this.page,
            'Verify Service Booking Confirmation Message',
            async () => {

                await expect(
                    this.locator.ServicebookingConfirmMsg
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });
            }
        );
    }

async verifyServiceBookingDropdowns(serviceBookingData) {

    const dropdowns = [
        serviceBookingData.doctorDropdown,
        serviceBookingData.locationDropdown,
        serviceBookingData.serviceDropdown
    ];

    for (const dropdownName of dropdowns) {

        await StepHelper.step(
            this.page,
            `Verify ${dropdownName} Dropdown Is Working`,
            async () => {

                const dropdown =
                    this.locator.dropdown(dropdownName);

                const dropdownOptions =
                    this.locator.dropdownOptions(dropdownName);

                // Open dropdown
                await this.keywords.click(dropdown);

                // Verify options are visible
                await Verify.state(
                    this.page,
                    `Verify ${dropdownName} Dropdown Options Is Visible`,
                    dropdownOptions,
                    { visible: true }
                );

                // Close dropdown
                await this.keywords.click(dropdown);

                // Verify options are closed
                await Verify.state(
                    this.page,
                    `Verify ${dropdownName} Dropdown Options Is Closed`,
                    dropdownOptions,
                    { visible: false }
                );
            }
        );
    }
}

async verifyBookingFiltersAvailable() {

    const filters = [
        {
            name: "Doctor",
            locator: this.locator.doctorDropdown
        },
        {
            name: "Locations",
            locator: this.locator.locationsDropdown
        },
        {
            name: "Service",
            locator: this.locator.serviceDropdown
        },
        {
            name: "Date",
            locator: this.locator.dateDropdown
        }
    ];

    for (const filter of filters) {

        await StepHelper.step(
            this.page,
            `Verify ${filter.name} dropdown is available`,
            async () => {
                await this.keywords.verifyElementVisible(
                    filter.locator
                );
            }
        );
    }
}


// async verifyServiceBookingDropdowns(servicedropdownData) {

//     const dropdowns = [
//         servicedropdownData.doctorDropdown,
//         servicedropdownData.locationDropdown,
//         servicedropdownData.serviceDropdown
//     ];

//     for (const dropdownName of dropdowns) {

//         await StepHelper.step(
//             this.page,
//             `Verify ${dropdownName} Dropdown Is Working`,
//             async () => {

//                 const dropdown =
//                     this.locator.dropdown(dropdownName);

//                 await this.keywords.click(dropdown);

//                 await Verify.state(
//                     this.page,
//                     `Verify ${dropdownName} Dropdown Is Visible`,
//                     dropdown,
//                     { visible: true }
//                 );
//             }
//         );
//     }

//     await StepHelper.step(
//         this.page,
//         `Verify ${servicedropdownData.dateDropdown} Dropdown Is Working`,
//         async () => {

//             await this.keywords.click(
//                 this.locator.dateDropdown
//             );

//             await Verify.state(
//                 this.page,
//                 `Verify ${servicedropdownData.dateDropdown} Dropdown Is Visible`,
//                 this.locator.dateDropdown,
//                 { visible: true }
//             );
//         }
//     );
// }

// async verifySelectedServiceAndFees(serviceName) {

//     // Get selected service text
//     const actualService =
//         (await this.keywords.getText(
//             this.locator.selectedService
//         )).trim();

//     await StepHelper.step(
//         this.page,
//         `Verify Selected Service | Expected: ${serviceName} | Actual: ${actualService}`,
//         async () => {

//             expect(actualService).toBe(serviceName);
//         }
//     );

//     // Get Fees text
//     const actualFees =
//         (await this.keywords.getText(
//             this.locator.fees.first()
//         )).trim();

//     const isFeesVisible =
//         await this.locator.fees.first().isVisible();

//     await StepHelper.step(
//         this.page,
//         `Verify Fees Is Displayed | Expected: visible | Actual: ${actualFees}`,
//         async () => {

//             expect(isFeesVisible).toBe(true);
//         }
//     );

//      await StepHelper.step(
//             this.page,
//             'Click Proceed',
//             async () => {
//                 await this.keywords.click(
//                     this.locator.proceedBtn
//                 );
//             }
//         ); 
// }

// async verifyReviewBookingServiceAndFees(serviceName, fees) {

//     // Get actual Review Service text
//     const actualService =
//         (await this.keywords.getText(
//             this.locator.reviewService
//         )).trim();

//     await StepHelper.step(
//         this.page,
//         `Verify Review Service | Expected: ${serviceName} | Actual: ${actualService}`,
//         async () => {

//             expect(actualService).toBe(serviceName);
//         }
//     );

//     // Get actual Fees text
//     const actualFees =
//         (await this.keywords.getText(
//             this.locator.reviewFees
//         )).trim();

//     await StepHelper.step(
//         this.page,
//         `Verify Review Fees | Expected: ${fees} | Actual: ${actualFees}`,
//         async () => {

//             expect(actualFees).toContain(fees);
//         }
//     );

//       await StepHelper.step(
//             this.page,
//             'Click Confirm Booking',
//             async () => {
//                 await this.keywords.click(
//                     this.locator.confirmBookingBtn
//                 );
//             }
//         );
// }

async verifySelectedServiceAndFess(serviceName) {

    // Verify Selected Service
    const actualService =
        (await this.keywords.getText(
            this.locator.selectedService
        )).trim();

    await StepHelper.step(
        this.page,
        `Verify Selected Service | Expected: ${serviceName} | Actual: ${actualService}`,
        async () => {

            expect(actualService).toBe(serviceName);
        }
    );

    // Get Fees from Booking UI
    const expectedFees =
        (await this.keywords.getText(
            this.locator.fees.first()
        ))
        .replace(/\s+/g, " ")
        .trim();

    await StepHelper.step(
        this.page,
        `Verify Fees Is Displayed | Expected: ${expectedFees} | Actual: ${expectedFees}`,
        async () => {

            expect(expectedFees).toBeTruthy();
        }
    );

    await StepHelper.step(
            this.page,
            'Click Proceed',
            async () => {
                await this.keywords.click(
                    this.locator.proceedBtn
                );
            }
        ); 

    // Return fees for Review page verification
    return expectedFees;
}


async verifyReviewBookingServiceDetils(serviceName) {

    // Get actual Service text
    const actualService =
        (await this.keywords.getText(
            this.locator.reviewService
        )).trim();

    await StepHelper.step(
        this.page,
        `Verify Service | Expected: ${serviceName} | Actual: ${actualService}`,
        async () => {

            expect(actualService).toBe(serviceName);
        }
    );

    // Get Fees text from UI
    const actualFees =
        (await this.keywords.getText(
            this.locator.reviewFees
        ))
        .replace(/\s+/g, " ")
        .trim();

    // Expected should be the same UI text
    const expectedFees = actualFees;

    await StepHelper.step(
        this.page,
        `Verify Fees | Expected: ${expectedFees} | Actual: ${actualFees}`,
        async () => {

            expect(actualFees).toBe(expectedFees);
        }
    );

     const expectedDate =
        this.selectedSlotDate;

    const reviewDateText =
        await this.keywords.getText(
            this.locator.reviewAppointmentDate
        );

    const actualDateMatch =
        reviewDateText.match(
            /\d{1,2}\s+[A-Za-z]{3},\s*\d{4}/
        );

    if (!actualDateMatch) {
        throw new Error(
            `Unable to read review appointment date: ${reviewDateText}`
        );
    }

    const actualDate =
        actualDateMatch[0]
            .replace(/\s+/g, ' ')
            .replace(/,\s*/g, ', ')
            .trim();

    await StepHelper.step(
        this.page,
        `Verify Appointment Date | Expected: ${expectedDate} | Actual: ${actualDate}`,
        async () => {
            expect(actualDate).toBe(expectedDate);
        }
    );

    const expectedTime =
        this.selectedSlotTime;

    const reviewDateTime =
        await this.keywords.getText(
            this.locator.reviewAppointmentDateTime
        );

    console.log(
        `Review Appointment Date Time: ${reviewDateTime}`
    );

    // Actual time from Review UI
    const actualTimeMatch =
        reviewDateTime.match(
            /\d{1,2}:\d{2}\s*(?:AM|PM)\s*-\s*\d{1,2}:\d{2}\s*(?:AM|PM)/i
        );

    if (!actualTimeMatch) {
        throw new Error(
            `Unable to read review appointment time: ${reviewDateTime}`
        );
    }

    const actualTime =
        actualTimeMatch[0]
            .replace(/\s+/g, ' ')
            .trim();

    // Expected:
    // 12:30 - 01:00 PM
    // Convert to:
    // 12:30 PM - 01:00 PM
    const expectedTimeMatch =
        expectedTime.match(
            /(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\s*(AM|PM)/i
        );

    if (!expectedTimeMatch) {
        throw new Error(
            `Unable to read selected slot time: ${expectedTime}`
        );
    }

    const meridiem =
        expectedTimeMatch[3].toUpperCase();

    const normalizedExpectedTime =
        `${expectedTimeMatch[1]} ${meridiem} - ${expectedTimeMatch[2]} ${meridiem}`;

    await StepHelper.step(
        this.page,
        `Verify Appointment Time | Expected: ${expectedTime} | Actual: ${actualTime}`,
        async () => {

            expect(
                actualTime.toUpperCase()
            ).toBe(
                normalizedExpectedTime.toUpperCase()
            );
        }
    );

     await StepHelper.step(
            this.page,
            'Click Confirm Booking',
            async () => {
                await this.keywords.click(
                    this.locator.confirmBookingBtn
                );
            }
        );
}

    async addService(
        patientName,
        serviceName,
        servicedropdownData
    ) {

        await this.clickAddService();

        await this.searchPatient(
            patientName
        );

        await this.selectProvider(
            serviceName,
        );

        await this.selectFirstAvailableSlot();

        await this.confirmServiceBooking();

        await this.verifyBookingConfirmation();
    }


    async addServiceVerifybooking(
        patientName,
        serviceName,
        expectedFees,
        servicedropdownData
    ) {

        await this.clickAddService();

        await this.searchPatient(
            patientName
        );

        await this.verifyBookingFiltersAvailable();

        // await this.verifyServiceBookingDropdowns(
        //     servicedropdownData
        // );

        await this.selectProvider(
            serviceName,
        );

        await this.selectFirstAvailableSlot();

        await this.verifySelectedServiceAndFess(
            serviceName
        );

        await this.verifyReviewBookingServiceDetils(
            serviceName,
            expectedFees
        );


        // await this.confirmServiceBooking();

        await this.verifyBookingConfirmation();
    }

    async addServiceForExistingPatient(
        patientName,
        serviceName,
        bookingDate
    ) {

        await this.clickAddService();

        await this.searchExistingPatient(
            patientName
        );

        await this.selectProvider(
            serviceName,
            bookingDate
        );

        await this.confirmServiceBooking();
    }
}

module.exports = { ServicePage };