const { test } = require('@playwright/test');

class StepHelper {

    static async step(page, name, action) {

        const attachScreenshot = async (screenshotName) => {

            if (page && typeof page.screenshot === 'function') {
                try {
                    const screenshot = await page.screenshot({
                        fullPage: true
                    });

                    await test.info().attach(screenshotName, {
                        body: screenshot,
                        contentType: 'image/png'
                    });

                } catch {
                    // Ignore screenshot attachment failures
                }
            }
        };


        const runAction = async () => {

            try {

                await action();

                // Screenshot when step passes
                await attachScreenshot(
                    `${name} - PASSED`
                );

            } catch (error) {

                // Screenshot when step fails
                await attachScreenshot(
                    `${name} - FAILED`
                );

                throw error;
            }
        };


        try {

            await test.step(name, async () => {
                await runAction();
            });

        } catch (error) {

            if (
                error &&
                /can only be called from a test/i.test(error.message)
            ) {
                await runAction();
            } else {
                throw error;
            }
        }
    }

    static async logStep(page, stepName, action) {
    await test.step(stepName, async () => {
        try {
            await action();

            console.log(
                `[PASS] ${stepName}`
            );
        } catch (error) {
            console.log(
                `[FAIL] ${stepName}`
            );
            throw error;
        }
    });
}
}

module.exports = { StepHelper };