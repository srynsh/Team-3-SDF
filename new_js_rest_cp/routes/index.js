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
  authenticateAdmin,
  authenticateStaff,
  aunthicateUser,
} from "../controllers/Products.js";
const router = express.Router();

//Gets all the users. Needs no input
//Call: 192.168.51.73:5002/User
router.get("/User", getAllUsers);

//Call: 192.168.51.73:5002/User/Positive/IsPositive
router.get("/User/Positive/IsPositive", getAllPositiveUsers);

//Gets the user with the given userId.
//Sample Call: 192.168.51.73:5002/User/1
//Will return the user with id 1
router.get("/User/:aadharId", getUserById);

//Same as User by Id.
//Sample Call: 192.168.51.73:5002/Admin/1
//Will return the Admin with id 1
router.get("/Admin/:id", getAdminById);

//Same as get all users
router.get("/Admin", getAllAdmin);

//Gets all the hospitals
router.get("/Hospital", getAllHospital);

//Gets all the hospitals with vaccine.
//Call: 192.168.51.73:5002/Hospital/Vaccine/1
router.get("/Hospital/Vaccine/:VaccineAvailability", getHospitalWithVaccine);

//Gets the hospital with the given id.
//Sample Call: 192.168.51.73:5002/Hospital/1
//Gives the hospital with ID=1.
router.get("/Hospital/:id", getHospitalById);

//Gets all the hospitals where people can still book an aapointment.
//Call: 192.168.51.73:5002/Hospital/Booking/1
router.get("/Hospital/Booking/:BookingAvailable", getHospitalWithBooking);

//Same as get all user
router.get("/Staff", getAllStaff);

//Same as get user by id
router.get("/Staff/:id", getStaffById);

//Used to report a death
//Sample call: 192.168.51.73:5002/Report/Death/A123
//Will report user with aadharId=A123 dead.
router.patch("/Report/Death/:aadharId", ReportDeath);

//Used to report covid -ve and covid +ve
//Sample call: 192.168.51.73:5002/User/Report/A123/1
//Body has this {"date": "2022-07-03"}
//This will report aadharId=A123 as covid +ve on the date of 2022-07-03 (YYYY-MM-DD)
//Sample call: 192.168.51.73:5002/User/Report/A123/0
//Body has this {"date": "2022-07-03"}
//This will report aadharId=A123 as covid -ve on the date of 2022-07-03 (YYYY-MM-DD)
router.patch("/User/Report/:aadharId/:CovidStatus", reportCovidStatus);

router.get("/CovidData/Daily/:date", numberCasesToday);
router.get("/CovidData/Daily/:dateStart/:dateEnd", numberCasesRange);
router.get("/CovidData/Daily", totalDailyData);
router.get("/CovidData/Cummilative/:date", covidDataCummilative);
router.get(
  "/CovidData/Cummilative/:dateStart/:dateEnd",
  covidDataCummilativeRange
);
router.get("/CovidData/Cummilative", totalCovidDataCummilative);

//Sample Call: 192.168.51.73:5002/Create/User
//Body has {"aadharId": "A123", "age": "18", "name": "Suryaansh Jain", "mobileNumber": "9160003106", "gender": "M", "numberOfVaccines": "2", "deathStatus": "0", "isCovidPositive": "0", "password": "ALPHA#!"}
router.post("/Create/User", createUser);

//Sample Call: 192.168.51.73:5002/Create/Hospital
//Body has {"hospitalName": "Care", "numberOfVaccines": "2000", "numberOfBookings": "2000" }
router.post("/Create/Hospital", createHospital);

router.post("/Create/Admin", createAdmin);
router.post("/Create/Staff", createStaff);

router.post("/UpdateCummilative", updateCummilativeData);

//Sample Call: 192.168.51.73:5002/Hospital/Restock/1
//Body has {"count": "2000"}
router.patch("/Hospital/Restock/:hospitalID", restockVaccine);

//Sample Call: 192.168.51.73:5002/Hospital/NewAppointment/1
//Body has {"aadharId": "A123", "appoinmentId": "1", "bookingDate": "2022-06-30", "hospitalID": "1"}
router.post("/Hospital/NewAppointment/:hospitalID", newAppointment);

//Sample Call: 192.168.51.73:5002/Vaccinate/1/A123/1
//Body has {"aadharId": "A123", "appoinmentId": "1", "hospitalID": "1", "bookingDate": "2022-06-30"}
router.post("/Vaccinate/:hospitalID/:aadharId/:appoinmentId", vaccinateUser);

router.get("/Authenticate/User", aunthicateUser);

router.get("/Authenticate/Admin", authenticateAdmin);

router.get("/Authenticate/Staff", authenticateStaff);

export default router;
