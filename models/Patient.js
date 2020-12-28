const Sequelize = require('sequelize')
const sequelize = require('../index')['sequelize']

const Patient = sequelize.define('Patient', {
  uuid: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  gender: {
    type: Sequelize.STRING(10),
    allowNull: true
  }
})

module.exports = Patient
