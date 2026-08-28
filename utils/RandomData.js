function generateUniqueLastName(length = 6) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let lastName = '';

    for (let i = 0; i < length; i++) {
        lastName += letters.charAt(
            Math.floor(Math.random() * letters.length)
        );
    }

    return lastName.charAt(0).toUpperCase() + lastName.slice(1);
}

function generatePatientName() {
    return `Test ${generateUniqueLastName()}`;
}


//new


function generateAdmissionDate(daysInFuture = 1) {
    const date = new Date();
    date.setDate(date.getDate() + daysInFuture);
    return date;
}

function generateAdmissionTime() {
    const hours = ['09', '10', '11', '01', '02', '03', '04', '05'];
    const minutes = ['00', '15', '30', '45'];
    const periods = ['AM', 'PM'];

    const hour = hours[Math.floor(Math.random() * hours.length)];
    const minute = minutes[Math.floor(Math.random() * minutes.length)];
    const period = periods[Math.floor(Math.random() * periods.length)];

    return { hour, minute, period };
}

function getAdmissionData() {
    return {
        admittingDiagnosis: `Diagnosis_${Math.floor(Math.random() * 1000)}`,
        doctorName: 'Default Doctor'
    };
}

const firstNames = [
    'John', 'James', 'Robert', 'Michael', 'David',
    'Sarah', 'Emily', 'Jessica', 'Ashley', 'Amanda',
    'Daniel', 'Matthew', 'Christopher', 'Andrew', 'Joseph',
    'Emma', 'Olivia', 'Sophia', 'Isabella', 'Mia'
];

const lastNames = [
    'Doe', 'Smith', 'Johnson', 'Williams', 'Brown',
    'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
    'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas',
    'Moore', 'Jackson', 'Martin', 'Lee', 'Perez'
];

function generateUniquePatientFullName() {

    const firstName = firstNames[
        Math.floor(Math.random() * firstNames.length)
    ];

    const lastName = lastNames[
        Math.floor(Math.random() * lastNames.length)
    ];

    const middleInitial =
        String.fromCharCode(65 + Math.floor(Math.random() * 26));

    return `${firstName} ${middleInitial} ${lastName}`;
}

function generateRandomDateOfBirth(minYear = 1990, maxYear = 2002) {

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthIndex = Math.floor(Math.random() * 12);
    const monthName = months[monthIndex];

    const year = minYear + Math.floor(Math.random() * (maxYear - minYear + 1));

    // 1-28 avoids month-length edge cases (February etc.) for now
    const day = 1 + Math.floor(Math.random() * 28);

    return {
        day,
        monthIndex,
        monthName,
        year,
        dateObj: new Date(year, monthIndex, day)
    };
}

function calculateAgeFromDate(dob, today = new Date()) {

    let age = today.getFullYear() - dob.getFullYear();

    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}

function generateShortPatientName(length = 5) {
    return `Test ${generateUniqueLastName(length)}`;
}
 

module.exports = {
    generatePatientName,
    generateAdmissionDate,
    generateAdmissionTime,
    getAdmissionData,
    generateRandomDateOfBirth,
    calculateAgeFromDate,
    generateUniquePatientFullName,
    generateShortPatientName
};



// module.exports = {
//     generatePatientName
// };