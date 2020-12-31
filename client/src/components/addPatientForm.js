import React, { useState } from 'react'

export default function AddPatientForm({ rooms }) {
  const [name, updateName] = useState('')
  const [gender, updateGender] = useState('')
  const [bedSelected, updateBedSelected] = useState(null)
  const [submitError, updateSubmitError] = useState(false)

  let bedsAvail = []
  rooms.forEach((room) => {
    bedsAvail = bedsAvail.concat(room.Beds.filter(bed => !bed.Patient))
  });

  const submitPatient = (e) => {
    e.preventDefault()
    if (!name || !gender || !bedSelected) {
      updateSubmitError(true)
    }
    console.log('It\'s time to party')
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
            <div className="avail-bed"
              onClick={() => updateBedSelected(bed.uuid)}
              key={bed.uuid}>Bed {bed.number}</div>
          )
        })}
      </div>

      {
        submitError &&
        <p>All fields need to be filled in.</p>
      }
    </div>
  )
}
