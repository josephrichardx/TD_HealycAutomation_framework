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