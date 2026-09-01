class CalendarLocator {

    constructor(page) {
        this.page = page;

        // Calendar icon in the left sidebar - clickSidebarCalendarIcon()
        // referenced this.locator.sidebarCalendarIcon but it was
        // never actually defined anywhere in this file (pre-existing
        // gap, not something broken by us). Confirmed DOM:
        // li#calendar-toggle.sidbar-icn (note: "sidbar-icn", not
        // "sidebar-icn" - that's the app's own typo, not ours).
        this.sidebarCalendarIcon = page.locator('#calendar-toggle');

        this.nextDayBtn = page.locator(
            "button[title='Next day']"
        );

        this.previousDayBtn = page.locator(
            "button[title='Previous day']"
        );

        this.calendarDate = page
            .locator('.fc-col-header-cell-cushion')
            .first();

        this.patientSearch = page.getByPlaceholder(
            'Search or register patient'
        );

        this.patientResults = page.locator(
            "//div[@class='list-item-wrapper']"
        );

        this.patientResult = (patientName) =>
            page.locator(
                `//div[@class='list-item-wrapper'][contains(.,'${patientName}')]`
            ).first();

        // Package Tag shown under the patient name in the Calendar
        // Search Bar's results dropdown (e.g. "Neuro PT: Aug 27,
        // 2026"). Confirmed DOM: div.list-item-wrapper >
        // div.user-info-container > div.status-container >
        // div.status-text > span.status-service-future. Scoped as a
        // descendant of patientResult() so it's tied to the same
        // result row, not just any tag on the page.
        this.patientSearchResultTag = (patientName) =>
            this.patientResult(patientName)
                .locator('span.status-service-future');

        // "No appt booked" tag shown instead, once the appointment
        // is cancelled - confirmed real DOM (span.status-default),
        // same scoping pattern as patientSearchResultTag above.
        this.patientNoApptBookedTag = (patientName) =>
            this.patientResult(patientName)
                .locator('span.status-default');

        this.viewAppointmentBtn = page.locator(
            "//div[@class='list-item-wrapper']//button[@class='view-appt-btn']"
        );

        // "Show cancelled"/"Hide cancelled" toggle in the Calendar sidebar.
        // Scoped specifically to the 'canceled' status card to prevent ambiguity.
        this.showCancelledToggle = page.locator(
            '.status-card.canceled .toggle-switch'
        );

        // "Next day" navigation arrow on the calendar - confirmed
        // real DOM: button[title="Next day"].fc-next-button.
        this.nextDayCalendarBtn = page.getByRole('button', {
            name: 'Next day'
        });

        // Cancelled appointment card directly on the calendar grid
        // (not the search dropdown) - confirmed real DOM:
        // div.slot.custom-events-cards containing the patient name
        // and a "Cancelled" status tag. Filtered by patient name
        // text, same pattern as other text-filtered locators in
        // this codebase.
        this.cancelledAppointmentCard = (patientName) =>
            page.locator('div.slot.custom-events-cards')
                .filter({ hasText: patientName });

        this.bookAppointmentBtn =
        page.locator("//button[@class='book-appt-btn']");
        
}

getStatus(status) {

        return this.page.locator(
            `(//div[@class='status']//following::div[contains(text(),' ${status} ')])[3]`
        );
    }
}

module.exports = { CalendarLocator };