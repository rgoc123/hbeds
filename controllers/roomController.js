const Room = require('../models/Room.js')
const Bed = require('../models/Bed.js')

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.findAll({
      include: [{ model: Bed }]
    })

    return res.status(200).json({ status: 200, data: rooms, message: 'Got all rooms!' })
  } catch (err) {
    return res.status(500).json({ status: 500, data: null, message: err });
  }
}
