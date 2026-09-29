import { test } from "@playwright/test";

const { LoginPage } =
    require("../pages/LoginPage");

const { LogoutPage } =
    require("../pages/LogoutPage");

const { PatientPage } =
    require("../pages/PatientPage");

const { ConsultPage } =
    require("../pages/ConsultPage");

const { CalendarPage } =
    require("../pages/CalendarPage");

const { PrescriptionPage } =
    require("../pages/PrescriptionPage");

const {
    patientData,
    loginData,
    appoinmentData,
    consultData,
    templateData,
    template,
    observationData,
    rmoToxicityData,
    rmoChiefComplaint
} = require("../testdata/TC_EMR033.json");

const {
    generateUniquePatientFullName,
    generateUniqueTemplateName
} = require("../utils/RandomData");


test(
    "TC_33 - Super Admin Create Patient - Logout - RMO Search Appointment",
    async ({ browser }) => {

        // =====================================================
        // CREATE FRESH CONTEXT
        // =====================================================

        const context =
            await browser.newContext({
                storageState: undefined
            });

        const page =
            await context.newPage();


        // =====================================================
        // OPEN HEALYNC APPLICATION
        // =====================================================

        await page.goto(
            "http://release-uat.healync.com.s3-website.ap-south-1.amazonaws.com"
        );

        await page.waitForLoadState(
            "domcontentloaded"
        );


        // =====================================================
        // PAGE OBJECTS
        // =====================================================

        const loginPage =
            new LoginPage(page);

        const logoutPage =
            new LogoutPage(page);

        const patientPage =
            new PatientPage(page);

        const consultPage =
            new ConsultPage(page);

        const calendarPage =
            new CalendarPage(page);

        const prescriptionPage =
            new PrescriptionPage(page);


        // =====================================================
        // GENERATE UNIQUE DATA
        // =====================================================

        const patientName =
            generateUniquePatientFullName();

        const templateName =
            generateUniqueTemplateName();


        // =====================================================
        // SUPER ADMIN LOGIN
        // =====================================================

        await loginPage.loginWithCredentials(
            loginData.superAdmin,
            {
                skipIfAuthenticated: false,
                waitForSuccess: true
            }
        );


        // =====================================================
        // CREATE PATIENT
        // =====================================================

        await patientPage.createPatient(
            patientName,
            patientData
        );


        // =====================================================
        // ADD CONSULT
        // =====================================================

        const bookingDate =
            await consultPage.addConsult(
                patientName,
                appoinmentData.doctorName,
                consultData.consultSlot
            );


        // =====================================================
        // LOGOUT SUPER ADMIN
        // =====================================================

        await logoutPage.logout();


        // =====================================================
        // RMO LOGIN
        // =====================================================

        await loginPage.loginWithCredentials(
            loginData.rmo,
            {
                skipIfAuthenticated: false,
                waitForSuccess: true
            }
        );


        // =====================================================
        // SEARCH SAME APPOINTMENT
        // =====================================================

        await calendarPage.selectPatientFromCalendar(
            patientName,
            bookingDate
        );


        // =====================================================
        // OPEN PRESCRIPTION
        // =====================================================

        await prescriptionPage.clickWritePrescription();


        // =====================================================
        // SELECT DOCTOR IN RMO
        // =====================================================

        await prescriptionPage.selectDoctorInRMO(
            appoinmentData.doctorName
        );


        // =====================================================
        // APPLY PRESCRIPTION FORMAT
        // =====================================================

        await prescriptionPage.applyTheFormat(
            templateData.templateName
        );


        // =====================================================
        // FILL CO-MORBIDITIES
        // =====================================================

        await prescriptionPage.fill_CoMorbidities(
            observationData
        );


        // =====================================================
        // FILL RMO TOXICITY
        // =====================================================

        await prescriptionPage.fillRMOToxicity(
            rmoToxicityData.text,
            rmoToxicityData.image
        );


        // =====================================================
        // FILL RMO CHIEF COMPLAINT
        // =====================================================

        await prescriptionPage.fillRMOChiefComplaint(
            rmoChiefComplaint.text
        );


        // =====================================================
        // RMO SPECIFIC ADVICE
        // =====================================================

        await prescriptionPage.selectRMOSpecificAdvice();


        // =====================================================
        // CREATE TEMPLATE
        // =====================================================

        await prescriptionPage.CreateTheTemplate({
            ...template,
            templateName
        });


        // =====================================================
        // STORE TAB 1 VALUES
        // =====================================================

        const draftText =
            await prescriptionPage.getRMODraftText();

        console.log(draftText);


        // =====================================================
        // GENERATE AND VIEW PRESCRIPTION
        // =====================================================

        await prescriptionPage.generateAndViewPrescription();


        // =====================================================
        // CREATE TAB 2
        // =====================================================

        const newTab =
            await prescriptionPage.openSameUrlInNewTab();


        // =====================================================
        // TAB 2 PAGE OBJECTS
        // =====================================================

        const newCalendarPage =
            new CalendarPage(newTab);

        const newPrescriptionPage =
            new PrescriptionPage(newTab);


        // =====================================================
        // TAB 2 - SELECT SAME PATIENT
        // =====================================================

        await newCalendarPage.selectPatientFromCalendar(
            patientName,
            bookingDate
        );


        // =====================================================
        // TAB 2 - OPEN PRESCRIPTION
        // =====================================================

        await newPrescriptionPage.clickWritePrescription();

        await newPrescriptionPage.selectDoctorInRMO(
            appoinmentData.doctorName
        );
        // =====================================================
        // TAB 2 - VERIFY TEMPLATE
        // =====================================================

        await newPrescriptionPage.verifyTemplateDisplayedInList(
            templateName
        );


        // =====================================================
        // TAB 2 - APPLY SAVED TEMPLATE
        // =====================================================

    await newPrescriptionPage.applySavedTemplate({
    templateName,
    expectedMessage: template.appliedMessage
});

          const draftTextTab2 =
            await newPrescriptionPage.getRMODraftText();

        console.log(draftTextTab2);

         await newPrescriptionPage.compareRMODraftValues(
    draftText,
    draftTextTab2
);

  // =====================================================
    // SWITCH BACK TO Old Tab Again2
    // =====================================================
 
    const OldtabAgain2 =
        await newPrescriptionPage.switchToPageByIndex(0);
 
    const prescriptionPageOldTab2 =
        new PrescriptionPage(OldtabAgain2);
 
    // await prescriptionPageOldTab2.generateAndViewPrescription();

    await prescriptionPageOldTab2.RMOEditHistory();
    
    await prescriptionPageOldTab2.verifyRMOChiefComplaintCRUD(
    rmoChiefComplaint.updatedtext
);

   await prescriptionPageOldTab2.CreateTheTemplate({
            ...template,
            templateName
        });

        //  const draftTextTaboldtab =
        //     await prescriptionPageOldTab2.getRMODraftText();

        // console.log(draftTextTaboldtab);
//  await prescriptionPageOldTab2.generateAndViewPrescription();

     await prescriptionPageOldTab2.openHistory();

    //Get the pdf Text
const rmoFormPDFValues =
    await prescriptionPageOldTab2.getRMOPDFText();

console.log(
    "========== RMO PDF FORM VALUES =========="
);

console.dir(
    rmoFormPDFValues,
    { depth: null }
);

    await prescriptionPageOldTab2.CloseHistory();
        
 
    const NewPrescriptionpageopen =
        await newPrescriptionPage.switchToPageByIndex(1);
 
    const NewPrescriptionpage2 =
        new PrescriptionPage(NewPrescriptionpageopen);

        // Verify Template in List
    await NewPrescriptionpage2.verifyTemplateDisplayedInList(
        templateName
    );
 
    // Apply Saved Template
    await NewPrescriptionpage2.applySavedTemplate(
        template
    );

       const draftTextTaboldtab =
            await prescriptionPageOldTab2.getRMODraftText();

        console.log(draftTextTaboldtab);

       await prescriptionPageOldTab2.compareRMOPDFWithDraft(
    rmoFormPDFValues,
    draftTextTaboldtab
);
        // =====================================================
        // CLOSE CONTEXT
        // =====================================================

        await context.close();
    }
);