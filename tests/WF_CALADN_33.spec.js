import { test } from '../fixtures/baseTest.js';
import { AdmissionPage } from '../pages/AdmissionPage.js';


const { InvoicePage } = require('../pages/InvoicePage');
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { PaymentPage } = require('../pages/PaymentPage');
const { CalendarPage } = require('../pages/CalendarPage');


const { patientData,bookingData,invoiceData,paymentData } = require('../testdata/TC_033.json');

const { generateUniquePatientFullName } = require('../utils/RandomData');

import admissionData from '../testdata/admissionData.json' with { type: 'json' };

import {
    generateAdmissionDate,
    generateAdmissionTime,
    getAdmissionData
} from '../utils/RandomData.js';

const { admissionPatientData } = admissionData;


test('Add Admission - Make Payment', async ({ page }) => {

    // const patientName = generateUniquePatientFullName();
    const patientName = patientData.patientName;
    const admissionPage = new AdmissionPage(page);
    const invoicePage = new InvoicePage(page);
    const patientPage = new PatientPage(page);
    const paymentPage = new PaymentPage(page);
    const calendarPage = new CalendarPage(page);

    const data = { ...admissionPatientData };


    
    // ============================================================
    // 1. Create Patient
    // ============================================================

    // await patientPage.createPatient(
    //     patientName,
    //     patientData
    // );


    // ==========================================
    // 1. Add Admission
    // ==========================================

    await admissionPage.clickAddNew();
    await admissionPage.clickAddAdmission();

    // ==========================================
    // 2. Select Patient
    // ==========================================

    await admissionPage.searchPatient(patientName);

    // ==========================================
    // 3. Select Location
    // ==========================================

    await admissionPage.openLocationDropdown();
    await admissionPage.selectLocation(data.location);

    // ==========================================
    // 4. Select Admission Date & Time
    // ==========================================

    const admissionDate = generateAdmissionDate();
    await admissionPage.selectAdmissionDate(admissionDate);

    const admissionTime = generateAdmissionTime();
    await admissionPage.selectAdmissionTime(admissionTime);

    // ==========================================
    // 5. Select Room / Bed
    // ==========================================

    await admissionPage.selectRandomRoomCategory();
    await admissionPage.selectRandomRoomNumber();
    await admissionPage.selectRandomBedNumber();

    // ==========================================
    // 6. Diagnosis & Doctor
    // ==========================================

    const dynamicData = getAdmissionData();

    await admissionPage.fillDiagnosisAndDoctor(
        dynamicData.admittingDiagnosis,
        dynamicData.doctorName
    );

    // ==========================================
    // 7. Add Tests & Consumables
    // ==========================================

    await admissionPage.addSurgery(admissionPatientData);
    await admissionPage.addTests(3);
    await admissionPage.addConsumables(3);


    // ==========================================
    // 8. Emergency Details
    // ==========================================

    await admissionPage.fillEmergencyDetailsAndContinue(
        'emergency',
        '1234567890',
        'physician'
    );

    // ==========================================
    // 9. Insurance Details
    // ==========================================

    await admissionPage.fillInsuranceDetailsAndContinue(
        'insurance',
        '12345',
        'policy'
    );

    // ==========================================
    // 10. Verify Admission Summary
    // ==========================================

    await admissionPage.verifyAdmissionSummaryAndContinue(
        admissionDate,
        admissionTime
    );


    await calendarPage.selectPatientAddAdmission(
    patientName,
    );


    // ==========================================
    // 11. Generate Invoice
    // ==========================================

    await invoicePage.generateInvoiceAddAdmission();

    // ==========================================
    // 12. Get Invoice Details
    // ==========================================

    const invoiceDetails =
        await invoicePage.InvoiceDetailsAddAdmission(invoiceData);


    // ==========================================
    // 15. Verify Invoice PDF
    // ==========================================

    await invoicePage.InvoicePDFAddAdmission(
        invoiceDetails.invoiceNumber,
        invoiceDetails.totalAmount,
        patientName,
        patientData,
        invoiceData
    );

    // ==========================================
    // 16. Verify Payment
    // ==========================================

    await paymentPage.makePayment(
    paymentData.paymentMethod,
    paymentData.amount,
    paymentData.transactionId
    );

    await paymentPage.verifyPayment(
    paymentData.amount
    );
});