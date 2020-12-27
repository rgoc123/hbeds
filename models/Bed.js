const Sequelize = require('sequelize')
const sequelize = require('../index')['sequelize']

const Bed = sequelize.define('Bed', {
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

module.exports = Bed
