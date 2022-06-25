import express from "express";
import {
    getAllUser,
    getUserById,
    getAllPositiveUsers,
    getAllAdmin,
    getAdminById,
    getStaffById,
    getAllStaff,
    getAllHospital,
    getHospitalById,
    getHospitalWithVaccine,
    ReportCovidCase,
    numberCasesToday,
    ReportCovidNegative,
    covidDataCummilative,
    createAdmin,
    createHospital,
    createUser,
    createStaff,
    addVacccine,
    totalDailyData,
    totalCovidDataCummilative,
    ReportDeath,
    updateCummilativeData
} from "../controllers/Products.js";
const router = express.Router();

router.get('/User', getAllUser);
router.get('/User/Positive', getAllPositiveUsers);
router.get('/User/:aadharId', getUserById);

router.get('/Admin/:id', getAdminById);
router.get('/Admin', getAllAdmin);

router.get('/Hospital', getAllHospital);
router.get('/Hospital/WithVaccine', getHospitalWithVaccine);
router.get('/Hospital/:id', getHospitalById);

router.get('/Staff', getAllStaff);
router.get('/Staff/:id', getStaffById);

router.patch('/Report/Positive/:aadharId', ReportCovidCase);
router.patch('/Report/Negative/:aadharId', ReportCovidNegative);
router.patch('/Report/Death/:aadharId', ReportDeath);

router.get('/CovidData/Daily/:date', numberCasesToday);
router.get('/CovidData/Daily', totalDailyData);
router.get('/CovidData/Cummilative/:date', covidDataCummilative);
router.get('/CovidData/Cummilative', totalCovidDataCummilative);

router.post('/Create/User', createUser);
router.post('/Create/Hospital', createHospital);
router.post('/Create/Admin', createAdmin);
router.post('/Create/Staff', createStaff);

router.patch('Hospital/Add/:id', addVacccine);

router.post('/UpdateCummilative', updateCummilativeData);

export default router;
