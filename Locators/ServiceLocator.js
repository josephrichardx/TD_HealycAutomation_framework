class ServiceLocator {

    constructor(page) {
        this.page = page;

        // Buttons
        this.addNewBtn = page.getByRole('button', {
            name: 'Add New'
        });

        this.addServiceBtn = page.getByRole('button', {
            name: 'Add Service'
        });

        this.proceedBtn = page.getByText(
            'Proceed'
        );

        this.confirmBookingBtn = page.getByText(
            'Confirm Booking'
        );

        this.bookingConfirmMsg = page.getByText(
            'Booking confirm'
        );


        // Custom Slots
        this.addCustomSlotsBtn = page.getByText(
            'Add custom slots'
        ).first();

        this.clockIcon = page.locator(
            '.fa-clock'
        ).first();

        this.timeOption = page.getByText(
            '10',
            {
                exact: true
            }
        ).first();

        this.setBtn = page.getByRole(
            'button',
            {
                name: 'Set'
            }
        );

        this.updateBtn = page.getByRole(
            'button',
            {
                name: 'Update'
            }
        );


        // Patient Search
        this.patientSearchTxt = page.getByRole(
            'textbox',
            {
                name: 'Search with patient name or'
            }
        );


        // Provider / Service Dropdown
        this.providerDropdown = page.locator(
            'app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title'
        );


        // Service Search
        this.serviceInput = page.locator(
            "//div[@class='search-icon']//following::input[@type='text']"
        );


        // Booking Date
        this.bookingDateContainer = page.locator(
            "//div[@class='range-date-container']"
        );

        this.currentMonth = page.locator(
            '#currentMonth'
        );

        this.applyBtn = page.getByText(
            'Apply'
        ).nth(1);

        this.tomorrowOption = page.locator(
            "//div[text()='Tomorrow ']"
        );

        this.tomorrowApplyBtn = page.locator(
            "//div[@class='range-date-option-footter']//following::div[text()=' Apply ']"
        );


        // Available Slot
        this.slotButton = page.locator(
            '.slotButton'
        );
    }


    // Dynamic Patient Locator
    getPatient(patientName) {

        return this.page.locator(
            `//div[@title="${patientName}"]`
        );
    }


    // Existing Patient Locator
    getExistingPatient() {

        return this.page.locator(
            "//div[contains(@class,'suggested-list-item')]"
        ).first();
    }


    // Dynamic Service Option
    getServiceOption(serviceName) {

        return this.page.locator(
            `xpath=(//div[normalize-space()='${serviceName}'])[3]`
        );
    }
}

module.exports = { ServiceLocator };