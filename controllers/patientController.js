const Patient = require('../models/Patient.js')
const Bed = require('../models/Bed.js')

exports.createPatient = async (req, res, next) => {
  try {
    const { name, gender, bedSelected } = req.body

    const newPatient = await Patient.create({ name, gender })

    if (bedSelected) {
      const bed = await Bed.findOne({ where: { uuid: bedSelected }})
      newPatient.setBed(bed)
    }

    return res.status(200).json({ status: 200, data: newPatient, message: "New patient added!" });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: 500, data: null, message: err });
  }
}
