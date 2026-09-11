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

      this.addServiceButton = 'button:has(i.fa-regular.fa-plus)';

        // this.timeSlots =
        //      page.locator('.slotButton');

        this.timeSlots =
        page.locator('.slotButton:visible');

        // this.confirmBtn =
        //     page.locator(
        //         "//button[contains(@class,'activeButon') and normalize-space()='Confirm' and not(contains(@class,'disabledButton'))]"
        //     );

       this.confirmBtn = page.locator(
            "//button[@class='activeButon']"
        );

        this.nextDateBtn =
            page.locator('div.NextListButton');
            
        this.packageAddedToastTitle = page.locator(
            'app-custom-toaster-message div.title'
        ).filter({ visible: true });

        this.packageBreadcrumb = page.locator(
            'div.packageHeader div.addAppointmentHeader'
        );

        this.packageBannerName = page.locator(
            'div.headingDiv div.top'
        );

        this.packageActiveStatusBtn = page.locator(
            'div.headingDiv button.activated'
        );

        this.slotAppointmentCard = (slot) =>
        slot.locator('xpath=ancestor::div[contains(@class,"bookappointmentBodyCard")]');
 
        this.nextDayBtn =
            page.locator('div.NextListButton').first();

        this.confirmPackageBookingBtn = page.getByRole('button', {
            name: /Confirm/i
        });

        this.packageToastSubtext = page.locator(
            'app-custom-toaster-message div.subtext'
        ).filter({ visible: true });

        this.patientResult = (patientName) =>
            page.locator(
                `//div[@class='list-item-wrapper'][contains(.,'${patientName}')]`
            ).first();
            
        this.patientSearchResultTag = (patientName) =>
            this.patientResult(patientName)
                .locator('span.status-service-future');

        this.patientNoApptBookedTag = (patientName) =>
            this.patientResult(patientName)
                .locator('span.status-default');

        this.cancelModalPackageName = (packageName) =>
        page.locator('.cancel-modal').getByText(packageName);

        this.amountAlreadyPaidValue = page.locator(
        "//*[normalize-space()='Amount already paid']/following-sibling::*[1]");

        this.amountTxt = page.getByRole('textbox', {
            name: '₹'
        });

        this.reviewConfirmBtn = page.getByRole('button', {
            name: 'Review & Confirm',
            exact: true
        });

        this.newPackageStatusValue = page.locator(
            "//*[normalize-space()='New Package Status']/following-sibling::*[1]"
        );

        this.reviewScreenBackBtn = page.getByRole('button', {
            name: 'Back',
            exact: true
        }).last();
    }

    getPatient(patientName) {
        // The patient list can hold more than one row with the same title when
        // a generated name already exists in the environment, so resolve to the
        // first match instead of raising a strict-mode violation.
        return this.page.locator(
            `//div[@title="${patientName}"]`
        ).first();
    }

    getPackage(packageName) {

        return this.page.getByText(
            packageName,
            { exact: true }
        );
    }

    // getAddServiceButton(pendingService) {
    // return pendingService.locator(
    //     'button:has(i.fa-regular.fa-plus)'
    // );
    // }
}

module.exports = { PackageLocator };