const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { CalendarLocator } = require('../Locators/CalendarLocator');
const { Keywords } = require('../utils/Keywords');

const {
    appointmentActionData
} = require('../testdata/appointmentData.json');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;


class CalendarPage {

    constructor(page) {
        this.page = page;
        this.locator = new CalendarLocator(page);
        this.keywords = new Keywords();
    }


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

                        currentDate.setDate(
                            currentDate.getDate() + 1
                        );

                    } else {

                        // Target is before current → PREVIOUS
                        await this.keywords.click(
                            this.locator.previousDayBtn
                        );

                        currentDate.setDate(
                            currentDate.getDate() - 1
                        );
                    }

                    // Wait only until calendar date is available.
                    // No fixed wait.
                    await this.keywords.waitForElement(
                        this.locator.calendarDate,
                        timeout.elementTimeout
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
                    this.locator.patientSearch,
                    timeout.elementTimeout
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

                // Wait for search result instead of fixed wait
                await this.keywords.waitForElement(
                    this.locator.patientResult(patientName),
                    timeout.elementTimeout
                );
            }
        );
    }


    async hoverPatient(patientName) {

        await StepHelper.step(
            this.page,
            `Hover Patient - ${patientName}`,
            async () => {

                const patientResult =
                    this.locator.patientResult(patientName);

                await this.keywords.waitForElement(
                    patientResult,
                    timeout.elementTimeout
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

                const patientResult =
                    this.locator.patientResult(patientName);

                await this.keywords.waitForElement(
                    patientResult,
                    timeout.elementTimeout
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

                const detailsPanel =
                    this.locator.appointmentDetailsPanel;

                const isOpen = await detailsPanel
                    .isVisible()
                    .catch(() => false);

                if (isOpen) {

                    await this.page.keyboard.press('Escape');

                    await detailsPanel
                        .waitFor({
                            state: 'hidden',
                            timeout: timeout.elementTimeout
                        })
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
                    patientResult,
                    timeout.elementTimeout
                );

                await patientResult.scrollIntoViewIfNeeded();

                await patientResult.hover({
                    force: true
                });

                const viewAppointmentBtn =
                    this.locator.viewAppointmentBtn;

                await viewAppointmentBtn.waitFor({
                    state: 'attached',
                    timeout: timeout.elementTimeout
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

                    const match =
                        dateText.match(/\d+/);

                    if (!match) {
                        throw new Error(
                            `Unable to read calendar date: ${dateText}`
                        );
                    }

                    const currentDay =
                        Number(match[0]);

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

                    // No fixed wait
                    await this.keywords.waitForElement(
                        this.locator.calendarDate,
                        timeout.elementTimeout
                    );
                }

                throw new Error(
                    `Unable to reach booking day: ${bookingDay}`
                );
            }
        );
    }


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
                    this.locator.sidebarCalendarIcon,
                    timeout.elementTimeout
                );

                await this.keywords.click(
                    this.locator.sidebarCalendarIcon
                );

                await this.page
                    .waitForURL(
                        (url) =>
                            url.pathname.includes(
                                appointmentActionData.dashboardPath
                            ),
                        {
                            timeout: timeout.navigationTimeout
                        }
                    )
                    .catch(() => {});

                console.log(
                    'Navigated back to the Calendar (dashboard) via sidebar icon'
                );
            }
        );
    }


    async closeAppointmentDetails() {

        await StepHelper.step(
            this.page,
            'Close appointment details panel',
            async () => {

                await this.keywords.waitForElement(
                    this.locator.sidebarCalendarIcon,
                    timeout.elementTimeout
                );

                await this.keywords.forceClick(
                    this.locator.sidebarCalendarIcon
                );

                await this.page
                    .waitForURL(
                        (url) =>
                            url.pathname.includes(
                                appointmentActionData.dashboardPath
                            ),
                        {
                            timeout: timeout.navigationTimeout
                        }
                    )
                    .catch(() => {});

                await this.page.reload({
                    waitUntil: 'domcontentloaded',
                    timeout: timeout.navigationTimeout
                });
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
                    patientResult,
                    timeout.elementTimeout
                );

                await this.keywords.hover(
                    patientResult
                );

                const viewAppointmentBtn =
                    patientResult
                        .locator("button[class='view-appt-btn']")
                        .first();

                await viewAppointmentBtn.waitFor({
                    state: 'attached',
                    timeout: timeout.elementTimeout
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


    async BookAppointment(patientName) {

        await StepHelper.step(
            this.page,
            `Click Book Appointment - ${patientName}`,
            async () => {

                const patientResult =
                    this.locator.patientResult(patientName);

                await this.keywords.waitForElement(
                    patientResult,
                    timeout.elementTimeout
                );

                await this.keywords.hover(
                    patientResult
                );

                const bookAppointmentBtn =
                    this.locator.bookAppointmentBtn;

                await bookAppointmentBtn.waitFor({
                    state: 'attached',
                    timeout: timeout.elementTimeout
                });

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
                    status,
                    timeout.elementTimeout
                );

                await expect(
                    status
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });
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
        patientName,
        expectedStatus
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

        await this.searchPatient(
            patientName
        );

        await this.clickPatient(
            patientName
        );
    }
}


module.exports = { CalendarPage };