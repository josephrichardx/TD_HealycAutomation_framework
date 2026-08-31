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
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.clear();
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
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        return await locator.innerText();
    }
 
 
    // =========================================================
    // GET TEXT CONTENT
    // =========================================================
 
    async getTextContent(locator) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        return await locator.textContent();
    }
 
 
    // =========================================================
    // DOUBLE CLICK
    // =========================================================
 
    async doubleClick(locator) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.dblclick();
    }
 
 
    // =========================================================
    // HOVER
    // =========================================================
 
    async hover(locator) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.scrollIntoViewIfNeeded();
 
        await locator.hover();
    }
 
 
    // =========================================================
    // SCROLL INTO VIEW
    // =========================================================
 
    async scrollIntoViewIfNeeded(
        locator,
        timeout = 120000
    ) {
 
        await locator.waitFor({
            state: 'visible',
            timeout
        });
 
        await locator.scrollIntoViewIfNeeded();
    }
 
 
    // =========================================================
    // CHECK
    // =========================================================
 
    async check(locator) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.check();
    }
 
 
    // =========================================================
    // UNCHECK
    // =========================================================
 
    async uncheck(locator) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.uncheck();
    }
 
 
    // =========================================================
    // SELECT OPTION
    // =========================================================
 
    async selectOption(locator, value) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.selectOption(value);
    }
 
 
    // =========================================================
    // PRESS KEY
    // =========================================================
 
    async press(locator, key) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.press(key);
    }
 
 
    // =========================================================
    // PAGE KEYBOARD PRESS
    // =========================================================
 
    async keyboardPress(page, key) {
 
        await page.keyboard.press(key);
    }
 
 
    // =========================================================
    // WAIT
    // =========================================================
 
    async wait(page, milliseconds) {
 
        await page.waitForTimeout(
            milliseconds
        );
    }
 
 
    // =========================================================
    // GOTO URL
    // =========================================================
 
    async gotoUrl(page, url) {
 
        await page.goto(
            url,
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }
 
 
    // =========================================================
    // RELOAD
    // =========================================================
 
    async reload(page) {
 
        await page.reload({
            waitUntil: 'load'
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
 
        await page.waitForLoadState(
            state,
            { timeout }
        );
    }
 
 
    // =========================================================
    // UPLOAD FILE
    // =========================================================
 
    async uploadFile(
        locator,
        filePath
    ) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.setInputFiles(
            filePath
        );
    }
 
 
    // =========================================================
    // HOVER AND CLICK
    // =========================================================
 
    async hoverAndClick(locator) {
 
        await locator.waitFor({
            state: 'visible',
            timeout: 30000
        });
 
        await locator.hover();
 
        await locator.page().waitForTimeout(500);
 
        await locator.click();
    }
 
 
    // =========================================================
    // SWITCH TO NEW TAB
    // =========================================================
 
    async switchToTab(page, locator) {
 
        const pagePromise =
            page.waitForEvent('popup');
 
        await locator.click();
 
        return await pagePromise;
    }
}
 
 
module.exports = { Keywords };
 