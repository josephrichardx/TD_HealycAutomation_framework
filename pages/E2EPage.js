// ============================================================================
// E2EPage.js
//
// Single consolidated page object for the Healync End-to-End regression flow.
//
//   tests/Healync_E2E.spec.js  ->  this file  ->  Locators/E2ELocator.js
//                                                 testdata/E2E.json
//
// WHY THIS FILE EXISTS
// The E2E scenario was migrated in from a separate framework where its steps
// were spread across NewPatientPage / CalendarPage / PackagePage / InvoicePage
// / PaymentPage / CancellationPage. Those page objects also exist in this
// framework but have since diverged, so reusing them would have meant editing
// files the WF_CALADN_* suites depend on. Instead every method the E2E flow
// needs is consolidated here, unchanged in behaviour, so this flow is fully
// self-contained and cannot affect - or be affected by - the existing suites.
//
// Methods are grouped below by the functional area they came from. Section
// banners mark each group.
//
// Shared utilities (StepHelper, Verify, Keywords, RandomData) are reused as-is
// from utils/ - they are read-only dependencies, nothing in them was modified.
// ============================================================================

const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { Verify } = require('../utils/verification.js');
const { Keywords } = require('../utils/Keywords');
const { E2ELocator } = require('../Locators/E2ELocator');

const { calculateAgeFromDate } = require('../utils/RandomData');

const {
    cancellationData,
    timeouts
} = require('../testdata/E2E.json');

const {
    toastWaitTimeoutMs,
    fieldReadTimeoutMs,
    networkIdleTimeoutMs,
    cancellationStatusTimeoutMs
} = timeouts;

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class E2EPage {

    constructor(page) {
        this.page = page;
        this.locator = new E2ELocator(page);
        this.keywords = new Keywords();
    }


    // ========================================================================
    //  PATIENT  -  create patient, profile verification
    // ========================================================================

    async createPatientFast(patientName, patientData, dobData) {
        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {
                await this.keywords.click(this.locator.addNewBtn);
            }
        );

        await StepHelper.step(
            this.page,
            'Click Add Patient Button',
            async () => {
                await this.keywords.click(this.locator.addPatientBtn);
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Patient Name - ${patientName}`,
            async () => {
                await this.keywords.fill(this.locator.patientNameTxt, patientName);
            }
        );

        await StepHelper.step(
            this.page,
            'Open Salutation Dropdown',
            async () => {
                await this.keywords.click(this.locator.salutationDropdownBtn);
            }
        );

        await StepHelper.step(
            this.page,
            `Select Salutation - ${patientData.title}`,
            async () => {
                await this.keywords.click(this.locator.getSalutationOption(patientData.title));
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Mobile Number - ${patientData.mobileNumber}`,
            async () => {
                await this.keywords.fill(this.locator.mobileNumberTxt, patientData.mobileNumber);
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Referral By - ${patientData.referralBy}`,
            async () => {
                await this.keywords.fill(this.locator.referralByTxt, patientData.referralBy);
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Email - ${patientData.email}`,
            async () => {
                await this.keywords.fill(this.locator.emailTxt, patientData.email);
            }
        );

        await StepHelper.step(
            this.page,
            'Click Date Of Birth Field',
            async () => {
                await this.keywords.click(this.locator.dobComponent);
            }
        );

        await StepHelper.step(
            this.page,
            'Open Month/Year Selector',
            async () => {
                await this.keywords.click(this.locator.calendarHeaderTitle);
            }
        );

        await StepHelper.step(
            this.page,
            `Select Month - ${dobData.monthName}`,
            async () => {
                await this.keywords.click(this.locator.getMonthButton(dobData.monthName));
            }
        );

        await StepHelper.step(
            this.page,
            `Select Year - ${dobData.year}`,
            async () => {
                await this.keywords.click(this.locator.getYearButton(dobData.year));
            }
        );

        await StepHelper.step(
            this.page,
            'Save Month/Year Selection',
            async () => {
                await this.keywords.click(this.locator.saveDateBtn);
            }
        );

        await StepHelper.step(
            this.page,
            `Select Date Of Birth Day - ${dobData.day}`,
            async () => {
                await this.keywords.click(this.locator.getDayLocator(dobData.day).first());
            }
        );

        await StepHelper.step(
            this.page,
            `Select Gender - ${patientData.gender}`,
            async () => {
                const genderBtn =
                    patientData.gender === 'Female' ? this.locator.femaleBtn :
                    patientData.gender === 'Other' ? this.locator.otherGenderBtn :
                    this.locator.maleBtn;

                await this.keywords.click(genderBtn);
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Address - ${patientData.address}`,
            async () => {
                await this.keywords.fill(this.locator.addressTxt, patientData.address);
            }
        );

        const additionalFields = [
            { locator: this.locator.treatingDoctorTxt, value: patientData.additionalDetails.treatingDoctor, label: 'Treating Doctor' },
            { locator: this.locator.medicalConditionTxt, value: patientData.additionalDetails.medicalCondition, label: 'Medical Condition' },
            { locator: this.locator.pincodeTxt, value: patientData.additionalDetails.pincode, label: 'Pincode' },
            { locator: this.locator.patientCategoryTxt, value: patientData.additionalDetails.patientCategory, label: 'Patient Category' }
        ];

        for (const field of additionalFields) {
            await StepHelper.step(
                this.page,
                `Enter ${field.label} - ${field.value}`,
                async () => {
                    await field.locator.fill(field.value);
                }
            );
        }

        await StepHelper.step(
            this.page,
            'Click Save Button',
            async () => {
                await this.keywords.click(this.locator.saveBtn);
            }
        );

        await this.keywords.waitForElement(
            this.locator.successToastTitle,
            timeout.elementTimeout
        );
    }

    async verifySavedToastAndGoToProfile(expectedToastMsg) {
        await Verify.state(
            this.page,
            'Patient Saved Toast Title',
            this.locator.successToastTitle,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Saved Toast Title Text',
            expectedToastMsg,
            this.locator.successToastTitle
        );

        await Verify.state(
            this.page,
            'Go To Patient Profile Link',
            this.locator.goToPatientProfileLink,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Go To Patient Profile',
            async () => {
                await this.keywords.click(this.locator.goToPatientProfileLink);
            }
        );

        await this.page.waitForURL(/\/patient-profile\//, { timeout: 15000 });
    }

    async verifyPatientProfileNameMatches(patientName) {
        await this.keywords.waitForElement(
            this.locator.patientProfileNameText,
            15000
        );

        await Verify.state(
            this.page,
            'Patient Profile Name',
            this.locator.patientProfileNameText,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Profile Name Matches Created Patient',
            patientName,
            this.locator.patientProfileNameText
        );
    }

    async verifyPatientProfileDetails(patientData, dobData, options = {}) {
        const { calculateAgeFromDate } = require('../utils/RandomData');
        const isVip = options.isVip || false;

        // UHID 
        await Verify.state(
            this.page,
            'Patient Profile - UHID Field Present',
            this.locator.profileUhidText,
            { visible: true, soft: false }
        );

        const actualUhid = (await this.locator.profileUhidText.innerText()).trim();

        await Verify.record(
            this.page,
            'Patient Profile - UHID',
            actualUhid
        );

        // Gender/Age
        await Verify.state(
            this.page,
            'Patient Profile - Gender/Age Field Present',
            this.locator.profileGenderAgeText,
            { visible: true, soft: false }
        );

        const actualGenderAge = (await this.locator.profileGenderAgeText.innerText()).trim();
        const expectedAge = calculateAgeFromDate(dobData.dateObj);

        await StepHelper.step(
            this.page,
            `Verify Patient Profile Gender | Expected to contain: ${patientData.gender} | Actual: ${actualGenderAge}`,
            async () => {
                expect(actualGenderAge).toContain(patientData.gender);
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Patient Profile Age | Expected to contain: ${expectedAge} Years | Actual: ${actualGenderAge}`,
            async () => {
                expect(actualGenderAge).toContain(`${expectedAge} Years`);
            }
        );

        // Email
        await Verify.state(
            this.page,
            'Patient Profile - Email Field Present',
            this.locator.profileEmailText,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Profile - Email',
            patientData.email,
            this.locator.profileEmailText,
            { exact: true }
        );

        // Phone
        await Verify.state(
            this.page,
            'Patient Profile - Phone Field Present',
            this.locator.profilePhoneText,
            { visible: true, soft: false }
        );

        const expectedPhone = isVip
            ? `******${patientData.mobileNumber.slice(-4)}`
            : patientData.mobileNumber;

        await Verify.text(
            this.page,
            'Patient Profile - Phone',
            expectedPhone,
            this.locator.profilePhoneText
        );

        // Address
        await Verify.state(
            this.page,
            'Patient Profile - Address Field Present',
            this.locator.profileAddressText,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Profile - Address',
            patientData.address,
            this.locator.profileAddressText,
            { exact: true }
        );

        // Referral Source
        await Verify.state(
            this.page,
            'Patient Profile - Referral Source Field Present',
            this.locator.profileReferralSourceValue,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Profile - Referral Source',
            patientData.referralBy,
            this.locator.profileReferralSourceValue,
            { exact: true }
        );
    }


    // ========================================================================
    //  CALENDAR  -  navigation, search, appointment cards
    // ========================================================================

    async clickSidebarCalendarIcon() {


        await StepHelper.step(

            this.page,

            'Click Calendar icon on the left sidebar to return to the dashboard',

            async () => {


                await this.keywords.waitForElement(

                    this.locator.sidebarCalendarIcon,

                    10000

                );


                await this.keywords.click(

                    this.locator.sidebarCalendarIcon

                );


                await this.page

                    .waitForURL(

                        (url) => url.pathname.includes('/dashboard'),

                        { timeout: 15000 }

                    )

                    .catch(() => {

                        console.log('[clickSidebarCalendarIcon] URL never matched /dashboard - falling through to wait on the search box directly instead.');

                    });

                await this.keywords.waitForElement(
                    this.locator.patientSearch,
                    15000
                );

                // The search box can appear once, then briefly
                // disappear again as the Calendar component finishes
                // loading the day's appointments and re-renders -
                // waiting for network activity to quiet down before
                // considering the page genuinely ready, not just
                // "the search box was attached at some instant".
                // Same networkidle pattern already used elsewhere
                // tonight for this exact class of problem.
                await this.page
                    .waitForLoadState('networkidle', { timeout: 15000 })
                    .catch(() => {});

                await this.keywords.waitForElement(
                    this.locator.patientSearch,
                    15000
                );

                console.log('Navigated back to the Calendar (dashboard) via sidebar icon');

            }

        );

    }

    async searchPatient(patientName) {

        await StepHelper.step(
            this.page,
            `Search Patient From Calendar - ${patientName}`,
            async () => {


                await this.keywords.waitForElement(
                    this.locator.patientSearch,
                    10000
                );

                await this.keywords.click(
                    this.locator.patientSearch
                );

                await this.keywords.clear(
                    this.locator.patientSearch
                );

                await this.keywords.fill(
                    this.locator.patientSearch,
                    patientName
                );

                console.log(
                    `Searching Patient: ${patientName}`
                );

                await this.keywords.wait(
                    this.page,
                    1500
                );
            }
        );
    }

    async verifyStatus(expectedStatus) {

        await StepHelper.step(
            this.page,
            `Verify Status - ${expectedStatus}`,
            async () => {

                const status =
                    this.locator.getStatus(
                        expectedStatus
                    );

                await this.keywords.waitForElement(
                    status,
                    10000
                );

                await expect(
                    status
                ).toBeVisible();
            }
        );
    }

    async verifyPackageTag(
        patientName,
        expectedPackageShortName,
        expectedDateOptions
    ) {

        const actualTag =
            (
                await this.keywords.getText(
                    this.locator.patientSearchResultTag(
                        patientName
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Package Tag Contains Package Name | Expected to contain: ${expectedPackageShortName} | Actual: ${actualTag}`,
            async () => {

                expect(actualTag).toContain(
                    expectedPackageShortName
                );
            }
        );

        // Accepts an array of acceptable date strings (today +
        // yesterday, same timezone-boundary tolerance as the
        // Payment History date check - the app can timestamp things
        // a day off from the local machine clock near midnight IST).
        const dateOptionsList = Array.isArray(expectedDateOptions)
            ? expectedDateOptions
            : [expectedDateOptions];

        await StepHelper.step(
            this.page,
            `Verify Package Tag Date | Expected to contain one of: ${dateOptionsList.join(' or ')} | Actual: ${actualTag}`,
            async () => {

                const matchesAny = dateOptionsList.some(
                    (d) => actualTag.includes(d)
                );

                expect(matchesAny).toBe(true);
            }
        );
    }

    async openPatientAppointment(patientName) {

        await StepHelper.step(
            this.page,
            `Open Patient Appointment - ${patientName}`,
            async () => {

                const patientResult =
                this.locator.patientResult(patientName);

                await this.keywords.waitForElement(
                    patientResult,
                    10000
                );

                await this.keywords.hover(
                    patientResult
                );


                const viewAppointmentBtn =
                        this.locator.viewAppointmentBtn;

                    await viewAppointmentBtn.waitFor({
                        state: 'attached',
                        timeout: 10000
                    });

                // Avoid hover animation stability issue
                await viewAppointmentBtn.evaluate(
                    button => button.click()
                );

                console.log(
                    `View Appointment clicked: ${patientName}`
                );
            }
        );
    }

    async verifyPatientNotInActiveView(patientName) {

        await this.searchPatient(patientName);

        const actualTag =
            (
                await this.keywords.getText(
                    this.locator.patientNoApptBookedTag(
                        patientName
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Cancelled Appointment Not In Active View | Expected: No appt booked | Actual: ${actualTag}`,
            async () => {

                expect(actualTag).toBe('No appt booked');
            }
        );

        // Dismiss the search results dropdown by clicking away.
        await StepHelper.step(
            this.page,
            'Dismiss Search Results Dropdown (Clicking Outside)',
            async () => {

                // Click a safe, neutral spot on the screen (top-left corner) 
                // to force the dropdown to close without triggering other actions.
                await this.page.mouse.click(10, 10);

                // Tiny wait to ensure the UI animation finishes hiding the dropdown
                // before the script tries to speed-click the Next Day button.
                await this.page.waitForTimeout(500);
            }
        );
    }

    async navigateToBookedDate(daysToAdvance) {

        for (let i = 0; i < daysToAdvance; i++) {

            await StepHelper.step(
                this.page,
                `Click Next Day (${i + 1} of ${daysToAdvance})`,
                async () => {

                    await this.keywords.click(
                        this.locator.nextDayCalendarBtn
                    );
                }
            );
        }
    }

    async enableCancelledToggle() {

        await StepHelper.step(
            this.page,
            'Enable Cancelled Appointments Toggle',
            async () => {

                await this.keywords.click(
                    this.locator.showCancelledToggle
                );
            }
        );
    }

    async verifyAndClickCancelledAppointmentCard(patientName) {

        const card =
            this.locator.cancelledAppointmentCard(patientName);

        await this.page.waitForLoadState('networkidle', { timeout: networkIdleTimeoutMs })

        await StepHelper.step(
            this.page,
            `Verify Cancelled Appointment Now Displayed On Calendar | Expected: visible | Actual: checking`,
            async () => {

                await expect(card).toBeVisible();
            }
        );

        await StepHelper.step(
            this.page,
            `Click Cancelled Appointment Card - ${patientName} (Forced)`,
            async () => {

                // Because calendar events frequently overlap in time (stacking visually), 
                // Playwright's standard click gets blocked by the card in front of it.
                // Using evaluate() bypasses the 'obscured' check and forces the click natively.
                await card.evaluate(node => node.click());
            }
        );
    }


    // ========================================================================
    //  PACKAGE  -  add, activate, schedule and book
    // ========================================================================

    async clickAddNew() {

        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {

                await this.keywords.click(
                    this.locator.addNewBtn
                );
            }
        );
    }

    async clickAddPackage() {

        await StepHelper.step(
            this.page,
            'Click Add Package Button',
            async () => {

                await this.keywords.click(
                    this.locator.addPackageBtn
                );
            }
        );
    }

    async selectPackage(packageName) {

        const packageOption =
            this.locator.getPackage(
                packageName
            );

        await this.keywords.waitForElement(
            packageOption
        );

        await StepHelper.step(
            this.page,
            `Select Package - ${packageName}`,
            async () => {

                await this.keywords.click(
                    packageOption
                );
            }
        );
    }

    async clickProceed() {

        await StepHelper.step(
            this.page,
            'Click Proceed',
            async () => {

                await this.keywords.click(
                    this.locator.proceedBtn
                );
            }
        );
    }

    async activateSchedulePackage() {

    await StepHelper.step(
        this.page,
        'Activate & Schedule Package',
        async () => {

            await this.keywords.click(
                this.locator.activateSchedulePackageBtn
            );
        }
    );
    }

    // NOTE: the source frameworks had TWO different `searchPatient` methods -
    // CalendarPage's (the calendar top-bar search, kept below as
    // `searchPatient`) and PackagePage's (the search box inside the Add Package
    // drawer, this one). Flattening both page objects into this single class
    // made that a real name collision, so the package-drawer one is preserved
    // here under a distinct name. `addActivateSchedulePackage` calls this one,
    // exactly as it did in the source framework.
    async searchPatientInPackageDrawer(patientName) {

        await StepHelper.step(
            this.page,
            `Search Patient - ${patientName}`,
            async () => {

                await this.keywords.fill(
                    this.locator.patientSearchTxt,
                    patientName
                );
            }
        );

        const patient =
            this.locator.getPatient(
                patientName
            );

        await this.keywords.waitForElement(
            patient
        );

        await StepHelper.step(
            this.page,
            `Select Patient - ${patientName}`,
            async () => {

                await this.keywords.click(
                    patient
                );
            }
        );
    }

    async addActivateSchedulePackage(patientName,packageName) {

        await this.clickAddNew();

        await this.clickAddPackage();

        await this.searchPatientInPackageDrawer(
            patientName
        );

        await this.selectPackage(
        packageName
        );

        await this.clickProceed();

        await this.activateSchedulePackage();
    }

    async verifyPackageAddedAndAssociated(packageName) {

        // Poll instead of a single read - guards against reading
        // this before the "Package is added" toast has actually
        // mounted (same race-condition class as the Payment Due
        // Status fix). Manual loop, not expect().toHaveText(), to
        // avoid Playwright's auto-generated "Wait for selector"
        // report noise.
        const deadline = Date.now() + 15000;
        let actualToastTitle = '';

        while (Date.now() < deadline) {

            actualToastTitle =
                (
                    await this.keywords.getText(
                        this.locator.packageAddedToastTitle
                    )
                ).trim();

            if (actualToastTitle === 'Package is added') {

                break;
            }

            await this.page.waitForTimeout(500);
        }

        await StepHelper.step(
            this.page,
            `Verify "Package is added" Popup | Expected: Package is added | Actual: ${actualToastTitle}`,
            async () => {

                expect(actualToastTitle).toBe(
                    'Package is added'
                );
            }
        );

        const actualBreadcrumb =
            (
                await this.keywords.getText(
                    this.locator.packageBreadcrumb
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Redirect Breadcrumb | Expected to contain: Book Packages, Patient, Packages | Actual: ${actualBreadcrumb}`,
            async () => {

                expect(actualBreadcrumb).toContain('Book Packages');
                expect(actualBreadcrumb).toContain('Patient');
                expect(actualBreadcrumb).toContain('Packages');
            }
        );

        const actualBannerName =
            (
                await this.keywords.getText(
                    this.locator.packageBannerName
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Package Associated With Patient | Expected: ${packageName} | Actual: ${actualBannerName}`,
            async () => {

                expect(actualBannerName).toContain(
                    packageName
                );
            }
        );

        const actualActiveStatus =
            (
                await this.keywords.getText(
                    this.locator.packageActiveStatusBtn
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Package Status | Expected: Active | Actual: ${actualActiveStatus}`,
            async () => {

                expect(actualActiveStatus).toBe('Active');
            }
        );
    }

    async clickBookNow() {

        await StepHelper.step(
            this.page,
            'Click Book Now',
            async () => {

                await this.keywords.click(
                    this.locator.bookNowBtn
                );
            }
        );
    }

    async selectPendingServiceItem() {

        const pendingService =
            this.locator.pendingServiceCards.first();

        const addButton =
            pendingService.locator(
                'button:not(.status)'
            );

        await StepHelper.step(
            this.page,
            'Click Add Service (+) on Pending Package Card',
            async () => {

                await this.keywords.click(
                    addButton
                );
            }
        );
    }

        async selectFirstAvailableSlot() {
       
        const maxDaysToSearch = 30;
        let daysSearched = 0;
        let daysAdvanced = 0;
 
        await StepHelper.step(
            this.page,
            'Select First Available Slot',
            async () => {
 
                // 1. RESTORED: Wait for the page network to settle BEFORE checking slots
                await this.page
                    .waitForLoadState('networkidle', { timeout: networkIdleTimeoutMs })
                    .catch(() => {});
 
                while (daysSearched < maxDaysToSearch) {
 
                    // 2. NEW SAFETY: Explicitly wait up to 5 seconds for a slot to appear.
                    // This stops the script from seeing "0 slots" and skipping days
                    // just because the UI is slightly slow to render in CI environments.
                    await this.locator.slotButton.first()
                        .waitFor({ state: 'visible', timeout: 5000 })
                        .catch(() => {});
 
                    const slotCount = await this.locator.slotButton.count();
 
                    console.log(`Available Slots: ${slotCount}`);
 
                    if (slotCount > 0) {
 
                        const firstSlot = this.locator.slotButton.first();
                       
                        const appointmentCard = this.locator.slotAppointmentCard(firstSlot);
 
                        const cardText = await this.keywords.getText(appointmentCard);
 
                        console.log(`Appointment Card Text: ${cardText}`);
 
                        const dateMatch = cardText.match(/\d{1,2}\s+[A-Za-z]{3},\s+\d{4}/);
 
                        if (!dateMatch) {
                            throw new Error(
                                `Unable to read slot date from appointment card: ${cardText}`
                            );
                        }
 
                        this.selectedSlotDate = dateMatch[0];
 
                        console.log(`Selected Slot Date: ${this.selectedSlotDate}`);
 
                        const deadline = Date.now() + 15000;
                        let clicked = false;
                        let lastError;
 
                        while (Date.now() < deadline) {
                            try {
                                await this.keywords.click(firstSlot);
                                clicked = true;
                                break;
                            } catch (error) {
                                lastError = error;
                                if (!/not attached|not stable|detached/i.test(error.message || '')) {
                                    throw error;
                                }
                                await this.page.waitForTimeout(500);
                            }
                        }
 
                        if (!clicked) {
                            throw lastError;
                        }
 
                        break;
                    }
 
                    await StepHelper.step(
                        this.page,
                        'Move To Next Available Date',
                        async () => {
                            await this.keywords.click(this.locator.nextDayBtn);
                        }
                    );
 
                    daysSearched++;
                    daysAdvanced++;
 
                    await this.page
                        .waitForLoadState('networkidle', { timeout: networkIdleTimeoutMs })
                        .catch(() => {});
                }
 
                if (daysSearched >= maxDaysToSearch) {
                    throw new Error(`No available slots found after searching ${maxDaysToSearch} days forward.`);
                }
            }
        );
 
        return {
    selectedSlotDate: this.selectedSlotDate,
    daysAdvanced
};
    }
    async clickNext() {
 
        await StepHelper.step(
            this.page,
            'Click Next',
            async () => {
 
                await this.keywords.click(
                    this.locator.nextBtn
                );
            }
        );
    }
    async clickConfirm() {

        await StepHelper.step(
            this.page,
            'Click Confirm Button',
            async () => {

                await this.keywords.click(
                    this.locator.confirmBtn
                );
            }
        );
    }

    async clickConfirmPackageBooking() {

        await StepHelper.step(
            this.page,
            'Click Confirm Package Booking',
            async () => {

                await this.keywords.click(
                    this.locator.confirmPackageBookingBtn
                );
            }
        );
    }

    // async bookSingleSessionFromAddPackage() {

    //     await this.selectPendingServiceItem();

    //     const daysAdvanced = await this.selectFirstAvailableSlot();

    //     await this.clickNext();

    //     await this.clickConfirmPackageBooking();

    //     return daysAdvanced;
    // }

    async bookSingleSessionFromAddPackage() {

    await this.selectPendingServiceItem();

    const {
        selectedSlotDate,
        daysAdvanced
    } = await this.selectFirstAvailableSlot();

    await this.clickNext();
    await this.clickConfirmPackageBooking();

    return {
        selectedSlotDate,
        daysAdvanced
    };
}

    async verifyServicesAddedToast() {

        // Same shared toast DOM node as the earlier "Package is added"
        // check in verifyPackageAddedAndAssociated(), which polls for this
        // exact reason: without it, a single immediate read can catch that
        // toast's leftover text before this one has replaced it. Mirrors
        // that method's proven pattern rather than reading once and hoping.
        const deadline = Date.now() + 15000;
        let actualTitle = '';

        while (Date.now() < deadline) {

            actualTitle =
                (
                    await this.keywords.getText(
                        this.locator.packageAddedToastTitle
                    )
                ).trim();

            if (actualTitle === 'Services is Added') {

                break;
            }

            await this.page.waitForTimeout(500);
        }

        await StepHelper.step(
            this.page,
            `Verify "Services is Added" Toast | Expected: Services is Added | Actual: ${actualTitle}`,
            async () => {

                expect(actualTitle).toBe('Services is Added');
            }
        );

        const actualSubtext =
            (
                await this.keywords.getText(
                    this.locator.packageToastSubtext
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Toast Subtext | Expected: Your appointment have been scheduled successfully | Actual: ${actualSubtext}`,
            async () => {

                expect(actualSubtext).toBe(
                    'Your appointment have been scheduled successfully'
                );
            }
        );
    }

    async clickGoToAppointmentPage() {
        await StepHelper.step(
            this.page,
            'Click Go To Appointment Page',
            async () => {
                // Bypassing the keyword wrapper to force the click instantly before the toast detaches
                await this.locator.goToAppointmentPageLink.click({ force: true });
            }
        );
    }


    // ========================================================================
    //  INVOICE  -  generate, totals, PDFs, receipts
    // ========================================================================

    async verifyAppointmentPatientDetails(patientData, dobData) {

        // All four checks below are soft (Verify.equals defaults to
        // soft: true) - this whole block records Expected vs Actual for
        // every field but does NOT throw/stop the test on a mismatch, so
        // a rendering quirk on one field can't block the rest of the
        // suite (Invoice/Payment/Cancellation) from running and being
        // visible in the report. Real failures still show up clearly in
        // the report - they just don't halt execution here.
        //
        // Each locator is passed in as a function, not a pre-resolved
        // value - Verify._resolve() awaits it and catches any error
        // (e.g. a locator timeout) internally, turning it into
        // "<could not be read>" in the report instead of throwing and
        // aborting the whole test.

        // Short explicit timeout (3s, not Playwright's 30s config
        // default) - if this locator is wrong, it should fail fast so
        // you're not stuck watching it hang for up to 2 minutes (4
        // fields x 30s) every single run while we chase the real fix.
        // Correctness is unaffected: if the field IS there, 3s is far
        // more than enough for text that's already rendered on screen.
        const readField = (fieldLabel) => async () =>
            (
                await this.locator
                    .appointmentPatientInfoValue(fieldLabel)
                    .innerText({ timeout: fieldReadTimeoutMs })
            ).trim();

        // Now takes the same (patientData, dobData) shape as
        // NewPatient.createValidPatient()/verifyPatientProfileDetails() -
        // age is computed from dobData rather than a flat field, phone
        // is patientData.mobileNumber (not .phoneNumber), and referral
        // is patientData.referralBy (not .notes). Updated together with
        // the Step 1 patient-creation rebuild so this later check still
        // matches what was actually entered.
        const { calculateAgeFromDate } = require('../utils/RandomData');
        const expectedAge = calculateAgeFromDate(dobData.dateObj);

        // UHID is server-generated - no fixed expected value, so this
        // is informational (Verify.record), not a pass/fail check.
        await Verify.state(
            this.page,
            'UHID Field Present (Appointment Details)',
            this.locator.appointmentPatientInfoValue('UHID'),
            { visible: true }
        );

        const actualUhid = await Verify.record(
            this.page,
            'UHID (Appointment Details)',
            readField('UHID')
        );

        await Verify.state(
            this.page,
            'Age Field Present (Appointment Details)',
            this.locator.appointmentPatientInfoValue('Age'),
            { visible: true }
        );

        await Verify.equals(
            this.page,
            'Verify Age (Appointment Details)',
            String(expectedAge),
            readField('Age')
        );

        await Verify.state(
            this.page,
            'Gender Field Present (Appointment Details)',
            this.locator.appointmentPatientInfoValue('Gender'),
            { visible: true }
        );

        await Verify.equals(
            this.page,
            'Verify Gender (Appointment Details)',
            patientData.gender,
            readField('Gender')
        );

        await Verify.state(
            this.page,
            'Contact Field Present (Appointment Details)',
            this.locator.appointmentPatientInfoValue('Contact'),
            { visible: true }
        );

        await Verify.contains(
            this.page,
            'Verify Contact (Appointment Details)',
            patientData.mobileNumber,
            readField('Contact')
        );

        await Verify.state(
            this.page,
            'Referral Source Field Present (Appointment Details)',
            this.locator.appointmentPatientInfoValue('Referral source'),
            { visible: true }
        );

        // "Referral source" shows as "Ref: <referralBy>" - using
        // Verify.contains instead of hardcoding the "Ref: " prefix into
        // the expected string, same fix as Contact's "+91 " prefix
        // above.
        await Verify.contains(
            this.page,
            'Verify Referral Source (Appointment Details)',
            patientData.referralBy,
            readField('Referral source')
        );

        return actualUhid;
    }

    async selectInvoiceServices() {

        await StepHelper.step(
            this.page,
            'Select Service',
            async () => {
                await this.keywords.click(
                    this.locator.serviceCheckbox
                );
            }
        );

        // await StepHelper.step(
        //     this.page,
        //     'Select first Service',
        //     async () => {
        //         await this.keywords.check(
        //             this.locator.serviceCheckbox1
        //         );
        //     }
        // );

        // await StepHelper.step(
        //     this.page,
        //     'Select Second Service',
        //     async () => {
        //         await this.keywords.check(
        //             this.locator.serviceCheckbox2
        //         );
        //     }
        // );
    }

    async verifyLineItemQtyAndRate(expectedQty, expectedPackageName) {

        // Item Name column - confirmed DOM from earlier screenshots:
        // first td.td-service in the row holds the item name (e.g.
        // "Neuro PT (30 sessions)"), second td.td-service holds the
        // Invoice Desc. This is the more literal "displayed as an
        // invoice line item" check - on the Create Invoice screen
        // itself, not just later on the PDF (which was already
        // covered separately in openAndVerifyInvoicePDF()).
        const actualItemName =
            await this.locator.invoiceLineItemRow
                .locator('td.td-service')
                .first()
                .innerText();

        await StepHelper.step(
            this.page,
            `Verify Line Item Displays Package Name | Expected: ${expectedPackageName} | Actual: ${actualItemName.trim()}`,
            async () => {

                expect(actualItemName.trim()).toBe(
                    expectedPackageName
                );
            }
        );

        const numberInputs =
            this.locator.invoiceLineItemRow.locator(
                'input[type="number"]'
            );

        const actualQty = await numberInputs.nth(0).inputValue();

        await StepHelper.step(
            this.page,
            `Verify Line Item Qty | Expected: ${expectedQty} | Actual: ${actualQty}`,
            async () => {

                expect(actualQty).toBe(String(expectedQty));
            }
        );

        const actualRate = await numberInputs.nth(1).inputValue();

        await StepHelper.step(
            this.page,
            `Verify Line Item Rate Is Populated | Expected: a positive number | Actual: ${actualRate}`,
            async () => {

                expect(Number(actualRate)).toBeGreaterThan(0);
            }
        );
    }

    async addAdjustment(
        amount,
        adjustmentName,
        reason
    ) {

        await StepHelper.step(
            this.page,
            'Click Add Adjustment',
            async () => {
                await this.keywords.click(
                    this.locator.addAdjustmentBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Adjustment Amount - ${amount}`,
            async () => {
                await this.keywords.fill(
                    this.locator.invoiceAmountTxt,
                    amount
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Adjustment Name - ${adjustmentName}`,
            async () => {
                await this.keywords.fill(
                    this.locator.adjustmentNameTxt,
                    adjustmentName
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Adjustment Reason - ${reason}`,
            async () => {
                await this.keywords.fill(
                    this.locator.reasonTxt,
                    reason
                );
            }
        );
    }

    async clickGenerateInvoice() {

        await StepHelper.step(
            this.page,
            'Open Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.generateInvoiceLink
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.finalGenerateInvoiceBtn
                );
            }
        );
    }

    async generateInvoiceWithReasonValidation(
        patientName,
        invoiceData,
        packageName
    ) {

        await StepHelper.step(
            this.page,
            'Open Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.generateInvoiceLink
                );
            }
        );

        await this.selectInvoiceServices();

        await this.verifyLineItemQtyAndRate('1', packageName);

        await StepHelper.step(
            this.page,
            'Click Add Adjustment',
            async () => {
                await this.keywords.click(
                    this.locator.addAdjustmentBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Adjustment Amount - ${invoiceData.adjustmentAmount}`,
            async () => {
                await this.keywords.fill(
                    this.locator.invoiceAmountTxt,
                    invoiceData.adjustmentAmount
                );
            }
        );

        // Name and Reason both deliberately left blank here -
        // attempting to generate should be rejected. (Name is
        // intentionally NOT filled at this point - a version that
        // filled Name but left only Reason blank did NOT trigger
        // this validation, confirmed by testing; only Amount alone
        // reproduces it, matching what was confirmed manually.)
        await StepHelper.step(
            this.page,
            'Click Generate Invoice (Name and Reason left blank on purpose)',
            async () => {
                await this.keywords.click(
                    this.locator.finalGenerateInvoiceBtn
                );
            }
        );

        const actualErrorTitle =
            (
                await this.keywords.getText(
                    this.locator.invoiceErrorToastTitle
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Reason Mandatory Validation | Expected: Discount Reason Required | Actual: ${actualErrorTitle}`,
            async () => {

                expect(actualErrorTitle).toBe(
                    'Discount Reason Required'
                );
            }
        );

        const actualErrorSubtext =
            (
                await this.keywords.getText(
                    this.locator.invoiceErrorToastSubtext
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Reason Mandatory Message | Expected: Please provide a reason for the discount or adjustment. | Actual: ${actualErrorSubtext}`,
            async () => {

                expect(actualErrorSubtext).toBe(
                    'Please provide a reason for the discount or adjustment.'
                );
            }
        );

        // Now fill the real Name and Reason and generate for real.
        await StepHelper.step(
            this.page,
            `Enter Adjustment Name - ${invoiceData.adjustmentName}`,
            async () => {
                await this.keywords.fill(
                    this.locator.adjustmentNameTxt,
                    invoiceData.adjustmentName
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Adjustment Reason - ${invoiceData.adjustmentReason}`,
            async () => {
                await this.keywords.fill(
                    this.locator.reasonTxt,
                    invoiceData.adjustmentReason
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.finalGenerateInvoiceBtn
                );
            }
        );
    }

    async verifyInvoiceTotalAfterAdjustment(
    invoiceData
    ) {

    let summaryValue;
    let summaryAmount;
    let expectedTotal;
    let actualTotal;


    // Get Summary Value
    await StepHelper.step(
        this.page,
        'Get Summary Value',
        async () => {

            summaryValue =
                (
                    await this.keywords.getText(
                        this.locator.summaryValue
                    )
                ).trim();

            console.log(
                `Summary Value: ${summaryValue}`
            );
        }
    );


    // Calculate Expected Invoice Total
    await StepHelper.step(
        this.page,
        'Calculate Expected Invoice Total',
        async () => {

            summaryAmount =
                parseFloat(
                    summaryValue.replace(
                        /[₹,\s]/g,
                        ''
                    )
                );

            const adjustmentAmount =
                parseFloat(
                    invoiceData.adjustmentAmount
                );

            expectedTotal =
                summaryAmount + adjustmentAmount;

            console.log(
                `Summary Amount: ${summaryAmount}`
            );

            console.log(
                `Adjustment Amount: ${adjustmentAmount}`
            );

            console.log(
                `Expected Total: ${expectedTotal.toFixed(2)}`
            );
        }
    );


    // Get Actual Invoice Total
    await StepHelper.step(
        this.page,
        'Get Invoice Total',
        async () => {

            actualTotal =
                (
                    await this.keywords.getText(
                        this.locator.invoiceTotal
                    )
                ).trim();

            console.log(
                `Actual Invoice Total: ${actualTotal}`
            );
        }
    );


    // Verify Invoice Total
    await StepHelper.step(
        this.page,
        `Verify Invoice Total | Expected: ₹${expectedTotal.toFixed(2)} | Actual: ${actualTotal}`,
        async () => {

            const actualAmount =
                parseFloat(
                    actualTotal.replace(
                        /[₹,\s]/g,
                        ''
                    )
                );

            expect(actualAmount).toBe(
                expectedTotal
            );
        }
    );


    return summaryAmount;
    }

    async verifyPaymentSection(expectedInvoiceTotal = null) {

        let invoiceNumber;
        let paymentDue;
        let paidAmount;
        let totalAmount;

        const expectedTotalText =
            expectedInvoiceTotal !== null
                ? `₹${parseFloat(expectedInvoiceTotal).toFixed(2)}`
                : null;


        // Get Invoice Number

        await StepHelper.step(
            this.page,
            'Get Invoice Number',
            async () => {

                invoiceNumber =
                    (
                        await this.keywords.getText(
                            this.locator.appointmentInvoiceNumber
                        )
                    ).trim();

                console.log(
                    `Invoice Number: ${invoiceNumber}`
                );
            }
        );


        // Verify Invoice Number

        await StepHelper.step(
            this.page,
            `Verify Invoice Number Format | Expected: starts with "INV-" | Actual: ${invoiceNumber}`,
            async () => {

                expect(invoiceNumber).toMatch(/^INV-/);
            }
        );


        // Verify Send Invoice

        await StepHelper.step(
            this.page,
            'Get Send Invoice Label',
            async () => {

                this._sendInvoiceText =
                    (
                        await this.keywords.getText(
                            this.locator.appointmentSendInvoice
                        )
                    ).trim();
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Send Invoice Label | Expected: Send invoice | Actual: ${this._sendInvoiceText}`,
            async () => {

                expect(this._sendInvoiceText).toBe(
                    'Send invoice'
                );
            }
        );


        // Get Payment Due

        await StepHelper.step(
            this.page,
            'Get Payment Due',
            async () => {

                paymentDue =
                    (
                        await this.keywords.getText(
                            this.locator.appointmentPaymentDue
                        )
                    ).trim();

                console.log(
                    `Payment Due: ${paymentDue}`
                );
            }
        );


        // Verify Payment Due - exact match when the caller knows the
        // expected total (pre-payment, this equals the invoice total);
        // falls back to a non-empty check for older callers that don't
        // pass one, so this stays backward compatible.

        await StepHelper.step(
            this.page,
            expectedTotalText
                ? `Verify Payment Due | Expected: ${expectedTotalText} | Actual: ${paymentDue}`
                : `Verify Payment Due Is Present | Expected: non-empty value | Actual: ${paymentDue}`,
            async () => {

                if (expectedTotalText) {

                    const actualDue =
                        parseFloat(
                            paymentDue.replace(/[₹,\s]/g, '')
                        ).toFixed(2);

                    expect(actualDue).toBe(
                        parseFloat(expectedInvoiceTotal).toFixed(2)
                    );

                } else {

                    expect(paymentDue).not.toBe('');
                }
            }
        );


        // Get Paid Amount

        await StepHelper.step(
            this.page,
            'Get Paid Amount',
            async () => {

                paidAmount =
                    (
                        await this.keywords.getText(
                            this.locator.appointmentPaidAmount
                        )
                    ).trim();

                console.log(
                    `Paid Amount: ${paidAmount}`
                );
            }
        );


        // Verify Paid Amount - nothing has been paid yet at this stage
        // (invoice just generated, before Make Payment), so the expected
        // value is always 0.00 regardless of the invoice total.

        await StepHelper.step(
            this.page,
            `Verify Paid Amount | Expected: ₹0.00 | Actual: ${paidAmount}`,
            async () => {

                const actualPaid =
                    parseFloat(
                        paidAmount.replace(/[₹,\s]/g, '')
                    );

                expect(actualPaid).toBe(0);
            }
        );


        // Get Total Amount

        await StepHelper.step(
            this.page,
            'Get Total Amount',
            async () => {

                totalAmount =
                    (
                        await this.keywords.getText(
                            this.locator.appointmentTotalAmount
                        )
                    ).trim();

                console.log(
                    `Total Amount: ${totalAmount}`
                );
            }
        );


        // Verify Total Amount

        await StepHelper.step(
            this.page,
            expectedTotalText
                ? `Verify Total Amount | Expected: ${expectedTotalText} | Actual: ${totalAmount}`
                : `Verify Total Amount Is Present | Expected: non-empty value | Actual: ${totalAmount}`,
            async () => {

                if (expectedTotalText) {

                    const actualTotal =
                        parseFloat(
                            totalAmount.replace(/[₹,\s]/g, '')
                        ).toFixed(2);

                    expect(actualTotal).toBe(
                        parseFloat(expectedInvoiceTotal).toFixed(2)
                    );

                } else {

                    expect(totalAmount).not.toBe('');
                }
            }
        );
    }

    async openAndVerifyInvoicePDF(
    patientName,
    patientData,
    invoiceData,
    summaryAmount,
    packageName = null,
    dobData = null
    ) {

    let invoiceNumber;

    // ==========================================
    // 1. Get Generated Invoice Number
    // ==========================================

    await StepHelper.step(
        this.page,
        'Get Generated Invoice Number',
        async () => {

            invoiceNumber =
                (
                    await this.keywords.getText(
                        this.locator.invoiceNumber
                    )
                ).trim();

            console.log(
                `Invoice Number: ${invoiceNumber}`
            );

            expect(invoiceNumber).not.toBe('');
        }
    );

    // ==========================================
    // 2. Open Invoice PDF
    // ==========================================

    await StepHelper.step(
        this.page,
        `Open Invoice PDF - ${invoiceNumber}`,
        async () => {

            await this.keywords.click(
                this.locator.invoiceNumber
            );
        }
    );

    // ==========================================
    // 3. Wait for PDF
    // ==========================================

    await StepHelper.step(
        this.page,
        'Wait for Invoice PDF to Load',
        async () => {

            await this.keywords.waitForElement(
                this.locator.closePdfPreviewBtn,
                30000
            );
        }
    );

    // ==========================================
    // 4. Verify Invoice PDF Details
    // ==========================================

        const pdf =
            this.locator.pdfBody;

        // const text =
        //     await pdf.innerText();

        // console.log(
        //     `PDF Content: ${text}`
        // );

        // ==========================================
        // Invoice Number
        // ==========================================

        const actualInvoiceNumber =
            (
                await this.keywords.getText(
                    this.locator.invoiceNumberPdf
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Invoice Number | Expected: ${invoiceNumber} | Actual: ${actualInvoiceNumber}`,
            async () => {

                expect(
                    actualInvoiceNumber
                ).toBe(invoiceNumber);
            }
        );

        // ==========================================
        // Patient Name
        // ==========================================

        const actualPatientName =
            (
                await this.keywords.getText(
                    this.locator.patientNamePdf
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Patient Name | Expected: ${patientName} | Actual: ${actualPatientName}`,
            async () => {

                expect(
                    actualPatientName
                ).toContain(patientName);
            }
        );

        // ==========================================
        // Package Name (invoice line item) - only when
        // provided, so existing callers passing 4 args are
        // unaffected.
        // ==========================================

        if (packageName) {

            const actualItemDescription =
                (
                    await this.keywords.getText(
                        this.locator.itemDescriptionPdf(
                            packageName
                        )
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Package Name (Invoice Line Item) | Expected: ${packageName} | Actual: ${actualItemDescription}`,
                async () => {

                    expect(
                        actualItemDescription
                    ).toContain(packageName);
                }
            );
        }

        // ==========================================
        // Age
        // ==========================================

        // dobData (new patient-creation flow) takes priority
        // when provided; falls back to the old flat
        // patientData.age for the 4 other existing tests
        // (WF_CALADN_03/04/125/126) that call this without it.
        const resolvedAge = dobData
            ? require('../utils/RandomData')
                .calculateAgeFromDate(dobData.dateObj)
            : patientData.age;

        const expectedAge =
            `Age : ${resolvedAge}`;

        const actualAge =
            (
                await this.keywords.getText(
                    this.locator.agePdf(
                        resolvedAge
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Age | Expected: ${expectedAge} | Actual: ${actualAge}`,
            async () => {

                expect(actualAge).toBe(
                    expectedAge
                );
            }
        );

        // ==========================================
        // Gender
        // ==========================================

        const expectedGender =
            `Gender : ${patientData.gender}`;

        const actualGender =
            (
                await this.keywords.getText(
                    this.locator.genderPdf(
                        patientData.gender
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Gender | Expected: ${expectedGender} | Actual: ${actualGender}`,
            async () => {

                expect(actualGender).toBe(
                    expectedGender
                );
            }
        );

        // ==========================================
        // Amount Calculation
        // ==========================================

        const subTotal =
            parseFloat(summaryAmount);

        const discount =
            parseFloat(
                invoiceData.adjustmentAmount
            );

        const expectedTotal =
            subTotal + discount;

        // ==========================================
        // Sub Total
        // ==========================================

        const expectedSubTotal =
            `Sub Total : ${subTotal.toFixed(2)}`;

        const actualSubTotal =
            (
                await this.keywords.getText(
                    this.locator.subTotalPdf(
                        subTotal
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Sub Total | Expected: ${expectedSubTotal} | Actual: ${actualSubTotal}`,
            async () => {

                expect(actualSubTotal).toBe(
                    expectedSubTotal
                );
            }
        );

    // ==========================================
    // Discount / Adjustment
    // ==========================================

    const expectedDiscount =
    `Discount : ${discount.toFixed(2)}`;

    const expectedAdjustment =
    `Adjustment : ${discount.toFixed(2)}`;

    const discountLocator =
    this.locator.discountPdf(discount);

    const adjustmentLocator =
    this.locator.adjustmentPdf(discount);

    let actualDiscount = '';
    let actualAdjustment = '';

    const discountCount =
    await discountLocator.count();

    const adjustmentCount =
    await adjustmentLocator.count();

    if (discountCount > 0) {

    actualDiscount =
    (
        await this.keywords.getText(
            discountLocator
        )
    ).trim();

    await StepHelper.step(
    this.page,
    `Verify Discount | Expected: ${expectedDiscount} | Actual: ${actualDiscount}`,
    async () => {

        expect(actualDiscount).toBe(
            expectedDiscount
        );
    }
    );

    } else if (adjustmentCount > 0) {

    actualAdjustment =
    (
        await this.keywords.getText(
            adjustmentLocator
        )
    ).trim();

    await StepHelper.step(
    this.page,
    `Verify Adjustment | Expected: ${expectedAdjustment} | Actual: ${actualAdjustment}`,
    async () => {

        expect(actualAdjustment).toBe(
            expectedAdjustment
        );
    }
    );

    } else {

    throw new Error(
    `Neither Discount nor Adjustment was found in Invoice PDF. ` +
    `Expected either "${expectedDiscount}" or "${expectedAdjustment}".`
    );
    }

        // ==========================================
        // Total
        // ==========================================

        const expectedTotalText =
            `Total : ${expectedTotal.toFixed(2)}`;

        const actualTotalText =
            (
                await this.keywords.getText(
                    this.locator.totalPdf(
                        expectedTotal
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Total | Expected: ${expectedTotalText} | Actual: ${actualTotalText}`,
            async () => {

                expect(actualTotalText).toBe(
                    expectedTotalText
                );
            }
        );

        // ==========================================
        // Credit Applied (must be zero on a fresh invoice
        // before any payment/refund has touched it)
        // ==========================================

        const expectedCreditText =
            `Credit Applied : 0.00`;

        const actualCreditText =
            (
                await this.keywords.getText(
                    this.locator.creditAppliedPdf(0)
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Credit Applied | Expected: ${expectedCreditText} | Actual: ${actualCreditText}`,
            async () => {

                expect(actualCreditText).toBe(
                    expectedCreditText
                );
            }
        );

        // ==========================================
        // Balance (equals the invoice total at this point -
        // nothing has been paid yet)
        // ==========================================

        const expectedBalanceText =
            `Balance : ${expectedTotal.toFixed(2)}`;

        const actualBalanceText =
            (
                await this.keywords.getText(
                    this.locator.balancePdf(
                        expectedTotal
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Balance | Expected: ${expectedBalanceText} | Actual: ${actualBalanceText}`,
            async () => {

                expect(actualBalanceText).toBe(
                    expectedBalanceText
                );
            }
        );

    // ==========================================
    // 5. Close PDF
    // ==========================================

    await StepHelper.step(
        this.page,
        'Close Invoice PDF Preview',
        async () => {

            await this.keywords.click(
                this.locator.closePdfPreviewBtn
            );
        }
    );

    return invoiceNumber;
    }

    async verifyPostPaymentStatus(
        expectedPaidAmount,
        expectedPaymentMethod = 'Cash'
    ) {

        const expectedAmount =
            parseFloat(expectedPaidAmount).toFixed(2);

        // ==========================================
        // Wait for the panel to actually reflect the payment before
        // reading anything. cancellationPage.Payment() returns as soon
        // as the success toast appears, but the Appointment Details
        // panel refreshes a moment after that - reading immediately was
        // catching the stale pre-payment state ("Not Paid" / full due
        // amount still showing). This waits/retries for the real value
        // instead of taking one snapshot.
        // ==========================================

        await StepHelper.step(
            this.page,
            'Wait for Payment Due Status to update to Paid',
            async () => {

                // Manual poll instead of expect(locator).toHaveText() -
                // that version works fine but Playwright auto-generates
                // its own nested "Wait for selector locator(...)" report
                // entry for every built-in matcher/action call, which is
                // exactly the noise being cleaned up here. A plain
                // retry loop over getText() does the same wait/retry
                // job without triggering that auto-instrumentation.

                const deadline = Date.now() + 20000;
                let currentStatus = '';

                while (Date.now() < deadline) {

                    currentStatus =
                        (
                            await this.keywords.getText(
                                this.locator.appointmentPaymentDueStatus
                            )
                        ).trim();

                    if (currentStatus === 'Paid') {

                        break;
                    }

                    await this.page.waitForTimeout(500);
                }

                expect(currentStatus).toBe('Paid');
            }
        );

        // ==========================================
        // Payment Due == 0.00
        // ==========================================

        const actualPaymentDue =
            (
                await this.keywords.getText(
                    this.locator.appointmentPaymentDue
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment Due | Expected: 0.00 | Actual: ${actualPaymentDue}`,
            async () => {

                const actualDueAmount =
                    parseFloat(
                        actualPaymentDue.replace(
                            /[₹,\s]/g,
                            ''
                        )
                    );

                expect(actualDueAmount).toBe(0);
            }
        );

        // ==========================================
        // Payment Due Status chip == "Paid"
        // ==========================================

        const actualStatus =
            (
                await this.keywords.getText(
                    this.locator.appointmentPaymentDueStatus
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment Due Status | Expected: Paid | Actual: ${actualStatus}`,
            async () => {

                expect(actualStatus).toBe('Paid');
            }
        );

        // ==========================================
        // Paid Amount == expected full invoice total
        // ==========================================

        const actualPaidAmount =
            (
                await this.keywords.getText(
                    this.locator.appointmentPaidAmount
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Paid Amount | Expected: ₹${expectedAmount} | Actual: ${actualPaidAmount}`,
            async () => {

                const actualPaid =
                    parseFloat(
                        actualPaidAmount.replace(
                            /[₹,\s]/g,
                            ''
                        )
                    ).toFixed(2);

                expect(actualPaid).toBe(expectedAmount);
            }
        );

        // ==========================================
        // Total Amount == expected full invoice total
        // ==========================================

        const actualTotalAmount =
            (
                await this.keywords.getText(
                    this.locator.appointmentTotalAmount
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Total Amount | Expected: ₹${expectedAmount} | Actual: ${actualTotalAmount}`,
            async () => {

                const actualTotal =
                    parseFloat(
                        actualTotalAmount.replace(
                            /[₹,\s]/g,
                            ''
                        )
                    ).toFixed(2);

                expect(actualTotal).toBe(expectedAmount);
            }
        );

        // ==========================================
        // Payment History - first row (Date + Method + Amount)
        // Columns confirmed from DOM: # / Date / Method / Amount / View
        // ==========================================

        const firstRow =
            this.locator.appointmentPaymentHistoryRows.first();

        // Date is formatted as "DD-MMM-YYYY" on screen (confirmed from
        // your screenshots, e.g. "26-Aug-2026"). Accepting today OR
        // yesterday (local machine time) rather than an exact match -
        // the app appears to timestamp payments in a different timezone
        // than the local machine clock, so a test run close to midnight
        // IST can see the payment recorded as the previous calendar day
        // even though it happened "today" locally. This isn't loosening
        // the check arbitrarily - it's matching the actual real-world
        // range this value can fall in, confirmed by a real mismatch
        // (expected 28-Aug, actual 27-Aug, from a run around 2-3 AM IST).
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const formatDate = (d) =>
            `${String(d.getDate()).padStart(2, '0')}-` +
            `${monthNames[d.getMonth()]}-` +
            `${d.getFullYear()}`;

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const expectedDateToday = formatDate(today);
        const expectedDateYesterday = formatDate(yesterday);

        const actualDate =
            (
                await firstRow.locator('td').nth(1).innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment History Date | Expected: ${expectedDateToday} or ${expectedDateYesterday} (timezone boundary tolerance) | Actual: ${actualDate}`,
            async () => {

                expect(
                    [expectedDateToday, expectedDateYesterday]
                ).toContain(actualDate);
            }
        );

        const actualMethod =
            (
                await firstRow.locator('td').nth(2).innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment History Method | Expected: ${expectedPaymentMethod} | Actual: ${actualMethod}`,
            async () => {

                expect(actualMethod).toBe(
                    expectedPaymentMethod
                );
            }
        );

        const actualHistoryAmount =
            (
                await firstRow.locator('td').nth(3).innerText()
            )
                .trim()
                .replace(/[₹,\s]/g, '');

        await StepHelper.step(
            this.page,
            `Verify Payment History Amount | Expected: ₹${expectedAmount} | Actual: ₹${actualHistoryAmount}`,
            async () => {

                expect(
                    parseFloat(actualHistoryAmount).toFixed(2)
                ).toBe(expectedAmount);
            }
        );
    }

    async revalidateInvoicePDFAfterPayment(
        expectedInvoiceNumber,
        expectedPaymentMode = 'Cash'
    ) {

        // The panel is likely still finishing an internal
        // refresh/re-render right after verifyPostPaymentStatus() (it
        // just recorded a payment, so appointment/payment data is being
        // re-fetched). The retry log for this click cycled between the
        // same 3 elements blocking each other repeatedly rather than
        // resolving - that's a "still settling" signature, not a "needed
        // longer timeout" one, so wait for network activity to quiet
        // down first instead of just retrying the click harder.
        await this.page
            .waitForLoadState('networkidle', { timeout: networkIdleTimeoutMs })
            .catch(() => {
                // If it never truly goes idle (e.g. background polling),
                // don't hard-fail here - fall through and let the click
                // itself do its normal actionability retries.
            });

        await StepHelper.step(
            this.page,
            `Open Invoice PDF Again - ${expectedInvoiceNumber}`,
            async () => {

                await this.keywords.click(
                    this.locator.appointmentInvoiceNumber
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Wait for Invoice PDF to Load',
            async () => {

                await this.keywords.waitForElement(
                    this.locator.closePdfPreviewBtn,
                    30000
                );
            }
        );

        const actualInvoiceNumber =
            (
                await this.keywords.getText(
                    this.locator.invoiceNumberPdf
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Invoice Number (Post-Payment) | Expected: ${expectedInvoiceNumber} | Actual: ${actualInvoiceNumber}`,
            async () => {

                expect(actualInvoiceNumber).toBe(
                    expectedInvoiceNumber
                );
            }
        );

        const expectedCreditText = 'Credit Applied : 0.00';

        const actualCreditText =
            (
                await this.keywords.getText(
                    this.locator.creditAppliedPdf(0)
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Credit Applied (Post-Payment) | Expected: ${expectedCreditText} | Actual: ${actualCreditText}`,
            async () => {

                expect(actualCreditText).toBe(
                    expectedCreditText
                );
            }
        );

        const expectedBalanceText = 'Balance : 0.00';

        const actualBalanceText =
            (
                await this.keywords.getText(
                    this.locator.balancePdf(0)
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Balance (Post-Payment) | Expected: ${expectedBalanceText} | Actual: ${actualBalanceText}`,
            async () => {

                expect(actualBalanceText).toBe(
                    expectedBalanceText
                );
            }
        );

        // "Payment Details" table embedded in the invoice PDF itself -
        // Receipt Number, Payment Mode, Payment Amount. This Receipt
        // Number gets returned so the caller can cross-check it against
        // the separate Payment Receipt PDF's own number - that's the
        // literal "Receipt Number should match the invoice PDF" check
        // from Step 4, now that we know the invoice PDF actually has
        // one.
        const actualInvoiceReceiptNumber =
            (
                await this.keywords.getText(
                    this.locator.invoicePaymentDetailsReceiptNumberPdf
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment Details Receipt Number Present (Invoice PDF) | Expected: 6-digit number | Actual: ${actualInvoiceReceiptNumber}`,
            async () => {

                expect(actualInvoiceReceiptNumber).toMatch(
                    /^\d{6}$/
                );
            }
        );

        const actualInvoicePaymentMode =
            (
                await this.keywords.getText(
                    this.locator.invoicePaymentDetailsModePdf(
                        expectedPaymentMode
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment Details Mode (Invoice PDF) | Expected: ${expectedPaymentMode} | Actual: ${actualInvoicePaymentMode}`,
            async () => {

                expect(actualInvoicePaymentMode).toBe(
                    expectedPaymentMode
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Close Invoice PDF Preview',
            async () => {

                await this.keywords.click(
                    this.locator.closePdfPreviewBtn
                );
            }
        );

        return actualInvoiceReceiptNumber;
    }

    async verifyPaymentReceipt(
        expectedInvoiceNumber,
        expectedAmount,
        expectedInvoiceReceiptNumber = null,
        expectedPaymentMode = 'Cash'
    ) {

        // .last(), not .first() - same stale-duplicate-panel bug as the
        // invoice-number click a few rounds back. Text reads tolerate a
        // stale duplicate panel fine (same underlying data either way,
        // confirmed by verifyPostPaymentStatus() using .first() safely
        // for reading), but clicks need the topmost/interactive one
        // specifically, or a stale panel's copy intercepts the pointer
        // event.
        const firstRow =
            this.locator.appointmentPaymentHistoryRows.last();

        // Stabilization wait before the click - this runs right after
        // revalidateInvoicePDFAfterPayment() closed a PDF, so the panel
        // may still be settling, same reasoning as the invoice-number
        // click fix.
        await this.page
            .waitForLoadState('networkidle', { timeout: networkIdleTimeoutMs })
            .catch(() => {});

        await StepHelper.step(
            this.page,
            'Click View Receipt (Payment History)',
            async () => {

                await this.keywords.click(
                    this.locator.paymentHistoryViewReceiptIcon(
                        firstRow
                    )
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Wait for Payment Receipt PDF to Load',
            async () => {

                await this.keywords.waitForElement(
                    this.locator.closePdfPreviewBtn,
                    30000
                );
            }
        );

        const actualReceiptNumber =
            (
                await this.keywords.getText(
                    this.locator.receiptPaymentNumberPdf
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Receipt Number Present | Expected: 6-digit number | Actual: ${actualReceiptNumber}`,
            async () => {

                expect(actualReceiptNumber).toMatch(/^\d{6}$/);
            }
        );

        const expectedAmountText =
            parseFloat(expectedAmount).toFixed(2);

        const actualAmountText =
            (
                await this.keywords.getText(
                    this.locator.receiptAmountReceivedPdf(
                        expectedAmount
                    )
                )
            )
                .trim()
                .replace(/[₹,\s]/g, '');

        await StepHelper.step(
            this.page,
            `Verify Receipt Amount Received | Expected: ${expectedAmountText} | Actual: ${actualAmountText}`,
            async () => {

                expect(actualAmountText).toBe(
                    expectedAmountText
                );
            }
        );

        const actualPaymentMode =
            (
                await this.keywords.getText(
                    this.locator.receiptPaymentModePdf(
                        expectedPaymentMode
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Receipt Payment Mode | Expected: ${expectedPaymentMode} | Actual: ${actualPaymentMode}`,
            async () => {

                expect(actualPaymentMode).toBe(expectedPaymentMode);
            }
        );

        const actualReceiptInvoiceNumber =
            (
                await this.keywords.getText(
                    this.locator.receiptInvoiceNumberPdf(
                        expectedInvoiceNumber
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Receipt References Correct Invoice | Expected: ${expectedInvoiceNumber} | Actual: ${actualReceiptInvoiceNumber}`,
            async () => {

                expect(actualReceiptInvoiceNumber).toBe(
                    expectedInvoiceNumber
                );
            }
        );

        // "Receipt Number should match the invoice PDF" - cross-check
        // against the receipt number already read off the invoice PDF's
        // own embedded Payment Details table (from
        // revalidateInvoicePDFAfterPayment()), when provided.
        if (expectedInvoiceReceiptNumber !== null) {

            await StepHelper.step(
                this.page,
                `Verify Receipt Number Matches Invoice PDF | Expected: ${expectedInvoiceReceiptNumber} | Actual: ${actualReceiptNumber}`,
                async () => {

                    expect(actualReceiptNumber).toBe(
                        expectedInvoiceReceiptNumber
                    );
                }
            );
        }

        await StepHelper.step(
            this.page,
            'Close Payment Receipt PDF',
            async () => {

                await this.keywords.click(
                    this.locator.closePdfPreviewBtn
                );
            }
        );

        return actualReceiptNumber;
    }

    async verifyInvoiceHistoryRow(
        expectedInvoiceNumber,
        summaryAmount,
        adjustmentAmount
    ) {

        const total = summaryAmount + parseFloat(adjustmentAmount);

        // Invoice Number shown in the Invoice History row itself,
        // before even opening the PDF.
        const actualHistoryInvoiceNumber =
            (
                await this.keywords.getText(
                    this.locator.invoiceHistoryNumberValue
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Invoice Number in Invoice History | Expected: ${expectedInvoiceNumber} | Actual: ${actualHistoryInvoiceNumber}`,
            async () => {

                expect(actualHistoryInvoiceNumber).toBe(
                    expectedInvoiceNumber
                );
            }
        );

        // Generated On - timezone-boundary tolerance, same reasoning as
        // the Payment History date check (app can timestamp a day off
        // from the local machine clock near midnight IST).
        const monthNamesFin = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const formatDateFin = (d) =>
            `${String(d.getDate()).padStart(2, '0')} ${monthNamesFin[d.getMonth()]} ${d.getFullYear()}`;
        const todayFin = new Date();
        const yesterdayFin = new Date(todayFin);
        yesterdayFin.setDate(yesterdayFin.getDate() - 1);
        const expectedDateOptions = [
            formatDateFin(todayFin),
            formatDateFin(yesterdayFin)
        ];

        const actualGeneratedOn =
            (
                await this.keywords.getText(
                    this.locator.invoiceHistoryGeneratedOnValue
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Generated On in Invoice History | Expected one of: ${expectedDateOptions.join(' or ')} | Actual: ${actualGeneratedOn}`,
            async () => {

                expect(expectedDateOptions).toContain(
                    actualGeneratedOn
                );
            }
        );

        const actualHistoryTotal =
            (
                await this.keywords.getText(
                    this.locator.invoiceHistoryTotalAmountValue
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Total Amount in Invoice History | Expected: ${total} | Actual: ${actualHistoryTotal}`,
            async () => {

                expect(parseFloat(actualHistoryTotal)).toBe(
                    total
                );
            }
        );

        // Remaining Amount == 0 - the invoice was fully paid before we
        // got here (Step 4).
        const actualRemaining =
            (
                await this.keywords.getText(
                    this.locator.invoiceHistoryRemainingAmountValue
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Remaining Amount in Invoice History | Expected: 0 | Actual: ${actualRemaining}`,
            async () => {

                expect(parseFloat(actualRemaining)).toBe(0);
            }
        );
    }

    async openAndVerifyInvoicePdfFromFinancials(
        expectedInvoiceNumber,
        patientName,
        packageName,
        summaryAmount,
        adjustmentAmount
    ) {

        const total = summaryAmount + parseFloat(adjustmentAmount);

        await StepHelper.step(
            this.page,
            'Click View Invoice (Financials)',
            async () => {

                await this.keywords.click(
                    this.locator.viewInvoiceBtn.last()
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Wait for Invoice PDF to Load',
            async () => {

                await this.keywords.waitForElement(
                    this.locator.closePdfPreviewBtn,
                    30000
                );
            }
        );

        // This PDF was opened via Financials > Invoice History, which
        // uses a genuinely different viewer wrapper than every other
        // PDF-open path in this suite (span.breadcrumb-current, not
        // span.invoice-id) - confirmed via real DOM inspection, not a
        // guess. That's why this needed its own locator
        // (invoiceNumberPdfFromFinancials) rather than reusing the
        // .last()-scoped one built for the other paths.
        const invoiceNumberPdfHere =
            this.locator.invoiceNumberPdfFromFinancials;

        const checks = [
            {
                label: 'Invoice Number',
                locator: invoiceNumberPdfHere,
                expected: expectedInvoiceNumber
            },
            {
                label: 'Patient Name',
                locator: this.locator.patientNamePdfFromFinancials(
                    patientName
                ),
                expected: patientName,
                contains: true
            },
            {
                label: 'Package Name (Line Item)',
                locator: this.locator.itemDescriptionPdf(packageName),
                expected: packageName,
                contains: true
            },
            {
                label: 'Sub Total',
                locator: this.locator.subTotalPdf(summaryAmount),
                expected: `Sub Total : ${summaryAmount.toFixed(2)}`
            },
            {
                label: 'Balance (post-payment)',
                locator: this.locator.balancePdf(0),
                expected: 'Balance : 0.00'
            },
            {
                label: 'Credit Applied',
                locator: this.locator.creditAppliedPdf(0),
                expected: 'Credit Applied : 0.00'
            }
        ];

        for (const check of checks) {

            const actualText =
                (
                    await this.keywords.getText(check.locator)
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify ${check.label} (Financials Invoice) | Expected: ${check.expected} | Actual: ${actualText}`,
                async () => {

                    if (check.contains) {

                        expect(actualText).toContain(
                            check.expected
                        );

                    } else {

                        expect(actualText).toBe(
                            check.expected
                        );
                    }
                }
            );
        }

        await StepHelper.step(
            this.page,
            'Close Invoice PDF Preview',
            async () => {

                await this.keywords.click(
                    this.locator.closePdfPreviewBtn
                );
            }
        );
    }

    async verifyPostRefundAppointmentDetails(refundAmount) {

            const actualPaymentDue =
                (
                    await this.keywords.getText(
                        this.locator.appointmentPaymentDue
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Due Amount Is Zero | Expected: 0.00 | Actual: ${actualPaymentDue}`,
                async () => {
                    expect(actualPaymentDue).toContain('0.00');
                }
            );

            const actualStatus =
                (
                    await this.keywords.getText(
                        this.locator.appointmentPaymentDueStatus
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Payment Due Status Is Refunded | Expected: Refunded | Actual: ${actualStatus}`,
                async () => {
                    expect(actualStatus).toBe('Refunded');
                }
            );

            const actualPaidAmount =
                (
                    await this.keywords.getText(
                        this.locator.appointmentPaidAmount
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Paid Amount Is Zero | Expected: 0.00 | Actual: ${actualPaidAmount}`,
                async () => {
                    expect(actualPaidAmount).toContain('0.00');
                }
            );

            // Negative payment/refund transaction in the inline Payment
            // History (Appointment Details). 
            // CHANGED: Using .nth(1) to target the SECOND row (the refund), 
            // not the first row (the original positive payment).
            const negativeAmount = -Math.abs(parseFloat(refundAmount));

            const refundRow =
                this.locator.appointmentPaymentHistoryRows.nth(1); 

            const actualHistoryAmount =
                (
                    await refundRow.locator('td').nth(3).innerText()
                )
                    .trim()
                    .replace(/[₹,\s]/g, '');

            await StepHelper.step(
                this.page,
                `Verify Negative Payment/Refund Transaction Displayed | Expected: ${negativeAmount.toFixed(2)} | Actual: ${actualHistoryAmount}`,
                async () => {
                    expect(parseFloat(actualHistoryAmount)).toBe(
                        negativeAmount
                    );
                }
            );
        }

    async verifyPostRefundInvoicePdf(
        expectedInvoiceNumber,
        refundAmount
    ) {

        await StepHelper.step(
            this.page,
            'Click View Invoice (Financials, post-refund)',
            async () => {

                await this.keywords.click(
                    this.locator.viewInvoiceBtn.last()
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Wait for Invoice PDF to Load',
            async () => {

                await this.keywords.waitForElement(
                    this.locator.closePdfPreviewBtn,
                    30000
                );
            }
        );

        const negativeAmount = -Math.abs(parseFloat(refundAmount));

        const actualCreditApplied =
            (
                await this.keywords.getText(
                    this.locator.creditAppliedPdf(negativeAmount)
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Negative Credit Note | Expected: Credit Applied : ${negativeAmount.toFixed(2)} | Actual: ${actualCreditApplied}`,
            async () => {

                expect(actualCreditApplied).toBe(
                    `Credit Applied : ${negativeAmount.toFixed(2)}`
                );
            }
        );

        const actualBalance =
            (
                await this.keywords.getText(
                    this.locator.balancePdf(0)
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Balance Due Is Zero | Expected: Balance : 0.00 | Actual: ${actualBalance}`,
            async () => {

                expect(actualBalance).toBe('Balance : 0.00');
            }
        );

        // Negative payment/refund transaction row in the PDF's own
        // Payment Details table - reusing the same locators already
        // proven for the post-payment check, just with the negative
        // amount this time.
        const actualRefundReceiptNumber =
            (
                await this.keywords.getText(
                    this.locator.invoicePaymentDetailsReceiptNumberPdf
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Refund Transaction Receipt Number Present | Expected: 6-digit number | Actual: ${actualRefundReceiptNumber}`,
            async () => {

                expect(actualRefundReceiptNumber).toMatch(/^\d{6}$/);
            }
        );

        const actualRefundAmountInPdf =
            (
                await this.keywords.getText(
                    this.locator.invoicePaymentDetailsAmountPdf(
                        negativeAmount
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Negative Payment/Refund Transaction in Invoice | Expected: ${negativeAmount.toFixed(2)} | Actual: ${actualRefundAmountInPdf}`,
            async () => {

                expect(actualRefundAmountInPdf).toBe(
                    negativeAmount.toFixed(2)
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Close Invoice PDF Preview',
            async () => {

                await this.keywords.click(
                    this.locator.closePdfPreviewBtn
                );
            }
        );

        return actualRefundReceiptNumber;
    }

    async reopenAndVerifyRefundedInvoicePdf(
        expectedInvoiceNumber,
        refundAmount
    ) {

        await StepHelper.step(
            this.page,
            `Open Invoice PDF Again (Step 7) - ${expectedInvoiceNumber}`,
            async () => {

                await this.keywords.click(
                    this.locator.appointmentInvoiceNumber
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Wait for Invoice PDF to Load',
            async () => {

                await this.keywords.waitForElement(
                    this.locator.closePdfPreviewBtn,
                    30000
                );
            }
        );

        const actualInvoiceNumber =
            (
                await this.keywords.getText(
                    this.locator.invoiceNumberPdf
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Invoice Number | Expected: ${expectedInvoiceNumber} | Actual: ${actualInvoiceNumber}`,
            async () => {

                expect(actualInvoiceNumber).toBe(
                    expectedInvoiceNumber
                );
            }
        );

        const negativeAmount = -Math.abs(parseFloat(refundAmount));

        const actualCreditApplied =
            (
                await this.keywords.getText(
                    this.locator.creditAppliedPdf(negativeAmount)
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Negative Credit Note | Expected: Credit Applied : ${negativeAmount.toFixed(2)} | Actual: ${actualCreditApplied}`,
            async () => {

                expect(actualCreditApplied).toBe(
                    `Credit Applied : ${negativeAmount.toFixed(2)}`
                );
            }
        );

        const actualBalance =
            (
                await this.keywords.getText(
                    this.locator.balancePdf(0)
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Balance Due Is Zero | Expected: Balance : 0.00 | Actual: ${actualBalance}`,
            async () => {

                expect(actualBalance).toBe('Balance : 0.00');
            }
        );

        const actualPaymentAmountInPdf =
            (
                await this.keywords.getText(
                    this.locator.invoicePaymentDetailsAmountPdf(
                        negativeAmount
                    )
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Negative Payment Transaction in Invoice | Expected: ${negativeAmount.toFixed(2)} | Actual: ${actualPaymentAmountInPdf}`,
            async () => {

                expect(actualPaymentAmountInPdf).toBe(
                    negativeAmount.toFixed(2)
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Close Invoice PDF Preview',
            async () => {

                await this.keywords.click(
                    this.locator.closePdfPreviewBtn
                );
            }
        );
    }

    async verifyRefundReceiptPdf(
            patientName,
            expectedAmount,
            expectedPaymentMode
        ) {
            // .nth(1) explicitly targets the second row in the Payment History table (the refund)
            const refundRow =
                this.locator.appointmentPaymentHistoryRows.nth(1);

            // Wait for the panel to settle using your config-driven timeout
            await this.page
                .waitForLoadState('networkidle', { timeout: networkIdleTimeoutMs })
                .catch(() => {});

            await StepHelper.step(
                this.page,
                'Click View Receipt (Refund Transaction) (Forced)',
                async () => {
                    // We MUST target the <i> icon to trigger the app's event listener,
                    // and we MUST use evaluate() to punch through the invisible overlapping <div>.
                    const icon = this.locator.paymentHistoryViewReceiptIcon(refundRow);
                    await icon.evaluate(node => node.click());
                }
            );

            await StepHelper.step(
                this.page,
                'Wait for Refund Receipt PDF to Load',
                async () => {
                    await this.locator.closePdfPreviewBtn.waitFor({ state: 'visible' });
                }
            );

            // Verify Title "Refund Receipt"
            const actualTitle = (
                await this.keywords.getText(
                    this.locator.pdfBody.getByText('Refund Receipt', { exact: true }).first()
                )
            ).trim();

            await StepHelper.step(
                this.page,
                `Verify Receipt Title | Expected: Refund Receipt | Actual: ${actualTitle}`,
                async () => {
                    expect(actualTitle).toBe('Refund Receipt');
                }
            );

            // Verify Patient Name (Refund To)
            const actualPatientName = (
                await this.keywords.getText(
                    this.locator.pdfBody.getByText(patientName, { exact: true }).first()
                )
            ).trim();

            await StepHelper.step(
                this.page,
                `Verify Refund To | Expected: ${patientName} | Actual: ${actualPatientName}`,
                async () => {
                    expect(actualPatientName).toBe(patientName);
                }
            );

            // Verify Refund Mode
            const actualMode = (
                await this.keywords.getText(
                    this.locator.pdfBody.getByText(expectedPaymentMode, { exact: true }).first()
                )
            ).trim();

            await StepHelper.step(
                this.page,
                `Verify Refund Mode | Expected: ${expectedPaymentMode} | Actual: ${actualMode}`,
                async () => {
                    expect(actualMode).toBe(expectedPaymentMode);
                }
            );

            // Verify Amount (Screenshot shows exactly 1 decimal place: 59400.0)
            const expectedAmountText = parseFloat(expectedAmount).toFixed(1);
            const actualAmount = (
                await this.keywords.getText(
                    this.locator.pdfBody.getByText(expectedAmountText, { exact: true }).last()
                )
            ).trim();

            await StepHelper.step(
                this.page,
                `Verify Amount Refunded | Expected: ${expectedAmountText} | Actual: ${actualAmount}`,
                async () => {
                    expect(actualAmount).toBe(expectedAmountText);
                }
            );

            await StepHelper.step(
                this.page,
                'Close Refund Receipt PDF Preview',
                async () => {
                    await this.keywords.click(
                        this.locator.closePdfPreviewBtn
                    );
                }
            );
        }


    // ========================================================================
    //  FINANCIALS  -  invoice history and payment history
    // ========================================================================

    async openFinancials(patientName) {

        await this.keywords.wait(
            this.page,
            3000
        );

        await this.locator.loaderOverlay.waitFor({
            state: 'hidden',
            timeout: 60000
        });

        await StepHelper.step(
            this.page,
            `Open Patient Profile - ${patientName}`,
            async () => {
                await this.keywords.click(
                    this.locator.patientProfile(patientName)
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Open Financials Tab',
            async () => {
                await this.keywords.click(
                    this.locator.financialsTab
                );
            }
        );
    }

    async openInvoiceHistory() {

        await StepHelper.step(
            this.page,
            'Open Invoice History',
            async () => {
                await this.keywords.click(
                    this.locator.invoiceHistoryTab
                );
            }
        );
    }

    async verifyFinancialsPaymentHistory(
        expectedInvoiceNumber,
        expectedAmount,
        expectedMode = 'Cash'
    ) {

        await StepHelper.step(
            this.page,
            'Open Payment History (Financials)',
            async () => {
                await this.keywords.click(
                    this.locator.financialsPaymentHistoryTab
                );
            }
        );

        const firstRow =
            this.locator.financialsPaymentHistoryRows.first();

        const actualInvoiceNumber =
            (
                await firstRow.locator('td').nth(1).innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment History Invoice Number | Expected: ${expectedInvoiceNumber} | Actual: ${actualInvoiceNumber}`,
            async () => {

                expect(actualInvoiceNumber).toBe(
                    expectedInvoiceNumber
                );
            }
        );

        const actualAmount =
            (
                await firstRow.locator('td').nth(3).innerText()
            )
                .trim()
                .replace(/[₹,\s]/g, '');

        const expectedAmountText =
            parseFloat(expectedAmount).toFixed(2);

        await StepHelper.step(
            this.page,
            `Verify Payment History Received Amount | Expected: ₹${expectedAmountText} | Actual: ₹${actualAmount}`,
            async () => {

                expect(
                    parseFloat(actualAmount).toFixed(2)
                ).toBe(expectedAmountText);
            }
        );

        const actualMode =
            (
                await firstRow
                    .locator('div.payment-mode-wrapper span')
                    .innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment History Mode | Expected: ${expectedMode} | Actual: ${actualMode}`,
            async () => {

                expect(actualMode).toBe(expectedMode);
            }
        );
    }

    async verifyRefundInFinancialsPaymentHistory(
        expectedInvoiceNumber,
        refundAmount,
        expectedMode = 'Cash'
    ) {

        const negativeAmount = -Math.abs(parseFloat(refundAmount));

        const refundRow =
            this.locator.financialsPaymentHistoryRows.first();

        const actualRefundReceiptNumber =
            (
                await refundRow.locator('td').nth(0).innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Refund Transaction/PDF Number Present | Expected: non-empty | Actual: ${actualRefundReceiptNumber}`,
            async () => {

                expect(actualRefundReceiptNumber).not.toBe('');
            }
        );

        const actualRefundInvoiceNumber =
            (
                await refundRow.locator('td').nth(1).innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Refund Row Invoice Number | Expected: ${expectedInvoiceNumber} | Actual: ${actualRefundInvoiceNumber}`,
            async () => {

                expect(actualRefundInvoiceNumber).toBe(
                    expectedInvoiceNumber
                );
            }
        );

        const actualRefundAmount =
            (
                await refundRow.locator('td').nth(3).innerText()
            )
                .trim()
                .replace(/[₹,\s]/g, '');

        await StepHelper.step(
            this.page,
            `Verify Negative Payment/Refund Amount | Expected: ${negativeAmount.toFixed(2)} | Actual: ${actualRefundAmount}`,
            async () => {

                expect(parseFloat(actualRefundAmount)).toBe(
                    negativeAmount
                );
            }
        );

        const actualRefundMode =
            (
                await refundRow
                    .locator('div.payment-mode-wrapper span')
                    .innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Refund Payment Mode | Expected: ${expectedMode} | Actual: ${actualRefundMode}`,
            async () => {

                expect(actualRefundMode).toBe(expectedMode);
            }
        );
    }


    // ========================================================================
    //  CANCELLATION  -  payment, cancel package, refund
    // ========================================================================

    async Payment(amount, paymentMode = 'Cash') {

        await StepHelper.step(
            this.page,
            'Click Make Payment',
            async () => {
                await this.keywords.click(
                    this.locator.makePaymentActionBtn.last()
                );
            }
        );

        // paymentMode defaults to 'Cash' for backward compatibility
        // with the 3 other tests calling Payment() (WF_CALADN_05/
        // 125/126) that only ever pass amount. Mode -> button
        // lookup instead of hardcoding which button gets clicked,
        // same reasoning as not hardcoding the package name - the
        // payment mode used by a given test might not always be
        // Cash. .last() to guard against any stray duplicate button
        // elsewhere in the DOM at this point (same defensive
        // pattern as everywhere else tonight).
        const modeButton =
            paymentMode === 'UPI' ? this.locator.upiBtn :
            paymentMode === 'Card' ? this.locator.cardBtn :
            this.locator.cashBtn;

        await StepHelper.step(
            this.page,
            `Select ${paymentMode} as Payment Mode`,
            async () => {
                await this.keywords.click(
                    modeButton.last()
                );
            }
        );

        console.log(
            await this.locator.amountInput.count()
        );

        await this.locator.amountInput
            .nth(1)
            .waitFor({
                state: "visible"
            });

        await StepHelper.step(
            this.page,
            `Enter Amount - ${amount}`,
            async () => {
                await this.keywords.fill(
                    this.locator.amountInput.nth(1),
                    amount
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Record Payment',
            async () => {
                await this.keywords.click(
                    this.locator.recordPaymentBtn.nth(1)
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Get Payment Confirmation Message',
            async () => {

                this._paymentMessage =
                    (
                        await this.keywords.getText(
                            this.locator.paymentSuccessMessage
                        )
                    ).trim();
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Payment Recorded Successfully | Expected: contains "Payment recorded successfully" | Actual: ${this._paymentMessage}`,
            async () => {

                expect(
                    this._paymentMessage
                ).toContain(
                    "Payment recorded successfully"
                );

            }
        );
    }

    async clickCancel() {

        await expect(
            this.locator.cancelBtn
        ).toBeVisible({
            timeout: 10000
        });

        await StepHelper.step(
            this.page,
            'Click Cancel',
            async () => {
                await this.keywords.click(
                    this.locator.cancelBtn
                );
            }
        );
    }

    async cancellation() {

     // Wait for payment success popup/toaster to disappear
     await this.locator.paymentSuccessMessage.waitFor({
         state: 'hidden',
         timeout: 15000
     });


     await this.clickCancel();

     await StepHelper.step(
         this.page,
         'Select Whole Package',
         async () => {
             await this.keywords.click(
                 this.locator.wholePackageBtn
             );
         }
     );

     await StepHelper.step(
         this.page,
         'Choose Cancellation Reason',
         async () => {
             await this.keywords.click(
                 this.locator.chooseReason
             );
         }
     );


     await StepHelper.step(
         this.page,
         'Select Cancellation Reason',
         async () => {
             await this.keywords.click(
                 this.locator.cancellationReason(
                     cancellationData.cancellationReason
                 )
             );
         }
     );

     await StepHelper.step(
         this.page,
         'Continue Cancellation',
         async () => {
             await this.keywords.click(
                 this.locator.continueCancellationBtn
             );
         }
     );

     await StepHelper.step(
         this.page,
         'Select Cancellation Option',
         async () => {
             await this.keywords.click(
                 this.locator.cancellationOption
             );
         }
     );

     await StepHelper.step(
         this.page,
         'Continue',
         async () => {
             await this.keywords.click(
                 this.locator.continueBtn
             );
         }
     );

    await StepHelper.step(
     this.page,
     'Select Refund Option',
     async () => {
         await this.keywords.click(
             this.locator.refundBtn
         );
     }
    );
    }

    async verifyPackageNameAndRefundAmount(
        expectedPackageName,
        expectedPaidAmount
    ) {

        await StepHelper.step(
            this.page,
            `Verify Package Name on Cancel Modal | Expected: ${expectedPackageName}`,
            async () => {

                await expect(
                    this.locator.cancelModalPackageName(
                        expectedPackageName
                    )
                ).toBeVisible();
            }
        );

        const actualAmountAlreadyPaid =
            (
                await this.keywords.getText(
                    this.locator.amountAlreadyPaidValue
                )
            ).trim();

        const expectedAmountText =
            `₹ ${parseFloat(expectedPaidAmount).toFixed(0)}`;

        await StepHelper.step(
            this.page,
            `Verify Total Refund Amount == Paid Amount | Expected: ${expectedAmountText} | Actual: ${actualAmountAlreadyPaid}`,
            async () => {

                expect(actualAmountAlreadyPaid).toContain(
                    parseFloat(expectedPaidAmount).toFixed(0)
                );
            }
        );
    }

    async attemptOverRefundAndVerifyBlocked(paidAmount) {

        const overLimitAmount = (
            parseFloat(paidAmount) + 1000
        ).toFixed(2);

        await StepHelper.step(
            this.page,
            `Enter Over-Limit Refund Amount - ${overLimitAmount}`,
            async () => {

                await this.keywords.fill(
                    this.locator.amountTxt,
                    overLimitAmount
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Review & Confirm (expecting a rejected/Abandoned outcome)',
            async () => {

                await this.keywords.click(
                    this.locator.reviewConfirmBtn
                );
            }
        );

        const actualStatus =
            (
                await this.keywords.getText(
                    this.locator.newPackageStatusValue
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Over-Refund Amount Was Rejected | Expected: New Package Status shows Abandoned (not Cancelled) | Actual: ${actualStatus}`,
            async () => {

                expect(actualStatus).toBe('Abandoned');
            }
        );

        await StepHelper.step(
            this.page,
            'Click Back to Recover From Invalid Amount',
            async () => {

                await this.keywords.click(
                    this.locator.reviewScreenBackBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Clear Over-Limit Amount',
            async () => {

                await this.locator.amountTxt.fill('');
            }
        );
    }

    async cancelPackageWithFullRefund(){

    await StepHelper.step(
        this.page,
        'Select Make Full Refund',
        async () => {
            await this.keywords.click(
                this.locator.fullRefundCheckbox
            );
        }
    );

    // Root cause of this method always landing on "Abandoned" instead of
    // "Cancelled": attemptOverRefundAndVerifyBlocked() clears the refund
    // amount field to '' on its way out, and checking "Make full refund"
    // does not reliably repopulate it - so this was proceeding with an
    // empty amount every time. Reads the paid amount straight off this
    // same screen (same locator verifyPackageNameAndRefundAmount() already
    // reads earlier in this flow) and fills it explicitly instead of
    // trusting the checkbox alone.
    await StepHelper.step(
        this.page,
        'Ensure Full Refund Amount Is Populated',
        async () => {

            const amountAlreadyPaid =
                (
                    await this.keywords.getText(
                        this.locator.amountAlreadyPaidValue
                    )
                ).trim();

            const numericAmount = amountAlreadyPaid.replace(/[^0-9.]/g, '');

            await this.keywords.fill(
                this.locator.amountTxt,
                numericAmount
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Review And Confirm Full Refund',
        async () => {
            await this.keywords.click(
                this.locator.reviewConfirmBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Confirm Cancellation',
        async () => {
            await this.keywords.click(
                this.locator.confirmCancellationBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Verify Package Cancelled',
        async () => {
            // Longer timeout here only (30s, not the global 10s) - the
            // backend processes the cancellation+refund before this
            // status badge updates, and that can occasionally run past
            // 10 seconds. Nothing else about this check changed.
            await expect(
                this.locator.cancelledStatus
            ).toContainText(
                cancellationData.expectedStatus,
                { timeout: cancellationStatusTimeoutMs }
            );
        }
    );
    }

}

module.exports = { E2EPage };