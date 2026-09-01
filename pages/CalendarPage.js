const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { CalendarLocator } = require('../Locators/CalendarLocator');
const { Keywords } = require('../utils/Keywords');

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

                for (let i = 0; i < 31; i++) {

                    const dateText = (
                        await this.keywords.getText(
                            this.locator.calendarDate
                        )
                    ).trim();

                    console.log(`Calendar Date: ${dateText}`);

                    const match = dateText.match(/\d+/);

                    if (!match) {
                        throw new Error(
                            `Unable to read calendar date: ${dateText}`
                        );
                    }

                    const currentDate = Number(match[0]);
                    const targetDate = Number(bookingDate);

                    if (currentDate === targetDate) {
                        console.log(
                            `Booking date reached: ${bookingDate}`
                        );
                        return;
                    }

                    if (currentDate < targetDate) {

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
                        500
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
                    10000
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
                    1500
                );
            }
        );
    }

    // "Verify that the patient has the correct Package Tag" - reads
    // the tag shown under the patient name in the search results
    // dropdown (e.g. "Neuro PT: Aug 27, 2026" - package short name
    // + activation date). Call right after searchPatient() while
    // the dropdown is still open (before openPatientAppointment()/
    // clickPatient() navigates away from it).
    //
    // Checked as two separate pieces rather than one exact string:
    // the package name portion (contains, since the tag shows a
    // shortened form - "Neuro PT" vs testdata's full "Neuro PT (30
    // sessions)" - and there's no separate short-name field to
    // build an exact expected string from) and the date portion
    // (exact match against today, formatted "MMM D, YYYY" from the
    // one confirmed example - flag if this format assumption turns
    // out wrong for other package names/dates).
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

        // Accepts an array of acceptable date strings (today +
        // yesterday, same timezone-boundary tolerance as the
        // Payment History date check - the app can timestamp things
        // a day off from the local machine clock near midnight IST).
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

     
    async clickSidebarCalendarIcon() {
 
 
        await StepHelper.step(

            this.page,

            'Click Calendar icon on the left sidebar to return to the dashboard',

            async () => {
 
 
                await this.keywords.waitForElement(

                    this.locator.sidebarCalendarIcon,

                    10000

                );
 
 
                await this.keywords.click(

                    this.locator.sidebarCalendarIcon

                );
 
 
                await this.page

                    .waitForURL(

                        (url) => url.pathname.includes('/dashboard'),

                        { timeout: 15000 }

                    )

                    .catch(() => {

                        console.log('[clickSidebarCalendarIcon] URL never matched /dashboard - falling through to wait on the search box directly instead.');

                    });

                await this.keywords.waitForElement(
                    this.locator.patientSearch,
                    15000
                );

                // The search box can appear once, then briefly
                // disappear again as the Calendar component finishes
                // loading the day's appointments and re-renders -
                // waiting for network activity to quiet down before
                // considering the page genuinely ready, not just
                // "the search box was attached at some instant".
                // Same networkidle pattern already used elsewhere
                // tonight for this exact class of problem.
                await this.page
                    .waitForLoadState('networkidle', { timeout: 15000 })
                    .catch(() => {});

                await this.keywords.waitForElement(
                    this.locator.patientSearch,
                    15000
                );

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
                    patientResult,
                    10000
                );

                await this.keywords.hover(
                    patientResult
                );


                const viewAppointmentBtn =
                        this.locator.viewAppointmentBtn;

                    await viewAppointmentBtn.waitFor({
                        state: 'attached',
                        timeout: 10000
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
                    patientResult,
                    10000
                );

                await this.keywords.hover(
                    patientResult
                );

            const bookAppointmentBtn =
                this.locator.bookAppointmentBtn;

            await bookAppointmentBtn.waitFor({
                state: 'attached',
                timeout: 10000
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

        await this.openPatientAppointment(
            patientName
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
                10000
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

        await this.navigateToBookingDate(
            bookingDate
        );

        await this.searchPatient(
            patientName
        );

        await this.clickPatient(
            patientName
        );
    

    }

    // "Verify that the cancelled appointment is not displayed in
    // the active appointment view." Correction: the patient still
    // shows up in search results either way - what changes is the
    // tag underneath the name. Confirmed real DOM/screenshot: shows
    // "No appt booked" (span.status-default) instead of the package
    // tag, once cancelled.
    async verifyPatientNotInActiveView(patientName) {

        await this.searchPatient(patientName);

        const actualTag =
            (
                await this.keywords.getText(
                    this.locator.patientNoApptBookedTag(
                        patientName
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Cancelled Appointment Not In Active View | Expected: No appt booked | Actual: ${actualTag}`,
            async () => {

                expect(actualTag).toBe('No appt booked');
            }
        );

        // Dismiss the search results dropdown by clicking away.
        await StepHelper.step(
            this.page,
            'Dismiss Search Results Dropdown (Clicking Outside)',
            async () => {
                
                // Click a safe, neutral spot on the screen (top-left corner) 
                // to force the dropdown to close without triggering other actions.
                await this.page.mouse.click(10, 10);
                
                // Tiny wait to ensure the UI animation finishes hiding the dropdown
                // before the script tries to speed-click the Next Day button.
                await this.page.waitForTimeout(500);
            }
        );
    }

    // "Click the Next day arrow to navigate to the day the package
    // was actually booked on." The toggle resets per day, so this
    // has to happen BEFORE enabling it, not after. daysToAdvance
    // should be the same daysAdvancedForBooking value returned by
    // bookSingleSessionFromAddPackage() back in Step 2 - clicks
    // "Next day" that many times to land on the correct date.
    async navigateToBookedDate(daysToAdvance) {

        for (let i = 0; i < daysToAdvance; i++) {

            await StepHelper.step(
                this.page,
                `Click Next Day (${i + 1} of ${daysToAdvance})`,
                async () => {

                    await this.keywords.click(
                        this.locator.nextDayCalendarBtn
                    );
                }
            );
        }
    }

    // "Enable the Cancelled appointment toggle/filter." Must be
    // called AFTER navigateToBookedDate() - the toggle resets to off
    // on every day change.
    async enableCancelledToggle() {

        await StepHelper.step(
            this.page,
            'Enable Cancelled Appointments Toggle',
            async () => {

                await this.keywords.click(
                    this.locator.showCancelledToggle
                );
            }
        );
    }

    // "Verify that the cancelled appointment is now displayed." +
    // "Click on the cancelled patient/appointment." Correction: this
    // is the card directly on the calendar grid (once navigated to
    // the right day + toggle enabled), not a search-dropdown result -
    // confirmed real DOM/screenshot (div.slot.custom-events-cards).
    async verifyAndClickCancelledAppointmentCard(patientName) {

        const card =
            this.locator.cancelledAppointmentCard(patientName);

        await StepHelper.step(
            this.page,
            `Verify Cancelled Appointment Now Displayed On Calendar | Expected: visible | Actual: checking`,
            async () => {

                await expect(card).toBeVisible();
            }
        );

        await StepHelper.step(
            this.page,
            `Click Cancelled Appointment Card - ${patientName} (Forced)`,
            async () => {

                // Because calendar events frequently overlap in time (stacking visually), 
                // Playwright's standard click gets blocked by the card in front of it.
                // Using evaluate() bypasses the 'obscured' check and forces the click natively.
                await card.evaluate(node => node.click());
            }
        );
    }
}


module.exports = { CalendarPage };