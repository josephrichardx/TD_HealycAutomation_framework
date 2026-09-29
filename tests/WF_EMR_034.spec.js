import { test, expect } from "../fixtures/baseTest.js"; 
const { StepHelper } = require('../utils/StepHelper.js');
                        
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PrescriptionPage } = require('../pages/PrescriptionPage');


const { patientData,appoinmentData,consultData,templateData,observationData,template,otherFindings,ToxicityData,specificAdviceData,sectionsToAdd,otherFindingsCrud,sectionsToUncheck,MultiotherFindings,signatureData } = require('../testdata/TC_EMR034.json');
const { generateUniquePatientFullName,generateUniqueTemplateName } = require('../utils/RandomData');
const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

test('EMR Prescription', async ({ page }) => {

    // const patientName = patientData.patientName;
    const patientName = generateUniquePatientFullName();
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const prescriptionPage = new PrescriptionPage(page);
    const templateName = generateUniqueTemplateName();
   

    //Create the patient 
     await patientPage.createPatient(
        patientName,
        patientData
    );
 
    //Add the Consult
    const bookingDate =
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot
    );
 
    //Search patient by calendar
    await calendarPage.selectPatientFromCalendar(
    patientName,
    bookingDate
    );

    // =====================================================
    // Old tab
    // =====================================================
 
    const tab1 =
        await prescriptionPage.switchToPageByIndex(0);
 
    const prescriptionPage1 =
        new PrescriptionPage(tab1);

    await prescriptionPage1.clickWritePrescription();

    await prescriptionPage1.applyTheFormat(
    template.formatValue
    );

    // Fill the CoMorbidities
    await prescriptionPage1.fill_MultiCoMorbidities(
    observationData
    );

    //Fill the Toxicities
    await prescriptionPage1.fill_Toxicities(
        ToxicityData
    );

    //Fill the Otherfinding
    await prescriptionPage1.fillMultiOtherfinding(
    MultiotherFindings.text1,
    MultiotherFindings.text2,
    MultiotherFindings.text3,
    MultiotherFindings.text4,
    MultiotherFindings.text5,
    );

    //Fill the SpecificAdviceText
    await prescriptionPage1.addSpecificAdviceText(
        specificAdviceData
    );

    await prescriptionPage1.addSignature(
        signatureData
    );

    //Create the template
    await prescriptionPage1.CreateTheTemplate({
        ...template,
        templateName
    });

     //Go to New tab
    const newTab =
        await prescriptionPage1.openSameUrlInNewTab();

    const newCalendarPage = new CalendarPage(newTab);

    await newCalendarPage.selectPatientFromCalendar(
        patientName,
        bookingDate
    );

    const newPrescriptionPage = 
    new PrescriptionPage(newTab);

    await newPrescriptionPage.clickWritePrescription();

     // Verify Template in List
    await newPrescriptionPage.verifyTemplateDisplayedInList(
        templateName
    );
 
    // Apply Saved Template
    await newPrescriptionPage.applySavedTemplate(
        template
    );

     const draftText =
    await newPrescriptionPage.gettheDraftText();

    // const draftText =
    // await newPrescriptionPage.getDraftFormallValues();

    
    // =====================================================
    // SWITCH BACK TO Old tab
    // =====================================================
 
    const OldTabAgain =
        await newPrescriptionPage.switchToPageByIndex(0);
 
    const prescriptionPageOldTab =
        new PrescriptionPage(OldTabAgain);

    await prescriptionPageOldTab.savePrescription();

    await prescriptionPageOldTab.FullPrescriptionPrint();

    await prescriptionPageOldTab.page.waitForTimeout(timeout.elementTimeout);

    await prescriptionPageOldTab.openHistory();

    const pdfText =
    await prescriptionPageOldTab.getthePDFText({
    observationData,
    ToxicityData,
    otherFindings
    });

    // const pdfValues =
    // prescriptionPageOldTab.getPDFFormallValues(
    //     pdfText,
    //     {
    //         observationData,
    //         ToxicityData,
    //         otherFindings,
    //         specificAdviceData
    //     }
    // );

    // await prescriptionPageOldTab.verifyPDFAndDraft(
    // draftText,
    // pdfText
    // );//15

    await prescriptionPageOldTab.verifythePDF(
    draftText,
    pdfText
    ); //16 - 20

    await prescriptionPageOldTab.PrintandClosePDF(); //21 - 22

    await prescriptionPageOldTab.EdittheHistory();

    await prescriptionPageOldTab.verifyOtherFindingCRUD(
    otherFindingsCrud.text1,
    otherFindingsCrud.text2,
    otherFindingsCrud.updatedText
    );

    await prescriptionPageOldTab.CustomPrint(
    sectionsToUncheck
    );
    
    await prescriptionPageOldTab.openHistory();
    
    await prescriptionPageOldTab.verifyLatestPDF(
    sectionsToUncheck,
    pdfText
    );//26


});