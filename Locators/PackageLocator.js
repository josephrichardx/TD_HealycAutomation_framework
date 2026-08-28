class PackageLocator {

    constructor(page) {
        this.page = page;

        this.addNewBtn =
            page.getByRole('button', { name: 'Add New' });

        this.addPackageBtn =
            page.getByRole('button', { name: 'Add Package' });

        this.patientSearchTxt =
            page.getByRole('textbox', {
                name: 'Search with patient name or'
            });

        this.proceedBtn =
            page.getByText('Proceed');

        this.activatePackageBtn =
            page.locator('div')
                .filter({ hasText: /^Activate Package$/ })
                .first();

        this.activateSchedulePackageBtn = page.getByText(
            'Activate & Schedule service',
            { exact: true }
        );

        this.bookNowBtn =
            page.getByRole('button', { name: 'Book Now' });

        this.packageItemCard =
            page.locator('app-package-item-card');

        this.slotButton =
            page.locator('.slotButton');

        this.nextBtn =
            page.getByRole('button', {
                name: 'Next',
                exact: true
            });

        // this.addServiceButtons =
        // page.locator(
        // 'app-package-item-card button'
        // );

        this.pendingServiceCards =
        page.locator('app-package-item-card')
        .filter({
            hasText: 'Pending'
        }); 

        // this.timeSlots =
        //      page.locator('.slotButton');

        this.timeSlots =
        page.locator('.slotButton:visible');

        this.confirmBtn =
        page.locator("//button[@class='activeButon']");

        this.nextDateBtn = page.locator(
        'div.NextListButton'
        );
             
    }

    getPatient(patientName) {
        return this.page.locator(
            `//div[@title="${patientName}"]`
        );
    }

    getPackage(packageName) {

        return this.page.getByText(
            packageName,
            { exact: true }
        );
    }
}

module.exports = { PackageLocator };