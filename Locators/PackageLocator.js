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

        // Fallback for when no pre-existing slots show up (happens
        // when a doctor's day is already fully booked with other
        // test appointments) - "Add custom slots" link and the
        // Update button in the modal it opens. Confirmed DOM: the
        // link is div.customSlotButton (text "Add custom slots"),
        // the modal is div.custom-slot-modal, and its Update button
        // shares the same "activeButon" typo'd class the package
        // Confirm button had - using role+name instead of that class
        // for the same reason as before (that class has already
        // broken once from a typo, no reason to trust it here).
        this.addCustomSlotsBtn =
            page.getByText('Add custom slots').first();

        this.customSlotUpdateBtn =
            page.locator('div.custom-slot-modal')
                .getByRole('button', { name: 'Update' });

        // Next-day arrow on a doctor's slot row (confirmed DOM:
        // div.NextListButton[data-type="next"] > i.fa-solid.fa-angle-right).
        // Used before falling back to "Add custom slots" - some days
        // simply run out of slots (finite per day, and repeated test
        // runs consume them), so checking the next day or two first
        // is worth trying before resorting to a custom slot.
        this.nextDayBtn =
            page.locator('div.NextListButton').first();

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

        // Confirm button on the "Services includes in package" screen
        // after a slot has been picked and Next clicked (reads
        // "Confirm (1)" once one session is drafted). Text-based on
        // purpose - this.confirmBtn above is class-based and has
        // already broken once from a class-name typo on Healync's
        // side, so this one is deliberately not tied to a CSS class.
        this.confirmPackageBookingBtn = page.getByRole('button', {
            name: /Confirm/i
        });

        // "Package is added" success toast, shown right after
        // Confirming package selection (before any session is
        // booked). Confirmed DOM: app-custom-toaster-message >
        // div.toaster-wrapper.success > div.text-content > div.title
        // .last() matters here - the earlier "Patient Saved
        // successfully" toast from patient creation can still be
        // sitting in the DOM (not yet removed) when this one
        // appears, so without .last() this can grab the stale one.
        // "Package is added" success toast, shown right after
        // Confirming package selection. We append :visible so it 
        // completely ignores any stale, hidden toasts from earlier steps.
        // "Package is added" success toast. Filtering for visibility 
        // guarantees it ignores any stale, hidden toasts from Step 1.
        this.packageAddedToastTitle = page.locator(
            'app-custom-toaster-message div.title'
        ).filter({ visible: true });

        this.goToAppointmentPageLink = page.getByText(
            'Go to appointment page'
        ).filter({ visible: true });

        // Generic toast subtext locator 
        this.packageToastSubtext = page.locator(
            'app-custom-toaster-message div.subtext'
        ).filter({ visible: true });

        // Breadcrumb "Book Packages > Patient > Packages" at the top
        // of the package screens. Confirmed DOM:
        // div.packageHeader > div.addAppointmentHeader (contains all
        // three breadcrumb spans as siblings).
        this.packageBreadcrumb = page.locator(
            'div.packageHeader div.addAppointmentHeader'
        );

        // Package name/status banner on the "Services includes in
        // package" screen. Confirmed DOM:
        // div.headingDiv > div.top (name + "Active" button),
        // button.activated (the "Active" pill itself)
        this.packageBannerName = page.locator(
            'div.headingDiv div.top'
        );

        this.packageActiveStatusBtn = page.locator(
            'div.headingDiv button.activated'
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