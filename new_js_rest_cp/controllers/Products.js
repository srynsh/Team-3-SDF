import { Sequelize, where } from "sequelize";
import {
  Users,
  VaccinationDetails,
  HospitalStaff,
  Hospital,
  CummilativeCovidData,
  DailyCovidData,
  Admin,
  VaccineAppointments,
  CovidCasesData,
} from "../models.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: req.query,
    });
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  console.log(JSON.stringify(req.params));
  try {
    const users = await Users.findAll({
      where: {
        aadharId: req.params.aadharId,
      },
    });
    res.json(users[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllPositiveUsers = async (req, res) => {
  try {
    const positive = await Users.findAll({
      where: {
        isCovidPositive: true,
      },
    });
    res.json(positive);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const reportCovidStatus = async (req, res) => {
  if (req.params.CovidStatus == 1) {
    await ReportCovidCase(req, res);
  } else {
    await ReportCovidNegative(req, res);
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(admin[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await HospitalStaff.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(staff[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staffs = await HospitalStaff.findAll();
    res.json(staffs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findAll({
      where: {
        hospitalId: req.params.id,
      },
    });
    res.json(hospital[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findAll();
    res.json(hospital);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const numberOfVaccines = async (hospitalID) => {
  try {
    const result = await Hospital.findAll({
      where: {
        hospitalID: hospitalID,
      },
    });

    return result[0].numberOfVaccines;
  } catch (error) {
    return -1;
  }
};

export const getHospitalWithVaccine = async (req, res) => {
  try {
    if (req.params.VaccineAvailability == 1) {
      const hospital = await Hospital.findAll({
        where: {
          numberOfVaccines: {
            [Sequelize.Op.not]: "0",
          },
        },
      });
      res.json(hospital);
    } else {
      const hospital = await Hospital.findAll({
        where: {
          numberOfVaccines: 0,
        },
      });
      res.json(hospital);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const newCasesToday = async (date) => {
  try {
    const numberOfCases = await DailyCovidData.findAll({
      where: {
        dateToday: date,
      },
    });
    return numberOfCases[0].newCases;
  } catch (error) {
    return -1;
  }
};

const newRecoveredToday = async (date) => {
  try {
    const numberOfCases = await DailyCovidData.findAll({
      where: {
        dateToday: date,
      },
    });
    return numberOfCases[0].newRecovered;
  } catch (error) {
    return -1;
  }
};

const newDeadToday = async (date) => {
  try {
    const numberOfDeath = await DailyCovidData.findAll({
      where: {
        dateToday: date,
      },
    });
    return numberOfDeath[0].newDeaths;
  } catch (error) {
    return -1;
  }
};

const TotalDead = async (date) => {
  try {
    const numberOfDeath = await CummilativeCovidData.findAll({
      where: {
        date: date,
      },
    });
    return numberOfCases[0].newDeaths;
  } catch (error) {
    return -1;
  }
};

const TotalCases = async (date) => {
  try {
    const numberOfDeath = await CummilativeCovidData.findAll({
      where: {
        date: date,
      },
    });
    return numberOfCases[0].newCases;
  } catch (error) {
    return -1;
  }
};

const TotalRecovered = async (date) => {
  try {
    const numberOfDeath = await CummilativeCovidData.findAll({
      where: {
        date: date,
      },
    });
    return numberOfCases[0].newRecovered;
  } catch (error) {
    return -1;
  }
};

const totalData = async (date) => {
  try {
    const numberOfCases = await CummilativeCovidData.findAll({
      where: {
        date: date,
      },
    });
    return [
      numberOfCases[0].newCases,
      numberOfCases[0].newDeaths,
      numberOfCases[0].newRecovered,
    ];
  } catch (error) {
    return -1;
  }
};

export const ReportCovidCase = async (req, res) => {
  console.log(JSON.stringify(req.body));
  try {
    const check = await Users.update(
      { isCovidPositive: true },
      {
        where: {
          aadharId: req.params.aadharId,
          isCovidPositive: false,
        },
      }
    );
    console.log(check);
    if (check[0] != 0) {
      const newCases = (await newCasesToday(req.body.date)) + 1;
      await DailyCovidData.update(
        { newCases: newCases },
        {
          where: {
            dateToday: req.body.date,
          },
        }
      );

      const posPerson = await getUser(req.params.aadharId);

      await CovidCasesData.create({
        aadharId: req.params.aadharId,
        age: posPerson.age,
        gender: posPerson.gender,
        numberOfVaccines: posPerson.numberOfVaccines,
        dateReported: req.body.date,
      });
      res.json({
        message: "Case Reported",
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const ReportCovidNegative = async (req, res) => {
  console.log(JSON.stringify(req.body));
  try {
    const check = await Users.update(
      { isCovidPositive: false },
      {
        where: {
          aadharId: req.params.aadharId,
          isCovidPositive: true,
        },
      }
    );
    console.log(check);
    if (check[0] != 0) {
      const newRecovered = (await newRecoveredToday(req.body.date)) + 1;
      await DailyCovidData.update(
        { newRecovered: newRecovered },
        {
          where: {
            dateToday: req.body.date,
          },
        }
      );

      await CovidCasesData.update(
        {
          dateRecovered: req.body.date,
        },
        {
          where: {
            aadharId: req.params.aadharId,
            dateRecovered: {
              [Sequelize.Op.is]: null,
            },
          },
        }
      );

      res.json({
        message: "Status Updated",
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const ReportDeath = async (req, res) => {
  console.log(JSON.stringify(req.body));
  try {
    const check = await Users.update(
      { deathStatus: true, dateOfDeath: req.body.date },
      {
        where: {
          aadharId: req.params.aadharId,
          isCovidPositive: true,
          deathStatus: false,
        },
      }
    );
    console.log(check);
    if (check[0] != 0) {
      const newDeaths = (await newDeadToday(req.body.date)) + 1;
      await DailyCovidData.update(
        { newDeaths: newDeaths },
        {
          where: {
            dateToday: req.body.date,
          },
        }
      );
      res.json({
        message: "Status Updated",
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const numberCasesToday = async (req, res) => {
  try {
    const numberOfCases = await DailyCovidData.findAll({
      where: {
        dateToday: req.params.date,
      },
    });
    res.json(numberOfCases[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const totalDailyData = async (req, res) => {
  try {
    const numberOfCases = await DailyCovidData.findAll();
    res.json(numberOfCases);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const covidDataCummilative = async (req, res) => {
  try {
    const data = await CummilativeCovidData.findAll({
      where: {
        date: req.params.date,
      },
    });
    res.json(data[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const totalCovidDataCummilative = async (req, res) => {
  try {
    const data = await CummilativeCovidData.findAll();
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    await Users.create(req.body);
    res.json({
      message: "User Added",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser2 = async (req, res) => {
  try {
    const newUser = await getUser(req.params.aadharId);
    if (newUser != -1) {
      res.json({ message: "User already exists" });
    } else {
      await Users.create({
        aadharId: req.params.aadharId,
        age: req.body.age,
        name: req.body.name,
        mobileNumber: req.body.mobileNumber,
        gender: req.body.gender,
        numberOfVaccines: req.body.numberOfVaccines,
        deathStatus: req.body.deathStatus,
        isCovidPositive: req.body.isCovidPositive,
        password: req.body.password,
      });
      res.json({ message: "User Created" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createHospital = async (req, res) => {
  try {
    await Hospital.create(req.body);
    res.json({
      message: "Hospital Added",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    await Admin.create(req.body);
    res.json({
      message: "Admin Added",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    await HospitalStaff.create(req.body);
    res.json({
      message: "Staff Added",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getIdDaily = async (date) => {
  try {
    const id = await DailyCovidData.findAll({
      where: {
        dateToday: date,
      },
    });
    return id[0].id;
  } catch (error) {
    return -1;
  }
};

const getIdCummilative = async (date) => {
  try {
    console.log(date);
    const id = await CummilativeCovidData.findAll({
      where: {
        date: date,
      },
    });
    console.log(JSON.stringify(id[0]));
    return id[0].id;
  } catch (error) {
    return -1;
  }
};

const getCaseData = async (id) => {
  try {
    console.log(id);
    const CaseData = await CummilativeCovidData.findAll({
      where: {
        id: id,
      },
    });
    return [
      CaseData[0].newCases,
      CaseData[0].newRecovered,
      CaseData[0].newDeaths,
    ];
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateCummilativeDataInternal = async (dateCurrent) => {
  try {
    let prevDate = new Date(dateCurrent);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateStr = prevDate.toISOString().split("T")[0];

    let DataCummilative = await totalData(prevDateStr);

    let newCasesReported =
      (await newCasesToday(dateCurrent)) + DataCummilative[0];
    let newDeathsReported =
      (await newDeadToday(dateCurrent)) + DataCummilative[1];
    let newRecoveredReported =
      (await newRecoveredToday(dateCurrent)) + DataCummilative[2];

    await CummilativeCovidData.create({
      newCases: newCasesReported,
      newDeaths: newDeathsReported,
      newRecovered: newRecoveredReported,
      date: dateCurrent,
    });

    return 1;
  } catch (error) {
    return error.message;
  }
};

export const updateCummilativeData = async (req, res) => {
  const result = await updateCummilativeDataInternal(req.body.date);

  if (result == 1) {
    res.json({
      message: "Updated",
    });
  } else {
    res.json({ message: result });
  }
};

const getNumberOfBookings = async (hospitalID) => {
  try {
    const numBooking = await Hospital.findAll({
      where: {
        hospitalID: hospitalID,
      },
    });

    return numBooking[0].numberOfBookings;
  } catch (error) {
    return -1;
  }
};

const getNumberOfVaccines = async (hospitalID) => {
  try {
    const numVaccine = await Hospital.findAll({
      where: {
        hospitalID: hospitalID,
      },
    });

    return numVaccine[0].numberOfVaccines;
  } catch (error) {
    return -1;
  }
};

export const getHospitalWithBooking = async (req, res) => {
  try {
    const result = await Hospital.findAll({
      where: {
        numberOfVaccines: {
          [Sequelize.Op.gt]: Sequelize.col("numberOfBookings"),
        },
      },
    });

    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newAppointment = async (req, res) => {
  try {
    let numBook = parseInt(await getNumberOfBookings(req.params.hospitalID));
    let numVacc = parseInt(await getNumberOfVaccines(req.params.hospitalID));
    const user = await getUser(req.body.aadharId);
    const hospital = await getHospital(req.body.hospitalID);

    console.log(req.params.hospitalID);
    console.log(numBook);
    console.log(numVacc);

    if (numBook >= numVacc) {
      console.log("Fail");
      res.json({
        message: "We are full",
      });
    } else {
      console.log("Pass");
      console.log(req.body);
      try {
        await VaccineAppointments.create({
          aadharId: req.body.aadharId,
          appoinmentId: req.params.appoinmentId,
          bookingDate: req.body.bookingDate,
          hospitalID: req.params.hospitalID,
        });

        await Hospital.update(
          { numberOfBookings: numBook + 1 },
          {
            where: {
              hospitalID: req.params.hospitalID,
            },
          }
        );

        res.json({
          message: "Appointment made",
        });
      } catch {
        res.json({ message: error.message });
      }
    }
  } catch (error) {
    res.json({ message: error.message + "bye" });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await VaccineAppointments.findAll({
      where: {
        aadharId: id,
      },
    });

    res.json(appointments);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getUser = async (aadharId) => {
  try {
    const user = await Users.findAll({
      where: {
        aadharId: aadharId,
      },
    });

    if (user.length == 0) {
      return -1;
    }

    return user[0];
  } catch (error) {
    return -1;
  }
};

const getHospital = async (hospitalID) => {
  try {
    const hospital = await Hospital.findAll({
      where: {
        hospitalID: hospitalID,
      },
    });

    return hospital[0];
  } catch (error) {
    return -1;
  }
};

export const vaccinateUser = async (req, res) => {
  try {
    console.log(req.params);

    const result = await VaccineAppointments.findAll({
      where: {
        appoinmentId: req.params.appoinmentId,
      },
    });

    if (result[0].jabStatus == 1) {
      res.json({ message: "User already Vaccinated" });
    } else {
      const AadharId = result[0].aadharId;
      const HospitalID = result[0].hospitalID;

      const user = await getUser(AadharId);
      const hospital = await getHospital(HospitalID);
      const numBooking = parseInt(hospital.numberOfBookings) - 1;
      const numVacc = parseInt(hospital.numberOfVaccines) - 1;
      const numDose = parseInt(user.numberOfVaccines) + 1;

      await Users.update(
        { numberOfVaccines: numDose },
        {
          where: {
            aadharId: AadharId,
          },
        }
      );

      await VaccineAppointments.update(
        { jabStatus: 1 },
        {
          where: {
            appoinmentId: req.params.appoinmentId,
          },
        }
      );

      await Hospital.update(
        {
          numberOfBookings: numBooking,
          numberOfVaccines: numVacc,
        },
        {
          where: {
            hospitalID: HospitalID,
          },
        }
      );

      let prevDate = new Date();
      let DateStr = prevDate
        .toLocaleString("fr-CA", { timeZone: "Asia/Kolkata" })
        .split(",")[0];

      await VaccinationDetails.create({
        aadharId: AadharId,
        doseNumber: numDose,
        appoinmentId: req.params.appoinmentId,
        date: DateStr,
      });

      res.json({ message: "User Vaccinated" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const restockVaccine = async (req, res) => {
  try {
    let numVacc = parseInt(await getNumberOfVaccines(req.params.hospitalID));
    let newStock = parseInt(req.body.count);
    numVacc = numVacc + newStock;
    await Hospital.update(
      { numberOfVaccines: numVacc },
      {
        where: {
          hospitalID: req.params.hospitalID,
        },
      }
    );

    res.json({ message: "Restocked" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const numberCasesRange = async (req, res) => {
  try {
    const Result = await DailyCovidData.findAll({
      where: {
        dateToday: {
          [Sequelize.Op.lte]: req.params.dateEnd,
          [Sequelize.Op.gte]: req.params.dateStart,
        },
      },
    });

    res.json(Result);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const covidDataCummilativeRange = async (req, res) => {
  try {
    const Result = await CummilativeCovidData.findAll({
      where: {
        date: {
          [Sequelize.Op.lte]: req.params.dateEnd,
          [Sequelize.Op.gte]: req.params.dateStart,
        },
      },
    });

    res.json(Result);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createDay = async (dateVar) => {
  try {
    DailyCovidData.create({
      dateToday: dateVar,
      newCases: 0,
      newDeaths: 0,
      newRecovered: 0,
    });

    return 1;
  } catch (error) {
    return 0;
  }
};

export const aunthicateUser = async (req, res) => {
  try {
    console.log(req.body.password);
    const pswd = await Users.findAll({
      where: {
        aadharId: req.body.aadharId,
      },
    });
    console.log(pswd);
    if (pswd[0].password == req.body.password) {
      res.json(pswd[0]);
      // res.json({ status: "1" });
    } else {
      res.json({ status: "0" });
    }
  } catch (error) {
    res.json({ status: "0" });
  }
};

export const authenticateAdmin = async (req, res) => {
  try {
    const pswd = await Admin.findAll({
      where: {
        id: req.body.id,
      },
    });
    if (pswd[0].password == req.body.password) {
      res.json(pswd[0]);
    } else {
      res.json({ status: "0" });
    }
  } catch (error) {
    res.json({ status: "0" });
  }
};

export const authenticateStaff = async (req, res) => {
  try {
    const pswd = await HospitalStaff.findAll({
      where: {
        id: req.body.id,
      },
    });
    if (pswd[0].password == req.body.password) {
      res.json(pswd[0]);
    } else {
      res.json({ status: "0" });
    }
  } catch (error) {
    res.json({ status: "0" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const ans = await VaccineAppointments.findAll({
      where: {
        hospitalID: req.params.hospitalID,
        jabStatus: {
          [Sequelize.Op.is]: null,
        },
      },
    });

    res.json(ans);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const cancelBooking = async (date) => {
  try {
    VaccineAppointments.update(
      { jabStatus: 0 },
      {
        where: {
          bookingDate: {
            [Sequelize.Op.lte]: date,
          },
          jabStatus: {
            [Sequelize.Op.is]: null,
          },
        },
      }
    );

    return 1;
  } catch (error) {
    return 0;
  }
};

export const getCovidDataWithFilters = async (req, res) => {
  try {
    let minAge = req.query.startAge;
    let maxAge = req.query.endAge;
    let minVacc = req.query.NumberOfVaccinesStart;
    let maxVacc = req.query.NumberOfVaccinesEnd;
    let gen = req.query.gender;

    let reportedData;
    let deathData;
    if (gen == undefined) {
      reportedData = await CovidCasesData.findAll({
        where: {
          numberOfVaccines: {
            [Sequelize.Op.gte]: minVacc,
            [Sequelize.Op.lte]: maxVacc,
          },
          age: {
            [Sequelize.Op.gte]: minAge,
            [Sequelize.Op.lte]: maxAge,
          },
          dateReported: {
            [Sequelize.Op.lte]: req.query.date,
          },
        },
      });

      deathData = await Users.findAll({
        where: {
          numberOfVaccines: {
            [Sequelize.Op.gte]: minVacc,
            [Sequelize.Op.lte]: maxVacc,
          },
          age: {
            [Sequelize.Op.gte]: minAge,
            [Sequelize.Op.lte]: maxAge,
          },
          dateOfDeath: {
            [Sequelize.Op.ne]: null,
            [Sequelize.Op.lte]: req.query.date,
          },
        },
      });
    } else {
      reportedData = await CovidCasesData.findAll({
        where: {
          numberOfVaccines: {
            [Sequelize.Op.gte]: minVacc,
            [Sequelize.Op.lte]: maxVacc,
          },
          age: {
            [Sequelize.Op.gte]: minAge,
            [Sequelize.Op.lte]: maxAge,
          },
          dateReported: {
            [Sequelize.Op.lte]: req.query.date,
          },
          gender: gen,
        },
      });

      deathData = await Users.findAll({
        where: {
          numberOfVaccines: {
            [Sequelize.Op.gte]: minVacc,
            [Sequelize.Op.lte]: maxVacc,
          },
          age: {
            [Sequelize.Op.gte]: minAge,
            [Sequelize.Op.lte]: maxAge,
          },
          dateOfDeath: {
            [Sequelize.Op.ne]: null,
            [Sequelize.Op.lte]: req.query.date,
          },
          gender: gen,
        },
      });
    }

    let countReported = reportedData.length;

    let recoveredData = reportedData.filter(
      (obj) => obj.dateRecovered != null && obj.dateRecovered <= req.query.date
    );

    let countRecovered = recoveredData.length;

    let countDeath = deathData.length;

    let countActive = countReported - countRecovered - countDeath;

    res.json({
      numberOfDeath: countDeath,
      numberOfRecovered: countRecovered,
      numberOfReported: countReported,
      numberOfActive: countActive,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
