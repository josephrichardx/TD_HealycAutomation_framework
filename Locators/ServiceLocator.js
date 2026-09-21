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

        this.ServicebookingConfirmMsg = page.getByText(
            'Booking confirm'
        );

        this.proceedBtn = page.getByText(
            'Proceed'
        );

        this.confirmBookingBtn = page.getByText(
            'Confirm Booking'
        );

        this.bookingConfirmToastTitle = page.locator(
            'div.toaster-wrapper.success .text-content .title'
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


        this.patientSearchResult = (patientName) =>
        this.page.getByText(patientName, { exact: true });


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

          this.slotAppointmentCard = (slot) =>
            slot.locator(
                'xpath=ancestor::div[contains(@class,"bookappointmentBodyCard")]'
            );

        

        this.nextDateBtn = page.locator('div.NextListButton').first();


//     //     this.dropdown = (dropdownName) =>
//     // this.page.locator(
//     //     `//app-multi-dropdown[@title="${dropdownName}"]//div[contains(@class,"multi-dropdown-title")]`
//     // );
// this.dropdown = (dropdownName) =>
//     page.locator(
//         `app-multi-dropdown[title="${dropdownName}"] > .multi-dropdown-container > .multi-dropdown-title`
//     );

// this.dateDropdown = page.locator(
//     '//div[contains(@class,"range-date-container")]//span'
// ).first();

// this.dropdownOptions = (dropdownName) =>
//     page.locator(
//         `//app-multi-dropdown[@title="${dropdownName}"]//div[contains(@class,"options")]`
//     );

//     this.dropdownOutsideArea = page.getByRole(
//     'heading',
//     { name: /Book a suitable "Service"/ }
// );

// this.dropdown = (dropdownName) =>
//     page.locator(
//         `app-multi-dropdown[title="${dropdownName}"]`
//     ).locator('.multi-dropdown-title');

// this.dropdownOptions = (dropdownName) =>
//     page.locator(
//         `app-multi-dropdown[title="${dropdownName}"]`
//     ).locator('div.options');

this.dateDropdown = page.locator(
    '//div[contains(@class,"range-date-container")]//span'
).first();

this.dropdownOutsideArea = page.getByRole(
    'heading',
    { name: /Book a suitable "Service"/ }
);

 // Booking Filters
       
        this.bookingFilterNavbar =
            page.locator("app-book-appointment-filter-navbar");

        this.doctorDropdown =
            this.bookingFilterNavbar.getByText("Doctor", { exact: true });

        this.locationsDropdown =
            this.bookingFilterNavbar.getByText("Locations", { exact: true });

        this.serviceDropdown =
            this.bookingFilterNavbar.getByText("Service", { exact: true });

        this.dateDropdown =
            this.bookingFilterNavbar.getByText("Date", { exact: true });


         this.selectedService = page.locator(
            "(//div[@data-toggle='tooltip'])[1]"
        );

        this.fees = page.locator(
            "//div[contains(text(),'Fees:')]"
        ).first();

this.reviewService = this.page.locator(
    "//div[@class='badge reviewConsult']"
);

this.reviewFees = this.page.locator(
    "//div[@class='fees']"
);

this.reviewAppointmentDate = this.page.locator(
    "(//div[@class='normalLabel'])[3]"
);

this.reviewAppointmentDateTime = this.page.locator(
    "(//div[@class='normalLabel'])[3]"
);



    }


    // Dynamic Patient Locator
    getPatient(patientName) {

        // The patient list can hold more than one row with the same title when
        // a generated name already exists in the environment, so resolve to the
        // first match instead of raising a strict-mode violation.
        return this.page.locator(
            `//div[@title="${patientName}"]`
        ).first();
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

   dropdown(dropdownName) {
    return this.page.locator(
        `app-multi-dropdown[title="${dropdownName}"]`
    ).locator(
        "//div[@class='multi-dropdown-title']"
    );
}

dropdownOptions(dropdownName) {
    return this.page.locator(
        `app-multi-dropdown[title="${dropdownName}"]`
    ).locator(
        "//div[@class='multi-dropdown-options']"
    );
}



}

module.exports = { ServiceLocator };