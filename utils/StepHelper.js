const { test } = require('@playwright/test');

class StepHelper {

    static async step(page, name, action) {

        const attachScreenshot = async (screenshotName) => {

            if (page && typeof page.screenshot === 'function') {
                try {
                    const screenshot = await page.screenshot();

                    await test.info().attach(screenshotName, {
                        body: screenshot,
                        contentType: 'image/png'
                    });

                } catch {
                    // Ignore screenshot attachment failures
                }
            }
        };


        // A full-page screenshot per passing step dominates the run time (every
        // Verify.* call goes through here) and bloats the HTML report. Capture
        // them only on failure; set STEP_SCREENSHOTS=all to get every step.
        const screenshotEveryStep =
            process.env.STEP_SCREENSHOTS === 'all';

        const runAction = async () => {

            try {

                await action();

                if (screenshotEveryStep) {

                    await attachScreenshot(
                        `${name} - PASSED`
                    );
                }

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