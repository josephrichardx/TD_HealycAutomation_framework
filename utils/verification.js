import { test, expect } from '@playwright/test';
import { StepHelper } from './StepHelper.js';

export class Verify {

    static async _resolve(actual) {

        try {

            const value =
                typeof actual === 'function'
                    ? await actual()
                    : await actual;

            return {
                value: value === null || value === undefined
                    ? ''
                    : String(value).trim(),
                error: null
            };

        } catch (error) {

            return {
                value: '<could not be read>',
                error
            };
        }
    }


    static async _attach(payload) {

    console.log(
        `[${payload.status}] ${payload.step} | ` +
        `Expected (${payload.matcher}): ${payload.expected} | ` +
        `Actual: ${payload.actual}`
    );
}

    static async _compare(
        page,
        description,
        expected,
        actual,
        matcher,
        comparator,
        options = {}
    ) {

        const { soft = true } = options;

        const resolved = await this._resolve(actual);

        const actualValue = resolved.value;
        const expectedValue = String(expected);

        const passed =
            resolved.error
                ? false
                : comparator(actualValue, expectedValue);

        const status = passed
            ? 'PASS'
            : (soft ? 'FAIL (soft)' : 'FAIL');

        await this._attach({
            step: description,
            matcher,
            expected: expectedValue,
            actual: actualValue,
            mode: soft ? 'soft' : 'hard',
            status
        });

        const stepName =
            `${description} | Expected: ${expectedValue} | ` +
            `Actual: ${actualValue} | ${status}`;

        const failureMessage =
            `Verification failed - ${description}\n` +
            `  Matcher : ${matcher}\n` +
            `  Expected: ${expectedValue}\n` +
            `  Actual  : ${actualValue}`;

        await StepHelper.step(
            page,
            stepName,
            async () => {

                if (passed) {
                    return;
                }

                if (soft) {

                    expect.soft(
                        actualValue,
                        failureMessage
                    ).toBe(expectedValue);

                    return;
                }

                if (resolved.error) {
                    throw resolved.error;
                }

                throw new Error(failureMessage);
            }
        );

        return actualValue;
    }

    static async equals(page, description, expected, actual, options = {}) {

        return await this._compare(
            page,
            description,
            expected,
            actual,
            'equals',
            (a, e) => a === e,
            options
        );
    }


    static async equalsIgnoreCase(page, description, expected, actual, options = {}) {

        return await this._compare(
            page,
            description,
            expected,
            actual,
            'equalsIgnoreCase',
            (a, e) => a.toLowerCase() === e.toLowerCase(),
            options
        );
    }


    static async contains(page, description, expected, actual, options = {}) {

        return await this._compare(
            page,
            description,
            expected,
            actual,
            'contains',
            (a, e) => a.toLowerCase().includes(e.toLowerCase()),
            options
        );
    }

    static async matches(page, description, pattern, actual, options = {}) {

        return await this._compare(
            page,
            description,
            pattern.toString(),
            actual,
            'matches',
            (a) => new RegExp(
                pattern.source ?? pattern,
                pattern.flags ?? ''
            ).test(a),
            options
        );
    }

    static async greaterThan(page, description, minimum, actual, options = {}) {

        return await this._compare(
            page,
            description,
            `> ${minimum}`,
            actual,
            'greaterThan',
            (a) => Number(a) > Number(minimum),
            options
        );
    }

    static async count(page, description, expectedCount, locator, options = {}) {

        return await this._compare(
            page,
            description,
            expectedCount,
            async () => await locator.count(),
            'count',
            (a, e) => Number(a) === Number(e),
            options
        );
    }

    static async countAtLeast(page, description, minimum, locator, options = {}) {

        return await this._compare(
            page,
            description,
            `>= ${minimum}`,
            async () => await locator.count(),
            'countAtLeast',
            (a) => Number(a) >= Number(minimum),
            options
        );
    }

    static async state(page, description, locator, options = {}) {

        const {
            visible = null,
            enabled = null,
            editable = null,
            checked = null,
            hidden = null,
            soft = true
        } = options;

        const checks = [];

        const add = (label, expected, read) => {
            if (expected !== null) {
                checks.push({ label, expected, read });
            }
        };

        const safeRead = (label, fn) => async () => {

            try {
                return await fn();
            } catch (err) {
                console.log(
                    `[Verify.state] "${label}" check threw: ${err.message}`
                );
                return false;
            }
        };

        add('visible', visible,
            safeRead('visible', () => locator.isVisible()));

        add('enabled', enabled,
            safeRead('enabled', () => locator.isEnabled()));

        add('editable', editable,
            safeRead('editable', () => locator.isEditable()));

        add('checked', checked,
            safeRead('checked', () => locator.isChecked()));

        add('hidden', hidden,
            safeRead('hidden', () => locator.isHidden()));

        if (checks.length === 0) {
            throw new Error(
                '[Verify.state] At least one state option must be supplied.'
            );
        }

        for (const check of checks) {

            const expectedLabel = check.expected
                ? check.label
                : `not ${check.label}`;

            await this._compare(
                page,
                `${description} - is ${check.label}`,
                expectedLabel,
                async () => {

                    const value = await check.read();

                    return value ? check.label : `not ${check.label}`;
                },
                'state',
                (a, e) => a === e,
                { soft }
            );
        }
    }


    static async inputValue(page, description, expected, locator, options = {}) {

        return await this._compare(
            page,
            description,
            expected,
            async () => await locator.inputValue(),
            'inputValue',
            (a, e) => a === e,
            options
        );
    }

    static async text(page, description, expected, locator, options = {}) {

        const { exact = false } = options;

        return await this._compare(
            page,
            description,
            expected,
            async () => await locator.innerText(),
            exact ? 'textEquals' : 'textContains',
            exact
                ? (a, e) => a === e
                : (a, e) => a.toLowerCase().includes(e.toLowerCase()),
            options
        );
    }

    static async record(page, description, actual) {

        const resolved = await this._resolve(actual);

        await this._attach({
            step: description,
            matcher: 'record',
            expected: '<informational>',
            actual: resolved.value,
            mode: 'info',
            status: 'INFO'
        });

        await StepHelper.step(
            page,
            `${description} | Value: ${resolved.value} | INFO`,
            async () => {}
        );

        return resolved.value;
    }

static async equalsIgnoreCase(
    page,
    description,
    expected,
    actual,
    options = {}
) {
    const expectedValue =
        String(expected).trim();

    const actualValue =
        String(actual).trim();

    await StepHelper.step(
        page,
        description,
        async () => {

            const isMatch =
                expectedValue.toLowerCase() ===
                actualValue.toLowerCase();

            if (!isMatch) {
                throw new Error(
                    `Verification failed - ${description}\n` +
                    `Matcher : equalsIgnoreCase\n` +
                    `Expected: ${expectedValue}\n` +
                    `Actual  : ${actualValue}`
                );
            }
        }
    );
}
}