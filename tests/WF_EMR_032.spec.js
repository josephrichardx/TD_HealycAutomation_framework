import { test, expect } from "../fixtures/baseTest.js"; 
const { StepHelper } = require('../utils/StepHelper.js');
                        
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PrescriptionPage } = require('../pages/PrescriptionPage');


const { patientData,appoinmentData,consultData,prescriptionData,templateData,loginData,marginData,observationData,template,otherFindings,coMorbidities,ToxicityData,specificAdviceData,sectionsToAdd,otherFindingsCrud } = require('../testdata/TC_EMR032.json');
const { generateUniquePatientFullName,generateUniqueTemplateName } = require('../utils/RandomData');

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




    // await prescriptionPage.fillFavoriteandDrugLibrary_CoMorbidity(
    // // 0,
    // observationData.index,
    // observationData
    // );

    // await prescriptionPage.fillSuggestion_CoMorbidity(
    //     observationData.index
    // );

    // await prescriptionPage.fillCustom_Comorbidity(
    // observationData.index,
    // observationData
    // );


    //Fill the CoMorbidities
    await prescriptionPage1.fill_CoMorbidities(
    observationData
    );



    // await prescriptionPage.fillObservation(
    // observationData
    // // timeout.time
    // );




    // await prescriptionPage.fillFavorite_Toxicity(
    // ToxicityData.index,
    // ToxicityData
    // );

    // await prescriptionPage.fillSuggestion_Toxicity(
    //     ToxicityData.index
    // );

    // await prescriptionPage.fillCustomandDrugLibrary_Toxicity(
    // ToxicityData.index,
    // ToxicityData
    // );

    //Fill the Toxicities
    await prescriptionPage1.fill_Toxicities(
        ToxicityData
    );
    
    // await prescriptionPage.fill_Toxicity(
    // observationData
    // // timeout.time
    // );

    //Fill the Otherfinding
    await prescriptionPage1.fillOtherfinding(
    otherFindings.text1,
    otherFindings.text2
    );

    //Fill the SpecificAdviceText
    // await prescriptionPage1.addSpecificAdviceText(
    //     specificAdviceData
    // );

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


    // =====================================================
    // SWITCH BACK TO Old tab
    // =====================================================
 
    const OldTabAgain =
        await newPrescriptionPage.switchToPageByIndex(0);
 
    const prescriptionPageOldTab =
        new PrescriptionPage(OldTabAgain);

    await prescriptionPageOldTab.savePrescription();

    await prescriptionPageOldTab.generateAndViewPrescription();

    await prescriptionPageOldTab.openHistory();

    //Get the PdfText
    // const pdfText =
    // await prescriptionPageOldTab.getPDFText();
    const pdfText =
    await prescriptionPageOldTab.getPDFText({
    observationData,
    ToxicityData,
    otherFindings
    });

    await prescriptionPageOldTab.CloseHistory();

    // =====================================================
    // SWITCH BACK TO New tab
    // =====================================================
 
    const NewTabAgain =
        await newPrescriptionPage.switchToPageByIndex(1);
 
    const prescriptionPageNewTab =
        new PrescriptionPage(NewTabAgain);

    
    //Get the DraftText
    // const draftText =
    // await prescriptionPageNewTab.getDraftText();

    const draftText =
    await prescriptionPageNewTab.getDraftText();
    // expect(draftText).toEqual(draftTextactual1);

    //Verify the Pdf & Draft
    await prescriptionPageNewTab.verifyPDFAndDraft(
    pdfText,
    draftText
    );

    // =====================================================
    // SWITCH BACK TO Old Tab Again1
    // =====================================================
 
    const OldtabAgain1 =
        await newPrescriptionPage.switchToPageByIndex(0);
 
    const prescriptionPageOldTab1 =
        new PrescriptionPage(OldtabAgain1);

    //   // Verify Template in List
    // await prescriptionPageOldTab1.verifyTemplateDisplayedInList(
    //     templateName
    // );
 
    // // Apply Saved Template
    // await prescriptionPageOldTab1.applySavedTemplate(
    //     template
    // );

    //Add the data from History
    await prescriptionPageOldTab1.ResetandAddHistorydata(
        sectionsToAdd
    );

    //Get the DraftText
    // const oldtabdraftText =
    // await prescriptionPageOldTab1.getDraftText();

    const oldtabdraftText =
    await prescriptionPageOldTab1.getDraftText();

    // =====================================================
    // SWITCH BACK TO New tab Again1
    // =====================================================
 
    const NewTabAgain1 =
        await newPrescriptionPage.switchToPageByIndex(1);
 
    const prescriptionPageNewTab1 =
        new PrescriptionPage(NewTabAgain1);

    //Get the DraftText
    // const newtabdraftText =
    // await prescriptionPageNewTab1.getDraftText();

    const newtabdraftText =
    await prescriptionPageNewTab1.getDraftText();

    //Verify the Oldtab Draft to Newtab Draft
    await prescriptionPageNewTab1.verifyPDFAndDraft(
    oldtabdraftText,
    newtabdraftText
    );
    
    // =====================================================
    // SWITCH BACK TO Old Tab Again2
    // =====================================================
 
    const OldtabAgain2 =
        await newPrescriptionPage.switchToPageByIndex(0);
 
    const prescriptionPageOldTab2 =
        new PrescriptionPage(OldtabAgain2);

    await prescriptionPageOldTab2.generateAndViewPrescription();

    //Edit the History data
    await prescriptionPageOldTab2.EditHistory();

    //CRUD operations
    await prescriptionPageOldTab2.verifyOtherFindingCRUD(
    otherFindingsCrud.text1,
    otherFindingsCrud.text2,
    otherFindingsCrud.updatedText
    );

    //Create the Template
     await prescriptionPageOldTab2.CreateTheTemplate({
        ...template,
        templateName
    });

    await prescriptionPageOldTab2.generateAndViewPrescription();

     await prescriptionPageOldTab2.openHistory();

    //Get the pdf Text
    // const pdfText1 =
    // await prescriptionPageOldTab2.getPDFText();
    const pdfText1 =
    await prescriptionPageOldTab2.getPDFText({
    observationData,
    ToxicityData,
    otherFindings
    });

    await prescriptionPageOldTab2.CloseHistory();

    // =====================================================
    // SWITCH BACK TO New tab Again2
    // =====================================================
 
    const NewTabAgain2 =
        await newPrescriptionPage.switchToPageByIndex(1);
 
    const prescriptionPageNewTab2 =
        new PrescriptionPage(NewTabAgain2);


    // Verify Template in List
    await prescriptionPageNewTab2.verifyTemplateDisplayedInList(
        templateName
    );
 
    // Apply Saved Template
    await prescriptionPageNewTab2.applySavedTemplate(
        template
    );

    //Get the Draft Text
    // const draftText1 =
    // await prescriptionPageNewTab2.getDraftText();
    const draftText1 =
    await prescriptionPageNewTab2.getDraftText();

    //Verify the Pdf & Draft
    await prescriptionPageNewTab2.verifyPDFAndDraft(
    pdfText1,
    draftText1
    );

    
});
 