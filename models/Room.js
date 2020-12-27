const Sequelize = require('sequelize')
const sequelize = require('../index')['sequelize']

const Room = sequelize.define('Room', {
  uuid: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false
  },
  number: {
    type: Sequelize.STRING(200),
    allowNull: true
  }
})

module.exports = Room
