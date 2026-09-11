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

        // The date picker pre-renders the previous/next month too for a
        // smooth scroll, but only the month currently in view carries this
        // id, and its real day cells (class "day") are distinguished from
        // the leading blank grid cells (class "none day").
        this.bookingDateSelectableDays = this.bookingDateMonth.locator(
            'div.day:not(.none)'
        );

        // Rendered on the doctor card once a date with real availability is
        // applied - used to detect whether a candidate date has a slot.
        this.availableSlotButtons = page.locator('.slotButton:visible');

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
        
        this.goToAppointmentPageLink = page.getByText(
            'Go to appointment page'
        ).filter({ visible: true });  

        this.appointmentPatientInfoValue = (fieldLabel) =>
            page.locator(
                `//div[contains(@class,'patient-information')]` +
                `//div[contains(@class,'label6')]` +
                `[div[normalize-space()='${fieldLabel}']]` +
                `/div[contains(@class,'label7')]`
            ).last();

        this.cancelledAppointmentCard = (patientName) =>
            page.locator('div.slot.custom-events-cards')
            .filter({ hasText: patientName });

        this.appointmentPatientInfoValue = (fieldLabel) =>
            page.locator(
                `//div[contains(@class,'patient-information')]` +
                `//div[contains(@class,'label6')]` +
                `[div[normalize-space()='${fieldLabel}']]` +
                `/div[contains(@class,'label7')]`
            ).last();

        this.appointmentPaymentDue =
        page.locator(
            "//app-appointment-details//*[normalize-space()='Payment Due']/parent::*//div[contains(@class,'amount-wrapper')]"
        ).first();

        this.appointmentPaymentDueStatus =
        page.locator(
            "//app-appointment-details//*[normalize-space()='Payment Due']/parent::*//span[contains(@class,'status-chip')]"
        ).first();

        this.appointmentPaidAmount =
        page.locator(
            "//app-appointment-details//*[normalize-space()='Paid amount']/parent::*//div[contains(@class,'amount-wrapper')]"
        ).first();

        this.appointmentPaymentHistoryRows =
        page.locator(
            'div.payment-history table tbody tr'
        );

            

            
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
