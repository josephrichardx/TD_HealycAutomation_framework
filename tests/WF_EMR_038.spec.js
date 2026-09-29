import { test, expect } from "../fixtures/baseTest.js"; 
const { StepHelper } = require('../utils/StepHelper.js');
                        
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PrescriptionPage } = require('../pages/PrescriptionPage');


const { patientData,appoinmentData,consultData,prescriptionData,
templateData,loginData,marginData,observationData,template,otherFindings,
coMorbidities,ToxicityData,specificAdviceData,sectionsToAdd,otherFindingsCrud,
allergiesToxicityData,allergiesToxicityMedication,allergiesToxicityRow2Data,medicationData }
 = require('../testdata/TC_EMR038.json');

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
    
    //Fill the CoMorbidities
    await prescriptionPage1.fillCustom_Comorbidity(
        observationData.index,
        observationData
    );

    await prescriptionPage1.verifyAndFillAllergiesToxicityMedication(
    allergiesToxicityData.index,
    allergiesToxicityData
    );

    await prescriptionPage1.VerifymedicationDetails(
        allergiesToxicityData.index,
        allergiesToxicityData
    );

    const medicationCheckboxChecked =
    await prescriptionPage1.VerifyMedicationCheckbox(
        allergiesToxicityData.index,
        allergiesToxicityData.medicationRowIndex
    );

    await prescriptionPage1.DownloadpdfPrescription();

    await prescriptionPage1.openHistory();

    await prescriptionPage1.verifySearchTypeRXMedicationTableInPDF(
    observationData,
    allergiesToxicityData
    );

    await prescriptionPage1.verifyChecklistMedicationInPDF(
    allergiesToxicityData,
    medicationCheckboxChecked
    );

    await prescriptionPage1.CloseHistory();

});