const { StepHelper } = require('../utils/StepHelper');
const { LogoutLocator } = require('../Locators/LogoutLocator');
const { Keywords } = require('../utils/Keywords');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class LogoutPage {

    constructor(page) {

        this.page = page;
        this.locator = new LogoutLocator(page);
        this.keywords = new Keywords();
    }

    async logout() {

        await StepHelper.step(
            this.page,
            'Logout from Application',
            async () => {

                await this.keywords.waitForElement(
                    this.locator.profileImage,
                    timeout.elementTimeout
                );

                await this.keywords.click(
                    this.locator.profileImage
                );

                await this.keywords.waitForElement(
                    this.locator.logoutButton,
                    timeout.elementTimeout
                );

                await this.keywords.click(
                    this.locator.logoutButton
                );
            }
        );
    }
}

module.exports = { LogoutPage };