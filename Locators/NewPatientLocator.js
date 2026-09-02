class NewPatientLocator {

    constructor(page) {
        this.page = page;

        this.addNewBtn = page.getByRole('button', { name: 'Add New' });
        this.addPatientBtn = page.getByRole('button', { name: 'Add Patient' });

        this.panelTitle = page.getByText('Add New Patient', { exact: true });

        this.patientNameTxt = page.getByPlaceholder('Enter patient name');

        this.mobileNumberTxt = page.getByPlaceholder('Enter phone number');

        this.whatsappToggle = page.getByText(
            'Is this number on WhatsApp ?'
        ).locator('..').locator('input[type="checkbox"], button[role="switch"]');

        this.referralByTxt = page.getByPlaceholder('Write down').first();

        this.emailTxt = page.getByPlaceholder('Write down email address');

        this.ageTxt = page.locator('div.section-column').filter({
            has: page.locator('div.section-paragraph', { hasText: 'Age' })
        }).locator('input[placeholder="Enter age"]');

        this.maleBtn = page.getByRole('button', { name: 'Male', exact: true });
        this.femaleBtn = page.getByRole('button', { name: 'Female', exact: true });
        this.otherGenderBtn = page.getByRole('button', { name: 'Other', exact: true });

        this.addressTxt = page.getByPlaceholder('Write down resident address');

        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.saveBtn = page.getByRole('button', { name: 'Save' });

        this.patientSavedMsg = page.getByText('Patient Saved successfully');

        this.searchPatientTxt = page.getByPlaceholder('Search or register patient');

        this.salutationDropdownBtn = page.locator('button.dropdown-button').first();
        this.salutationDropdownList = page.locator('div.dropdown-list').first();


        // ---------------------------------------------------------
        // DATE OF BIRTH
        // Uses app-customcalendarinput, the same component
        // AdmissionLocator.js uses for admission date.
        // ---------------------------------------------------------

        this.dobComponent = page.locator('app-customcalendarinput:visible').first();

        this.dobDisplayText = this.dobComponent.locator(
            'span'
        ).filter({ hasText: /\d{1,2}\/\d{1,2}\/\d{4}/ }).last();

        this.calendarHeader = this.dobComponent.locator('.calendar-header');

        this.calendarHeaderTitle = this.calendarHeader.locator('h3').first();


        // ---------------------------------------------------------
        // SAVE CONFIRMATION TOAST (creation)
        // ---------------------------------------------------------

        // Replaces all hardcoded success toasts with a single dynamic locator
        this.successToastTitle = page.locator('div.toaster-wrapper.success .text-content .title').first();

        this.inlineFieldError = page.locator('div.field-error').first();

        this.goToPatientProfileLink = page.locator(
            'div.toaster-wrapper.success span.action'
        ).filter({ hasText: 'Go to patient profile' });


        // ---------------------------------------------------------
        // PATIENT PROFILE PAGE
        // ---------------------------------------------------------

        this.patientProfileNameText = page.locator(
            'div.patient-name-block div.patient-name span'
        ).first();

        this.editPatientIcon = page.locator(
            'div.patient-name-block div.editPatient'
        ).first();


        // ---------------------------------------------------------
        // EDIT PATIENT DRAWER
        // ---------------------------------------------------------

        this.editPatientPanel = page.locator('app-edit-patient');

        this.editPatientSaveBtn = this.editPatientPanel.getByRole('button', {
            name: 'Save',
            exact: false
        });

        this.editPatientCancelBtn = this.editPatientPanel
            .locator('button.passiveButton')
            .filter({ hasText: 'Cancel' });


        // ---------------------------------------------------------
        // VIP TOOLTIP
        // ---------------------------------------------------------
        this.vipInfoIcon = page.locator('span.vip-info-icon');
        this.vipInfoTooltip = page.locator('div.vip-info-tooltip span');


        // ---------------------------------------------------------
        // VIP CHECKBOX
        // Checked state adds "checked" to the checkBox class list
        // (div.checkBox checked). Same structure confirmed on both
        // the create panel and the edit panel.
        // ---------------------------------------------------------

        this.vipCheckboxToggle = page.locator('div.checkMark div.checkBox').first();
        this.vipCheckboxState = page.locator('div.checkMark div.checkBox').first();


        // ---------------------------------------------------------
        // PATIENT PROFILE PAGE - read-only sidebar fields
        // Confirmed DOM from real screenshots:
        //   div.patient-uhid (UHID)
        //   div.patient-gender-age (combined "Male | 63 Years" text)
        //   div.profile-meta > div.meta-row (one per contact field,
        //     differentiated by icon class: fa-at / fa-phone /
        //     fa-location-dot) > span (the value)
        //   div.medical-details-container > div.medical-info-row >
        //     div.info-text > div.info-label (field name) +
        //     div.info-value (field value) - used for "Patient
        //     referral source"
        // ---------------------------------------------------------
        // ---------------------------------------------------------
        // SAVE CONFIRMATION TOAST (creation)
        // ---------------------------------------------------------

        this.patientSavedToastTitle = page.locator(
            'div.toaster-wrapper.success .text-content .title'
        );

        this.goToPatientProfileLink = page.locator(
            'div.toaster-wrapper.success span.action'
        ).filter({ hasText: 'Go to patient profile' });


        // ---------------------------------------------------------
        // ERROR VALIDATION TOASTS (Negative flows)
        // Extracted directly from DOM: div.toaster-wrapper.error
        // ---------------------------------------------------------

        this.errorToastTitle = page.locator(
            'div.toaster-wrapper.error .text-content .title'
        ).first();

        this.errorToastSubtext = page.locator(
            'div.toaster-wrapper.error .text-content .subtext'
        ).first();

        // ---------------------------------------------------------
        // DUPLICATE WARNING BOX (Inline Negative Flow)
        // Extracted directly from DOM: div.duplicate-warning-box
        // ---------------------------------------------------------

        this.duplicateWarningBox = page.locator('div.duplicate-warning-box');
        
        this.duplicateWarningTitle = this.duplicateWarningBox.locator('div.duplicate-title');
        
        this.duplicateWarningMessage = this.duplicateWarningBox.locator('div.duplicate-message');

        // Drawer Close 'X' Button
        this.closeXBtn = page.locator('div.drawer-close-btn');

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


    // Each field is div.form-group.mb-3 wrapping a <label> +
    // input.form-control, identical pattern for all four.
    getAdditionalDetailField(labelText) {
        return this.page.locator('div.form-group.mb-3')
            .filter({ has: this.page.locator('label', { hasText: labelText }) })
            .locator('input.form-control');
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

    get cancelDateBtn() {
        return this.calendarMonthYearPopup.getByRole('button', {
            name: 'Cancel',
            exact: true
        });
    }

    getDayLocator(day) {
        return this.page.locator('div.calendar-day:not(.greyed-out-day)')
            .filter({ hasText: new RegExp(`^\\s*${day}\\s*$`) });
    }


    getPatient(patientName) {
        return this.page
            .locator(`//div[@title="${patientName}"]`)
            .first();
    }

    getSalutationOption(salutation) {
        return this.salutationDropdownList
            .locator('div.dropdown-item')
            .filter({ hasText: new RegExp(`^\\s*${salutation}\\s*$`) });
    }
}

module.exports = { NewPatientLocator };