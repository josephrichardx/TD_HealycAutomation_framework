const { StepHelper } = require('../utils/StepHelper');
const { LoginLocator } = require('../Locators/LoginLocator');
const { Keywords } = require('../utils/Keywords');
const { loginData } = require('../testdata/users.json');

class LoginPage {

    constructor(page) {
        this.page = page;
        this.locator = new LoginLocator(page);
        this.keywords = new Keywords();
    }


    async login(options = {}) {

        const {
            skipIfAuthenticated = true,
            waitForSuccess = true
        } = options;


        await StepHelper.step(
            this.page,
            'Open Healync Application',
            async () => {

                await this.keywords.gotoUrl(
                    this.page,
                    loginData.url
                );

            }
        );


        const loginFormVisible =
            await this.locator.userName
                .isVisible()
                .catch(() => false);


        if (
            skipIfAuthenticated &&
            !loginFormVisible
        ) {
            return;
        }


        await StepHelper.step(
            this.page,
            `Enter Username - ${loginData.username}`,
            async () => {

                await this.keywords.waitForElement(
                    this.locator.userName,
                    30000
                );

                await this.keywords.fill(
                    this.locator.userName,
                    loginData.username
                );

            }
        );


        await StepHelper.step(
            this.page,
            'Enter Password',
            async () => {

                await this.keywords.fill(
                    this.locator.password,
                    loginData.password
                );

            }
        );


        await StepHelper.step(
            this.page,
            'Click Sign In Button',
            async () => {

                await this.keywords.click(
                    this.locator.signInBtn
                );

            }
        );


        if (waitForSuccess) {

            await StepHelper.step(
                this.page,
                'Wait For Successful Login',
                async () => {

                    await this.page
                        .waitForLoadState(
                            'networkidle',
                            {
                                timeout: 30000
                            }
                        )
                        .catch(() => {});


                    await this.page
                        .waitForURL(
                            (url) =>
                                !url.pathname.includes('/login') &&
                                !url.pathname.includes('login'),
                            {
                                timeout: 30000
                            }
                        )
                        .catch(() => {});

                }
            );
        }
    }
}


module.exports = { LoginPage };