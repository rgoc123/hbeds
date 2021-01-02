import React, { useState } from 'react'

import { addPatientToBed } from '../util/patientApiUtil'

export default function AddPatientForm({ floors, updateFloors }) {
  const [name, updateName] = useState('')
  const [gender, updateGender] = useState('')
  const [bedSelected, updateBedSelected] = useState(null)
  const [submitError, updateSubmitError] = useState('')

  let bedsAvail = []
  floors.forEach(floor => {
    floor.Rooms.forEach(room => {
      bedsAvail = bedsAvail.concat(room.Beds.filter(bed => !bed.Patient))
    })
  })

  const submitPatient = async (e) => {
    e.preventDefault()
    if (!name || !gender || !bedSelected) {
      updateSubmitError('All fileds need to be filled in.')
    } else {
      const res = await addPatientToBed({ name, gender, bedSelected })

      if (res.status === 200) {
        updateFloors()
        updateName('')
        updateGender('')
        updateBedSelected(null)
      } else {
        updateSubmitError(res.message)
      }
    }
  }

  return (
    <div className="add-patient-cont">
      <h4>Add Patient</h4>

      <form className="add-patient"
        onSubmit={(e) => submitPatient(e)}>
        <input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => updateName(e.target.value)} />
        <select
          name="gender"
          value={gender}
          onChange={(e) => updateGender(e.target.value)} >
          <option value="">Choose one:</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button>Add New Patient</button>
      </form>

      <div className="avail-rooms">
        {bedsAvail.map(bed => {
          return (
            <div className={"avail-bed" + (bedSelected === bed.uuid ? " selected-bed" : "")}
              onClick={() => updateBedSelected(bed.uuid)}
              key={bed.uuid}>Bed {bed.number}</div>
          )
        })}
      </div>

      {
        submitError &&
        <p>{submitError}</p>
      }
    </div>
  )
}
