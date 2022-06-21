import { Sequelize } from "sequelize";
import {
    Users,
    // VaccinationDetails,
    // VaccineAppointments,
    HospitalStaff,
    Hospital,
    // CummilativeCovidData,
    DailyCovidData,
    Admin
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
}

const newRecoveredToday = async (date) => {
    console.log(date);
    try {
        const numberOfCases = await DailyCovidData.findAll({
            where: {
                dateToday: date
            }
        });
        //console.log(numberOfCases[0].newCases);
        return numberOfCases[0].newRecovered;
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