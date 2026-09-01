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

        // Patient Fields (Visible & Below the fold)
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

        // Additional Fields Below Fold (Treating Doctor, Medical Condition, Pincode, Patient Category)
        this.treatingDoctorTxt = page.locator('input').filter({ has: page.locator('xpath=./ancestor::div[contains(text(), "Treating Doctor") or preceding-sibling::div[contains(text(), "Treating Doctor")]]') }).first()
            .or(page.locator('div.form-group:has-text("Treating Doctor") input, div:has-text("Treating Doctor") input').last());

        this.medicalConditionTxt = page.locator('div.form-group:has-text("Medical Condition") input, div:has-text("Medical Condition") input').last();

        this.pincodeTxt = page.locator('div.form-group:has-text("Pincode") input, div:has-text("Pincode") input').last();

        this.patientCategoryTxt = page.locator('div.form-group:has-text("Patient Category") input, div:has-text("Patient Category") input').last();

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

        this.otherBtn = page.getByRole('button', {
            name: 'Other',
            exact: true
        });

        // Success Message
        this.patientSavedMsg = page.getByText(
            'Patient Saved successfully'
        );

        // Search Patient
        this.searchPatientTxt = page.getByRole(
            'textbox',
            {
                name: 'Search with patient name or'
            }
        );
    }

    getPatient(patientName) {
        return this.page.locator(
            `//div[@title="${patientName}"]`    
        );
    }
}

module.exports = { PatientLocator };