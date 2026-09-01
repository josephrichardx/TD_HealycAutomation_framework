const { test } = require('@playwright/test');

// Every raw Playwright call below runs inside a BOXED test.step. Boxing keeps
// the internal "Wait for selector locator('xpath=...')" entries out of the HTML
// report, so the report shows business steps instead of raw selectors.
async function boxed(title, action) {

    try {

        return await test.step(
            title,
            action,
            { box: true }
        );

    } catch (error) {

        if (
            error &&
            /can only be called from a test/i.test(error.message)
        ) {
            return await action();
        }

        throw error;
    }
}

class Keywords {
 
    // =========================================================
    // CLICK
    // =========================================================
 
    // async click(locator) {
 
    //     await locator.waitFor({
    //         state: 'visible',
    //         timeout: 30000
    //     });
 
    //     await locator.click();
    // }

    async click(locator, timeout = 60000) {

    await locator.waitFor({
        state: 'attached',
        timeout
    });

    await locator.scrollIntoViewIfNeeded();

    await locator.waitFor({
        state: 'visible',
        timeout
    });

    await locator.click({
        timeout
    });
}
 
 
    // =========================================================
    // FILL
    // =========================================================
 
    // async fill(locator, value) {
 
    //     await locator.waitFor({
    //         state: 'visible',
    //         timeout: 30000
    //     });
 
    //     await locator.fill(
    //         value.toString()
    //     );
    // }

    async fill(locator, value, timeout = 60000) {

    await locator.waitFor({
        state: 'visible',
        timeout
    });

    await locator.fill(
        value.toString(),
        { timeout }
    );
}
 
 
    // =========================================================
    // CLEAR
    // =========================================================
 
    async clear(locator) {

        return await boxed('Clear element', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.clear();
        });
    }
 
 
    // =========================================================
    // TYPE / PRESS SEQUENTIALLY
    // =========================================================
 
    // async type(locator, value) {
 
    //     await locator.waitFor({
    //         state: 'visible',
    //         timeout: 30000
    //     });
 
    //     await locator.focus();
 
    //     await locator.pressSequentially(
    //         value.toString()
    //     );
    // }

    async type(locator, value, timeout = 60000) {

    await locator.waitFor({
        state: 'visible',
        timeout
    });

    await locator.focus();

    await locator.pressSequentially(
        value.toString()
    );
}

 
 
    // =========================================================
    // WAIT FOR ELEMENT
    // =========================================================
 
    // async waitForElement(
    //     locator,
    //     timeout = 30000
    // ) {
 
    //     await locator.waitFor({
    //         state: 'attached',
    //         timeout
    //     });
 
    //     await locator.waitFor({
    //         state: 'visible',
    //         timeout
    //     });
    // }

    async waitForElement(
    locator,
    timeout = 60000
) {

    await locator.waitFor({
        state: 'visible',
        timeout
    });

    return locator;
}
 
 
    // =========================================================
    // GET TEXT
    // =========================================================
 
    async getText(locator) {

        return await boxed('Get element text', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                return await locator.innerText();
        });
    }
 
 
    // =========================================================
    // GET TEXT CONTENT
    // =========================================================
 
    async getTextContent(locator) {

        return await boxed('Get element text content', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                return await locator.textContent();
        });
    }
 
 
    // =========================================================
    // DOUBLE CLICK
    // =========================================================
 
    async doubleClick(locator) {

        return await boxed('Double click element', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.dblclick();
        });
    }
 
 
    // =========================================================
    // HOVER
    // =========================================================
 
    async hover(locator) {

        return await boxed('Hover element', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.scrollIntoViewIfNeeded();
 
                await locator.hover();
        });
    }
 
 
    // =========================================================
    // SCROLL INTO VIEW
    // =========================================================
 
    async scrollIntoViewIfNeeded(
        locator,
        timeout = 120000
    ) {

        return await boxed('Scroll element into view', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout
                });
 
                await locator.scrollIntoViewIfNeeded();
        });
    }
 
 
    // =========================================================
    // CHECK
    // =========================================================
 
    async check(locator) {

        return await boxed('Check element', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.check();
        });
    }
 
 
    // =========================================================
    // UNCHECK
    // =========================================================
 
    async uncheck(locator) {

        return await boxed('Uncheck element', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.uncheck();
        });
    }
 
 
    // =========================================================
    // SELECT OPTION
    // =========================================================
 
    async selectOption(locator, value) {

        return await boxed('Select option', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.selectOption(value);
        });
    }
 
 
    // =========================================================
    // PRESS KEY
    // =========================================================
 
    async press(locator, key) {

        return await boxed('Press key on element', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.press(key);
        });
    }
 
 
    // =========================================================
    // PAGE KEYBOARD PRESS
    // =========================================================
 
    async keyboardPress(page, key) {

        return await boxed('Press key', async () => {
 
                await page.keyboard.press(key);
        });
    }
 
 
    // =========================================================
    // WAIT
    // =========================================================
 
    async wait(page, milliseconds) {

        return await boxed('Wait', async () => {
 
                await page.waitForTimeout(
                    milliseconds
                );
        });
    }
 
 
    // =========================================================
    // GOTO URL
    // =========================================================
 
    async gotoUrl(page, url) {

        return await boxed('Go to URL', async () => {
 
                await page.goto(
                    url,
                    {
                        waitUntil: 'domcontentloaded'
                    }
                );
        });
    }
 
 
    // =========================================================
    // RELOAD
    // =========================================================
 
    async reload(page) {

        return await boxed('Reload page', async () => {
 
                await page.reload({
                    waitUntil: 'load'
                });
        });
    }
 
 
    // =========================================================
    // WAIT FOR LOAD STATE
    // =========================================================
 
    async waitForLoadState(
        page,
        state = 'networkidle',
        timeout = 30000
    ) {

        return await boxed('Wait for load state', async () => {
 
                await page.waitForLoadState(
                    state,
                    { timeout }
                );
        });
    }
 
 
    // =========================================================
    // UPLOAD FILE
    // =========================================================
 
    async uploadFile(
        locator,
        filePath
    ) {

        return await boxed('Upload file', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.setInputFiles(
                    filePath
                );
        });
    }
 
 
    // =========================================================
    // HOVER AND CLICK
    // =========================================================
 
    async hoverAndClick(locator) {

        return await boxed('Hover and click element', async () => {
 
                await locator.waitFor({
                    state: 'visible',
                    timeout: 30000
                });
 
                await locator.hover();
 
                await locator.page().waitForTimeout(500);
 
                await locator.click();
        });
    }
 
 
    // =========================================================
    // SWITCH TO NEW TAB
    // =========================================================
 
    async switchToTab(page, locator) {

        return await boxed('Switch tab', async () => {
 
                const pagePromise =
                    page.waitForEvent('popup');
 
                await locator.click();
 
                return await pagePromise;
        });
    }
}
 
 
module.exports = { Keywords };
 