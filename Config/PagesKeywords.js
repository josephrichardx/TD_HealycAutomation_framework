const { StepHelper } = require('../utils/StepHelper');

const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');

class Keywords {

    PatientPage(page) {
        return new PatientPage(page);
    }

    ConsultPage(page) {
        return new ConsultPage(page);
    }

    ServicePage(page) {
        return new ServicePage(page);
    }

    InvoicePage(page) {
        return new InvoicePage(page);
    }

    CalendarPage(page) {
        return new CalendarPage(page);
    }

}

module.exports = { Keywords };