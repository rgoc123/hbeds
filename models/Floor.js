const Sequelize = require('sequelize')
const sequelize = require('../index')['sequelize']

const Floor = sequelize.define('Floor', {
  uuid: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Floor
