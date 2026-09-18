function generateRandomMobileNumber() {
    return '9' + Math.floor(100000000 + Math.random() * 900000000);
}
 
module.exports = {
    generateUniquePatientFullName,
    generateRandomDateOfBirth,
    generateRandomMobileNumber
};
 
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
    'Emma', 'Olivia', 'Sophia', 'Isabella', 'Mia',
    'William', 'Richard', 'Thomas', 'Charles', 'Benjamin',
    'Samuel', 'Alexander', 'Henry', 'Jack', 'Lucas',
    'Liam', 'Noah', 'Ethan', 'Mason', 'Logan',
    'Jacob', 'Elijah', 'Ava', 'Charlotte', 'Amelia',
    'Harper', 'Evelyn', 'Abigail', 'Ella', 'Scarlett',
    'Grace', 'Chloe', 'Victoria', 'Riley', 'Aria',
    'Lily', 'Aurora', 'Zoey', 'Hannah', 'Layla',
    'Nora', 'Camila', 'Samantha', 'Elizabeth', 'Natalie',
    'Luna', 'Savannah', 'Brooklyn', 'Leah', 'Zoe',
    'Stella', 'Hazel', 'Violet', 'Penelope', 'Lucy',
    'Claire', 'Ellie',

    'Anthony', 'Mark', 'Steven', 'Paul', 'George',
    'Kenneth', 'Edward', 'Brian', 'Ronald', 'Timothy',
    'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Gary',
    'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry',
    'Justin', 'Scott', 'Brandon', 'Benjamin', 'Samuel',
    'Gregory', 'Frank', 'Alexander', 'Raymond', 'Patrick',
    'Kevin', 'Dennis', 'Jerry', 'Tyler', 'Aaron',
    'Jose', 'Adam', 'Nathan', 'Zachary', 'Douglas',
    'Peter', 'Kyle', 'Walter', 'Evan', 'Dylan',
    'Jeremy', 'Arthur', 'Cameron', 'Keith', 'Juan',

    'Megan', 'Rachel', 'Lauren', 'Kayla', 'Brianna',
    'Jennifer', 'Nicole', 'Stephanie', 'Rebecca', 'Michelle',
    'Kimberly', 'Melissa', 'Christina', 'Amy', 'Angela',
    'Heather', 'Catherine', 'Madison', 'Brittany', 'Danielle',
    'Sophie', 'Hailey', 'Kaylee', 'Aaliyah', 'Peyton',
    'Aubrey', 'Brooklyn', 'Bella', 'Addison', 'Natalia',
    'Jasmine', 'Alexis', 'Allison', 'Katherine', 'Mackenzie',
    'Morgan', 'Taylor', 'Sydney', 'Caroline', 'Julia',
    'Maya', 'Naomi', 'Elena', 'Eliana', 'Valentina',
    'Alice', 'Ruby', 'Eva', 'Ivy', 'Sadie'
];

const lastNames = [
    'Doe', 'Smith', 'Johnson', 'Williams', 'Brown',
    'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
    'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas',
    'Moore', 'Jackson', 'Martin', 'Lee', 'Perez',
    'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
    'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres',
    'Nguyen', 'Hill', 'Flores', 'Green', 'Adams',
    'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell',
    'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips',
    'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz',
    'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris',
    'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez',
    'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
    'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim',

    'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks',
    'Chavez', 'Wood', 'James', 'Bennett', 'Gray',
    'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez',
    'Castillo', 'Sanders', 'Patel', 'Myers', 'Long',
    'Ross', 'Foster', 'Jimenez', 'Powell', 'Jenkins',
    'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman',
    'Butler', 'Henderson', 'Barnes', 'Gonzales', 'Fisher',
    'Vasquez', 'Simmons', 'Romero', 'Jordan', 'Patterson',
    'Alexander', 'Hamilton', 'Graham', 'Reynolds', 'Griffin',
    'Wallace', 'Moreno', 'West', 'Cole', 'Hayes',
    'Bryant', 'Herrera', 'Gibson', 'Ellis', 'Tran',
    'Medina', 'Aguilar', 'Stevens', 'Murray', 'Ford',
    'Castro', 'Marshall', 'Owens', 'Harrison', 'Fernandez',
    'McDonald', 'Woods', 'Washington', 'Kennedy', 'Wells',
    'Vargas', 'Henry', 'Chen', 'Freeman', 'Webb',
    'Tucker', 'Guzman', 'Burns', 'Crawford', 'Olson',
    'Simpson', 'Porter', 'Hunter', 'Gordon', 'Mendez',
    'Silva', 'Shaw', 'Snyder', 'Mason', 'Dixon',
    'Munoz', 'Hunt', 'Hicks', 'Holmes', 'Palmer',
    'Wagner', 'Black', 'Robertson', 'Boyd', 'Rose',
    'Stone', 'Salazar', 'Fox', 'Warren', 'Mills',
    'Meyer', 'Rice', 'Schmidt', 'Garza', 'Daniels',
    'Ferguson', 'Nichols', 'Stephens', 'Soto', 'Weaver',
    'Ryan', 'Gardner', 'Payne', 'Grant', 'Dunn',
    'Kelley', 'Spencer', 'Hawkins', 'Arnold', 'Pierce',
    'Vazquez', 'Hansen', 'Peters', 'Santos', 'Hart',
    'Bradley', 'Knight', 'Elliott', 'Cunningham', 'Duncan',
    'Lane', 'Carroll', 'Drake', 'Andrews', 'Johnston',
    'Ray', 'Douglas', 'Schneider', 'Carr', 'Nicholson',
    'Hansen', 'Matthews', 'Chapman', 'Pena', 'Richards',
    'McCarthy', 'Lawson', 'Steele', 'Bishop', 'Mansfield'
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
 
// function generateRandomMobileNumber() {
//     return '9' + Math.floor(100000000 + Math.random() * 900000000);
// }
 
module.exports = {
    generateUniquePatientFullName,
    generateRandomDateOfBirth,
    generateRandomMobileNumber
};
 
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
 

function randomItem(array) {
    return array[
        Math.floor(Math.random() * array.length)
    ];
}

function generateNamePart() {

    const consonants = [
        'b', 'c', 'd', 'g', 'h', 'j', 'k', 'l',
        'm', 'n', 'p', 'r', 's', 't', 'v'
    ];

    const vowels = [
        'a', 'e', 'i', 'o', 'u'
    ];

    const syllableCount = Math.floor(
        Math.random() * 2
    ) + 2; // 2 or 3 syllables

    let name = '';

    for (let i = 0; i < syllableCount; i++) {

        name += randomItem(consonants);
        name += randomItem(vowels);
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
}

function generateName() {

    const firstName = generateNamePart();
    const lastName = generateNamePart();

    return `${firstName} ${lastName}`;
}


// function generateNamePart() {

//     const consonants = [
//         'b', 'd', 'g', 'h', 'j', 'k',
//         'l', 'm', 'n', 'p', 'r', 's',
//         't', 'v'
//     ];

//     const vowels = [
//         'a', 'e', 'i', 'o', 'u'
//     ];

//     const syllableCount =
//         Math.floor(Math.random() * 2) + 2;

//     let name = '';

//     for (let i = 0; i < syllableCount; i++) {
//         name += randomItem(consonants);
//         name += randomItem(vowels);
//     }

//     return name.charAt(0).toUpperCase() + name.slice(1);
// }

// function generateName() {

//     const firstName = generateNamePart();
//     const lastName = generateNamePart();

//     return `${firstName} ${lastName}`;
// }

module.exports = {
    generatePatientName,
    generateAdmissionDate,
    generateAdmissionTime,
    getAdmissionData,
    generateRandomDateOfBirth,
    generateRandomMobileNumber,
    calculateAgeFromDate,
    generateUniquePatientFullName,
    generateShortPatientName,
    generateName
};
 