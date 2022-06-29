import express from "express";
import {
  getAllUsers,
  getUserById,
  getAllPositiveUsers,
  getAllAdmin,
  getAdminById,
  getStaffById,
  getAllStaff,
  getAllHospital,
  getHospitalById,
  getHospitalWithVaccine,
  numberCasesToday,
  covidDataCummilative,
  createAdmin,
  createHospital,
  createUser,
  createStaff,
  totalDailyData,
  totalCovidDataCummilative,
  ReportDeath,
  updateCummilativeData,
  reportCovidStatus,
  covidDataCummilativeRange,
  numberCasesRange,
  getHospitalWithBooking,
  restockVaccine,
  vaccinateUser,
  newAppointment,
} from "../controllers/Products.js";
const router = express.Router();

router.get("/User", getAllUsers);
router.get("/User/Positive/:IsPositive", getAllPositiveUsers);
router.get("/User/:aadharId", getUserById);

router.get("/Admin/:id", getAdminById);
router.get("/Admin", getAllAdmin);

router.get("/Hospital", getAllHospital);
router.get("/Hospital/Vaccine/:VaccineAvailability", getHospitalWithVaccine);
router.get("/Hospital/:id", getHospitalById);
router.get("/Hospital/Booking/:BookingAvailable", getHospitalWithBooking);

router.get("/Staff", getAllStaff);
router.get("/Staff/:id", getStaffById);

router.patch("/Report/Death/:aadharId", ReportDeath);
router.patch("/User/:aadharId/:CovidStatus", reportCovidStatus);

router.get("/CovidData/Daily/:date", numberCasesToday);
router.get("/CovidData/Daily/:dateStart/:dateEnd", numberCasesRange);
router.get("/CovidData/Daily", totalDailyData);
router.get("/CovidData/Cummilative/:date", covidDataCummilative);
router.get(
  "/CovidData/Cummilative/:dateStart/:dateEnd",
  covidDataCummilativeRange
);
router.get("/CovidData/Cummilative", totalCovidDataCummilative);

router.post("/Create/User", createUser);
router.post("/Create/Hospital", createHospital);
router.post("/Create/Admin", createAdmin);
router.post("/Create/Staff", createStaff);

router.post("/UpdateCummilative", updateCummilativeData);

router.patch("/Hospital/Restock/:hospitalID", restockVaccine);

router.post("/Hospital/NewAppointment/:hospitalID", newAppointment);

router.post("/Vaccinate/:hospitalID/:aadharId/:appoinmentId", vaccinateUser);

export default router;
