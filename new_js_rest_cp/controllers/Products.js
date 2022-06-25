import { Sequelize } from "sequelize";
import {
    Users,
    VaccinationDetails,
    // VaccineAppointments,
    HospitalStaff,
    Hospital,
    CummilativeCovidData,
    DailyCovidData,
    Admin,
    VaccineAppointments
} from "../models.js";

export const getAllUser = async (req, res) => {
    try {
        const user = await Users.findAll();
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    console.log(JSON.stringify(req.params));
    try {
        const users = await Users.findAll({
            where: {
                aadharId: req.params.aadharId
            }
        });
        res.json(users[0]);
    }
    catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllPositiveUsers = async (req, res) => {
    try {
        const positive = await Users.findAll({
            where: {
                isCovidPositive: true
            }
        });
        res.json(positive);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(admin[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    }
    catch (error) {
        res.json({ message: error.message });
    }
}

export const getStaffById = async (req, res) => {
    try {
        const staff = await HospitalStaff.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(staff[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllStaff = async (req, res) => {
    try {
        const staffs = await HospitalStaff.findAll();
        res.json(staffs);
    }
    catch (error) {
        res.json({ message: error.message });
    }
}

export const getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findAll({
            where: {
                hospitalId: req.params.id
            }
        });
        res.json(hospital[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findAll();
        res.json(hospital);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getHospitalWithVaccine = async (req, res) => {
    try {
        const hospital = await Hospital.findAll({
            where: {
                numberOfVaccines: {
                    [Sequelize.Op.not]: '0'
                }
            }
        });
        res.json(hospital);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const newCasesToday = async (date) => {
    try {
        const numberOfCases = await DailyCovidData.findAll({
            where: {
                dateToday: date
            }
        });
        return numberOfCases[0].newCases;
    } catch (error) {
        return -1;
    }
}

const newRecoveredToday = async (date) => {
    try {
        const numberOfCases = await DailyCovidData.findAll({
            where: {
                dateToday: date
            }
        });
        return numberOfCases[0].newRecovered;
    } catch (error) {
        return -1;
    }
}

const newDeadToday = async (date) => {
    try {
        const numberOfDeath = await DailyCovidData.findAll({
            where: {
                dateToday: date
            }
        });
        return numberOfDeath[0].newDeaths;
    } catch (error) {
        return -1;
    }
}

const TotalDead = async (date) => {
    try {
        const numberOfDeath = await CummilativeCovidData.findAll({
            where: {
                date: date
            }
        });
        return numberOfCases[0].newDeaths;
    } catch (error) {
        return -1;
    }
}

const TotalCases = async (date) => {
    try {
        const numberOfDeath = await CummilativeCovidData.findAll({
            where: {
                date: date
            }
        });
        return numberOfCases[0].newCases;
    } catch (error) {
        return -1;
    }
}

const TotalRecovered = async (date) => {
    try {
        const numberOfDeath = await CummilativeCovidData.findAll({
            where: {
                date: date
            }
        });
        return numberOfCases[0].newRecovered;
    } catch (error) {
        return -1;
    }
}

const totalData = async (date) => {
    try {
        const numberOfCases = await CummilativeCovidData.findAll({
            where: {
                date: date
            }
        });
        return [numberOfCases[0].newCases, numberOfCases[0].newDeaths, numberOfCases[0].newRecovered];
    } catch (error) {
        return -1;
    }
}

export const ReportCovidCase = async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {
        const check = await Users.update({ isCovidPositive: true }, {
            where: {
                aadharId: req.params.aadharId,
                isCovidPositive: false
            }
        });
        console.log(check);
        if (check[0] != 0) {
            const newCases = await newCasesToday(req.body.date) + 1;
            await DailyCovidData.update({ newCases: newCases }, {
                where: {
                    dateToday: req.body.date
                }
            });
            res.json({
                "message": "Case Reported"
            });
        }
        else {
            throw error;
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const ReportCovidNegative = async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {
        const check = await Users.update({ isCovidPositive: false }, {
            where: {
                aadharId: req.params.aadharId,
                isCovidPositive: true
            }
        });
        console.log(check);
        if (check[0] != 0) {
            const newRecovered = await newRecoveredToday(req.body.date) + 1;
            await DailyCovidData.update({ newRecovered: newRecovered }, {
                where: {
                    dateToday: req.body.date
                }
            });
            res.json({
                "message": "Status Updated"
            });
        }
        else {
            throw error;
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const ReportDeath = async (req, res) => {
    console.log(JSON.stringify(req.body));
    try {
        const check = await Users.update({ isCovidPositive: false, deathStatus: true }, {
            where: {
                aadharId: req.params.aadharId,
                isCovidPositive: true,
                deathStatus: false
            }
        });
        console.log(check);
        if (check[0] != 0) {
            const newDeaths = await newDeadToday(req.body.date) + 1;
            await DailyCovidData.update({ newDeaths: newDeaths }, {
                where: {
                    dateToday: req.body.date
                }
            });
            res.json({
                "message": "Status Updated"
            });
        }
        else {
            throw error;
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const addVacccine = async (req, res) => {
    try {
        await Hospital.update(req.body, {
            where: {
                hospitalID: req.params.id
            }
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const numberCasesToday = async (req, res) => {
    try {
        const numberOfCases = await DailyCovidData.findAll({
            where: {
                dateToday: req.params.date
            }
        });
        res.json(numberOfCases[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const totalDailyData = async (req, res) => {
    try {
        const numberOfCases = await DailyCovidData.findAll();
        res.json(numberOfCases);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const covidDataCummilative = async (req, res) => {
    try {
        const data = await CummilativeCovidData.findAll({
            where: {
                date: req.params.date
            }
        });
        res.json(data[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const totalCovidDataCummilative = async (req, res) => {
    try {
        const data = await CummilativeCovidData.findAll();
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        await Users.create(req.body);
        res.json({
            "message": "User Added"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createHospital = async (req, res) => {
    try {
        await Hospital.create(req.body);
        res.json({
            "message": "Hospital Added"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createAdmin = async (req, res) => {
    try {
        await Admin.create(req.body);
        res.json({
            "message": "Admin Added"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createStaff = async (req, res) => {
    try {
        await HospitalStaff.create(req.body);
        res.json({
            "message": "Staff Added"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getIdDaily = async (date) => {
    try {
        const id = await DailyCovidData.findAll({
            where: {
                dateToday: date
            }
        })
        return id[0].id;
    } catch (error) {
        return -1;
    }
}

const getIdCummilative = async (date) => {
    try {
        console.log(date);
        const id = await CummilativeCovidData.findAll({
            where: {
                date: date
            }
        })
        console.log(JSON.stringify(id[0]));
        return id[0].id;
    } catch (error) {
        return -1;
    }
}

const getCaseData = async (id) => {
    try {
        console.log(id);
        const CaseData = await CummilativeCovidData.findAll({
            where: {
                id: id
            }
        });
        return [CaseData[0].newCases, CaseData[0].newRecovered, CaseData[0].newDeaths];
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateCummilativeData = async (req, res) => {
    try {
        const dateCurrent = req.body.date;

        let prevDate = new Date(dateCurrent);
        prevDate.setDate(prevDate.getDate() - 1)
        const prevDateStr = prevDate.toISOString().split('T')[0];

        let DataCummilative = await totalData(prevDateStr);

        let newCasesReported = await newCasesToday(dateCurrent) + DataCummilative[0];
        let newDeathsReported = await newDeadToday(dateCurrent) + DataCummilative[1];
        let newRecoveredReported = await newRecoveredToday(dateCurrent) + DataCummilative[2];

        await CummilativeCovidData.create({
            newCases: newCasesReported,
            newDeaths: newDeathsReported,
            newRecovered: newRecoveredReported,
            date: dateCurrent
        });

        res.json({
            "message": "Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getBookings = async (hospitalID) => {
    try {
        const numBooking = await Hospital.findAll({
            where: {
                hospitalID: hospitalID
            }
        });

        return numBooking[0].numberOfBookings;
    } catch (error) {
        return -1;
    }
}

const getVaccines = async (hospitalID) => {
    try {
        const numVaccine = await Hospital.findAll({
            where: {
                hospitalID: hospitalID
            }
        });

        return numVaccine[0].numberOfVaccines;
    } catch (error) {
        return -1;
    }
}

export const getHospitalWithBooking = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const newAppointment = async (req, res) => {
    try {
        let numBook = await getBookings(req.body.hospitalID);
        let numVacc = await getVaccines(req.body.hospitalID);
        if (numBook >= numVacc) {
            res.json({
                "message": "We are full"
            });
        } else {
            await VaccineAppointments.create(req.body);
            res.json({
                "message": "Appointment made"
            });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getUserAppointments = async (req, res) => {
    try {
        const appointments = await VaccineAppointments.findAll({
            where: {
                aadharId: id
            }
        });

        res.json(appointments);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getUser = async (aadharId) => {
    try {
        const user = await Users.findAll({
            where: {
                aadharId: aadharId
            }
        });

        return user[0];
    } catch (error) {
        return -1;
    }
}

export const giveVaccine = async (req, res) => {
    try {
        const user = getUser(req.params.aadharId);

    } catch (error) {

    }
}
