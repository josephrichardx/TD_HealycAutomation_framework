import { test } from '../fixtures/baseTest.js';

const { ConsultPage } = require('../pages/ConsultPage');

const {
    consultBookingData,
    expectedAppointmentTypes,
    bookingTimeouts
} = require('../testdata/consultData.json');


test.describe('WF_CALADN_02 - Validate Consult Appointment Booking', () => {

    test.setTimeout(180000);

    test.use({ viewport: { width: 1920, height: 1080 } });

    test('Flow 1 - Open Consult Booking And Apply Doctor, Consult And Date Filters', async ({ page }) => {

        const consultPage = new ConsultPage(page);

        const data = { ...consultBookingData };

        await consultPage.openConsultBooking();

        await consultPage.verifyPatientSearchBarLoaded();

        await consultPage.searchAndSelectPatient(
            data.patientName,
            bookingTimeouts.searchDebounce
        );

        await consultPage.verifyBookingPanelOpened(
            data.patientName,
            data.appointmentType
        );

        await consultPage.verifyAppointmentTypeTabs(
            expectedAppointmentTypes
        );

        await consultPage.clearPreSelectedFilters(
            bookingTimeouts.filterRefresh
        );

        await consultPage.selectDoctorByName(
            data.doctorName,
            bookingTimeouts.filterRefresh
        );

        await consultPage.selectConsultTypeByName(
            data.consultType,
            bookingTimeouts.filterRefresh
        );

        await consultPage.selectBookingDatePreset(
            data.datePreset,
            data.bookingDateOffsetInDays,
            bookingTimeouts.filterRefresh
        );

        await consultPage.verifyAppointmentResultsLoaded();

        const selectedSlot =
            await consultPage.selectAndCaptureAvailableSlot();

        await consultPage.proceedToReviewAppointment();

        await consultPage.verifyReviewAppointmentFee(
            selectedSlot.feeAmount
        );

        await consultPage.confirmBookingWithVerification();

        await consultPage.dismissBookingConfirmationToastIfPresent();

        await consultPage.openConsultBooking();

        await consultPage.verifyPatientSearchBarLoaded();

        await consultPage.searchAndSelectPatient(
            data.patientName,
            bookingTimeouts.searchDebounce
        );

        await consultPage.verifyBookingPanelOpened(
            data.patientName,
            data.appointmentType
        );

        await consultPage.clearPreSelectedFilters(
            bookingTimeouts.filterRefresh
        );

        await consultPage.selectDoctorByName(
            data.doctorName,
            bookingTimeouts.filterRefresh
        );

        await consultPage.selectConsultTypeByName(
            data.followUpConsultType,
            bookingTimeouts.filterRefresh
        );

        await consultPage.selectBookingDatePreset(
            data.datePreset,
            data.bookingDateOffsetInDays,
            bookingTimeouts.filterRefresh
        );

        await consultPage.verifyAppointmentResultsLoaded();

                const followUpFee = await consultPage.captureFeeFromCard(
            data.followUpConsultType
        );

        await consultPage.selectAddCustomSlotsForConsultType(
            data.followUpConsultType
        );

        await consultPage.setCustomSlotStartTime(
            selectedSlot.slotTimeText
        );

        await consultPage.confirmCustomSlot();

        await consultPage.proceedToReviewAppointment();

        await consultPage.verifyReviewAppointmentFee(
            followUpFee
        );

        await consultPage.confirmBookingWithVerification();
    });
});