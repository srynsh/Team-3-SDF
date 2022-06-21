import { Sequelize } from "sequelize";
import db from './conn.js';

const { DataTypes } = Sequelize;

export const Users = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    gender: {
        type: DataTypes.STRING
    },
    aadharId: {
        type: DataTypes.STRING
    },
    numberOfVaccines: {
        type: DataTypes.INTEGER
    },
    password: {
        type: DataTypes.STRING
    },
    isCovidPositive: {
        type: DataTypes.BOOLEAN
    },
    deathStatus: {
        type: DataTypes.BOOLEAN
    },
    mobileNumber: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export const Hospital = db.define('hospital', {
    hospitalID: {
        type: DataTypes.INTEGER
    },
    numberOfVaccines: {
        type: DataTypes.INTEGER
    },
    hospitalName: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export const HospitalStaff = db.define('hospitalStaff', {
    hospitalID: {
        type: DataTypes.INTEGER
    },
    role: { // There are 2 Roles --> M(Manager), S(Staff)
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    freezeTableName: true
});

export const Admin = db.define('admin', {
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    freezeTableName: true
});

// export const VaccineAppointments = db.define('vaccineAppoinments', {
//     appoinmentId: {
//         type: DataTypes.INTEGER
//     },
//     hospitalID: {
//         type: DataTypes.INTEGER
//     },
//     aadharId: {
//         type: DataTypes.STRING
//     },
//     jabStatus: {
//         type: DataTypes.BOOLEAN
//     },
//     bookingDate: {
//         type: DataTypes.DATEONLY
//     }
// }, {
//     freezeTableName: true
// });

export const DailyCovidData = db.define('dailyCovidData', {
    dateToday: {
        type: DataTypes.DATEONLY
    },
    newCases: {
        type: DataTypes.INTEGER
    },
    newDeaths: {
        type: DataTypes.INTEGER
    },
    newRecovered: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});

// export const CummilativeCovidData = db.define('cummilativeCovidData', {
//     date: {
//         type: DataTypes.DATEONLY
//     },
//     newCases: {
//         type: DataTypes.INTEGER
//     },
//     newDeaths: {
//         type: DataTypes.INTEGER
//     },
//     newRecovered: {
//         type: DataTypes.INTEGER
//     }
// }, {
//     freezeTableName: true
// });

// export const VaccinationDetails = db.define('vaccinationDetails', {
//     aadharId: {
//         type: DataTypes.STRING
//     },
//     doseNumber: {
//         type: DataTypes.INTEGER
//     },
//     date: {
//         type: DataTypes.DATEONLY
//     },
//     appoinmentId: {
//         type: DataTypes.INTEGER
//     }
// }, {
//     freezeTableName: true
// });