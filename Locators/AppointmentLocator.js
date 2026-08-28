class AppointmentLocator {
 
    constructor(page) {
        this.page = page;
 
        this.patientProfile = page.locator(
            'app-patient-profile'
        );
 
        this.addNewBtn = this.patientProfile.getByRole(
            'button',
            { name: 'Add New' }
        );
 
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
}
 
module.exports = { AppointmentLocator };
 
 

 