const {
    appointmentActionData
} = require('../testdata/appointmentData.json');

class AppointmentLocator {

    constructor(page) {
        this.page = page;

        this.patientProfile = page.locator(
            'app-patient-profile'
        );

        this.appointmentDetails = page.locator(
            'app-appointment-details'
        );

        // Either panel can host the appointment being inspected.
        this.appointmentContainer = page.locator(
            'app-appointment-details, app-patient-profile'
        ).first();

        this.addNewBtn = this.patientProfile.getByRole(
            'button',
            { name: appointmentActionData.addNewButton }
        );

        this.addNewBtnForWaitlist = this.patientProfile.getByRole(
            'button',
            { name: appointmentActionData.addNewButton }
        );

        this.addConsultBtn = page.getByRole(
            'button',
            { name: appointmentActionData.addConsultButton }
        );

        this.consultSlotInput = page.locator(
            "xpath=//div[@class='search-icon']//following::input[@type='text']"
        );

        this.bookingDateContainer = page.locator(
            "//div[@class='range-date-container']"
        );

        this.bookingDateMonth = page.locator(
            '#currentMonth'
        );

        this.applyBookingDateBtn = page
            .getByText(appointmentActionData.applyButton)
            .nth(1);

        this.typeDropdownBtn = (typeLabel) => {
            const escapedLabel = typeLabel.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
            );

            return page.getByRole('button', {
                name: new RegExp(`^${escapedLabel}$`),
                exact: true
            }).first();
        };

        this.currentTypeDropdown = (typeLabel) =>
            page.locator(
                `(//span[text()='${typeLabel}'])[1]`
            );

        this.typeOption = (type) =>
            this.patientProfile.getByText(
                type,
                { exact: true }
            ).first();
    }

    getPatientNameInAppointmentPanel(patientName) {
        return this.appointmentDetails
            .locator('.name-edit')
            .filter({ hasText: patientName })
            .first();
    }

    getAddNewMenuItem(menuItem) {
        return this.patientProfile
            .getByText(menuItem, { exact: true })
            .first();
    }

    getExactText(text) {
        return this.page
            .getByText(text, { exact: true })
            .first();
    }

    getConsultOption(consultSlot) {
        return this.page.locator(
            `xpath=(//div[normalize-space()='${consultSlot}'])[1]`
        );
    }

    getBookingDateOption(bookingDate) {
        return this.bookingDateMonth.getByText(
            bookingDate,
            { exact: true }
        );
    }

    // The status badge text is read at runtime, so match it case-insensitively
    // on the expected status coming from the test data.
    getAppointmentStatusBadge(expectedStatus) {
        return this.appointmentContainer.getByText(
            new RegExp(expectedStatus, 'i')
        ).first();
    }
}

module.exports = { AppointmentLocator };
