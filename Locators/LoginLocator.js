class LoginLocator {

    constructor(page) {
        this.page = page;

        this.userName = page.getByRole('textbox', {
            name: 'Enter phone number'
        });

        this.password = page.getByRole('textbox', {
            name: 'Enter password'
        });

        this.signInBtn = page.getByRole('button', {
            name: 'Sign in'
        });
    }
}

module.exports = { LoginLocator };