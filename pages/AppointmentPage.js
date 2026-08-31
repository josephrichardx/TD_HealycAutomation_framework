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
const { waitData } = require('../testdata/waitData.json');

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

                await this.keywords.waitForElement(patientNameInPanel);

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

        await this.keywords.waitForElement(this.locator.addNewBtn);

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
                    await this.keywords.waitForElement(menuItemLocator);
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
                await this.keywords.waitForElement(typeDropdown);
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
                await this.keywords.waitForElement(currentTypeDropdown);
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

        // The panel re-renders with the newly selected type's details.
        await this.keywords.wait(
            this.page,
            waitData.mediumWait
        );
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
                await this.keywords.waitForElement(doctorLocator);
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
                    await this.keywords.waitForElement(consultLocator);
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
                    await this.keywords.waitForElement(serviceLocator);
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

        await this.keywords.waitForElement(this.locator.addNewBtnForWaitlist);

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

        await this.keywords.waitForElement(this.locator.addConsultBtn);

        await Verify.state(
            this.page,
            `${appointmentActionData.addConsultButton} Button`,
            this.locator.addConsultBtn,
            { visible: true, enabled: true, soft: false }
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
                    consultOptionLocator
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

        await this.keywords.waitForElement(this.locator.bookingDateContainer);

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

        await this.keywords.waitForElement(bookingDateOption);

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

        await this.keywords.waitForElement(this.locator.applyBookingDateBtn);

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

    async verifyConfirmedAppointment(patientName) {

        const verification =
            appointmentVerificationData.confirmedStatus;

        const statusBadge = this.locator.getAppointmentStatusBadge(
            verification.expectedStatus
        );

        let actualStatusText;

        await StepHelper.step(
            this.page,
            `Get Appointment Status - ${patientName}`,
            async () => {

                await this.keywords.waitForElement(
                    this.locator.appointmentContainer
                );

                // Read the status the application actually rendered.
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
            `${verification.step} - ${patientName}`,
            verification.expectedStatus,
            actualStatusText
        );
    }
}

module.exports = { AppointmentPage };
