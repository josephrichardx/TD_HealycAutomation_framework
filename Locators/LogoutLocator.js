class LogoutLocator {

    constructor(page) {

        this.profileImage =
            page.locator("//div[@id='profileImage']");

        this.logoutButton =
            page.locator("//li[text()=' Logout ']");
    }
}

module.exports = { LogoutLocator };