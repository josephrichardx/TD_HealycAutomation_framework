import { test } from "../fixtures/baseTest.js";
import { expect } from "@playwright/test";


const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PrescriptionPage } = require('../pages/PrescriptionPage');

const {
    patientData,
    appoinmentData,
    consultData,
    observationData,
    specificAdviceData,
    scoringChartData,
    templateData,
    ToxicityData,
    otherFindings,
    template,
    otherFindingsCrud
} = require('../testdata/TC_EMR031.json');

const {
    generateUniquePatientFullName,
    generateUniqueTemplateName
} = require('../utils/RandomData');


test('EMR Prescription', async ({ page }) => {

    const patientName =
        generateUniquePatientFullName();

    const patientPage =
        new PatientPage(page);

    const consultPage =
        new ConsultPage(page);

    const invoicePage =
        new InvoicePage(page);

    const calendarPage =
        new CalendarPage(page);

    const prescriptionPage =
        new PrescriptionPage(page);

    const templateName =
        generateUniqueTemplateName();

        


    // =====================================================
    // TAB 1
    // =====================================================

    const tab1 =
        await prescriptionPage.switchToPageByIndex(0);

    const prescriptionPage1 =
        new PrescriptionPage(tab1);


    // Create Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );


    // Add Consult
    const bookingDate =
        await consultPage.addConsult(
            patientName,
            appoinmentData.doctorName,
            consultData.consultSlot
        );


    // Select Patient From Calendar
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingDate
    );


    // Open Prescription
    await prescriptionPage1.clickWritePrescription();


    // Apply Format
    await prescriptionPage1.applyTheFormat(
        template.formatValue
    );

      await prescriptionPage1.fill_CoMorbidities(
    observationData
    );

     await prescriptionPage1.fill_Toxicities(
        ToxicityData
    );



    // Add Scoring Chart
    // await prescriptionPage1.fillScoringChart(
    //     scoringChartData
    // );


    // // Expected Result from Test Data
    // const expectedScoringResult =
    //     Object.values(scoringChartData.selectionData)
    //         .reduce(
    //             (total, score) =>
    //                 total + Number(score),
    //             Number(scoringChartData.initialScore)
    //         );

    // console.log(
    //     `Expected Scoring Result: ${expectedScoringResult}`
    // );


    // // Actual Result from UI
    // const actualScoringResult =
    //     await prescriptionPage1
    //         .submitScoringChartAndGetResult();

    // console.log(
    //     `Actual Scoring Result: ${actualScoringResult}`
    // );


    // // Compare Expected vs Actual
    // expect(Number(actualScoringResult)).toBe(
    //     expectedScoringResult
    // );

     await prescriptionPage1.fillOtherfinding(
    otherFindings.text1,
    otherFindings.text2
    );
    

    // Checklist Data
    await prescriptionPage1.addSpecificAdviceText(
        specificAdviceData
    );


    // Create + Apply Template
    await prescriptionPage1.CreateTheTemplate({
        ...template,
        templateName
    });

    // Store Tab 1 values
const draftText =
    await prescriptionPage1.getDraftText();

    console.log(draftText);


    // =====================================================
    // CREATE TAB 2
    // =====================================================

    const newTab =
        await prescriptionPage1.openSameUrlInNewTab();


    // Create Page Objects for Tab 2
    const newCalendarPage =
        new CalendarPage(newTab);

    const newPrescriptionPage =
        new PrescriptionPage(newTab);


    // =====================================================
    // TAB 2
    // =====================================================

    // Select Same Patient
    await newCalendarPage.selectPatientFromCalendar(
        patientName,
        bookingDate
    );


    // Open Prescription
    await newPrescriptionPage.clickWritePrescription();


    // =====================================================
// TAB 2 - VERIFY TEMPLATE
// =====================================================

await newPrescriptionPage.verifyTemplateDisplayedInList(
    templateName
);


// =====================================================
// TAB 2 - APPLY SAVED TEMPLATE
// =====================================================

await newPrescriptionPage.applySavedTemplate(
    template
);





// =====================================================
// TAB 2 - RESET
// =====================================================

await newPrescriptionPage.resetTemplate();


// =====================================================
// TAB 2 - APPLY SAVED TEMPLATE AGAIN
// =====================================================

await newPrescriptionPage.verifyTemplateDisplayedInList(
    templateName
);

await newPrescriptionPage.applySavedTemplate(
    template
);



// =====================================================
// TAB 2 - STORE VALUES
// =====================================================


const draftTextactual =
    await newPrescriptionPage.getDraftText();

    console.log(draftTextactual);



expect(draftText).toEqual(draftTextactual);

await newPrescriptionPage.compareValues(
    draftText,
    draftTextactual
    );

//  await newPrescriptionPage.clearTemplate();
//  await newPrescriptionPage.verifyTemplateDisplayedInList(
//     templateName
// );

// await newPrescriptionPage.applySavedTemplate(
//     template
// );


const draftTextactual1 =
    await newPrescriptionPage.getDraftText();
expect(draftText).toEqual(draftTextactual1);


// Continue in Tab 1
await tab1.bringToFront();

const oldprescriptionPageTab1 =
    new PrescriptionPage(tab1);

await oldprescriptionPageTab1.generateAndViewPrescription();

await oldprescriptionPageTab1.openHistory();

const pdfText =
    await oldprescriptionPageTab1.getPDFText({
          observationData,
    ToxicityData,
    otherFindings
    });
// expect(draftText).toEqual(pdfText);


await oldprescriptionPageTab1.compareValues(
    draftText,
    pdfText
    );

});