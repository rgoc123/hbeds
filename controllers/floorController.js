const Floor = require('../models/Floor.js')
const Room = require('../models/Room.js')
const Bed = require('../models/Bed.js')
const Patient = require('../models/Patient.js')

exports.getAllFloors = async (req, res) => {
  try {
    const floors = await Floor.findAll({
      include: [{
        model: Room,
        include: [{
          model: Bed,
          include: [{
            model: Patient
          }]
        }]
      }]
    })

    return res.status(200).json({ status: 200, data: floors, message: 'Got all floors!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: 500, data: null, message: err });
  }
}
