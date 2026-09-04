class CalendarLocator {

    constructor(page) {
        this.page = page;

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

        this.viewAppointmentBtn = page.locator(
            "//div[@class='list-item-wrapper']//button[@class='view-appt-btn']"
        );

        this.bookAppointmentBtn =
        page.locator("//button[@class='book-appt-btn']");

        this.sidebarCalendarIcon = page.locator(
        '#calendar-toggle'
        );

        this.appointmentDetailsPanel = page.locator(
            'app-appointment-details'
        );

}

getStatus(status) {

        return this.page.locator(
            `(//div[@class='status']//following::div[contains(text(),' ${status} ')])[3]`
        );
    }
}

module.exports = { CalendarLocator };