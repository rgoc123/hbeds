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
const User = require('./models/User.js');
const Room = require('./models/Room.js')
const Bed = require('./models/Bed.js')
const Patient = require('./models/Patient.js')

// ASSOCIATIONS


// DUMMY DATA


// sequelize.drop();
// sequelize.sync({ force: true }).then(() => {
//   // createDbEntries();
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

// ROUTES
app.post('/v1/register', userController.register);
app.post('/v1/login', userController.login);

const port = process.env.PORT || 7001;
app.listen(port, function() {
  console.log('API server listening on port 7001!');
});


module.exports = app;
