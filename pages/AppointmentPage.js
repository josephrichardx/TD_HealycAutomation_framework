const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper.js');
const { Keywords } = require('../utils/Keywords.js');
const { Verify } = require('../utils/verification.js');
const { AppointmentLocator } = require('../Locators/AppointmentLocator.js');

const {
    addNewMenuItems,
    appointmentTypeData,
    appointmentActionData,
    appointmentVerificationData
} = require('../testdata/appointmentData.json');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class AppointmentPage {

    constructor(page) {
        this.page = page;
        this.locator = new AppointmentLocator(page);
        this.keywords = new Keywords();
    }

    async clickPatientNameInAppointmentPanel(patientName) {

        const patientNameInPanel =
            this.locator.getPatientNameInAppointmentPanel(patientName);

        await StepHelper.step(
            this.page,
            `Click patient name in appointment panel to expand full screen: '${patientName}'`,
            async () => {

                await this.keywords.waitForElement(
                    patientNameInPanel,
                    timeout.elementTimeout
                );

                await this.keywords.scrollIntoViewIfNeeded(
                    patientNameInPanel
                );
            }
        );

        await Verify.state(
            this.page,
            `Patient Name In Appointment Panel - ${patientName}`,
            patientNameInPanel,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Open full screen appointment view - ${patientName}`,
            async () => {

                // A transient appointment-details panel can intercept the
                // pointer events here, so the click has to be forced.
                await this.keywords.forceClick(patientNameInPanel);
            }
        );
    }

    async clickAddNewButton() {

        await this.keywords.waitForElement(
            this.locator.addNewBtn,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            `${appointmentActionData.addNewButton} Button`,
            this.locator.addNewBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Click ${appointmentActionData.addNewButton} Button to open dropdown menu`,
            async () => {
                await this.keywords.click(this.locator.addNewBtn);
            }
        );
    }

    async verifyAddNewMenuItems() {

        for (const menuItem of addNewMenuItems) {

            const menuItemLocator =
                this.locator.getAddNewMenuItem(menuItem);

            await StepHelper.step(
                this.page,
                `Wait For Add New Menu Item - ${menuItem}`,
                async () => {
                    await this.keywords.waitForElement(
                        menuItemLocator,
                        timeout.elementTimeout
                    );
                }
            );

            await Verify.state(
                this.page,
                `Add New Menu Item - ${menuItem}`,
                menuItemLocator,
                { visible: true, soft: false }
            );

            await Verify.text(
                this.page,
                `Add New Menu Item Text - ${menuItem}`,
                menuItem,
                menuItemLocator,
                { exact: true }
            );
        }
    }

    async closeAddNewDropdown() {

        await StepHelper.step(
            this.page,
            'Close Add New dropdown (Escape)',
            async () => {
                await this.keywords.keyboardPress(
                    this.page,
                    'Escape'
                );
            }
        );
    }

    async openTypeDropdown(currentTypeLabel) {

        const typeDropdown = this.locator.typeDropdownBtn(
            currentTypeLabel
        );

        await StepHelper.step(
            this.page,
            `Wait For Type dropdown - '${currentTypeLabel}'`,
            async () => {
                await this.keywords.waitForElement(
                    typeDropdown,
                    timeout.elementTimeout
                );
            }
        );

        await Verify.state(
            this.page,
            `Type Dropdown - ${currentTypeLabel}`,
            typeDropdown,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Open Type dropdown on appointment page: '${currentTypeLabel}'`,
            async () => {
                await this.keywords.click(typeDropdown);
            }
        );
    }

    async openCurrentTypeDropdown(
        currentTypeLabel = appointmentTypeData.consult
    ) {

        const currentTypeDropdown = this.locator.currentTypeDropdown(
            currentTypeLabel
        );

        await StepHelper.step(
            this.page,
            `Wait For current Type dropdown - '${currentTypeLabel}'`,
            async () => {
                await this.keywords.waitForElement(
                    currentTypeDropdown,
                    timeout.elementTimeout
                );
            }
        );

        await Verify.state(
            this.page,
            `Current Type Dropdown - ${currentTypeLabel}`,
            currentTypeDropdown,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Open current Type dropdown after changing it to '${currentTypeLabel}'`,
            async () => {
                await this.keywords.click(currentTypeDropdown);
            }
        );
    }

    async selectType(type) {

        await StepHelper.step(
            this.page,
            `Select ${type} from the Type dropdown`,
            async () => {
                await this.keywords.click(
                    this.locator.typeOption(type)
                );
            }
        );

        /*
         * No fixed wait is used here.
         * Playwright/Keywords will wait for the required element
         * when the next verification/action is performed.
         */
    }

    async verifyDoctorAndService(
        type,
        storedDoctorName,
        storedTypeValue,
        storedServiceName
    ) {

        const doctorLocator = this.locator.getExactText(
            storedDoctorName
        );

        await StepHelper.step(
            this.page,
            `Wait For ${type} Type - Doctor Name - ${storedDoctorName}`,
            async () => {
                await this.keywords.waitForElement(
                    doctorLocator,
                    timeout.elementTimeout
                );
            }
        );

        await Verify.state(
            this.page,
            `${type} Type - Doctor Name - ${storedDoctorName} is displayed`,
            doctorLocator,
            { visible: true, soft: false }
        );

        if (type === appointmentTypeData.consult) {

            const consultLocator = this.locator.getExactText(
                storedTypeValue
            );

            await StepHelper.step(
                this.page,
                `Wait For ${type} Type - Consult Slot - ${storedTypeValue}`,
                async () => {
                    await this.keywords.waitForElement(
                        consultLocator,
                        timeout.elementTimeout
                    );
                }
            );

            await Verify.state(
                this.page,
                `${type} Type - Consult Slot - ${storedTypeValue} is displayed`,
                consultLocator,
                { visible: true, soft: false }
            );

        } else if (type === appointmentTypeData.service) {

            const serviceLocator = this.locator.getExactText(
                storedServiceName
            );

            await StepHelper.step(
                this.page,
                `Wait For ${type} Type - Service Name - ${storedServiceName}`,
                async () => {
                    await this.keywords.waitForElement(
                        serviceLocator,
                        timeout.elementTimeout
                    );
                }
            );

            await Verify.state(
                this.page,
                `${type} Type - Service Name - ${storedServiceName} is displayed`,
                serviceLocator,
                { visible: true, soft: false }
            );
        }
    }

    async clickAddNewForWaitlist() {

        await this.keywords.waitForElement(
            this.locator.addNewBtnForWaitlist,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            `${appointmentActionData.addNewButton} Button For Waitlist`,
            this.locator.addNewBtnForWaitlist,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Click ${appointmentActionData.addNewButton} Button for Waitlist consult booking`,
            async () => {
                await this.keywords.click(
                    this.locator.addNewBtnForWaitlist
                );
            }
        );
    }

    async clickAddConsult() {

        await this.keywords.waitForElement(
            this.locator.addConsultBtn,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            `${appointmentActionData.addConsultButton} Button`,
            this.locator.addConsultBtn,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select ${appointmentActionData.addConsultButton} from the dropdown`,
            async () => {
                await this.keywords.click(
                    this.locator.addConsultBtn
                );
            }
        );
    }

    async enterConsultSlot(consultSlot) {

        await StepHelper.step(
            this.page,
            `Type Consult Slot name: ${consultSlot}`,
            async () => {

                await this.keywords.click(
                    this.locator.consultSlotInput
                );

                await this.keywords.fill(
                    this.locator.consultSlotInput,
                    consultSlot
                );
            }
        );
    }

    async selectConsultOption(consultSlot) {

        const consultOptionLocator =
            this.locator.getConsultOption(consultSlot);

        await StepHelper.step(
            this.page,
            `Wait For Consult Option - ${consultSlot}`,
            async () => {
                await this.keywords.waitForElement(
                    consultOptionLocator,
                    timeout.elementTimeout
                );
            }
        );

        await Verify.state(
            this.page,
            `Consult Option - ${consultSlot}`,
            consultOptionLocator,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Consult Option: ${consultSlot}`,
            async () => {
                await this.keywords.click(consultOptionLocator);
            }
        );
    }

    async closeProviderDropdown() {

        await StepHelper.step(
            this.page,
            'Close Provider dropdown (Escape)',
            async () => {
                await this.keywords.keyboardPress(
                    this.page,
                    'Escape'
                );
            }
        );
    }

    async openBookingDatePicker() {

        await this.keywords.waitForElement(
            this.locator.bookingDateContainer,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            'Booking Date Picker',
            this.locator.bookingDateContainer,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Open Booking Date picker',
            async () => {
                await this.keywords.click(
                    this.locator.bookingDateContainer
                );
            }
        );
    }

    async selectBookingDate(bookingDate) {

        const bookingDateOption =
            this.locator.getBookingDateOption(bookingDate);

        await this.keywords.waitForElement(
            bookingDateOption,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            `Booking Date Option - ${bookingDate}`,
            bookingDateOption,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Booking Date: ${bookingDate}`,
            async () => {
                await this.keywords.click(bookingDateOption);
            }
        );
    }

    async applyBookingDate() {

        await this.keywords.waitForElement(
            this.locator.applyBookingDateBtn,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            `${appointmentActionData.applyButton} Booking Date Button`,
            this.locator.applyBookingDateBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Apply the selected Booking Date',
            async () => {
                await this.keywords.click(
                    this.locator.applyBookingDateBtn
                );
            }
        );
    }

    // Walks the booking date picker day by day starting from today.
    // Instead of using a fixed wait, the method waits for the
    // available slot condition before checking the count.

    async selectRuntimeBookingDate(maxDaysToTry = 31) {

        let selectedDay = null;

        const todayDayOfMonth = new Date().getDate();

        await StepHelper.step(
            this.page,
            'Select booking date at runtime - walk dates from today until one has an available slot',
            async () => {

                await this.openBookingDatePicker();

                const dayCount =
                    await this.locator.bookingDateSelectableDays
                        .count()
                        .catch(() => 0);

                for (
                    let index = 0;
                    index < Math.min(dayCount, maxDaysToTry);
                    index++
                ) {

                    // Applying a date closes the picker, so it has to be
                    // reopened before reading/clicking the next candidate.
                    if (index > 0) {
                        await this.openBookingDatePicker();
                    }

                    const day =
                        this.locator.bookingDateSelectableDays.nth(index);

                    const dayText = (
                        await this.keywords.getText(day)
                    ).trim();

                    const dayNumber = Number(dayText);

                    if (
                        !Number.isInteger(dayNumber) ||
                        dayNumber < todayDayOfMonth
                    ) {
                        continue;
                    }

                    await this.keywords.click(day);

                    await this.applyBookingDate();

                    /*
                     * Wait for the page/network activity to settle.
                     * No fixed mediumWait is used.
                     */
                    await this.page
                        .waitForLoadState('networkidle')
                        .catch(() => {});

                    /*
                     * Wait UP TO elementTimeout for an available slot
                     * to appear. If it appears earlier, execution continues
                     * immediately.
                     */
                    await this.locator.availableSlotButtons
                        .first()
                        .waitFor({
                            state: 'visible',
                            timeout: timeout.elementTimeout
                        })
                        .catch(() => {});

                    const slotCount =
                        await this.locator
                            .availableSlotButtons
                            .count()
                            .catch(() => 0);

                    if (slotCount > 0) {

                        selectedDay = dayText;

                        console.log(
                            `Runtime booking date selected: ${dayText} (slot available)`
                        );

                        return;
                    }

                    console.log(
                        `No available slot on day ${dayText} - checking next date`
                    );
                }

                throw new Error(
                    `Unable to find a booking date with an available slot ` +
                    `(scanned ${Math.min(dayCount, maxDaysToTry)} day(s) ` +
                    `in the currently displayed month).`
                );
            }
        );

        return selectedDay;
    }

    async verifyConfirmedAppointment(patientName) {

        const step = 'Verify Confirmed Appointment';

        const verification =
            appointmentVerificationData.confirmedStatus;

        const statusBadge =
            this.locator.getAppointmentStatusBadge(
                verification.expectedStatus
            );

        let actualStatusText;

        await StepHelper.step(
            this.page,
            `Get Appointment Status - ${patientName}`,
            async () => {

                await this.keywords.waitForElement(
                    this.locator.appointmentContainer,
                    timeout.elementTimeout
                );

                actualStatusText = (
                    await this.keywords.getText(statusBadge)
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Appointment Status Badge - ${patientName} is displayed`,
            statusBadge,
            { visible: true, soft: false }
        );

        await Verify.contains(
            this.page,
            `${step} - ${patientName}`,
            verification.expectedStatus,
            actualStatusText
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

      async verifyAppointmentPatientDetails(patientData, dobData) {

        const readField = (fieldLabel) => async () =>
            (
                await this.locator
                    .appointmentPatientInfoValue(fieldLabel)
                    .innerText({ timeout: timeout.networkIdleTimeoutMs })
            ).trim();

        const { calculateAgeFromDate } = require('../utils/RandomData');
        const expectedAge = calculateAgeFromDate(dobData.dateObj);

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
        await Verify.contains(
            this.page,
            'Verify Referral Source (Appointment Details)',
            patientData.referralBy,
            readField('Referral source')
        );

        return actualUhid;
    }

    async verifyAndClickCancelledAppointmentCard(patientName) {

        const card =
            this.locator.cancelledAppointmentCard(patientName);

        await this.page.waitForLoadState('networkidle', { timeout: timeout.elementTimeout })

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

    



}

module.exports = { AppointmentPage };