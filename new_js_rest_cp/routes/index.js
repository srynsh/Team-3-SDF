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
    ReportCovidNegative
} from "../controllers/Products.js";
const router = express.Router();
router.get('/GetAllUser', getAllUser);
router.get('/GetAllPositive', getAllPositiveUsers);
router.get('/GetUserById/:aadharId', getUserById);

router.get('/GetAdminByID/:id', getAdminById);
router.get('/GetAllAdmin', getAllAdmin);

router.get('/getAllHospitals', getAllHospital);
router.get('/getHospitalWithVaccine', getHospitalWithVaccine);
router.get('/getHospitalById/:id', getHospitalById);

router.get('/getAllStaff', getAllStaff);
router.get('/getStaffById', getStaffById);

router.patch('/ReportCase/:aadharId', ReportCovidCase);
router.patch('/ReportNegative/:aadharId', ReportCovidNegative);
export default router;