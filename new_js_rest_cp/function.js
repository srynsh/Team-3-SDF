import {
    Users,
    // VaccinationDetails,
    // VaccineAppointments,
    HospitalStaff,
    Hospital,
    // CummilativeCovidData,
    DailyCovidData,
    Admin
} from './models.js';

export const newCasesToday = async (date) => {
    console.log(date);
    try {
        const numberOfCases = await DailyCovidData.findAll({
            where: {
                dateToday: date
            }
        });
        //console.log(numberOfCases[0].newCases);
        return numberOfCases[0].newCases;
    } catch (error) {
        return -1;
    }
};