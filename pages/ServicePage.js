const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { ServiceLocator } = require('../Locators/ServiceLocator');
const { Keywords } = require('../utils/Keywords');

class ServicePage {

    constructor(page) {
        this.page = page;
        this.locator = new ServiceLocator(page);
        this.keywords = new Keywords();
    }


    async clickAddService() {

        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {
                await this.keywords.click(
                    this.locator.addNewBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Add Service Button',
            async () => {
                await this.keywords.click(
                    this.locator.addServiceBtn
                );
            }
        );
    }


    async searchPatient(patientName) {

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


    async searchExistingPatient(patientName) {

        await this.keywords.waitForElement(
            this.locator.patientSearchTxt
        );


        await StepHelper.step(
            this.page,
            `Search Existing Patient - ${patientName}`,
            async () => {

                await this.keywords.fill(
                    this.locator.patientSearchTxt,
                    patientName
                );
            }
        );


        await this.keywords.wait(
            this.page,
            1000
        );


        const existingPatient =
            this.locator.getExistingPatient();


        await this.keywords.waitForElement(
            existingPatient
        );


        await StepHelper.step(
            this.page,
            `Select Existing Patient - ${patientName}`,
            async () => {
                await this.keywords.click(
                    existingPatient
                );
            }
        );
    }


    async selectProvider(
        serviceName,
        bookingDate
    ) {

        await this.keywords.wait(
            this.page,
            3000
        );


        await StepHelper.step(
            this.page,
            'Open Service Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.providerDropdown
                );
            }
        );


        await StepHelper.step(
            this.page,
            `Enter Service - ${serviceName}`,
            async () => {

                await this.keywords.click(
                    this.locator.serviceInput
                );

                await this.keywords.fill(
                    this.locator.serviceInput,
                    serviceName
                );
            }
        );


        const serviceOption =
            this.locator.getServiceOption(
                serviceName
            );


        await serviceOption.waitFor({
            state: 'visible',
            timeout: 1000
        });


        await StepHelper.step(
            this.page,
            `Select Service - ${serviceName}`,
            async () => {
                await this.keywords.click(
                    serviceOption
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Close Service Dropdown',
            async () => {
                await this.keywords.keyboardPress(
                    this.page,
                    'Escape'
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Open Booking Date',
            async () => {
                await this.keywords.click(
                    this.locator.bookingDateContainer
                );
            }
        );


        await StepHelper.step(
            this.page,
            `Select Booking Date - ${bookingDate}`,
            async () => {

                await this.keywords.click(
                    this.locator.currentMonth.getByText(
                        bookingDate,
                        {
                            exact: true
                        }
                    )
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Apply Booking Date',
            async () => {
                await this.keywords.click(
                    this.locator.applyBtn
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Select First Available Slot',
            async () => {

                await this.keywords.click(
                    this.locator.slotButton.first()
                );
            }
        );
    }


    async selectMultipleServices(
        serviceNames
    ) {

        await this.keywords.wait(
            this.page,
            3000
        );


        await StepHelper.step(
            this.page,
            'Open Service Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.providerDropdown
                );
            }
        );


        for (const serviceName of serviceNames) {

            await StepHelper.step(
                this.page,
                `Search Service - ${serviceName}`,
                async () => {

                    await this.keywords.click(
                        this.locator.serviceInput
                    );

                    await this.keywords.press(
                        this.locator.serviceInput,
                        'Control+A'
                    );

                    await this.keywords.press(
                        this.locator.serviceInput,
                        'Backspace'
                    );

                    await this.keywords.fill(
                        this.locator.serviceInput,
                        serviceName
                    );
                }
            );


            const serviceOption =
                this.locator.getServiceOption(
                    serviceName
                );


            await serviceOption.waitFor({
                state: 'visible',
                timeout: 5000
            });


            await StepHelper.step(
                this.page,
                `Select Service - ${serviceName}`,
                async () => {
                    await this.keywords.click(
                        serviceOption
                    );
                }
            );


            await this.keywords.wait(
                this.page,
                1000
            );
        }


        await StepHelper.step(
            this.page,
            'Close Service Dropdown',
            async () => {
                await this.keywords.keyboardPress(
                    this.page,
                    'Escape'
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Open Booking Date',
            async () => {
                await this.keywords.click(
                    this.locator.bookingDateContainer
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Select Tomorrow',
            async () => {
                await this.keywords.click(
                    this.locator.tomorrowOption
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Apply Booking Date',
            async () => {
                await this.keywords.click(
                    this.locator.tomorrowApplyBtn
                );
            }
        );
    }


    async confirmServiceBooking() {

        await StepHelper.step(
            this.page,
            'Click Proceed',
            async () => {
                await this.keywords.click(
                    this.locator.proceedBtn
                );
            }
        );


        await StepHelper.step(
            this.page,
            'Click Confirm Booking',
            async () => {
                await this.keywords.click(
                    this.locator.confirmBookingBtn
                );
            }
        );


        await this.keywords.wait(
            this.page,
            5000
        );
    }


    async addService(
        patientName,
        serviceName,
        bookingDate
    ) {

        await this.clickAddService();

        await this.searchPatient(
            patientName
        );

        await this.selectProvider(
            serviceName,
            bookingDate
        );

        await this.confirmServiceBooking();
    }


    async addServiceForExistingPatient(
        patientName,
        serviceName,
        bookingDate
    ) {

        await this.clickAddService();

        await this.searchExistingPatient(
            patientName
        );

        await this.selectProvider(
            serviceName,
            bookingDate
        );

        await this.confirmServiceBooking();
    }
}


module.exports = { ServicePage };