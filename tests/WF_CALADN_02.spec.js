import { test } from '../fixtures/baseTest.js';

const { ConsultPage } = require('../pages/ConsultPagenew');
const { NewPatient } = require('../pages/NewPatientPage'); 

const {
    validPatientData,
    consultBookingData,
    expectedAppointmentTypes,
    addNewMenuOptions,
    expectedDoctors,
    bookingToast,
    uiLabels
} = require('../testdata/TC_002.json');

// Import the dedicated timeout config
const timeouts = require('../testdata/timeoutConfig.json');

const { generateUniquePatientFullName } = require('../utils/RandomData');


test.describe('WF_CALADN_02 - Validate Consult Appointment Booking', () => {

    test('Flow 1 - Open Consult Booking And Apply Doctor, Consult And Date Filters', async ({ page }) => {

        const consultPage = new ConsultPage(page);
        const newPatient = new NewPatient(page);
        
        const data = { ...consultBookingData };

        // --- PRE-REQUISITE: QUICK CREATE UNIQUE PATIENT ---
        const uniquePatientName = generateUniquePatientFullName();

        await newPatient.openAddPatientForm();
        await newPatient.enterPatientName(uniquePatientName);
        await newPatient.selectSalutation(validPatientData.title);
        await newPatient.enterMobileNumber(validPatientData.mobileNumber);
        await newPatient.enterReferralBy(validPatientData.referralBy);
        await newPatient.clickSave();
        await consultPage.keywords.wait(page, timeouts.longWaitMs); 
        // --------------------------------------------------

        // --- STEP 2 VERIFICATION SEQUENCE ---
        await consultPage.clickAddNewButton();
        await consultPage.verifyAddNewMenuOptions(addNewMenuOptions);
        await consultPage.clickAddConsultOption();
        // ------------------------------------

        await consultPage.verifyPatientSearchBarLoaded();

        await consultPage.searchAndSelectPatient(
            uniquePatientName, 
            timeouts.mediumWaitMs,
            data.minExpectedResults
        );

        await consultPage.verifyBookingPanelOpened(
            uniquePatientName,
            data.appointmentType
        );

        await consultPage.verifyAppointmentTypeTabs(
            expectedAppointmentTypes
        );

        await consultPage.clearPreSelectedFilters(
            timeouts.longWaitMs,
            timeouts.mediumWaitMs,
            timeouts.shortWaitMs,
            timeouts.clearBufferAttempts
        );

        // --- STEP 4 VERIFICATION ---
        await consultPage.verifyDoctorDropdownOptions(
            expectedDoctors, 
            timeouts.mediumWaitMs
        );
        // ---------------------------

        await consultPage.selectDoctorByName(
            data.doctorName,
            timeouts.longWaitMs,
            data.minExpectedResults,
            uiLabels.doctorFilter
        );

        await consultPage.selectConsultTypeByName(
            data.consultType,
            timeouts.longWaitMs,
            uiLabels.consultFilter
        );

        await consultPage.verifyAppointmentResultsLoaded(
            data.minExpectedResults
        );

        // ==========================================================
        // NEW SLOT HUNTING LOGIC
        // ==========================================================
        const capturedBookingDate = await consultPage.findAvailableDateByClickingNext(
            timeouts.calendarMaxAttempts,
            timeouts.mediumWaitMs
        );
        
        await consultPage.verifyAvailableSlots(
            data.minSlotsToVerify,
            data.maxSlotsToCheck
        );

        const selectedSlot = await consultPage.selectAndCaptureAvailableSlot(
            data.minExpectedResults
        );
        // ==========================================================

        await consultPage.proceedToReviewAppointment();
        await consultPage.verifyReviewAppointmentFee(selectedSlot.feeAmount);
        
        await consultPage.confirmBookingWithVerification(
            bookingToast.title,
            bookingToast.subtext,
            timeouts.toastWaitTimeoutMs
        );
        
        await consultPage.dismissBookingConfirmationToastIfPresent();

        // ==========================================================
        // FOLLOW-UP BOOKING (Using Captured Data to Force Overlap)
        // ==========================================================
        await consultPage.clickAddNewButton();
        await consultPage.clickAddConsultOption();

        await consultPage.verifyPatientSearchBarLoaded();

        await consultPage.searchAndSelectPatient(
            uniquePatientName,
            timeouts.mediumWaitMs,
            data.minExpectedResults
        );

        await consultPage.verifyBookingPanelOpened(
            uniquePatientName,
            data.appointmentType
        );

        await consultPage.clearPreSelectedFilters(
            timeouts.longWaitMs,
            timeouts.mediumWaitMs,
            timeouts.shortWaitMs,
            timeouts.clearBufferAttempts
        );

        await consultPage.selectDoctorByName(
            data.doctorName,
            timeouts.longWaitMs,
            data.minExpectedResults,
            uiLabels.doctorFilter
        );

        await consultPage.selectConsultTypeByName(
            data.followUpConsultType,
            timeouts.longWaitMs,
            uiLabels.consultFilter
        );

        await consultPage.verifyAppointmentResultsLoaded(
            data.minExpectedResults
        );

        await consultPage.navigateToSpecificDateOnCard(
            capturedBookingDate,
            timeouts.calendarMaxAttempts,
            timeouts.mediumWaitMs
        );

        const followUpFee = await consultPage.captureFeeFromCard(
            data.followUpConsultType
        );

        await consultPage.selectAddCustomSlotsForConsultType(
            data.followUpConsultType
        );

        await consultPage.setCustomSlotStartTime(
            selectedSlot.slotTimeText,
            timeouts.shortWaitMs,
            data.slotDurationMinutes,
            data.expectedTimePickerColumns,
            uiLabels
        );

        await consultPage.confirmCustomSlot();
        
        await consultPage.proceedToReviewAppointment();
        await consultPage.verifyReviewAppointmentFee(followUpFee);
        
        await consultPage.confirmBookingWithVerification(
            bookingToast.title,
            bookingToast.subtext,
            timeouts.toastWaitTimeoutMs
        );
        
        await consultPage.dismissBookingConfirmationToastIfPresent();

        // ==========================================================
        // STEP 8 & STEP 6/11: WAITLIST & CALENDAR OVERLAP VALIDATION
        // ==========================================================
        await consultPage.clickCalendarWaitlistTab();

        await consultPage.findPatientOnCalendar(
            uniquePatientName,
            timeouts.calendarMaxAttempts,
            timeouts.mediumWaitMs
        );
        
        await consultPage.verifyCalendarOverlap(
            uniquePatientName,
            data.expectedOverlapCount
        );
        // ==========================================================
    });
});