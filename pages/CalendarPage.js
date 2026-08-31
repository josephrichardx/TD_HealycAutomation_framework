const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { CalendarLocator } = require('../Locators/CalendarLocator');
const { Keywords } = require('../utils/Keywords');
const {
    appointmentActionData
} = require('../testdata/appointmentData.json');
const { waitData } = require('../testdata/waitData.json');

class CalendarPage {

    constructor(page) {
        this.page = page;
        this.locator = new CalendarLocator(page);
        this.keywords = new Keywords();
    }


    // async navigateToBookingDate(bookingDate) {

    //     await StepHelper.step(
    //         this.page,
    //         `Navigate To Booking Date - ${bookingDate}`,
    //         async () => {

    //             for (let i = 0; i < 31; i++) {

    //                 const dateText = (
    //                     await this.keywords.getText(
    //                         this.locator.calendarDate
    //                     )
    //                 ).trim();

    //                 console.log(`Calendar Date: ${dateText}`);

    //                 const match = dateText.match(/\d+/);

    //                 if (!match) {
    //                     throw new Error(
    //                         `Unable to read calendar date: ${dateText}`
    //                     );
    //                 }

    //                 const currentDate = Number(match[0]);
    //                 const targetDate = Number(bookingDate);

    //                 if (currentDate === targetDate) {
    //                     console.log(
    //                         `Booking date reached: ${bookingDate}`
    //                     );
    //                     return;
    //                 }

    //                 if (currentDate > targetDate) {

    //                     await this.keywords.click(
    //                         this.locator.nextDayBtn
    //                     );//update

    //                 } else {

    //                     await this.keywords.click(
    //                         this.locator.previousDayBtn
    //                     );
    //                 }

    //                 await this.keywords.wait(
    //                     this.page,
    //                     500
    //                 );
    //             }

    //             throw new Error(
    //                 `Unable to reach booking date: ${bookingDate}`
    //             );
    //         }
    //     );
    // }

// async navigateToBookingDate(bookingDate) {

//     await StepHelper.step(
//         this.page,
//         `Navigate To Booking Date - ${bookingDate}`,
//         async () => {

//             for (let i = 0; i < 31; i++) {

//                 const dateText =
//                     (
//                         await this.keywords.getText(
//                             this.locator.calendarDate
//                         )
//                     ).trim();

//                 console.log(
//                     `Calendar Date: ${dateText}`
//                 );

//                 const match =
//                     dateText.match(/\d+/);

//                 if (!match) {
//                     throw new Error(
//                         `Unable to read current date: ${dateText}`
//                     );
//                 }

//                 const currentDate =
//                     Number(match[0]);

//                 const targetDate =
//                     Number(bookingDate);

//                 if (currentDate === targetDate) {

//                     console.log(
//                         `Booking date reached: ${bookingDate}`
//                     );

//                     return;
//                 }

//                 if (currentDate < targetDate) {

//                     await this.keywords.click(
//                         this.locator.nextDayBtn
//                     );

//                 } else {

//                     await this.keywords.click(
//                         this.locator.previousDayBtn
//                     );
//                 }

//                 await this.keywords.wait(
//                     this.page,
//                     500
//                 );
//             }

//             throw new Error(
//                 `Unable to reach booking date: ${bookingDate}`
//             );
//         }
//     );
// }
async navigateToBookingDate(bookingDate) {

    await StepHelper.step(
        this.page,
        `Navigate To Booking Date - ${bookingDate}`,
        async () => {

            // Calendar starts from today's date
            let currentDate = new Date();

            // Convert booking date: "01 Sep, 2026"
            const targetDate = new Date(bookingDate);

            for (let i = 0; i < 31; i++) {

                console.log(
                    `Current Calendar Date: ${currentDate.toDateString()}`
                );

                console.log(
                    `Target Booking Date: ${targetDate.toDateString()}`
                );

                // Date reached
                if (
                    currentDate.toDateString() ===
                    targetDate.toDateString()
                ) {

                    console.log(
                        `Booking date reached: ${bookingDate}`
                    );

                    return;
                }

                // Target is after current → NEXT
                if (currentDate < targetDate) {

                    await this.keywords.click(
                        this.locator.nextDayBtn
                    );

                    // Move current date +1
                    currentDate.setDate(
                        currentDate.getDate() + 1
                    );

                } else {

                    // Target is before current → PREVIOUS
                    await this.keywords.click(
                        this.locator.previousDayBtn
                    );

                    // Move current date -1
                    currentDate.setDate(
                        currentDate.getDate() - 1
                    );
                }

                await this.keywords.wait(
                    this.page,
                    waitData.shortWait
                );
            }

            throw new Error(
                `Unable to reach booking date: ${bookingDate}`
            );
        }
    );
}

    async searchPatient(patientName) {

        await StepHelper.step(
            this.page,
            `Search Patient From Calendar - ${patientName}`,
            async () => {

                
                await this.keywords.waitForElement(
                    this.locator.patientSearch
                );

                await this.keywords.click(
                    this.locator.patientSearch
                );

                await this.keywords.clear(
                    this.locator.patientSearch
                );

                await this.keywords.fill(
                    this.locator.patientSearch,
                    patientName
                );

                console.log(
                    `Searching Patient: ${patientName}`
                );

                await this.keywords.wait(
                    this.page,
                    waitData.searchRefresh
                );
            }
        );
    }


    async hoverPatient(patientName) {

        await StepHelper.step(
            this.page,
            `Hover Patient - ${patientName}`,
            async () => {

                // const patientResult =
                //     this.locator.patientResults
                //         .filter({
                //             hasText: patientName
                //         })
                //         .first();

                const patientResult =
                this.locator.patientResult(patientName);

                await this.keywords.waitForElement(
                    patientResult,
                    30000
                );

                await this.keywords.scrollIntoViewIfNeeded(
                    patientResult
                );

                await this.keywords.hover(
                    patientResult
                );

                console.log(
                    `Hovered Patient: ${patientName}`
                );
            }
        );
    }

    async clickPatient(patientName) {

    await StepHelper.step(
        this.page,
        `Click Patient - ${patientName}`,
        async () => {

            // const patientResult =
            //     this.locator.patientResults
            //         .filter({
            //             hasText: patientName
            //         })
            //         .first();

            const patientResult =
            this.locator.patientResult(patientName);

            await this.keywords.waitForElement(
                patientResult,
                30000
            );

            await this.keywords.scrollIntoViewIfNeeded(
                patientResult
            );

            await this.keywords.click(
                patientResult
            );

            console.log(
                `Clicked Patient: ${patientName}`
            );
        }
    );
}

async dismissOpenAppointmentDetailsPanel() {
    await StepHelper.step(
        this.page,
        'Dismiss any leftover open Appointment Details panel',
        async () => {
            const detailsPanel = this.locator.appointmentDetailsPanel;
            const isOpen = await detailsPanel
                .isVisible()
                .catch(() => false);
            if (isOpen) {
                await this.page.keyboard.press('Escape');
                await detailsPanel
                    .waitFor({ state: 'hidden' })
                    .catch(() => {});
            }
        }
    );
}
 
    async openPatientAppointmentForceHover(patientName) {
 
 
        await StepHelper.step(

            this.page,

            `Open Patient Appointment (force hover) - ${patientName}`,

            async () => {
 
 
                const patientResult =

                    this.locator.patientResult(patientName);
 
 
                await this.keywords.waitForElement(

                    patientResult
                );
 
 
                await patientResult.scrollIntoViewIfNeeded();
 
 
                // A transient app-appointment-details panel can render mid-flight

                // and intercept pointer events, so force the hover through it.

                await patientResult.hover({ force: true });
 
 
                const viewAppointmentBtn =

                    this.locator.viewAppointmentBtn;
 
 
                await viewAppointmentBtn.waitFor({

                    state: 'attached'

                });
 
 
                await viewAppointmentBtn.evaluate(

                    button => button.click()

                );
 
 
                console.log(

                    `View Appointment clicked: ${patientName}`

                );

            }

        );

    }
 
 
    async selectPatientFromCalendarForceHover(
    patientName,
    bookingDate
) {
    await this.navigateToBookingDate(
        bookingDate
    );
    await this.dismissOpenAppointmentDetailsPanel();
    await this.searchPatient(
        patientName
    );
    await this.hoverPatient(
        patientName
    );

    await this.openPatientAppointmentForceHover(
        patientName
    );
}

    // Test data supplies the booking date as a day-of-month number (e.g. "28"),
    // which `new Date(bookingDate)` cannot parse (it yields Invalid Date).
    // This variant reads the day number rendered in the calendar header and
    // steps towards the target day instead of relying on a parsed Date.
    async navigateToBookingDayOfMonth(bookingDay) {

        await StepHelper.step(
            this.page,
            `Navigate To Booking Day - ${bookingDay}`,
            async () => {

                const targetDay = Number(
                    String(bookingDay).match(/\d+/)?.[0]
                );

                if (!Number.isInteger(targetDay)) {
                    throw new Error(
                        `Invalid booking day of month: ${bookingDay}`
                    );
                }

                for (let i = 0; i < 31; i++) {

                    const dateText = (
                        await this.keywords.getText(
                            this.locator.calendarDate
                        )
                    ).trim();

                    const match = dateText.match(/\d+/);

                    if (!match) {
                        throw new Error(
                            `Unable to read calendar date: ${dateText}`
                        );
                    }

                    const currentDay = Number(match[0]);

                    console.log(
                        `Current Calendar Day: ${currentDay} | Target Booking Day: ${targetDay}`
                    );

                    if (currentDay === targetDay) {
                        console.log(
                            `Booking day reached: ${targetDay}`
                        );
                        return;
                    }

                    if (currentDay < targetDay) {
                        await this.keywords.click(
                            this.locator.nextDayBtn
                        );
                    } else {
                        await this.keywords.click(
                            this.locator.previousDayBtn
                        );
                    }

                    await this.keywords.wait(
                        this.page,
                        waitData.shortWait
                    );
                }

                throw new Error(
                    `Unable to reach booking day: ${bookingDay}`
                );
            }
        );
    }

    // Same flow as selectPatientFromCalendarForceHover, but navigates using a
    // day-of-month booking value instead of a full date string.
    async selectPatientFromCalendarForceHoverByDay(
        patientName,
        bookingDay
    ) {
        await this.navigateToBookingDayOfMonth(
            bookingDay
        );
        await this.dismissOpenAppointmentDetailsPanel();
        await this.searchPatient(
            patientName
        );
        await this.hoverPatient(
            patientName
        );
        await this.openPatientAppointmentForceHover(
            patientName
        );
    }


      async clickSidebarCalendarIcon() {
 
 
        await StepHelper.step(
            this.page,
            'Click Calendar icon on the left sidebar to return to the dashboard',
            async () => {
 
 
                await this.keywords.waitForElement(
                    this.locator.sidebarCalendarIcon
                );


                await this.keywords.click(
                    this.locator.sidebarCalendarIcon
                );


                await this.page
                    .waitForURL(
                        (url) => url.pathname.includes(
                            appointmentActionData.dashboardPath
                        )
                    )
                    .catch(() => {});
 
 
                console.log('Navigated back to the Calendar (dashboard) via sidebar icon');
            }
        );
    }
  
 
    async openPatientAppointment(patientName) {

        await StepHelper.step(
            this.page,
            `Open Patient Appointment - ${patientName}`,
            async () => {

                const patientResult =
                this.locator.patientResult(patientName);

                await this.keywords.waitForElement(
                    patientResult
                );

                await this.keywords.hover(
                    patientResult
                );


                const viewAppointmentBtn =
                        this.locator.viewAppointmentBtn;

                    await viewAppointmentBtn.waitFor({
                        state: 'attached'
                    });

                // Avoid hover animation stability issue
                await viewAppointmentBtn.evaluate(
                    button => button.click()
                );

                console.log(
                    `View Appointment clicked: ${patientName}`
                );
            }
        );
    }

    async BookAppointment(patientName) {

    await StepHelper.step(
            this.page,
            `Click Book Appointment - ${patientName}`,
            async () => {

             const patientResult =
                this.locator.patientResult(patientName);

                await this.keywords.waitForElement(
                    patientResult
                );

                await this.keywords.hover(
                    patientResult
                );

            const bookAppointmentBtn =
                this.locator.bookAppointmentBtn;

            await bookAppointmentBtn.waitFor({
                state: 'attached'
            });

            // Avoid animation stability issue
            await bookAppointmentBtn.evaluate(
                button => button.click()
            );

            console.log(
                'Book Appointment clicked'
            );
        }
    );
}


    async selectPatientFromCalendar(
        patientName,
        bookingDate
    ) {

        await this.navigateToBookingDate(
            bookingDate
        );

        await this.searchPatient(
            patientName
        );

        await this.hoverPatient(
            patientName
        );

        await this.openPatientAppointment(
            patientName
        );
    }

    // Same flow as selectPatientFromCalendar, but the booking value is a
    // day-of-month ("28"), which `new Date()` cannot parse.
    async selectPatientFromCalendarByDay(
        patientName,
        bookingDay
    ) {

        await this.navigateToBookingDayOfMonth(
            bookingDay
        );

        await this.searchPatient(
            patientName
        );

        await this.hoverPatient(
            patientName
        );

        await this.openPatientAppointment(
            patientName
        );

        return await this.keywords.getText(
            this.locator.calendarDate
        );
    }

async verifyStatus(expectedStatus) {

    await StepHelper.step(
        this.page,
        `Verify Status - ${expectedStatus}`,
        async () => {

            const status =
                this.locator.getStatus(
                    expectedStatus
                );

            await this.keywords.waitForElement(
                status
            );

            await expect(
                status
            ).toBeVisible();
        }
    );
}

    async PatientFromCalendarBookPackage(
        patientName,
        bookingDate
    ) {

        await this.searchPatient(
            patientName
        );

        await this.BookAppointment(
            patientName
        );
    }

     async PatientFromCalendarView(
        patientName,expectedStatus
    ) {
        await this.searchPatient(
            patientName
        );

        await this.openPatientAppointment(
            patientName
        );

        await this.verifyStatus(
        expectedStatus
        );
    }

    async selectPatientAddAdmission(
        patientName,
        bookingDate
    ) {

        // await this.navigateToBookingDate(
        //     bookingDate
        // );

        await this.searchPatient(
            patientName
        );

        await this.clickPatient(
            patientName
        );
    

    }
}


module.exports = { CalendarPage };