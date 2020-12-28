import React, { useState } from 'react'

export default function AddPatientForm() {
  const [name, updateName] = useState('')
  const [gender, updateGender] = useState('')

  return (
    <div className="add-patient-cont">
      <h4>Add Patient</h4>

      <form className="add-patient">
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
      </form>
    </div>
  )
}
