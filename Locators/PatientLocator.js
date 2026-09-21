class PatientLocator {

    constructor(page) {
        this.page = page;

        // Buttons
        this.addNewBtn = page.getByRole('button', {
            name: 'Add New'
        });

        this.addPatientBtn = page.getByRole('button', {
            name: 'Add Patient'
        });

        this.saveBtn = page.getByRole('button', {
            name: 'Save'
        });


        // Patient Fields
        this.patientNameTxt = page.getByRole('textbox', {
            name: 'Enter patient name'
        });

        this.phoneTxt = page.getByRole('textbox', {
            name: 'Enter phone number'
        });

        this.notesTxt = page.getByRole('textbox', {
            name: 'Write down',
            exact: true
        });

        this.emailTxt = page.getByRole('textbox', {
            name: 'Write down email address'
        });

        this.ageTxt = page.getByPlaceholder(
            'Enter age'
        );

        this.addressTxt = page.getByRole('textbox', {
            name: 'Write down resident address'
        });


        // Title
        this.titleDropdown = page.getByRole('button', {
            name: 'All',
            exact: true
        });

        this.mrOption = page.locator('div').filter({
            hasText: /^Mr$/
        });


        // Gender
        this.maleBtn = page.getByRole('button', {
            name: 'Male',
            exact: true
        });

        this.femaleBtn = page.getByRole('button', {
            name: 'Female',
            exact: true
        });


        // Success Message
        this.patientSavedMsg = page.locator(
            'div.toaster-wrapper.success .text-content .title'
        );


        // Search Patient
        this.searchPatientTxt = page.getByRole(
            'textbox',
            {
                name: 'Search with patient name or'
            }
        );

        this.salutationDropdownBtn = page.locator('button.dropdown-button').first();

        this.mobileNumberTxt = page.getByPlaceholder('Enter phone number');

        this.referralByTxt = page.getByPlaceholder('Write down').first();

        this.dobComponent = page.locator('app-customcalendarinput:visible').first();

        this.calendarHeader = this.dobComponent.locator('.calendar-header');

        this.calendarHeaderTitle = this.calendarHeader.locator('h3').first();

        this.otherGenderBtn = page.getByRole('button', { name: 'Other', exact: true });

        this.successToastTitle = page.locator('div.toaster-wrapper.success .text-content .title').first();

        this.salutationDropdownList = page.locator('div.dropdown-list').first();

        this.goToPatientProfileLink = page.locator(
            'div.toaster-wrapper.success span.action'
        ).filter({ hasText: 'Go to patient profile' });

        this.patientProfileNameText = page.locator(
            'div.patient-name-block div.patient-name span'
        ).first();

        this.profileUhidText = page.locator('div.patient-uhid');

        this.profileGenderAgeText = page.locator('div.patient-gender-age');


         this.profileEmailText = page.locator(
            'div.meta-row:has(i.fa-at) span'
        );
        this.profilePhoneText = page.locator(
            'div.meta-row:has(i.fa-phone) span'
        );
        this.profileAddressText = page.locator(
            'div.meta-row:has(i.fa-location-dot) span'
        );
        this.profileReferralSourceValue = page.locator(
            'div.info-text'
        ).filter({
            has: page.locator('div.info-label', {
                hasText: 'Patient referral source'
            })
        }).locator('div.info-value');
    }


    getPatient(patientName) {

        // The patient list can hold more than one row with the same title when
        // a generated name already exists in the environment, so resolve to the
        // first match instead of raising a strict-mode violation.
        return this.page.locator(
            `//div[@title="${patientName}"]`
        ).first();
    }
    
    getSalutationOption(salutation) {
        return this.salutationDropdownList
            .locator('div.dropdown-item')
            .filter({ hasText: new RegExp(`^\\s*${salutation}\\s*$`) });
    }

    getMonthButton(monthName) {
        return this.calendarMonthYearPopup
            .locator('button')
            .filter({ hasText: new RegExp(`^\\s*${monthName}\\s*$`) });
    }

    getYearButton(year) {
        return this.calendarMonthYearPopup
            .locator('button')
            .filter({ hasText: new RegExp(`^\\s*${year}\\s*$`) });
    }

     get saveDateBtn() {
        return this.calendarMonthYearPopup.getByRole('button', {
            name: 'Save',
            exact: true
        });
    }

    getDayLocator(day) {
        return this.page.locator('div.calendar-day:not(.greyed-out-day)')
            .filter({ hasText: new RegExp(`^\\s*${day}\\s*$`) });
    }

    get treatingDoctorTxt() {
        return this.getAdditionalDetailField('Treating Doctor');
    }

    get medicalConditionTxt() {
        return this.getAdditionalDetailField('Medical Condition');
    }

    get pincodeTxt() {
        return this.getAdditionalDetailField('Pincode');
    }

    get patientCategoryTxt() {
        return this.getAdditionalDetailField('Patient Category');
    }

    get calendarMonthYearPopup() {
        return this.page.locator(
            'button.calendar-header-options-section-monthName-button'
        ).first().locator(
            'xpath=ancestor::*[.//button[normalize-space()="Cancel"] and .//button[normalize-space()="Save"]][1]'
        );
    }

     getAdditionalDetailField(labelText) {
        return this.page.locator('div.form-group.mb-3')
            .filter({ has: this.page.locator('label', { hasText: labelText }) })
            .locator('input.form-control');
    }
}

module.exports = { PatientLocator };