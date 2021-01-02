const express = require('express');
const compression = require('compression');
const cfg = require('config');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors');


// SEQUELZE SETUP
const Sequelize = require('sequelize');
const DB_URI = process.env.NODE_ENV === 'production'
  ? cfg.env.DB_URI
  : 'postgresql://localhost/hbeds';

const sequelizeOptions = {
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true
  }
};

const sequelize = new Sequelize(DB_URI, sequelizeOptions);

module.exports.sequelize = sequelize;

// MODELS
const User = require('./models/User.js')
const Floor = require('./models/Floor.js')
const Room = require('./models/Room.js')
const Bed = require('./models/Bed.js')
const Patient = require('./models/Patient.js')

// ASSOCIATIONS
Floor.hasMany(Room)

Room.belongsTo(Floor)
Room.hasMany(Bed)

Bed.belongsTo(Room)
Bed.hasOne(Patient)

Patient.belongsTo(Bed)

// DUMMY DATA


// sequelize.drop();
// sequelize.sync({ force: true }).then(() => {
//   const createDbEntries = async () => {
//     const floor1 = await Floor.create({ number: 1 })
//     const floor2 = await Floor.create({ number: 2 })
//     const room1 = await Room.create({ number: '1' })
//     const room2 = await Room.create({ number: '2' })
//     const room3 = await Room.create({ number: '1' })
//     const room4 = await Room.create({ number: '2' })
//     const bed1 = await Bed.create({ number: 'A' })
//     const bed2 = await Bed.create({ number: 'B' })
//     const bed3 = await Bed.create({ number: 'C' })
//     const bed4 = await Bed.create({ number: 'D' })
//     const bed5 = await Bed.create({ number: 'A' })
//     const bed6 = await Bed.create({ number: 'B' })
//     const bed7 = await Bed.create({ number: 'C' })
//     const bed8 = await Bed.create({ number: 'D' })
//     const patient1 = await Patient.create({ name: 'Robert O\'Connor', gender: 'male' })
//     room1.setFloor(floor1)
//     room2.setFloor(floor1)
//     room3.setFloor(floor2)
//     room4.setFloor(floor2)
//     bed1.setRoom(room1)
//     bed2.setRoom(room1)
//     bed3.setRoom(room2)
//     bed4.setRoom(room2)
//     bed5.setRoom(room3)
//     bed6.setRoom(room3)
//     bed7.setRoom(room4)
//     bed8.setRoom(room4)
//     patient1.setBed(bed4)
//   }
//
//   createDbEntries();
// });


// SERVER APP
const app = express().use('*', cors());

app.use(compression());
app.use(bodyParser());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/build')));

// CONTROLLERS
const userController = require('./controllers/userController.js');
const authController = require('./controllers/authController.js');
const roomController = require('./controllers/roomController.js');
const patientController = require('./controllers/patientController.js');

// ROUTES
// User
app.post('/v1/register', userController.register);
app.post('/v1/login', userController.login);

// Room
app.get('/v1/rooms', roomController.getAllRooms);

// patient
app.post('/v1/patients', patientController.createPatient)

const port = process.env.PORT || 7001;
app.listen(port, function() {
  console.log('API server listening on port 7001!');
});


module.exports = app;
