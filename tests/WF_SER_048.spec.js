import { test } from "../fixtures/baseTest.js";
 
const { NewPatient } = require("../pages/NewPatientPage");
const { PatientPage } = require("../pages/PatientPage");
const { patientData ,toastMessages} = require("../testdata/TC_SER_048.json");
 
const { generateUniquePatientFullName } = require("../utils/RandomData");
const { CalendarPage } = require('../pages/CalendarPage');
const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;
 
test("Validate creation of a new patient and verify patient details before service booking", async ({ page }) => {
 
    const patientName = generateUniquePatientFullName();
    const newPatient = new NewPatient(page);
    const patientPage = new PatientPage(page);
     
    // Create Patient separately
    await patientPage.createPatient(
        patientName,
        patientData
    );
 
    await newPatient.verifySavedToastAndGoToProfile(toastMessages.patientSavedSuccess);
 
    await page.waitForTimeout(timeout.networkIdleTimeoutMs);
 
    await newPatient.verifyPatientProfileNameMatches(
        patientName
    );
 
    await newPatient.verifyPatientDetail(
        patientData
    );
   
});